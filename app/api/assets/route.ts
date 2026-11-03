import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserTierFromSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Securely resolve the user's tier via session/token lookup instead of trusting URL params
    const userTier = await getUserTierFromSession(request);

    // Fetch assets where the required tier is less than or equal to the user's verified tier
    const queryText = `
      SELECT id, name, category, current_valuation, min_tier_required 
      FROM assets 
      WHERE min_tier_required <= $1 
      ORDER BY current_valuation DESC;
    `;
    
    const result = await pool.query(queryText, [userTier]);

    return NextResponse.json({
      success: true,
      authenticatedTier: userTier,
      count: result.rowCount,
      assets: result.rows,
    });
  } catch (error: any) {
    console.error('Error fetching secure assets:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
