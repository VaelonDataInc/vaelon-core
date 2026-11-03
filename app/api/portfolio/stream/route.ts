import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // 1. Strict validation: Reject immediately if user context is missing
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: userId.' }, 
        { status: 400 }
      );
    }

    // 2. Fetch all verified assets for the user from Neon PostgreSQL
    const assetQuery = `
      SELECT id, asset_name, category, estimated_value, purchase_price, image_url, serial_number, created_at 
      FROM user_assets 
      WHERE user_id = $1 
      ORDER BY created_at DESC;
    `;
    
    const result = await pool.query(assetQuery, [userId]);
    const assets = result.rows;

    // 3. Compute institutional portfolio telemetry metrics
    const totalValuation = assets.reduce((sum, asset) => sum + Number(asset.estimated_value || 0), 0);
    const totalCostBasis = assets.reduce((sum, asset) => sum + Number(asset.purchase_price || 0), 0);
    const unrealizedGain = totalCostBasis > 0 ? totalValuation - totalCostBasis : 0;
    const returnPercentage = totalCostBasis > 0 ? (unrealizedGain / totalCostBasis) * 100 : 0;

    // 4. Return structured terminal telemetry payload
    return NextResponse.json({
      status: 'ONLINE',
      timestamp: new Date().toISOString(),
      metrics: {
        totalAssets: assets.length,
        totalValuation,
        totalCostBasis,
        unrealizedGain,
        returnPercentage: Number(returnPercentage.toFixed(2))
      },
      assets
    }, { status: 200 });

  } catch (error: any) {
    console.error('Portfolio Stream Execution Error:', error);
    return NextResponse.json(
      { error: 'Failed to stream live portfolio telemetry.', details: error.message }, 
      { status: 500 }
    );
  }
}
