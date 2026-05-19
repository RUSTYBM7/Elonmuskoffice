import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, CreditCard, Shield, Zap, ArrowRight } from "lucide-react";

const amounts = [
  { value: 25, label: "$25", description: "Fund one student robotics kit" },
  { value: 50, label: "$50", description: "Support clean energy research" },
  { value: 100, label: "$100", description: "Sponsor AI safety research" },
  { value: 250, label: "$250", description: "Contribute to pediatric health" },
  { value: 500, label: "$500", description: "STEM education program" },
  { value: 1000, label: "$1,000", description: "Mars colony research" },
];

export default function DonationForm() {
  const [selected, setSelected] = useState(100);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground">Thank You for Your Support</h2>
            <p className="text-foreground/70">Your contribution to the Office of Elon Musk has been received. We are deeply grateful for your support in advancing our mission to accelerate sustainable energy and expand humanity beyond Earth.</p>
            <p className="text-sm text-muted-foreground">A confirmation has been sent to your email. Together, we are building the future.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 px-6 bg-muted/20 border-y border-border" id="donate">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Support</p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
            Support the Mission
          </h2>
          <p className="mt-4 text-sm text-foreground/70 max-w-lg mx-auto">
            Your contribution directly funds the ventures and initiatives shaping humanity&apos;s future — from renewable energy to space exploration to AI safety.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-background border border-border">
          {/* Step indicator */}
          <div className="flex border-b border-border">
            {["1. Amount", "2. Details", "3. Payment"].map((label, i) => (
              <div key={i} className={`flex-1 py-4 text-center text-xs uppercase tracking-[0.15em] ${step > i + 1 ? "text-green-500" : step === i + 1 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                {label}
              </div>
            ))}
          </div>

          <div className="p-8 md:p-12 space-y-8">
            {/* Frequency toggle */}
            <div className="flex gap-4 justify-center">
              {[
                { key: "once", label: "One-time" },
                { key: "monthly", label: "Monthly" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setFrequency(opt.key as typeof frequency)}
                  className={`px-6 py-2.5 text-sm font-medium transition-colors ${frequency === opt.key ? "bg-foreground text-background" : "border border-border text-foreground/70 hover:bg-muted"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Amount grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amounts.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => { setSelected(a.value); setCustom(""); }}
                  className={`p-4 border text-left transition-all ${selected === a.value && !custom ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/50"}`}
                >
                  <p className="text-xl font-semibold text-foreground">{a.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Custom Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50">$</span>
                <input
                  type="number"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 bg-muted border border-border focus:border-foreground focus:outline-none text-foreground"
                />
              </div>
            </div>

            {/* Step 2: Personal details */}
            {step >= 2 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-muted border border-border focus:border-foreground focus:outline-none" placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-muted border border-border focus:border-foreground focus:outline-none" placeholder="Your last name" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 bg-muted border border-border focus:border-foreground focus:outline-none" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Dedication (Optional)</label>
                  <input type="text" className="w-full px-4 py-3 bg-muted border border-border focus:border-foreground focus:outline-none" placeholder="In honor of..." />
                </div>
              </motion.div>
            )}

            {/* Summary */}
            <div className="flex items-center justify-between p-4 bg-muted/50 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-foreground/10 rounded-sm flex items-center justify-center"><Zap className="w-5 h-5 text-foreground" /></div>
                <div>
                  <p className="text-sm font-medium text-foreground">${custom || selected}{frequency === "monthly" ? "/mo" : ""}</p>
                  <p className="text-xs text-muted-foreground">{frequency === "monthly" ? "Monthly recurring" : "One-time gift"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" /> Secure
                </div>
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                  {step === 1 ? "Continue" : "Donate Now"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}