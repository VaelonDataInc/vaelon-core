export interface TierConfig {
  level: number;
  name: string;
  price: string;
  targetAudience: string;
  latency: string;
  maxAssetsTracked: number;
  privateNodesAllowed: boolean;
  apiAccess: boolean;
  clearanceBadgeColor: string;
}

export const SOVEREIGN_TIERS: Record<number, TierConfig> = {
  1: {
    level: 1,
    name: "FREE OBSERVER",
    price: "$0",
    targetAudience: "Public Watchlist",
    latency: "15-Minute Delayed Feed",
    maxAssetsTracked: 10,
    privateNodesAllowed: false,
    apiAccess: false,
    clearanceBadgeColor: "text-slate-400 border-slate-700 bg-slate-900",
  },
  2: {
    level: 2,
    name: "COLLECTOR TIER",
    price: "$20/mo",
    targetAudience: "Active Collectors",
    latency: "Live (1-Minute Polling)",
    maxAssetsTracked: 100,
    privateNodesAllowed: false,
    apiAccess: false,
    clearanceBadgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  3: {
    level: 3,
    name: "PRO TELEMETRY",
    price: "$35/mo",
    targetAudience: "Advanced Traders & Investors",
    latency: "Sub-Second Live Stream",
    maxAssetsTracked: 1000,
    privateNodesAllowed: false,
    apiAccess: true,
    clearanceBadgeColor: "text-amber-300 border-amber-400/40 bg-amber-500/20",
  },
  4: {
    level: 4,
    name: "INSTITUTIONAL VAULT",
    price: "$10,000/mo",
    targetAudience: "Alternative Asset Funds",
    latency: "Direct Order Book Routing",
    maxAssetsTracked: 50000,
    privateNodesAllowed: true,
    apiAccess: true,
    clearanceBadgeColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40",
  },
  5: {
    level: 5,
    name: "ENTERPRISE NODE",
    price: "$20,000/mo",
    targetAudience: "Multi-Desk Desks & Syndicates",
    latency: "Dedicated Worker Pool Mesh",
    maxAssetsTracked: 250000,
    privateNodesAllowed: true,
    apiAccess: true,
    clearanceBadgeColor: "text-cyan-400 border-cyan-500/40 bg-cyan-950/40",
  },
  6: {
    level: 6,
    name: "SOVEREIGN APEX",
    price: "$40,000/mo",
    targetAudience: "Sovereign Wealth & Apex Funds",
    latency: "Zero-Latency Bare-Metal Direct",
    maxAssetsTracked: Infinity,
    privateNodesAllowed: true,
    apiAccess: true,
    clearanceBadgeColor: "text-purple-400 border-purple-500/40 bg-purple-950/40",
  }
};

export function getTierConfig(level: number): TierConfig {
  return SOVEREIGN_TIERS[level] || SOVEREIGN_TIERS[1];
}
