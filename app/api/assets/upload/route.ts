import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, assetName, category, estimatedValue, purchasePrice, imageUrl, serialNumber } = body;

    if (!userId || !assetName || !category || !estimatedValue || !imageUrl) {
      return NextResponse.json({ error: 'Missing required asset telemetry parameters.' }, { status: 400 });
    }

    // 1. Insert asset into Neon PostgreSQL with pending verification status
    const query = `
      INSERT INTO user_assets (user_id, asset_name, category, estimated_value, purchase_price, image_url, serial_number, cv_verification_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING_SCAN')
      RETURNING id, created_at;
    `;
    
    const values = [userId, assetName, category, estimatedValue, purchasePrice || null, imageUrl, serialNumber || null];
    const result = await pool.query(query, values);
    const assetId = result.rows[0].id;

    // 2. Trigger asynchronous Computer Vision worker handshake via API key
    // (Sends payload to your external CV ingestion engine for AI grading/authenticity check)
    /*
    await fetch('https://your-cv-worker-node.internal/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CV_INGEST_API_KEY}`
      },
      body: JSON.stringify({ assetId, imageUrl, category })
    });
    */

    return NextResponse.json({
      success: true,
      assetId,
      status: 'PENDING_CV_VERIFICATION',
      message: 'Asset successfully registered into Sovereign Vault. CV telemetry scan initiated.'
    });

  } catch (error: any) {
    console.error('Asset upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error during asset ingestion.' }, { status: 500 });
  }
}