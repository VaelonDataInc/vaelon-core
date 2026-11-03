'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
        if (e.key === '/') {
          if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
        }
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const handleCommand = (action: string) => {
    setIsOpen(false);
    if (action === 'vault') router.push('/vault');
    if (action === 'telemetry') router.push('/telemetry');
    if (action === 'allocator') router.push('/allocator');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-[#12151C] border border-[#1E2330] rounded-lg shadow-2xl overflow-hidden">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 border-b border-[#1E2330]">
          <span className="text-[#3B82F6] mr-3 font-bold">&gt;</span>
          <input
            type="text"
            placeholder="Type a command or search asset nodes (/vault, /telemetry, /allocator)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent py-4 text-sm text-[#F3F4F6] placeholder-[#9CA3AF] focus:outline-none font-mono"
          />
          <span className="text-xs bg-[#1E2330] text-[#9CA3AF] px-2 py-1 rounded">ESC</span>
        </div>

        {/* Command Options List */}
        <div className="p-2 space-y-1 text-xs">
          <div className="px-3 py-1.5 text-[#9CA3AF] uppercase tracking-wider text-[10px]">Sovereign Navigation</div>
          <button
            onClick={() => handleCommand('vault')}
            className="w-full text-left px-3 py-2.5 rounded hover:bg-[#1E2330] flex items-center justify-between text-[#F3F4F6] group transition-colors"
          >
            <span>// Open Account Vault (Tiers 1 - 6 Management)</span>
            <span className="text-[#3B82F6] opacity-0 group-hover:opacity-100">ENTER</span>
          </button>
          <button
            onClick={() => handleCommand('telemetry')}
            className="w-full text-left px-3 py-2.5 rounded hover:bg-[#1E2330] flex items-center justify-between text-[#F3F4F6] group transition-colors"
          >
            <span>// Launch Live Alternative Asset Telemetry Feed</span>
            <span className="text-[#3B82F6] opacity-0 group-hover:opacity-100">ENTER</span>
          </button>
          <button
            onClick={() => handleCommand('allocator')}
            className="w-full text-left px-3 py-2.5 rounded hover:bg-[#1E2330] flex items-center justify-between text-[#F3F4F6] group transition-colors"
          >
            <span>// Institutional Allocator & Liquidity Simulator</span>
            <span className="text-[#3B82F6] opacity-0 group-hover:opacity-100">ENTER</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#090A0F] border-t border-[#1E2330] text-[11px] text-[#9CA3AF] flex justify-between items-center">
          <span>VAELON ENGINE v2.6 // SECURE CHANNEL</span>
          <span className="text-emerald-400">ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
}