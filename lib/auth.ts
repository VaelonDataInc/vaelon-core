import pool from '@/lib/db';

export async function getUserTierFromSession(request: Request): Promise<number> {
  try {
    // Strict production check: require an Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      // Default to Tier 0 (Free) if no valid authorization header is present
      return 0;
    }

    const token = authHeader.replace('Bearer ', '');

    // Query Neon database to verify the user's tier based on their secure token / customer id
    const result = await pool.query(
      `SELECT tier_level FROM users WHERE stripe_customer_id = $1 LIMIT 1`,
      [token]
    );

    if (result.rowCount === 0) return 0;

    return result.rows[0].tier_level;
  } catch (error) {
    console.error('Error verifying user session tier:', error);
    return 0;
  }
}