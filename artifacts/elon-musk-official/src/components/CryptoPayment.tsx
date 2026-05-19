import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bitcoin,
  Wallet,
  Shield,
  CheckCircle2,
  Copy,
  X,
  ExternalLink,
  Clock,
  Zap,
  Lock,
  Globe,
  Info,
  ChevronRight,
  CreditCard,
  ArrowRightLeft,
  Loader2,
} from "lucide-react";

const currencies = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC", color: "#F7931A", decimals: 8 },
  { id: "ETH", name: "Ethereum", symbol: "ETH", color: "#627EEA", decimals: 18 },
  { id: "USDT", name: "Tether", symbol: "USDT", color: "#26A17B", decimals: 6, isStablecoin: true },
  { id: "USDC", name: "USD Coin", symbol: "USDC", color: "#2775CA", decimals: 6, isStablecoin: true },
  { id: "DOGE", name: "Dogecoin", symbol: "DOGE", color: "#C3A000", decimals: 8 },
  { id: "CRO", name: "Crypto.com Coin", symbol: "CRO", color: "#002D74", decimals: 8 },
  { id: "SOL", name: "Solana", symbol: "SOL", color: "#9945FF", decimals: 9 },
  { id: "XRP", name: "Ripple", symbol: "XRP", color: "#23292F", decimals: 6 },
];

const amounts = ["$25", "$50", "$100", "$250", "$500", "$1,000", "$2,500", "$5,000"];

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {});
}

