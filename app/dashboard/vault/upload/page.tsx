'use client';

import React, { useState } from 'react';

export default function AssetUploadPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
    userId: 'user_mock_identifier_123', // Replace with active session user ID
    assetName: '',
    category: 'sports_card',
    estimatedValue: '',
    purchasePrice: '',
    imageUrl: '',
    serialNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/assets/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(`Asset locked into Vault successfully! ID: ${data.assetId}`);
      } else {
        alert(data.error || 'Failed to upload asset.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#05060A] text-slate-100 font-mono p-6 md:p-12">
      <div className="max-w-3xl mx-auto border border-amber-500/30 bg-[#0c0e15] p-8 relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500"></div>

        <div className="mb-8 border-b border-slate-800 pb-4">
          <div className="text-[10px] text-amber-500 tracking-widest">// SECURE VAULT INTAKE PORTAL</div>
          <h1 className="text-xl md:text-2xl font-bold text-white mt-1">Register Physical Alternative Asset</h1>
          <p className="text-xs text-slate-400 mt-1">Ingest high-value assets ($1K to $1M+) into your verified portfolio telemetry grid.</p>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500 text-emerald-400 text-xs">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 mb-2 tracking-wider">ASSET NAME / DESCRIPTION</label>
              <input
                type="text"
                required
                placeholder="e.g. 1986 Fleer Michael Jordan #57 PSA 10"
                value={formData.assetName}
                onChange={(e) => setFormData({...formData, assetName: e.target.value})}
                className="w-full bg-black border border-slate-800 p-3 text-slate-100 focus:border-amber-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-2 tracking-wider">ASSET CATEGORY</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-black border border-slate-800 p-3 text-slate-100 focus:border-amber-500 outline-none transition-colors"
              >
                <option value="sports_card">Sports Trading Card</option>
                <option value="luxury_watch">Luxury Watch</option>
                <option value="fine_art">Fine Art</option>
                <option value="coin">Rare Coin / Bullion</option>
                <option value="other">Alternative Asset</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 mb-2 tracking-wider">ESTIMATED / MARKET VALUE ($USD)</label>
              <input
                type="number"
                required
                placeholder="150000"
                value={formData.estimatedValue}
                onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})}
                className="w-full bg-black border border-slate-800 p-3 text-slate-100 focus:border-amber-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-2 tracking-wider">PURCHASE PRICE (OPTIONAL)</label>
              <input
                type="number"
                placeholder="120000"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                className="w-full bg-black border border-slate-800 p-3 text-slate-100 focus:border-amber-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 mb-2 tracking-wider">HIGH-RES IMAGE URL</label>
              <input
                type="url"
                required
                placeholder="https://storage.vaelondata.com/vault/asset.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full bg-black border border-slate-800 p-3 text-slate-100 focus:border-amber-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-2 tracking-wider">SERIAL / CERTIFICATION NUMBER</label>
              <input
                type="text"
                placeholder="PSA #41829102 or Ref. 126610LN"
                value={formData.serialNumber}
                onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                className="w-full bg-black border border-slate-800 p-3 text-slate-100 focus:border-amber-500 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold tracking-widest transition-all cursor-pointer mt-4"
          >
            {loading ? 'INITIALIZING CV VERIFICATION & VAULT LOCK...' : 'INITIALIZE ASSET REGISTRATION & CV SCAN'}
          </button>
        </form>
      </div>
    </main>
  );
}