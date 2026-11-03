import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Enforce server-to-server security using a dedicated CV API key header
    const apiKey = request.headers.get('x-cv-api-key');
    if (!apiKey || apiKey !== process.env.CV_INGEST_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid or missing CV API key.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { asset_id, valuation, confidence_score, grading_notes } = body;

    // Strict parameter validation
    if (!asset_id || valuation === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: asset_id and valuation are mandatory.' },
        { status: 400 }
      );
    }

    // Insert the computer vision valuation telemetry into the Neon database
    const queryText = `
      INSERT INTO asset_valuations (asset_id, valuation, recorded_at)
      VALUES ($1, $2, NOW())
      RETURNING id, asset_id, valuation, recorded_at;
    `;

    const result = await pool.query(queryText, [asset_id, valuation]);

    return NextResponse.json({
      success: true,
      message: 'CV telemetry and valuation logged successfully.',
      telemetry: result.rows[0],
      metadata: {
        confidence_score: confidence_score || null,
        grading_notes: grading_notes || null,
      },
    });
  } catch (error: any) {
    console.error('Error ingesting CV telemetry:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}