import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const upcoming2026 = [
  { tag: "Q1 2026", title: "Tesla Cybertruck production milestone", company: "Tesla" },
  { tag: "Q1 2026", title: "Starship orbital refueling demonstration", company: "SpaceX" },
  { tag: "Q2 2026", title: "Neuralink expanded human trial cohort", company: "Neuralink" },
  { tag: "Q2 2026", title: "𝕏 Payments rollout", company: "𝕏" },
  { tag: "Q3 2026", title: "Tesla Robotaxi network expansion", company: "Tesla" },
  { tag: "Q3 2026", title: "Grok 4 multimodal release", company: "xAI" },
  { tag: "Q4 2026", title: "Mars cargo mission readiness review", company: "SpaceX" },
  { tag: "Q4 2026", title: "Optimus production scale-up", company: "Tesla" },
  { tag: "2026", title: "Starlink direct-to-cell global coverage", company: "Starlink" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  // Auto-scroll while still allowing manual horizontal scroll
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "Subscribed",
      description: "You will receive Elon Musk's 2026 updates in your inbox.",
    });
    setEmail("");
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
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Newsletter &middot; 2026
          </p>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
            Updates from Elon Musk in 2026
          </h2>
          <p className="mt-4 text-sm md:text-base text-foreground/70">
            Get briefings on Tesla, SpaceX, Neuralink, xAI, and 𝕏 — straight to
            your inbox throughout 2026.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-background border-input rounded-none focus-visible:ring-foreground"
              required
            />
            <Button
              type="submit"
              className="h-12 px-8 rounded-none bg-foreground text-background hover:bg-foreground/90 uppercase tracking-[0.14em] text-xs font-medium"
            >
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Coming-up auto-scrolling row (also manually scrollable) */}
      <div className="mt-14 md:mt-16 max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Coming in 2026
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground hidden sm:block">
            Swipe &rarr;
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
                <span className="text-[10px] uppercase tracking-[0.18em] text-foreground dark:text-primary font-medium">
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
