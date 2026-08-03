import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ThumbsUp, MessageSquare, Filter, Pin, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QUESTIONS = [
  {
    id: 1,
    user: "@tesla_driver_22",
    tier: "Supporter",
    question: "Will Optimus be available to consumers in 2027?",
    answer: "Based on recent earnings calls, the plan is to start internal Tesla deployment late 2026 and limited external pilots in 2027. Mass consumer availability is more like 2028–2030.",
    likes: 1248,
    category: "Tesla",
    pinned: true,
  },
  {
    id: 2,
    user: "@mars_or_bust",
    tier: "Insider",
    question: "Is Starship really going to launch toward Mars in 2026?",
    answer: "The window is Q3 2026 for a cargo demonstration. The first crewed mission is more likely 2030+. The full city of 1M people is a 2050+ horizon.",
    likes: 982,
    category: "SpaceX",
    pinned: true,
  },
  {
    id: 3,
    user: "@neural_curious",
    tier: "Fan",
    question: "Can Neuralink help with memory enhancement in healthy people?",
    answer: "Not yet. The current N1 implant is approved for medical use (paralysis, etc). Cognitive enhancement is a stated long-term goal but won't be available for at least 5-10 years.",
    likes: 542,
    category: "Neuralink",
    pinned: false,
  },
  {
    id: 4,
    user: "@crypto_elena",
    tier: "Rocket",
    question: "What's the right way to think about xAI's valuation vs OpenAI?",
    answer: "xAI is at ~$200B with Colossus training infra, faster product cycles, and integration with X. OpenAI is rumored $300B+ but the public products are similar. Both are speculative.",
    likes: 401,
    category: "xAI",
    pinned: false,
  },
  {
    id: 5,
    user: "@starlink_abroad",
    tier: "Supporter",
    question: "Starlink Roam — worth it for digital nomads?",
    answer: "Yes. Mini is portable, Roam gives you 50+ country coverage, latency is fine for video calls. Pricing $50-165/mo depending on tier.",
    likes: 287,
    category: "Starlink",
    pinned: false,
  },
  {
    id: 6,
    user: "@policy_wonk",
    tier: "Insider",
    question: "How do Musk's political donations actually affect his companies?",
    answer: "Mixed effect. Some regulatory friction, some helpful (DOGE). Net impact on Tesla, SpaceX, etc. has been small — they are dominant in their lanes regardless.",
    likes: 233,
    category: "Policy",
    pinned: false,
  },
];

const FILTERS = ["All", "Trending", "Pinned", "Tesla", "SpaceX", "Neuralink", "xAI", "Starlink", "Policy"];

export default function FanQA() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(1);
  const [liked, setLiked] = useState<Set<number>>(new Set([1, 2]));
  const { toast } = useToast();

  const filtered = QUESTIONS.filter((q) => {
    if (filter === "All") return true;
    if (filter === "Trending") return q.likes > 400;
    if (filter === "Pinned") return q.pinned;
    return q.category === filter;
  });

  const like = (id: number) => {
    setLiked((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <section id="qa" className="py-20 md:py-28 px-6 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
            <MessageCircle className="w-3.5 h-3.5" /> Fans Q&amp;A
          </p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight">Questions, answered</h2>
          <p className="mt-3 max-w-2xl text-sm text-foreground/65">The top questions from the community, answered by our research team. Pinned answers are community-voted and updated weekly.</p>
        </motion.div>

        <div className="flex items-center gap-1.5 mb-6 overflow-x-auto [scrollbar-width:none] -mx-6 px-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.14em] border transition-colors flex items-center gap-1.5 ${
                filter === f ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {f === "Trending" && <TrendingUp className="w-3 h-3" />}
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((q) => {
            const isOpen = open === q.id;
            const isLiked = liked.has(q.id);
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="border border-border bg-background"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : q.id)}
                  className="w-full p-5 text-left flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold shrink-0">
                    {q.user.slice(1, 3).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-medium text-foreground">{q.user}</span>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground border border-border px-1.5 py-0.5">{q.tier}</span>
                      {q.pinned && <Pin className="w-3 h-3 text-amber-500" />}
                      <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{q.category}</span>
                    </div>
                    <p className="text-sm text-foreground leading-snug">{q.question}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-foreground/70 tabular-nums">{q.likes + (isLiked ? 1 : 0)}</p>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">votes</p>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="p-5 bg-secondary/30">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-2 flex items-center gap-1.5">
                          <MessageSquare className="w-3 h-3" /> Office answer
                        </p>
                        <p className="text-sm text-foreground/85 leading-relaxed">{q.answer}</p>
                        <div className="mt-4 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => like(q.id)}
                            className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${
                              isLiked ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" /> Helpful
                          </button>
                          <button
                            type="button"
                            onClick={() => toast({ title: "Reply recorded", description: "Our team will look into this." })}
                            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                          >
                            <MessageCircle className="w-3 h-3" /> Reply
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#contact"
            className="text-xs uppercase tracking-[0.14em] border border-foreground px-6 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Ask your own question
          </a>
        </div>
      </div>
    </section>
  );
}
