import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Check,
  ArrowRight,
  Copy,
  X,
  ExternalLink,
  Clock,
  AlertCircle,
  ChevronDown,
  DollarSign,
  RefreshCw,
} from "lucide-react";
import teslaLogo from "@/assets/tesla-logo.svg";

const cryptoTokens = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC", color: "#F7931A", network: "Bitcoin" },
  { id: "ETH", name: "Ethereum", symbol: "ETH", color: "#627EEA", network: "Ethereum" },
  { id: "USDT", name: "Tether", symbol: "USDT", color: "#26A17B", network: "TRC-20" },
  { id: "USDC", name: "USD Coin", symbol: "USDC", color: "#2775CA", network: "ERC-20" },
  { id: "DOGE", name: "Dogecoin", symbol: "DOGE", color: "#C3A000", network: "Dogecoin" },
  { id: "CRO", name: "Crypto.com Coin", symbol: "CRO", color: "#002D74", network: "Cronos" },
  { id: "SOL", name: "Solana", symbol: "SOL", color: "#9945FF", network: "Solana" },
  { id: "XRP", name: "Ripple", symbol: "XRP", color: "#23292F", network: "XRP Ledger" },
];

const walletAddresses: Record<string, { address: string; network: string }> = {
  BTC:  { address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin" },
  ETH:  { address: "0x4d8B4C3aA93a5C2e0B7d6F8c4E3F2b9A1D5C6E7f", network: "Ethereum (ERC-20)" },
  USDT: { address: "TXJLR8ZBRLCG4WB4GZLKJGBJ4QKVKGB6G8", network: "TRON (TRC-20)" },
  USDC: { address: "0xA7B9C3D0E4F5G6H7I8J9K0L1M2N3O4P5Q6R", network: "Ethereum (ERC-20)" },
  DOGE: { address: "DJLpVNsS8R8p8g5b8aL4oZxYq3pLqX9mK", network: "Dogecoin" },
  CRO:  { address: "0xB8C7D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S", network: "Cronos (ERC-20)" },
  SOL:  { address: "7nX5Y9L2mK8pR3tU4vW5xY6zA7bC8dE9fG0h", network: "Solana" },
  XRP:  { address: "rN7n3473SaZBCYYd9T5K6t2f1G4jK1L2M", network: "XRP Ledger" },
};

const changellyPairs = [
  { from: "BTC", to: "ETH" },
  { from: "ETH", to: "BTC" },
  { from: "USDT", to: "BTC" },
  { from: "USDC", to: "ETH" },
  { from: "DOGE", to: "BTC" },
  { from: "SOL", to: "USDT" },
  { from: "XRP", to: "BTC" },
  { from: "CRO", to: "ETH" },
];

const presetAmounts = [25, 50, 100, 250, 500, 1000];

function copyToClipboard(text: string, setCopied: (v: string) => void, key: string) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(key);
    setTimeout(() => setCopied(""), 2500);
  });
}

