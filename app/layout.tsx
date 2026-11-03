import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import CommandPalette from "../app/components/ComponentsPalette";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Vaelon Data // Sovereign Alternative Asset Telemetry",
  description: "Institutional-grade intelligence for the $15T alternative asset market.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-mono bg-[#090A0F] text-[#F3F4F6] antialiased selection:bg-[#3B82F6] selection:text-white`}>
        {/* Persistent Global Telemetry Ticker */}
        <header className="h-9 border-b border-[#1E2330] bg-[#12151C]/80 backdrop-blur-md flex items-center px-4 text-xs text-[#9CA3AF] justify-between z-50 sticky top-0">
          <div className="flex items-center space-x-6">
            <span className="text-[#3B82F6] font-bold tracking-widest">[VAELON_CORE]</span>
            <span className="hidden sm:inline">INDEX: $15.2T ALT-MARKET</span>
            <span className="text-emerald-400">LATENCY: 12ms</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs">PRESS <kbd className="bg-[#1E2330] px-1.5 py-0.5 rounded text-[#F3F4F6]">Ctrl + K</kbd> FOR OMNI-COMMAND</span>
          </div>
        </header>

        {/* Main Application Workspace */}
        <main className="min-h-[calc(100vh-2.25rem)] flex flex-col">
          {children}
        </main>

        {/* Global Omni-Command Palette Overlay */}
        <CommandPalette />
      </body>
    </html>
  );
}