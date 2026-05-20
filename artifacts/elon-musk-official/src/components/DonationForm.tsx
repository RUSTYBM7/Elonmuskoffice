import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Check, ArrowRight, Heart } from "lucide-react";
import teslaLogo from "@/assets/tesla-logo.svg";

const causes = [
  { id: "stem", label: "STEM Education", icon: "EDU", desc: "Robotics kits, scholarships, teacher training" },
  { id: "energy", label: "Renewable Energy", icon: "SOLAR", desc: "Solar research, battery innovation, grid resilience" },
  { id: "ai", label: "AI Safety", icon: "AI", desc: "Alignment research, safe AI development, policy" },
  { id: "mars", label: "Mars Colony", icon: "MARS", desc: "Interplanetary life support, Starship research" },
];

const presetAmounts = [25, 50, 100, 250, 500, 1000];

export default function DonationForm() {
  const [step, setStep] = useState(1);
  const [selectedCause, setSelectedCause] = useState("stem");
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const displayAmount = customAmount || String(selectedAmount);

  const handleNext = () => { setStep(2); };
  const handleBack = () => { setStep(1); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2500));
    setProcessing(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-lg text-center space-y-8">
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
              Thank You, {firstName}
            </h2>
            <p className="text-white/50 leading-relaxed">
              Your {isMonthly ? "monthly" : "one-time"} contribution of ${displayAmount} USD
              to {causes.find((c) => c.id === selectedCause)?.label} has been received.
              A receipt has been sent to {email}.
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
      <div className="max-w-2xl mx-auto">
        {/* Tesla logo */}
        <div className="flex justify-center mb-10">
          <img src={teslaLogo} alt="Musk Foundation" className="h-8 opacity-40" />
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-14">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step >= s ? "bg-white text-black" : "border border-white/20 text-white/40"
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`text-xs uppercase tracking-[0.1em] ${step >= s ? "text-white" : "text-white/30"}`}>
                {s === 1 ? "Donate" : "Payment"}
              </span>
              {s < 2 && <div className={`w-16 h-px ${step > s ? "bg-white/60" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              {/* Cause selection */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-4">Select a Fund</p>
                <div className="grid grid-cols-2 gap-3">
                  {causes.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCause(c.id)}
                      className={`p-4 border text-left transition-all ${
                        selectedCause === c.id
                          ? "border-white bg-white/5"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <p className="text-[10px] text-white/40 mb-1">{c.icon}</p>
                      <p className="text-sm font-medium text-white">{c.label}</p>
                      <p className="text-[10px] text-white/30 mt-1">{c.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount selection */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-4">Choose Amount</p>
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
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
                <div className="mt-4">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                    placeholder="Custom amount (USD)"
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 text-white text-center text-lg placeholder:text-white/20 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              {/* Frequency toggle */}
              <div className="flex gap-0">
                <button
                  type="button"
                  onClick={() => setIsMonthly(false)}
                  className={`flex-1 py-3 text-xs uppercase tracking-[0.1em] transition-colors ${
                    !isMonthly ? "bg-white text-black" : "border border-white/10 text-white/50"
                  }`}
                >
                  One-Time
                </button>
                <button
                  type="button"
                  onClick={() => setIsMonthly(true)}
                  className={`flex-1 py-3 text-xs uppercase tracking-[0.1em] transition-colors ${
                    isMonthly ? "bg-white text-black" : "border border-white/10 text-white/50"
                  }`}
                >
                  Monthly
                </button>
              </div>

              {/* Summary */}
              <div className="bg-white/5 border border-white/10 p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/40 mb-1">
                    {causes.find((c) => c.id === selectedCause)?.label} &bull; {isMonthly ? "Monthly" : "One-time"}
                  </p>
                  <p className="text-2xl font-medium text-white">${displayAmount} USD</p>
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {/* Summary bar */}
              <div className="bg-white/5 border border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-white/40" />
                  <div>
                    <p className="text-xs text-white/40">{causes.find((c) => c.id === selectedCause)?.label}</p>
                    <p className="text-sm font-medium text-white">${displayAmount} USD {isMonthly ? "/month" : ""}</p>
                  </div>
                </div>
                <button type="button" onClick={handleBack} className="text-xs text-white/40 hover:text-white/70 underline">
                  Edit
                </button>
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

              {/* Payment placeholder */}
              <div className="border border-white/10 p-4 text-center">
                <p className="text-xs text-white/30">Payment processing via Crypto.com Pay</p>
                <p className="text-[10px] text-white/20 mt-1">Card and crypto options available at checkout</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full py-4 bg-white text-black text-sm font-semibold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {processing ? (
                  <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    Donate ${displayAmount} USD
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1 text-white/20 text-[10px]">
                <Shield className="w-3 h-3" />
                256-bit SSL Encrypted &bull; Tax ID: 47-0000000
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
}