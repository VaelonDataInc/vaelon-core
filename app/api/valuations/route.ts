import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserTierFromSession } from '@/lib/auth';

// GET: Fetch historical valuations for assets (gated by user tier)
export async function GET(request: Request) {
  try {
    const userTier = await getUserTierFromSession(request);
    const { searchParams } = new URL(request.url);
    const assetId = searchParams.get('asset_id');

    let queryText = `
      v.id, v.asset_id, v.valuation, v.recorded_at, a.name, a.category, a.min_tier_required
      FROM asset_valuations v
      JOIN assets a ON v.asset_id = a.id
      WHERE a.min_tier_required <= $1
    `;
    const queryParams: any[] = [userTier];

    if (assetId) {
      queryText += ` AND v.asset_id = $2`;
      queryParams.push(assetId);
    }

    queryText += ` ORDER BY v.recorded_at DESC;`;

    const result = await pool.query(`SELECT ${queryText}`, queryParams);

    return NextResponse.json({
      success: true,
      count: result.rowCount,
      valuations: result.rows,
    });
  } catch (error: any) {
    console.error('Error fetching valuations:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Log a new market valuation telemetry point
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { asset_id, valuation } = body;

    if (!asset_id || valuation === undefined) {
      return NextResponse.json({ success: false, error: 'Missing asset_id or valuation' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO asset_valuations (asset_id, valuation) VALUES ($1, $2) RETURNING *`,
      [asset_id, valuation]
    );

    return NextResponse.json({
      success: true,
      telemetryPoint: result.rows[0],
    });
  } catch (error: any) {
    console.error('Error logging valuation:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}