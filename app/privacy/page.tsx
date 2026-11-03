export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#05060A] text-slate-300 font-mono p-6 md:p-16 selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto border border-amber-500/30 bg-[#0c0e15] p-8 md:p-12 relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        {/* Terminal Corner Accents */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500"></div>

        <div className="mb-8 border-b border-slate-800 pb-6">
          <div className="text-[10px] text-amber-500 tracking-widest">// LEGAL DIRECTIVE 02</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">Privacy & Data Protocol</h1>
          <p className="text-xs text-slate-500 mt-1">Effective Date: October 27, 2026 | Vaelon Data</p>
        </div>

        <div className="space-y-6 text-xs leading-relaxed text-slate-300">
          <section>
            <h2 className="text-sm font-bold text-amber-400 mb-2">1. Information We Collect</h2>
            <p>We collect account credentials, billing data processed securely via Stripe (we never store raw credit cards), and Sovereign Vault assets (high-resolution images and asset metadata uploaded for tracking).</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-amber-400 mb-2">2. Automated CV Scanning & Vault Security</h2>
            <p>Uploaded asset images are processed through our proprietary computer vision and authentication engines, then securely stored and encrypted within our Neon PostgreSQL database infrastructure.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-amber-400 mb-2">3. Third-Party Processors</h2>
            <p>We do not sell user data. Information is shared strictly with essential operational partners, such as Stripe for payment processing and secure cloud infrastructure providers.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-right">
          <a href="/" className="text-xs text-amber-500 hover:text-amber-400 tracking-widest">← RETURN TO TERMINAL</a>
        </div>
      </div>
    </main>
  );
}