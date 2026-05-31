import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";

const STORAGE_KEY = "ind_newsletter_subscribed";

export default function IndependentNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSubscribed(true);
    } catch {}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const existing = JSON.parse(
        localStorage.getItem("ind_subscribers") || "[]"
      ) as string[];
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem("ind_subscribers", JSON.stringify(existing));
      }
      localStorage.setItem(STORAGE_KEY, "1");
      setSubscribed(true);
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-[#0d0d0d] text-white overflow-hidden relative">
      {/* Independent branding stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-2xl mx-auto">
        {/* Independent masthead */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          {/* Independent logotype */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-6 h-px bg-white/40" />
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/50 font-light">
              Independent
            </p>
            <div className="w-6 h-px bg-white/40" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
            The briefing.
          </h2>
          <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-sm mx-auto">
            No noise. No hype. Just the facts that matter — delivered
            when something actually happens. Operated entirely independently.
          </p>
        </motion.div>

        {/* Subscribe form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center py-6"
            >
              <CheckCircle className="w-8 h-8 text-white/70 mb-4" />
              <p className="text-base font-light text-white/80">
                You are subscribed.
              </p>
              <p className="mt-2 text-sm text-white/40 max-w-xs">
                The Independent briefing will land in your inbox when there is something worth reporting.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="flex-1 h-12 px-5 bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 h-12 px-6 bg-white text-black hover:bg-white/90 disabled:opacity-40 text-xs uppercase tracking-[0.14em] font-medium flex items-center gap-2 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-400 text-center">{error}</p>
              )}
              <p className="text-[10px] text-white/30 text-center tracking-wide">
                No spam. No tracking. Unsubscribe anytime. Operated independently.
              </p>
            </form>
          )}
        </motion.div>

        {/* Issue count ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 pt-8 border-t border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Est. 2024
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              ·
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Independent Coverage
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-white/20">
            Tesla &middot; SpaceX &middot; xAI &middot; Neuralink &middot; 𝕏
          </span>
        </motion.div>
      </div>

      {/* Ambient gradient accent */}
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
