'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";

const STORAGE_KEY = "emo_newsletter_subscribed";

const upcoming2026 = [
  { tag: "Q1 2026", title: "Tesla Cybertruck production milestone", company: "Tesla" },
  { tag: "Q1 2026", title: "Starship orbital refueling demonstration", company: "SpaceX" },
  { tag: "Q2 2026", title: "Neuralink expanded human trial cohort", company: "Neuralink" },
  { tag: "Q2 2026", title: "x Payments global rollout", company: "x" },
  { tag: "Q3 2026", title: "Tesla Robotaxi network expansion", company: "Tesla" },
  { tag: "Q3 2026", title: "Grok 4 multimodal release", company: "xAI" },
  { tag: "Q4 2026", title: "Mars cargo mission readiness review", company: "SpaceX" },
  { tag: "Q4 2026", title: "Optimus production scale-up", company: "Tesla" },
  { tag: "2026", title: "Starlink direct-to-cell global coverage", company: "Starlink" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSubscribed(true);
    } catch {
    }
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      if (pausedRef.current) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      if (el.scrollLeft >= max - 1) {
        el.scrollTo({ left: 0, behavior: "auto" });
      } else {
        el.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 25);

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onEnter, { passive: true });
    el.addEventListener("touchend", onLeave, { passive: true });

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onEnter);
      el.removeEventListener("touchend", onLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          confirmSubscription: false
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      localStorage.setItem(STORAGE_KEY, "1");
      setSubscribed(true);
      setSuccessMessage(data.message || "Successfully subscribed! Check your inbox.");

    } catch (err) {
      console.error('Subscription error:', err);
      setError(err instanceof Error ? err.message : "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-secondary border-t border-border overflow-hidden">
      <div className="px-6 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Independent branding */}
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Newsletter &middot; Independent
          </p>

          {/* Editorial-style Independent title */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-8 bg-foreground/20" />
            <span className="text-xs text-foreground/40 uppercase tracking-widest">Est. 2024</span>
            <div className="h-px w-8 bg-foreground/20" />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif italic tracking-tight text-foreground" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <em>Independent</em>
          </h2>

          <p className="mt-3 text-sm text-foreground/60 italic" style={{ fontFamily: 'Georgia, serif' }}>
            Stay informed. Think critically. Decide for yourself.
          </p>

          <p className="mt-6 text-sm md:text-base text-foreground/70 leading-relaxed max-w-md mx-auto">
            Unfiltered briefings on Tesla, SpaceX, Neuralink, xAI, and x —
            no spin, no agenda. Straight to your inbox.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-10 flex flex-col items-center gap-3 py-6"
            >
              <CheckCircle className="w-8 h-8 text-foreground" />
              <p className="text-base font-medium tracking-tight text-foreground">
                You're subscribed to <em>Independent</em>
              </p>
              <p className="text-sm text-foreground/60">
                Expect unfiltered dispatches — not press releases.
              </p>
              {successMessage && (
                <p className="text-sm text-foreground/50 mt-2">{successMessage}</p>
              )}
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-3 max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-12 px-4 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors rounded-none"
              />
              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full h-12 px-4 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors rounded-none"
                  required
                  disabled={loading}
                />
                {error && (
                  <p className="text-xs text-left text-red-500">{error}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60 uppercase tracking-[0.14em] text-xs font-medium transition-colors rounded-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe to Independent"
                )}
              </button>
              <p className="text-[10px] text-muted-foreground/60 mt-2">
                By subscribing, you agree to receive emails from Independent. Unsubscribe anytime.
              </p>
            </form>
          )}

          {/* Independent divider */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground px-3">Independent</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </motion.div>
      </div>

      {/* Coming-up auto-scrolling row */}
      <div className="mt-10 md:mt-12 max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Coming in 2026
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground hidden sm:block">
            Swipe
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-3 md:gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing snap-x snap-mandatory [scrollbar-width:thin]"
          style={{ scrollbarColor: "hsl(var(--border)) transparent" }}
        >
          {upcoming2026.map((item, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[260px] md:w-[300px] p-5 bg-background border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-foreground font-medium">
                  {item.tag}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {item.company}
                </span>
              </div>
              <p className="text-sm md:text-base font-medium tracking-tight text-foreground leading-snug">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
