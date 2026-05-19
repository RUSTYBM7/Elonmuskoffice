import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bitcoin,
  Wallet,
  Shield,
  ArrowDownCircle,
  CheckCircle2,
  Copy,
  RefreshCw,
  ChevronDown,
  ExternalLink,
  Clock,
  Zap,
  TrendingUp,
  Lock,
  Globe,
  Info,
} from "lucide-react";

const currencies = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC", color: "#F7931A", icon: Bitcoin, decimals: 8 },
  { id: "USDT", name: "Tether", symbol: "USDT", color: "#26A17B", decimals: 6, isStablecoin: true },
  { id: "DOGE", name: "Dogecoin", symbol: "DOGE", color: "#C3A000", decimals: 8 },
  { id: "USDC", name: "USD Coin", symbol: "USDC", color: "#2775CA", decimals: 6, isStablecoin: true },
];

const STATUS_STEPS = [
  { label: "Select Currency", icon: Bitcoin },
  { label: "Generate Address", icon: Wallet },
  { label: "Send Payment", icon: ArrowDownCircle },
  { label: "Confirmed", icon: CheckCircle2 },
];

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {});
}

export default function CryptoPayment() {
  const [selected, setSelected] = useState("BTC");
  const [step, setStep] = useState(0);
  const [showAddresses, setShowAddresses] = useState(false);
  const [copied, setCopied] = useState("");

  const currency = currencies.find((c) => c.id === selected) || currencies[0];
  const IconComponent = currency.icon;

  const handleSelect = (id: string) => {
    setSelected(id);
    setStep(1);
  };

  const handleConfirm = () => {
    setStep(2);
    setShowAddresses(true);
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-background border-t border-border" id="crypto">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-500 text-xs uppercase tracking-[0.15em] font-medium mb-6">
            <Zap className="w-3.5 h-3.5" /> Blockchain Secured
          </div>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
            Crypto Endowment
          </h2>
          <p className="mt-4 text-sm text-foreground/70 max-w-lg mx-auto">
            Contribute to the Musk Foundation via cryptocurrency. Secure, anonymous, irreversible.
            Select your preferred blockchain network below.
          </p>
        </div>

        <div className="flex items-center justify-center mb-12">
          {STATUS_STEPS.map((s, i) => {
            const SIcon = s.icon;
            return (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      step >= i
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-border text-muted-foreground bg-muted"
                    }`}
                  >
                    <SIcon className="w-4.5 h-4.5" />
                  </div>
                  <p
                    className={`text-[10px] uppercase tracking-[0.1em] mt-2 ${
                      step >= i ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </p>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div
                    className={`w-16 md:w-24 h-px mx-2 mb-6 ${
                      step > i ? "bg-green-500" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-muted/30 border border-border mb-8">
          <div className="p-4 border-b border-border">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Select Cryptocurrency
            </p>
          </div>
          <div className="divide-y divide-border">
            {currencies.map((c) => {
              const CIcon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelect(c.id)}
                  className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${
                    selected === c.id ? "bg-foreground/5" : "hover:bg-muted"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: `${c.color}20`, color: c.color }}
                  >
                    <CIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-foreground">{c.name}</p>
                      {c.isStablecoin && (
                        <span className="text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 bg-green-500/10 text-green-500">
                          Stable
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {c.symbol} &bull; {c.decimals} decimals
                    </p>
                  </div>
                  {selected === c.id && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-muted/30 border border-border p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: `${currency.color}20`, color: currency.color }}
            >
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Selected Currency
              </p>
              <p className="text-xl font-semibold text-foreground">
                {currency.name} ({currency.symbol})
              </p>
            </div>
          </div>

          <div className="p-4 bg-foreground/5 border border-border mb-6">
            <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-2">
              Network Fee
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/70">Estimated fee per transaction</p>
              <p className="text-sm font-medium text-foreground">~$0.50 &ndash; $5.00</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {["$25", "$50", "$100", "$250", "$500", "$1,000"].map((amount) => (
              <button
                key={amount}
                className="py-3 border border-border text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                {amount}
              </button>
            ))}
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-4 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors"
          >
            Proceed to Payment
          </button>
        </div>

        {showAddresses && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-foreground/5 border-2 border-green-500/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Send exactly to this address
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Copy and paste &mdash; never share this address
                  </p>
                </div>
              </div>

              {[
                {
                  symbol: "BTC",
                  label: "Bitcoin (BTC)",
                  address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
                  network: "Bitcoin",
                },
                {
                  symbol: "USDT",
                  label: "Tether (TRC20)",
                  address: "TXJLR8ZBRLCG4WB4GZLKJGBJ4QKVKGB6G8",
                  network: "TRON",
                },
                {
                  symbol: "DOGE",
                  label: "Dogecoin (DOGE)",
                  address: "DJLpVNsS8R8p8g5b8aL4oZxYq3pLqX9mK",
                  network: "Dogecoin",
                },
                {
                  symbol: "USDC",
                  label: "USD Coin (TRC20)",
                  address: "TXbmantLRG5VJYQK9q5YJdVFKJL4Y5G6G9",
                  network: "TRON",
                },
              ].map((w) => {
                const isActive = selected === w.symbol;
                return (
                  <div
                    key={w.symbol}
                    className={`p-5 border transition-colors ${
                      isActive ? "border-green-500 bg-green-500/5" : "border-border opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{w.label}</p>
                        <span className="text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 bg-muted">
                          {w.network}
                        </span>
                      </div>
                      {isActive && (
                        <span className="text-xs text-green-500 uppercase tracking-[0.1em]">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <code className="flex-1 text-xs font-mono text-foreground/80 bg-background p-3 break-all border">
                        {w.address}
                      </code>
                      <button
                        onClick={() => {
                          copyToClipboard(w.address);
                          setCopied(w.symbol);
                          setTimeout(() => setCopied(""), 2000);
                        }}
                        className="p-3 border border-border hover:bg-muted transition-colors"
                      >
                        {copied === w.symbol ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Deposits confirmed after 1 network
                      confirmation
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-muted/30 border border-border p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-green-500" />
                <p className="text-sm font-medium text-foreground">Secure Blockchain Transfer</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-foreground/70">
                    Irreversible once confirmed. Cannot be chargebacked or reversed by any
                    authority.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-foreground/70">
                    Cross-border enabled. Send from any wallet worldwide, any exchange, or any
                    DeFi platform.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-foreground/70">
                    Real-time blockchain verification. Your transaction is tracked on-chain
                    immediately.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-foreground/70">
                    All endowments are processed through the Musk Foundation blockchain endowment
                    protocol.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <a
                href="https://blockchain.info"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
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