import { NextResponse } from 'next/server';
import pool from '@/lib/db';

interface AuctionPayload {
  sourcePlatform: 'whatnot' | 'tiktok' | 'fanatics' | 'ebay_live';
  assetName: string;
  category: string;
  closingPrice: number;
  gradeTier?: string;
  serialNumber?: string;
  sellerId: string;
  timestamp: string;
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.INGESTION_API_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized ingestion stream access.' }, { status: 401 });
    }

    const body: AuctionPayload = await req.json();
    const { sourcePlatform, assetName, category, closingPrice, gradeTier, serialNumber } = body;

    if (!assetName || !closingPrice || !sourcePlatform) {
      return NextResponse.json({ error: 'Missing mandatory telemetry fields.' }, { status: 400 });
    }

    // Module 3: Canonical Compliance Engine - Normalization & Scrubbing
    const normalizedSku = `${category.toUpperCase()}-${assetName.replace(/\s+/g, '-').toUpperCase()}-${gradeTier || 'RAW'}`;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // 1. Check or Insert Master Asset Catalog Record
      let assetResult = await client.query(
        `SELECT id FROM master_assets WHERE canonical_sku = $1`,
        [normalizedSku]
      );

      let assetId;
      if (assetResult.rows.length === 0) {
        const insertAsset = await client.query(
          `INSERT INTO master_assets (asset_name, category, canonical_sku, grade_tier, serial_number) 
           VALUES ($1, $2, $3, $4, $5) RETURNING id`,
          [assetName, category, normalizedSku, gradeTier || null, serialNumber || null]
        );
        assetId = insertAsset.rows[0].id;
      } else {
        assetId = assetResult.rows[0].id;
      }

      // 2. Insert Live Valuation Tick into Time-Series Ledger
      await client.query(
        `INSERT INTO asset_valuations (asset_id, source_platform, valuation_amount, recorded_at) 
         VALUES ($1, $2, $3, NOW())`,
        [assetId, sourcePlatform, closingPrice]
      );

      await client.query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Telemetry feed successfully ingested and normalized.',
        sku: normalizedSku,
        recordedPrice: closingPrice,
      });
    } catch (dbError) {
      await client.query('ROLLBACK');
      throw dbError;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Ingestion Pipeline Failure:', error);
    return NextResponse.json({ error: error.message || 'Ingestion Processing Error' }, { status: 500 });
  }
}