export default function CryptoPayment() {
  const [step, setStep] = useState<"select" | "details" | "wallet">("select");
  const [selectedToken, setSelectedToken] = useState("BTC");
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState("");
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showChangelly, setShowChangelly] = useState(false);
  const [selectedPair, setSelectedPair] = useState(changellyPairs[0]);

  const token = cryptoTokens.find((t) => t.id === selectedToken) || cryptoTokens[0];
  const wallet = walletAddresses[selectedToken] || walletAddresses["BTC"];
  const displayAmount = customAmount || String(selectedAmount);

  const handleTokenSelect = (id: string) => {
    setSelectedToken(id);
  };

  const handleProceed = () => {
    if (step === "select") { setStep("details"); return; }
    if (step === "details") {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setStep("wallet");
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step === "details") setStep("select");
    if (step === "wallet") setStep("details");
  };

  const handleReset = () => {
    setStep("select");
    setSelectedToken("BTC");
    setSelectedAmount(100);
    setCustomAmount("");
    setSubmitted(false);
    setShowChangelly(false);
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-black" />
          </motion.div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Musk Foundation</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
              Payment Initiated
            </h2>
            <p className="text-white/50 leading-relaxed">
              Your {displayAmount} USD {token.name} endowment is being processed.
              Send exactly <span className="text-white font-semibold">{token.symbol}</span> to the wallet address shown.
              Deposits confirmed after 1 network confirmation.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 text-white/30 text-xs">
            <div className="flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Secure</div>
            <div className="flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> Encrypted</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black px-6 py-16 md:py-24">
      <div className="max-w-xl mx-auto">

        {/* Tesla logo */}
        <div className="flex justify-center mb-10">
          <img src={teslaLogo} alt="Musk Foundation" className="h-8 opacity-40" />
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[
            { n: 1, label: "Crypto", key: "select" },
            { n: 2, label: "Details", key: "details" },
            { n: 3, label: "Wallet", key: "wallet" },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  step === s.key || (step === "details" && s.key === "select") || (step === "wallet" && (s.key === "select" || s.key === "details"))
                    ? "bg-white text-black"
                    : "border border-white/20 text-white/40"
                }`}>
                  {step === "wallet" && s.key !== "wallet" ? (
                    <Check className="w-4 h-4" />
                  ) : s.n}
                </div>
                <span className={`text-xs uppercase tracking-[0.1em] ${
                  step === s.key || (step === "details" && s.key === "select") || (step === "wallet" && (s.key === "select" || s.key === "details"))
                    ? "text-white" : "text-white/30"
                }`}>
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div className={`w-12 h-px mx-3 ${
                  (step === "details" && i === 0) || step === "wallet" ? "bg-white/60" : "bg-white/10"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Token + Amount ── */}
        {step === "select" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* Token grid */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-4">Select Cryptocurrency</p>
              <div className="grid grid-cols-4 gap-2">
                {cryptoTokens.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTokenSelect(t.id)}
                    className={`py-3 text-center border transition-all ${
                      selectedToken === t.id
                        ? "border-white bg-white/10 text-white"
                        : "border-white/10 text-white/50 hover:border-white/30"
                    }`}
                  >
                    <p className="text-xs font-semibold">{t.symbol}</p>
                    <p className="text-[9px] text-white/30 mt-0.5">{t.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-4">Amount (USD)</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`py-3 text-sm font-medium border transition-all ${
                      selectedAmount === amt && !customAmount
                        ? "border-white bg-white/10 text-white"
                        : "border-white/10 text-white/60 hover:border-white/30"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                placeholder="Custom amount"
                className="w-full py-3 px-4 bg-white/5 border border-white/10 text-white text-center text-lg placeholder:text-white/20 focus:outline-none focus:border-white/40"
              />
            </div>

            {/* Summary */}
            <div className="bg-white/5 border border-white/10 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: `${token.color}30`, color: token.color }}>
                  {token.symbol.slice(0, 1)}
                </div>
                <div>
                  <p className="text-xs text-white/40">{token.name} on {token.network}</p>
                  <p className="text-xl font-medium text-white">${displayAmount} USD</p>
                </div>
              </div>
              <button
                onClick={handleProceed}
                disabled={!displayAmount}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-40"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Details ── */}
        {step === "details" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Back */}
            <button onClick={handleBack} className="text-xs text-white/40 hover:text-white/70">
              &larr; Back
            </button>

            {/* Order summary */}
            <div className="bg-white/5 border border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: `${token.color}30`, color: token.color }}>
                  {token.symbol.slice(0, 1)}
                </div>
                <div>
                  <p className="text-xs text-white/40">{token.name} &bull; {token.network}</p>
                  <p className="text-lg font-medium text-white">${displayAmount} USD</p>
                </div>
              </div>
            </div>

            {/* Personal info */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.12em] text-white/40 block mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First"
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.12em] text-white/40 block mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last"
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.12em] text-white/40 block mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            {/* Changelly option */}
            <div className="border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Changelly Exchange</p>
                    <p className="text-[10px] text-white/30">Swap any token for {token.symbol} before paying</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChangelly(!showChangelly)}
                  className="text-[10px] text-white/40 hover:text-white/70 underline"
                >
                  {showChangelly ? "Hide" : "Show"}
                </button>
              </div>

              {showChangelly && (
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.1em]">Available swap pairs</p>
                  <div className="space-y-2">
                    {changellyPairs.map((pair) => (
                      <div key={`${pair.from}-${pair.to}`} className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-white">{pair.from}</span>
                          <span className="text-white/30">→</span>
                          <span className="text-xs font-medium text-white">{pair.to}</span>
                        </div>
                        <a
                          href={`https://changelly.com/exchange/${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-white/40 hover:text-white/70 flex items-center gap-1"
                        >
                          Swap on Changelly <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] text-white/20">
                    Powered by Changelly. Exchange rate and fees may vary. Third-party service.
                  </p>
                </div>
              )}
            </div>

            {/* Continue to wallet */}
            <button
              onClick={handleProceed}
              disabled={processing || !firstName || !email}
              className="w-full py-4 bg-white text-black text-sm font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-3 disabled:opacity-40"
            >
              {processing ? (
                <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  Continue to Wallet
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1 text-white/20 text-[10px]">
              <Shield className="w-3 h-3" />
              256-bit SSL Encrypted &bull; Tax ID: 47-0000000
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Wallet Address ── */}
        {step === "wallet" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Back */}
            <button onClick={handleBack} className="text-xs text-white/40 hover:text-white/70">
              &larr; Back
            </button>

            {/* Order summary */}
            <div className="bg-white/5 border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: `${token.color}30`, color: token.color }}>
                    {token.symbol.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{token.name} &bull; {token.network}</p>
                    <p className="text-lg font-semibold text-white">${displayAmount} USD</p>
                  </div>
                </div>
                <p className="text-xs text-white/40">Endowment</p>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/30 mb-3">
                <AlertCircle className="w-3.5 h-3.5" />
                Send exactly this amount of {token.symbol} to the address below
              </div>
            </div>

            {/* Wallet address */}
            <div className="border-2 border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: `${token.color}30`, color: token.color }}>
                    {token.symbol.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{token.name}</p>
                    <p className="text-[10px] text-white/40">{token.network} Network</p>
                  </div>
                </div>
                <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 uppercase tracking-[0.1em]">
                  Active
                </span>
              </div>

              <div className="bg-white/5 p-4 mb-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">Wallet Address</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs font-mono text-white/80 break-all leading-relaxed">
                    {wallet.address}
                  </code>
                  <button
                    onClick={() => copyToClipboard(wallet.address, setCopied, "addr")}
                    className="p-3 border border-white/10 hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    {copied === "addr" ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/40" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-white/30">
                <Clock className="w-3 h-3" />
                Deposits confirmed after 1 network confirmation
              </div>
            </div>

            {/* Security notice */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Lock, title: "Irreversible", desc: "Cannot be chargebacked or reversed by any authority" },
                { icon: Globe, title: "Global", desc: "Send from any wallet worldwide, any exchange, or DeFi platform" },
                { icon: Shield, title: "Verified", desc: "On-chain confirmation tracked immediately after 1 block" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-white/10">
                  <item.icon className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">{item.title}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Confirm sent */}
            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-4 bg-white text-black text-sm font-semibold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors"
            >
              I&apos;ve Sent the Payment
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-white/20">
              <a
                href={`https://blockchain.com/btc/tx/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white/40"
              >
                <ExternalLink className="w-3 h-3" /> Verify on Blockchain
              </a>
              <span>&bull;</span>
              <span>All rights reserved &bull; Musk Foundation 2026</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}