export default function CryptoPayment() {
  const [selected, setSelected] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [sdkMode, setSdkMode] = useState<"inline" | "redirect">("inline");
  const [showAddresses, setShowAddresses] = useState(false);
  const [copied, setCopied] = useState("");
  const [processing, setProcessing] = useState(false);
  const [txHash, setTxHash] = useState("");

  const currency = currencies.find((c) => c.id === selected) || currencies[0];

  const selectedAmount = customAmount || amount;

  const handleCurrencySelect = (id: string) => {
    setSelected(id);
  };

  const handleAmountSelect = (a: string) => {
    setAmount(a);
    setCustomAmount("");
  };

  const handleProceed = () => {
    if (!selectedAmount) return;
    setShowModal(true);
    setStep(1);
  };

  const handleOpenCryptoSDK = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      if (sdkMode === "inline") {
        setStep(2);
      } else {
        setStep(3);
        setShowAddresses(true);
      }
    }, 2500);
  };

  const generateMockTxHash = () => {
    const chars = "0123456789abcdef";
    let hash = "";
    for (let i = 0; i < 64; i++) hash += chars[Math.floor(Math.random() * chars.length)];
    return hash;
  };

  const handleConfirmPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setTxHash(generateMockTxHash());
      setStep(4);
    }, 3000);
  };

  const walletAddresses: Record<string, { label: string; address: string; network: string }> = {
    BTC: { label: "Bitcoin (BTC)", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin" },
    ETH: { label: "Ethereum (ERC-20)", address: "0x4d8B4C3aA93a5C2e0B7d6F8c4E3F2b9A1D5C6E7f", network: "Ethereum" },
    USDT: { label: "Tether (TRC20)", address: "TXJLR8ZBRLCG4WB4GZLKJGBJ4QKVKGB6G8", network: "TRON" },
    USDC: { label: "USD Coin (ERC-20)", address: "0xA7B9C3D0E4F5G6H7I8J9K0L1M2N3O4P5Q6R", network: "Ethereum" },
    DOGE: { label: "Dogecoin (DOGE)", address: "DJLpVNsS8R8p8g5b8aL4oZxYq3pLqX9mK", network: "Dogecoin" },
    CRO: { label: "Crypto.com Coin (CRO)", address: "0xB8C7D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S", network: "Cronos" },
    SOL: { label: "Solana (SOL)", address: "7nX5Y9L2mK8pR3tU4vW5xY6zA7bC8dE9fG0h", network: "Solana" },
    XRP: { label: "Ripple (XRP)", address: "rN7n3473SaZBCYYd9T5K6t2f1G4jK1L2M", network: "XRP Ledger" },
  };

  const activeWallet = walletAddresses[selected] || walletAddresses["BTC"];

  return (
    <>
      <section className="py-20 md:py-28 px-6 bg-background border-t border-border" id="crypto">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-500 text-xs uppercase tracking-[0.15em] font-medium mb-6">
              <Zap className="w-3.5 h-3.5" /> Crypto.com Secured
            </div>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
              Crypto Endowment
            </h2>
            <p className="mt-4 text-sm text-foreground/70 max-w-lg mx-auto">
              Contribute to the Musk Foundation via cryptocurrency through Crypto.com.
              Secure, fast, and fully on-chain. Select your preferred token below.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center mb-12">
            {["Select", "Amount", "Pay", "Done"].map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-xs font-semibold transition-colors ${
                      step >= i
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-border text-muted-foreground bg-muted"
                    }`}
                  >
                    {step > i ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <p className={`text-[9px] uppercase tracking-[0.08em] mt-1.5 ${step >= i ? "text-foreground" : "text-muted-foreground"}`}>
                    {s}
                  </p>
                </div>
                {i < 3 && <div className={`w-12 md:w-20 h-px mx-2 mb-5 ${step > i ? "bg-green-500" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          {/* Currency selector */}
          <div className="bg-muted/30 border border-border mb-6">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Select Cryptocurrency
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Rates
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-border">
              {currencies.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCurrencySelect(c.id)}
                  className={`p-4 text-center transition-all ${
                    selected === c.id
                      ? "bg-foreground text-background"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    selected === c.id ? "bg-white/20" : "bg-background border border-border"
                  }`}>
                    <span className={`text-base font-bold ${selected === c.id ? "text-white" : ""}`}
                      style={{ color: selected === c.id ? undefined : c.color }}>
                      {c.symbol.slice(0, 1)}
                    </span>
                  </div>
                  <p className={`text-xs font-semibold ${selected === c.id ? "" : "text-foreground"}`}>{c.symbol}</p>
                  <p className={`text-[10px] mt-0.5 ${selected === c.id ? "text-white/70" : "text-muted-foreground"}`}>
                    {c.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Amount selector */}
          <div className="bg-muted/30 border border-border mb-8 p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Select Amount
            </p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-4">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => handleAmountSelect(a)}
                  className={`py-2.5 text-xs font-medium border transition-colors ${
                    amount === a
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Custom:</span>
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-foreground/50">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
                  placeholder="Enter amount"
                  className="w-full h-11 pl-8 bg-background border border-border px-4 text-sm focus:outline-none focus:border-foreground"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          {selectedAmount && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-foreground/5 border border-border p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Payment Summary
                </p>
                <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 uppercase tracking-[0.1em]">
                  Crypto.com Pay
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{ background: `${currency.color}20`, color: currency.color }}>
                    {currency.symbol.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{selectedAmount} USD</p>
                    <p className="text-xs text-muted-foreground">{currency.name} ({currency.symbol})</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{currency.symbol}</p>
                  <p className="text-xs text-muted-foreground">~{(parseFloat(selectedAmount) / 100).toFixed(4)}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pay button */}
          <button
            onClick={handleProceed}
            disabled={!selectedAmount}
            className="w-full py-4 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <CreditCard className="w-4 h-4" />
            Pay with Crypto.com
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Shield className="w-3.5 h-3.5" />
              SOC2 Certified
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              256-bit Encryption
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Globe className="w-3.5 h-3.5" />
              250+ Countries
            </div>
          </div>
        </div>
      </section>

      {/* Crypto.com SDK Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowModal(false); setStep(0); }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-lg bg-background border border-border shadow-2xl flex flex-col overflow-hidden"
                style={{ maxHeight: "calc(100dvh - 48px)" }}>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-foreground">
                  <div className="flex items-center gap-3">
                    <div className="bg-white text-black px-2 py-1 text-[10px] font-black tracking-widest rounded">
                      PAY
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Crypto.com Pay</p>
                      <p className="text-[10px] text-white/50">Secure Payment Gateway</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setShowModal(false); setStep(0); }}
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Step 1: Choose SDK mode */}
                {step === 1 && (
                  <div className="p-6 space-y-4 overflow-y-auto">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ArrowRightLeft className="w-7 h-7 text-foreground" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">Choose Payment Method</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Select how you want to complete your {selectedAmount} USD {currency.symbol} payment
                      </p>
                    </div>

                    {/* Inline SDK */}
                    <button
                      onClick={() => { setSdkMode("inline"); handleOpenCryptoSDK(); }}
                      className="w-full p-5 border-2 border-border hover:border-foreground transition-colors text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-foreground">Crypto.com Inline SDK</p>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Embedded checkout — pay directly on this page. Supports 250+ tokens,
                            card, and bank transfer.
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-[9px] bg-muted px-2 py-0.5 uppercase tracking-[0.08em]">Fast</span>
                            <span className="text-[9px] bg-muted px-2 py-0.5 uppercase tracking-[0.08em]">Secure</span>
                            <span className="text-[9px] bg-muted px-2 py-0.5 uppercase tracking-[0.08em]">No Redirect</span>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Redirect SDK */}
                    <button
                      onClick={() => { setSdkMode("redirect"); handleOpenCryptoSDK(); }}
                      className="w-full p-5 border-2 border-border hover:border-foreground transition-colors text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ExternalLink className="w-6 h-6 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-foreground">Crypto.com Redirect SDK</p>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Opens the Crypto.com app or checkout page. Supports all wallets,
                            card payments, and bank transfers.
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-[9px] bg-muted px-2 py-0.5 uppercase tracking-[0.08em]">Universal</span>
                            <span className="text-[9px] bg-muted px-2 py-0.5 uppercase tracking-[0.08em]">Mobile Ready</span>
                            <span className="text-[9px] bg-muted px-2 py-0.5 uppercase tracking-[0.08em]">All Devices</span>
                          </div>
                        </div>
                      </div>
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Secured by Crypto.com
                      </div>
                      <span>&bull;</span>
                      <span>PCI DSS Compliant</span>
                    </div>
                  </div>
                )}

                {/* Step 2: Inline SDK payment form */}
                {step === 2 && (
                  <div className="p-6 space-y-4 overflow-y-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <button onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:text-foreground">
                        &larr; Back
                      </button>
                      <p className="text-xs text-muted-foreground">Crypto.com Inline SDK</p>
                    </div>

                    {/* Order summary */}
                    <div className="bg-muted/50 border border-border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Order</span>
                        <span className="text-xs text-foreground">Musk Foundation Endowment</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Amount</span>
                        <span className="text-sm font-semibold text-foreground">{selectedAmount} USD</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Token</span>
                        <span className="text-xs font-semibold text-foreground">{currency.name} ({currency.symbol})</span>
                      </div>
                    </div>

                    {/* Token balance (mock) */}
                    <div className="bg-foreground/5 border border-border p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Your {currency.symbol} balance</p>
                        <p className="text-base font-semibold text-foreground">
                          {currency.isStablecoin ? `${(Math.random() * 5000).toFixed(2)} ${currency.symbol}` : `${(Math.random() * 2).toFixed(6)} ${currency.symbol}`}
                        </p>
                      </div>
                      <button className="text-[10px] text-muted-foreground underline">Top up</button>
                    </div>

                    {/* Payment methods */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-[0.1em]">Payment Method</p>

                      <button className="w-full p-4 border-2 border-green-500 bg-green-500/5 flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                          <span className="text-[8px] font-black text-black">PAY</span>
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-semibold text-foreground">Crypto.com Pay</p>
                          <p className="text-xs text-muted-foreground">Pay with Crypto.com app or wallet</p>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500" />
                      </button>

                      <button className="w-full p-4 border border-border flex items-center gap-4 opacity-50 cursor-not-allowed">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1 text-left">
                          <p className="text-sm text-muted-foreground">Credit / Debit Card</p>
                          <p className="text-[10px] text-muted-foreground">Visa, Mastercard, Amex</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground">Coming soon</span>
                      </button>
                    </div>

                    <button
                      onClick={handleConfirmPayment}
                      disabled={processing}
                      className="w-full py-4 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4" />
                          Pay {selectedAmount} USD
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                      <Lock className="w-3 h-3" />
                      Protected by Crypto.com security infrastructure
                    </div>
                  </div>
                )}

                {/* Step 3: Redirect SDK */}
                {step === 3 && (
                  <div className="p-6 space-y-4 overflow-y-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <button onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:text-foreground">
                        &larr; Back
                      </button>
                      <p className="text-xs text-muted-foreground">Crypto.com Redirect SDK</p>
                    </div>

                    <div className="bg-muted/50 border border-border p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Order</span>
                        <span className="text-xs text-foreground">Musk Foundation Endowment</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Total</span>
                        <span className="text-sm font-semibold text-foreground">{selectedAmount} USD</span>
                      </div>
                    </div>

                    <div className="bg-foreground/5 border border-border p-6 text-center">
                      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                          <circle cx="24" cy="24" r="20" fill="#26A17B" opacity="0.2"/>
                          <circle cx="24" cy="24" r="20" stroke="#26A17B" strokeWidth="2"/>
                          <path d="M24 12v12l8 4" stroke="#26A17B" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-foreground mb-1">Redirecting to Crypto.com</p>
                      <p className="text-xs text-muted-foreground">
                        Complete payment via Crypto.com app, web wallet, or card
                      </p>
                    </div>

                    {/* Wallet address reveal */}
                    <div className="bg-foreground/5 border border-border p-4">
                      <p className="text-xs text-muted-foreground mb-2">Or pay directly to wallet address</p>
                      <div className="flex items-center gap-2 mb-3">
                        <code className="flex-1 text-xs font-mono text-foreground bg-background p-2 border break-all">
                          {activeWallet.address}
                        </code>
                        <button
                          onClick={() => {
                            copyToClipboard(activeWallet.address);
                            setCopied("addr");
                            setTimeout(() => setCopied(""), 2000);
                          }}
                          className="p-2 border border-border hover:bg-muted transition-colors flex-shrink-0"
                        >
                          {copied === "addr" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>Network: {activeWallet.network}</span>
                        <span>&bull;</span>
                        <Clock className="w-3 h-3" />
                        <span>1 confirmation</span>
                      </div>
                    </div>

                    <button
                      onClick={handleConfirmPayment}
                      disabled={processing}
                      className="w-full py-4 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4" />
                          Open Crypto.com Pay
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <div className="p-6 space-y-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </motion.div>

                    <div>
                      <p className="text-xl font-semibold text-foreground tracking-tight">
                        Payment Initiated
                      </p>
                      <p className="text-sm text-foreground/60 mt-2">
                        {selectedAmount} USD ({currency.symbol}) sent via Crypto.com Pay.
                        Your endowment is being processed on-chain.
                      </p>
                    </div>

                    {txHash && (
                      <div className="bg-muted/50 border border-border p-4 text-left">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                          Transaction Hash
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-xs font-mono text-foreground break-all">{txHash}</code>
                          <button
                            onClick={() => {
                              copyToClipboard(txHash);
                              setCopied("tx");
                              setTimeout(() => setCopied(""), 2000);
                            }}
                            className="p-2 border border-border hover:bg-muted transition-colors flex-shrink-0"
                          >
                            {copied === "tx" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <a
                          href={`https://blockchain.com/btc/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground mt-2"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Verify on {activeWallet.network} Explorer
                        </a>
                      </div>
                    )}

                    <button
                      onClick={() => { setShowModal(false); setStep(0); setShowAddresses(false); }}
                      className="w-full py-3 border border-border text-sm hover:bg-muted transition-colors"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Show wallet addresses below if payment initiated */}
      {showAddresses && step < 4 && (
        <div className="bg-muted/30 border border-border p-8 mt-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-4 h-4 text-green-500" />
            <p className="text-sm font-semibold text-foreground">Direct Wallet Address</p>
          </div>
          <div className="bg-background border border-border p-4 mb-4">
            <p className="text-xs text-muted-foreground mb-2">{activeWallet.label}</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs font-mono text-foreground break-all">{activeWallet.address}</code>
              <button
                onClick={() => {
                  copyToClipboard(activeWallet.address);
                  setCopied("wallet");
                  setTimeout(() => setCopied(""), 2000);
                }}
                className="p-2 border border-border hover:bg-muted"
              >
                {copied === "wallet" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Lock, title: "Irreversible", desc: "Cannot be chargebacked or reversed" },
              { icon: Globe, title: "Global", desc: "Send from any wallet worldwide" },
              { icon: Shield, title: "Verified", desc: "On-chain confirmation after 1 block" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <item.icon className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-foreground">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}