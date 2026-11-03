export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#05060A] text-slate-300 font-mono p-6 md:p-16 selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto border border-amber-500/30 bg-[#0c0e15] p-8 md:p-12 relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        {/* Terminal Corner Accents */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500"></div>

        <div className="mb-8 border-b border-slate-800 pb-6">
          <div className="text-[10px] text-amber-500 tracking-widest">// LEGAL DIRECTIVE 01</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">Master Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-1">Effective Date: October 27, 2026 | Vaelon Data</p>
        </div>

        <div className="space-y-6 text-xs leading-relaxed text-slate-300">
          <section>
            <h2 className="text-sm font-bold text-amber-400 mb-2">1. Acceptance of Terms & Clearance Structure</h2>
            <p>By accessing, paying for, or utilizing the Vaelon Data alternative asset terminal, automated computer vision (CV) ingestion pipelines, or sovereign vault services, you agree to be bound by these Terms. Services are segmented into 6 Operational Clearance Tiers (Tier 01 Observer through Tier 06 Market Prime).</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-amber-400 mb-2">2. Intellectual Property & Proprietary Rights</h2>
            <p>All platform architecture, telemetry parsing models, UI layout designs, AI computer vision weights, and source code are the exclusive property of Vaelon Data. You agree not to reverse engineer, decompile, scrape, or build competing alternative asset indices from our feeds.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-amber-400 mb-2">3. Limitation of Liability & Sole Proprietorship Protection</h2>
            <p>The platform and its AI CV tools are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. Vaelon Data (including its founder operating via sole proprietorship or corporate structures) shall not be liable for indirect or consequential damages. Aggregate liability is strictly capped at the total amount paid by the user in the preceding twelve (12) months.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-right">
          <a href="/" className="text-xs text-amber-500 hover:text-amber-400 tracking-widest">← RETURN TO TERMINAL</a>
        </div>
      </div>
    </main>
  );
}