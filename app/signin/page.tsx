import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full space-y-8 bg-zinc-900 border border-zinc-800 p-8 rounded-lg shadow-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">Vaelon Core</h2>
          <p className="text-sm text-zinc-400 mt-2">Sign in to your Sovereign Vault session</p>
        </div>
        
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-black border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 text-sm"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-black border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-white text-black font-medium py-2 rounded text-sm hover:bg-zinc-200 transition-colors"
            >
              Access Terminal
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}