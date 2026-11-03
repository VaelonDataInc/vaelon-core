"use client";

import { useState } from "react";
import Link from "next/link";
import { TierConfig, SOVEREIGN_TIERS } from "@/lib/tiers";

interface ValuationRecord {
  asset_id: number;
  valuation: string | number;
  recorded_at: string | Date;
}

interface DashboardClientProps {
  tierLevel: number;
  tierConfig: TierConfig;
  stripeCustomerId: string | null;
  valuations: ValuationRecord[];
}

export default function DashboardClient({ tierLevel, tierConfig, stripeCustomerId, valuations }: DashboardClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");

  const renderModuleContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
            {/* LEFT PANE: Live Valuation Data from Neon */}
            <section className="lg:col-span-8 bg-[#0c0e15] border border-amber-500/20 p-6 relative flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                  <h2 className="text-xs font-bold text-amber-400 tracking-wider">// LIVE ASSET VALUATIONS ({tierConfig.latency})</h2>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-800/50">NEON SYNCED</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-6">
                  Clearance Profile: <strong className="text-white">{tierConfig.name}</strong> ({tierConfig.price}). Asset Capacity: <strong className="text-amber-400">{tierConfig.maxAssetsTracked === Infinity ? 'UNLIMITED' : tierConfig.maxAssetsTracked} Assets</strong>.
                </p>
                
                <div className="space-y-3 text-xs font-mono">
                  {valuations.map((row, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-slate-900/80 py-3 hover:bg-slate-900/40 px-2 transition-colors">
                      <span className="text-slate-300">ASSET_ID: <strong className="text-white">#{row.asset_id}</strong></span>
                      <span className="text-emerald-400 font-bold text-sm">${Number(row.valuation).toLocaleString()}</span>
                      <span className="text-slate-500 text-[10px]">{new Date(row.recorded_at).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between tracking-widest">
                <span>BACKEND: NEON POSTGRESQL</span>
                <span className="text-emerald-400">SECURE QUANTUM ENCRYPTION</span>
              </div>
            </section>

            {/* RIGHT PANE: System Status & Controls */}
            <aside className="lg:col-span-4 bg-[#0c0e15] border border-amber-500/20 p-6 relative flex flex-col justify-between">
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500"></div>
              <div>
                <h2 className="text-xs font-bold text-amber-400 tracking-wider mb-4">// TELEMETRY CONTROLS</h2>
                <p className="text-[11px] text-slate-400 mb-6">Active session security and account provisioning telemetry.</p>
                
                <div className="bg-[#05060A] border border-slate-800 p-4 space-y-3 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Clearance Level:</span> 
                    <span className="text-amber-400 font-bold">Tier {tierLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">API Access:</span> 
                    <span className={tierConfig.apiAccess ? "text-emerald-400 font-bold" : "text-red-400"}>
                      {tierConfig.apiAccess ? "UNLOCKED" : "LOCKED (TIER 3+)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Private Nodes:</span> 
                    <span className={tierConfig.privateNodesAllowed ? "text-emerald-400 font-bold" : "text-red-400"}>
                      {tierConfig.privateNodesAllowed ? "AUTHORIZED" : "LOCKED (TIER 4+)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between tracking-widest">
                <span>VAELON DATA</span>
                <span>v1.0.4-HUD</span>
              </div>
            </aside>
          </div>
        );

      case "liquidity":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
            <section className="lg:col-span-12 bg-[#0c0e15] border border-amber-500/20 p-6 relative flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                  <h2 className="text-xs font-bold text-amber-400 tracking-wider">// $15T ALTERNATIVE ASSET LIQUIDITY STREAMS</h2>
                  <span className="text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 border border-amber-800/50">SPEED: {tierConfig.latency}</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-6">Real-time capital velocity and cross-market spread telemetry across alternative asset classes.</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { asset: "Sports Trading Cards", volume: "$2.4B", velocity: "+14.2%", status: "OPTIMAL" },
                    { asset: "Luxury Watches", volume: "$5.1B", velocity: "+8.9%", status: "STABLE" },
                    { asset: "Fine Art & Sculptures", volume: "$4.8B", velocity: "+3.1%", status: "CONSOLIDATING" },
                    { asset: "Precious Metals & Coins", volume: "$2.7B", velocity: "+19.4%", status: "HIGH VELOCITY" }
                  ].map((stream, idx) => (
                    <div key={idx} className="bg-[#05060A] border border-slate-800 p-4 space-y-2">
                      <div className="text-[10px] text-slate-500">{stream.asset}</div>
                      <div className="text-lg font-bold text-white">{stream.volume}</div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-emerald-400">{stream.velocity}</span>
                        <span className="text-amber-500">{stream.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between tracking-widest">
                <span>LIQUIDITY ENGINE: ACTIVE</span>
                <span className="text-emerald-400">GLOBAL ORDER ROUTING</span>
              </div>
            </section>
          </div>
        );

      case "vaults":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
            <section className="lg:col-span-12 bg-[#0c0e15] border border-amber-500/20 p-6 relative flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                  <h2 className="text-xs font-bold text-amber-400 tracking-wider">// SECURE ASSET VAULT TELEMETRY</h2>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-800/50">CUSTODIAL PORTAL</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-6">Custodial physical asset tracking, fractional vault shares, and provenance verification nodes.</p>

                <div className="space-y-3 text-xs">
                  {[
                    { id: "VLT-091", desc: "1952 Topps Mickey Mantle PSA 9", location: "Geneva Vault Alpha", audit: "VERIFIED" },
                    { id: "VLT-142", desc: "Rolex Daytona Paul Newman Steel", location: "Zurich Secure Node", audit: "VERIFIED" },
                    { id: "VLT-305", desc: "Picasso 1932 Canvas Study", location: "London Sovereign Vault", audit: "VERIFIED" }
                  ].map((vault, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#05060A] border border-slate-800 p-4">
                      <div>
                        <div className="text-amber-400 font-bold">{vault.id} — {vault.desc}</div>
                        <div className="text-slate-500 text-[10px] mt-1">LOCATION: {vault.location}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                        {vault.audit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between tracking-widest">
                <span>STORAGE PROTOCOL: ZERO-TRUST</span>
                <span className="text-emerald-400">100% INSURED CUSTODY</span>
              </div>
            </section>
          </div>
        );

      case "clearance":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
            <section className="lg:col-span-12 bg-[#0c0e15] border border-amber-500/20 p-6 relative flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                  <h2 className="text-xs font-bold text-amber-400 tracking-wider">// SOVEREIGN CLEARANCE & 6-TIER VAULT MATRIX</h2>
                  <span className={`text-[10px] px-2 py-0.5 border font-bold ${tierConfig.clearanceBadgeColor}`}>
                    ACTIVE: {tierConfig.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-6">Manage your cryptographic authorization level across all 6 Sovereign Vault tiers.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {Object.values(SOVEREIGN_TIERS).map((t) => (
                    <div 
                      key={t.level} 
                      className={`bg-[#05060A] border p-4 flex flex-col justify-between space-y-3 ${
                        tierLevel === t.level ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-amber-400 font-bold">TIER 0{t.level}</span>
                          <span className="text-emerald-400 text-xs font-bold">{t.price}</span>
                        </div>
                        <div className="text-sm font-bold text-white mt-1">{t.name}</div>
                        <div className="text-[10px] text-slate-400 mt-1">Target: {t.targetAudience}</div>
                        <p className="text-[11px] text-slate-400 mt-2">{t.latency} • {t.maxAssetsTracked === Infinity ? 'Unlimited' : `${t.maxAssetsTracked} assets`}</p>
                      </div>

                      {tierLevel === t.level ? (
                        <div className="py-1.5 text-center bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                          ACTIVE CLEARANCE
                        </div>
                      ) : (
                        stripeCustomerId && (
                          <form action="/api/portal" method="POST">
                            <input type="hidden" name="customerId" value={stripeCustomerId} />
                            <button type="submit" className="w-full py-1.5 bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-200 text-[10px] font-bold tracking-widest transition-all">
                              SWITCH TO TIER 0{t.level}
                            </button>
                          </form>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between tracking-widest">
                <span>SECURITY PROTOCOL: RSA-4096</span>
                <span className="text-emerald-400">ENCRYPTED GATEWAY</span>
              </div>
            </section>
          </div>
        );

      case "nodes":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
            <section className="lg:col-span-12 bg-[#0c0e15] border border-amber-500/20 p-6 relative flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                  <h2 className="text-xs font-bold text-amber-400 tracking-wider">// PRIVATE SERVER NODES & WORKER HANDSHAKE</h2>
                  <span className={`text-[10px] px-2 py-0.5 border ${tierConfig.privateNodesAllowed ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800' : 'text-red-400 bg-red-950/40 border-red-800'}`}>
                    {tierConfig.privateNodesAllowed ? "STATUS: AUTHORIZED" : "STATUS: RESTRICTED (TIER 4+)"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-6">Machine-to-machine ingestion pipelines and private API telemetry endpoints.</p>

                {tierConfig.privateNodesAllowed ? (
                  <div className="bg-[#05060A] border border-slate-800 p-4 font-mono text-xs space-y-2 text-slate-300">
                    <div className="text-emerald-400">// SOVEREIGN NODE HANDSHAKE ESTABLISHED</div>
                    <div>NODE_ID: <strong className="text-white">vaelona-core-institutional-us-east-1</strong></div>
                    <div>INGEST KEY: <strong className="text-amber-400">vaelon_sovereign_prod_key_998877</strong></div>
                    <div>LATENCY: <strong className="text-emerald-400">0.4ms (Bare-Metal Mesh)</strong></div>
                    <div>ENCRYPTION: <strong className="text-white">TLS 1.3 / AES-256-GCM</strong></div>
                  </div>
                ) : (
                  <div className="bg-[#05060A] border border-red-500/30 p-6 text-center space-y-3">
                    <div className="text-red-400 text-xs font-bold">ACCESS RESTRICTED TO TIER 04 - TIER 06 SOVEREIGN VAULTS</div>
                    <p className="text-[11px] text-slate-400">Private server nodes and dedicated ingestion worker meshes require Institutional Vault clearance ($10,000+/mo).</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between tracking-widest">
                <span>WORKER POOL: DEDICATED</span>
                <span className={tierConfig.privateNodesAllowed ? "text-emerald-400" : "text-red-400"}>
                  {tierConfig.privateNodesAllowed ? "ONLINE" : "LOCKED"}
                </span>
              </div>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-slate-100 font-mono flex overflow-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Background HUD Grid Lines & Mars Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d10_1px,transparent_1px),linear-gradient(to_bottom,#1f293d10_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Collapsible Left-Hand Sidebar */}
      <aside 
        className={`relative z-20 bg-[#07090e] border-r border-amber-500/20 transition-all duration-300 flex flex-col justify-between ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div>
          {/* Sidebar Header: Clickable Business Name to Homepage */}
          <div className="p-4 border-b border-amber-500/20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-2 h-2 bg-emerald-500 animate-pulse flex-shrink-0"></div>
              {sidebarOpen && (
                <span className="text-xs font-bold tracking-[0.2em] text-white group-hover:text-amber-400 transition-colors">
                  VAELON // CORE
                </span>
              )}
            </Link>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[10px] text-slate-400 hover:text-amber-400 p-1 border border-slate-800 bg-slate-900 transition-colors"
              title="Toggle Sidebar"
            >
              {sidebarOpen ? "«" : "»"}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs">
            {[
              { id: "overview", label: "01. TELEMETRY GRID", icon: "⚡" },
              { id: "liquidity", label: "02. LIQUIDITY STREAMS", icon: "📊" },
              { id: "vaults", label: "03. ASSET VAULTS", icon: "🔒" },
              { id: "clearance", label: "04. SOVEREIGN CLEARANCE", icon: "🛡️" },
              { id: "nodes", label: "05. PRIVATE NODES", icon: "🛰️" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left transition-all ${
                  activeSection === item.id 
                    ? "bg-amber-500/10 text-amber-400 border-l-2 border-amber-500 font-bold" 
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <span className="text-sm flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="tracking-wider text-[11px] truncate">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer / Session Info */}
        <div className="p-4 border-t border-amber-500/20 text-[10px] space-y-2">
          {sidebarOpen ? (
            <>
              <div className="text-emerald-400 font-bold">STATUS: DATABASE SYNCED</div>
              <div className="text-slate-400">CLEARANCE: TIER {tierLevel}</div>
              <Link href="/" className="block text-amber-500 hover:underline pt-2">← EXIT TO PUBLIC HUD</Link>
            </>
          ) : (
            <div className="text-center text-emerald-400 font-bold" title={`Tier ${tierLevel}`}>T{tierLevel}</div>
          )}
        </div>
      </aside>

      {/* 2. Main Dashboard Viewport */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto relative z-10">
        
        {/* TOP HUD BAR */}
        <header className="border-b border-amber-500/20 bg-[#07090e]/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold tracking-[0.2em] text-white">VAELON DATA // TERMINAL</span>
            </div>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">STATUS: <strong className="text-emerald-400">ONLINE</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 border text-[10px] tracking-widest font-bold ${tierConfig.clearanceBadgeColor}`}>
              TIER_0{tierLevel}: {tierConfig.name}
            </span>
            {stripeCustomerId && (
              <form action="/api/portal" method="POST">
                <input type="hidden" name="customerId" value={stripeCustomerId} />
                <button type="submit" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-black text-[10px] font-bold tracking-widest transition-all border border-slate-700 text-slate-200">
                  BILLING MGR
                </button>
              </form>
            )}
          </div>
        </header>

        {/* MAIN MODULE CONTENT VIEWPORT */}
        <div className="p-6 md:p-10 flex-grow flex flex-col">
          {renderModuleContent()}
        </div>

        {/* FOOTER */}
        <footer className="border-t border-amber-500/20 bg-[#07090e]/90 px-6 py-3 text-[10px] text-slate-500 flex justify-between items-center tracking-widest">
          <span>© 2026 VAELON DATA. ALL RIGHTS RESERVED.</span>
          <span className="text-emerald-400">SYSTEM STATUS: OPTIMAL</span>
        </footer>

      </div>

    </div>
  );
}
