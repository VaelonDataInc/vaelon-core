import { Suspense } from 'react';
import pool from '@/lib/db';
import DashboardClient from './DashboardClient';
import { getTierConfig } from '@/lib/tiers';

async function DashboardContent({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const resolvedParams = await searchParams;
  const userEmail = resolvedParams.email || 'collector@vaelondata.com'; 

  // 1. Fetch user tier and billing status from Neon database
  const userResult = await pool.query(
    `SELECT tier_level, stripe_customer_id FROM users WHERE email = $1`,
    [userEmail]
  );

  const tierLevel = Number(userResult.rows[0]?.tier_level) || 1;
  const stripeCustomerId = userResult.rows[0]?.stripe_customer_id || null;
  const tierConfig = getTierConfig(tierLevel);

  // 2. Fetch live telemetry data from your Neon database tables
  const valuationsResult = await pool.query(
    `SELECT asset_id, valuation, recorded_at FROM asset_valuations ORDER BY recorded_at DESC LIMIT 5`
  );

  return (
    <DashboardClient 
      tierLevel={tierLevel} 
      tierConfig={tierConfig}
      stripeCustomerId={stripeCustomerId} 
      valuations={valuationsResult.rows} 
    />
  );
}

export default function VaelonTerminal({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#05060A] text-amber-500 font-mono flex items-center justify-center text-xs tracking-widest">
        // ESTABLISHING SOVEREIGN ORBITAL LINK...
      </div>
    }>
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  );
}
