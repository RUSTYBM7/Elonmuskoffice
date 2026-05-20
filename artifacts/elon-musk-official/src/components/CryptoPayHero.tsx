import { Bitcoin, Copy, Check, Shield, Globe } from "lucide-react";
import { useState } from "react";

const wallets = [
  { symbol: "BTC", name: "Bitcoin", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin", color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", address: "0x4d8B4C3aA93a5C2e0B7d6F8c4E3F2b9A1D5C6E7f", network: "ERC-20", color: "#627EEA" },
  { symbol: "USDT", name: "Tether", address: "TXJLR8ZBRLCG4WB4GZLKJGBJ4QKVKGB6G8", network: "TRC-20", color: "#26A17B" },
  { symbol: "USDC", name: "USD Coin", address: "0xA7B9C3D0E4F5G6H7I8J9K0L1M2N3O4P5Q6R", network: "ERC-20", color: "#2775CA" },
  { symbol: "DOGE", name: "Dogecoin", address: "DJLpVNsS8R8p8g5b8aL4oZxYq3pLqX9mK", network: "Dogecoin", color: "#C3A000" },
  { symbol: "CRO", name: "Crypto.com Coin", address: "0xB8C7D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S", network: "Cronos", color: "#002D74" },
  { symbol: "SOL", name: "Solana", address: "7nX5Y9L2mK8pR3tU4vW5xY6zA7bC8dE9fG0h", network: "Solana", color: "#9945FF" },
  { symbol: "XRP", name: "Ripple", address: "rN7n3473SaZBCYYd9T5K6t2f1G4jK1L2M", network: "XRP Ledger", color: "#23292F" },
];

export default function CryptoPayHero() {
  const [copied, setCopied] = useState("");

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center bg-black text-white overflow-hidden">
      {/* Left: content */}
      <div className="relative z-10 w-full lg:w-1/2 px-8 md:px-16 py-20 lg:py-0">
        <div className="lg:max-w-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-6">
            Musk Foundation
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-6">
            Crypto Endowment
          </h1>

          <p className="text-base md:text-lg text-white/50 leading-relaxed mb-8">
            Send cryptocurrency directly to the Musk Foundation endowment wallet.
            Your contribution supports renewable energy, STEM education, and AI safety research.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-white/40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              No middleman — direct wallet transfer
            </div>
            <div className="flex items-center gap-3 text-sm text-white/40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Supports 8 major cryptocurrencies
            </div>
            <div className="flex items-center gap-3 text-sm text-white/40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Instant on-chain verification
            </div>
          </div>
        </div>
      </div>

      {/* Right: wallet list */}
      <div className="relative z-10 w-full lg:w-1/2 bg-white/5 lg:bg-transparent border-t lg:border-t-0 border-white/10">
        <div className="px-8 md:px-16 py-12 lg:py-20">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">
            Musk Foundation Wallet Addresses
          </p>

          <div className="space-y-3">
            {wallets.map((w) => (
              <div key={w.symbol} className="border border-white/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${w.color}30`, color: w.color }}
                    >
                      {w.symbol.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{w.name}</p>
                      <p className="text-[10px] text-white/30">{w.network}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copy(w.address, w.symbol)}
                    className="flex items-center gap-1.5 text-[10px] text-white/40 hover:text-white/70 transition-colors border border-white/10 px-2.5 py-1.5"
                  >
                    {copied === w.symbol ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <code className="text-[10px] font-mono text-white/40 block break-all leading-relaxed">
                  {w.address}
                </code>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-6 text-[10px] text-white/20">
            <div className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> Verified wallet</div>
            <div className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> Global access</div>
          </div>
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)`
      }} />
    </section>
  );
}