import Link from "next/link";

export default function PublicHomePage() {
  return (
    <div className="min-h-screen bg-[#05060A] text-slate-100 font-mono selection:bg-amber-500 selection:text-black relative overflow-hidden">
      
      {/* Background HUD Grid Lines & Mars Glow Simulation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Public Top Navigation Bar (HUD Header) */}
      <header className="sticky top-0 z-50 bg-[#05060A]/90 backdrop-blur-xl border-b border-amber-500/20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-amber-500 animate-ping"></div>
          <span className="font-bold tracking-[0.2em] text-slate-100 text-sm">
            VAELON DATA <span className="text-[10px] text-amber-500/80 ml-2">// ORBITAL_LINK_ACTIVE</span>
          </span>
        </div>
        <nav className="hidden md:flex space-x-8 text-xs text-slate-400">
          <a href="#about" className="hover:text-amber-400 transition-colors tracking-widest">[ 01. ABOUT ]</a>
          <a href="#examples" className="hover:text-amber-400 transition-colors tracking-widest">[ 02. TELEMETRY ]</a>
          <a href="#vault" className="hover:text-amber-400 transition-colors tracking-widest">[ 03. SOVEREIGN VAULT ]</a>
        </nav>
        <div>
          <Link 
            href="/signin" 
            className="text-xs bg-amber-500/10 border border-amber-500/40 text-amber-400 px-4 py-2 hover:bg-amber-500 hover:text-black transition-all font-bold tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          >
            INITIALIZE AUTH // SECURE LOGIN
          </Link>
        </div>
      </header>

      {/* Hero Section: Spaceship / Mars Descent Vibe */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center z-10">
        <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] bg-amber-500/10 text-amber-400 px-4 py-1.5 mb-8 border border-amber-500/30 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>MARS DESCENT VECTOR // $15T ALTERNATIVE ASSET GRID</span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Orbital Intelligence for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400">
            Illiquid Markets.
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xs md:text-sm text-slate-400 leading-relaxed mb-12 tracking-wide">
          Deploying high-frequency telemetry, real-time index locking, and institutional command structures across global alternative asset vaults.
        </p>

        {/* Live HUD Telemetry Bar */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#0c0e15] border border-amber-500/20 p-4 text-left text-xs backdrop-blur-xl">
          <div>
            <div className="text-[9px] text-slate-500 tracking-wider">ORBITAL ALTITUDE</div>
            <div className="text-emerald-400 font-bold mt-0.5">14,200 KM // LOCKED</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 tracking-wider">INDEX THROUGHPUT</div>
            <div className="text-slate-200 font-bold mt-0.5">$15.2T ASSET STREAM</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 tracking-wider">LATENCY SYNC</div>
            <div className="text-amber-400 font-bold mt-0.5">0.014ms (MARS RELAY)</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 tracking-wider">VAULT STATUS</div>
            <div className="text-emerald-400 font-bold mt-0.5">SECURE // 6-TIER ACTIVE</div>
          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="relative max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/80 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-amber-400 mb-2">// 01. CORE ARCHITECTURE</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Engineered for Absolute Clarity in Deep Space Markets</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Traditional finance operates on surface-level metrics. Vaelon Data cuts through the noise of fragmented alternative assets—luxury timepieces, high-grade sports trading cards, bullion, and museum-grade art—with the precision of an orbital navigation array.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every data feed is cross-referenced, verified, and streamed directly into your secure sovereign account matrix.
            </p>
          </div>
          <div className="bg-[#0c0e15] border border-amber-500/30 p-6 relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500"></div>
            <div className="text-[10px] text-amber-500/80 mb-3 tracking-widest">// SYSTEM TELEMETRY READOUT</div>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">ENCRYPTION PROTOCOL</span>
                <span className="text-emerald-400">QUANTUM-SHIELDED</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">MARKET COVERAGE</span>
                <span className="text-slate-100">GLOBAL ALTERNATIVE GRID</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">NODE SYNCHRONIZATION</span>
                <span className="text-amber-400">ACTIVE DESCENT FEED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Examples Section (What's Possible) */}
      <section id="examples" className="relative max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/80 z-10">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-[0.2em] text-amber-400 mb-2">// 02. CAPABILITIES MATRIX</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Targeting High-Value Asset Sectors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Sports Trading Cards",
              desc: "Real-time auction liquidity mapping, population report telemetry, and elite asset valuation tracking.",
            },
            {
              title: "Luxury Watches",
              desc: "Grey-market volatility indexes, secondary scarcity metrics, and horological asset monitoring.",
            },
            {
              title: "Fine Art & Bullion",
              desc: "Macro wealth allocation flows, auction throughput analysis, and physical scarcity indexing.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0c0e15] border border-slate-800 p-6 hover:border-amber-500/50 transition-all group relative">
              <div className="text-[10px] font-bold text-amber-500 mb-2 tracking-widest">SECTOR_0{idx + 1} // {item.title.toUpperCase()}</div>
              <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The 6-Tier Sovereign Vault (Pricing Section - Wired to Stripe Checkout) */}
      <section id="vault" className="relative max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/80 z-10">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-[0.2em] text-amber-400 mb-2">// 03. ACCESS CONTROL PROTOCOL</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">The 6-Tier Sovereign Vault</h2>
          <p className="text-xs text-slate-400 mt-2">Select your operational clearance tier to initialize Stripe Sandbox checkout and account telemetry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { level: "1", name: "TIER 01: OBSERVER", price: "Free", access: "Basic Index Summary & Public Ticker" },
            { level: "2", name: "TIER 02: ANALYST", price: "$20 / mo", access: "Single Asset Class Deep Dives & Volatility Feeds" },
            { level: "3", name: "TIER 03: OPERATOR", price: "$35 / mo", access: "Multi-Asset Liquidity Grid & Custom Alerts" },
            { level: "4", name: "TIER 04: CUSTODIAN", price: "$10,000 / mo", access: "Direct Exchange API & Historical Export Engine" },
            { level: "5", name: "TIER 05: SOVEREIGN", price: "$20,000 / mo", access: "Institutional Telemetry & Private Node Access" },
            { level: "6", name: "TIER 06: MARKET PRIME", price: "$40,000 / mo", access: "Direct Liquidity Injection & Governance Rights" },
          ].map((tier, idx) => (
            <div key={idx} className="bg-[#0c0e15] border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/60 transition-all relative">
              <div>
                <div className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">{tier.name}</div>
                <div className="text-2xl font-extrabold text-amber-400 mb-4 tracking-tight">{tier.price}</div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">{tier.access}</p>
              </div>
              
              <form action="/api/checkout" method="POST" className="w-full">
                <input type="hidden" name="tierLevel" value={tier.level} />
                <button
                  type="submit"
                  className="w-full text-center text-xs bg-slate-900 border border-slate-700 hover:bg-amber-500 hover:text-black hover:border-amber-500 text-slate-200 py-3 transition-all font-semibold tracking-wider cursor-pointer"
                >
                  INITIALIZE CLEARANCE
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 text-center text-[10px] text-slate-500 tracking-widest relative z-10">
        VAELON DATA // ORBITAL ALTERNATIVE ASSET INFRASTRUCTURE. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}