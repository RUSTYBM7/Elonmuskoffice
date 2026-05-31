import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, RefreshCw, Newspaper, Radio, BookOpen } from "lucide-react";

type Headline = {
  source: string;
  sourceType: "news" | "social" | "blog";
  title: string;
  summary: string;
  date: string;
  url: string;
  sentiment: "positive" | "neutral" | "negative";
};

const STATIC_HEADLINES: Headline[] = [
  {
    source: "Reuters",
    sourceType: "news",
    title: "SpaceX Starship passes critical Mars mission readiness review",
    summary: "The Federal Aviation Administration has cleared SpaceX's Starship for its first Mars cargo mission, targeting a 2026 launch window.",
    date: "2026-05-28",
    url: "https://www.reuters.com/technology/space",
    sentiment: "positive",
  },
  {
    source: "Bloomberg",
    sourceType: "news",
    title: "Tesla surpasses 10 million cumulative EV deliveries worldwide",
    summary: "Tesla reached a historic milestone, becoming the first automaker to deliver 10 million electric vehicles globally since its founding.",
    date: "2026-05-25",
    url: "https://www.bloomberg.com/technology",
    sentiment: "positive",
  },
  {
    source: "The Wall Street Journal",
    sourceType: "news",
    title: "Neuralink patient uses brain implant to control Tesla vehicle remotely",
    summary: "In a first, a Neuralink trial participant demonstrated controlling a Tesla Model S using only their thoughts, marking a breakthrough in human-AI integration.",
    date: "2026-05-22",
    url: "https://www.wsj.com/tech",
    sentiment: "positive",
  },
  {
    source: "Financial Times",
    sourceType: "news",
    title: "xAI Grok 4 becomes the fastest-growing AI platform in history",
    summary: "Grok 4 surpassed 500 million users in 60 days, outpacing every previous technology product launch in measured growth rate.",
    date: "2026-05-20",
    url: "https://www.ft.com/technology",
    sentiment: "positive",
  },
  {
    source: "CNN",
    sourceType: "news",
    title: "Musk Foundation commits $5B to AI safety and alignment research",
    summary: "The Musk Foundation announced its largest single philanthropic commitment, targeting AGI safety research at universities worldwide.",
    date: "2026-05-18",
    url: "https://www.cnn.com/technology",
    sentiment: "positive",
  },
  {
    source: "𝕏 / Twitter",
    sourceType: "social",
    title: "@elonmusk — 'Starship to Mars. This is what we trained for.'",
    summary: "Musk posted a 37-second video of the Starship Super Heavy stack being stacked at Starbase, with the caption: 'Making life multiplanetary.'",
    date: "2026-05-30",
    url: "https://x.com/elonmusk",
    sentiment: "positive",
  },
  {
    source: "The Verge",
    sourceType: "news",
    title: "Starlink surpasses 10 million active subscribers in 120 countries",
    summary: "SpaceX's Starlink satellite internet service hit a major subscriber milestone, providing broadband to remote and underserved regions globally.",
    date: "2026-05-15",
    url: "https://www.theverge.com/space",
    sentiment: "positive",
  },
  {
    source: "Ars Technica",
    sourceType: "blog",
    title: "Inside SpaceX's plan to refuel Starship in orbit before Mars",
    summary: "An exclusive technical deep-dive into SpaceX's orbital propellant transfer technology, which is essential for the Mars mission architecture.",
    date: "2026-05-12",
    url: "https://arstechnica.com/spacex",
    sentiment: "neutral",
  },
  {
    source: "Wired",
    sourceType: "news",
    title: "The Boring Company's Vegas Loop hits 1 million passengers",
    summary: "The Vegas Loop tunnel system in Las Vegas reached a million passenger rides, validating Musk's vision of urban underground transportation.",
    date: "2026-05-10",
    url: "https://www.wired.com/transportation",
    sentiment: "positive",
  },
  {
    source: "𝕏 / Twitter",
    sourceType: "social",
    title: "@elonmusk — 'Grok 4 just passed the bar exam, the MCAT, and the CFA. Barely getting started.'",
    summary: "Musk shared Grok 4 benchmark results showing top-percentile performance across professional licensing exams, calling it 'a genuine reasoning machine.'",
    date: "2026-05-29",
    url: "https://x.com/elonmusk",
    sentiment: "positive",
  },
];

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  news: <Newspaper className="w-3.5 h-3.5" />,
  social: <Radio className="w-3.5 h-3.5" />,
  blog: <BookOpen className="w-3.5 h-3.5" />,
};

const SENTIMENT_COLORS: Record<string, string> = {
  positive: "bg-green-500/10 border-green-500/20",
  neutral: "bg-amber-500/10 border-amber-500/20",
  negative: "bg-red-500/10 border-red-500/20",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function PressWall() {
  const [activeFilter, setActiveFilter] = useState<"all" | "news" | "social" | "blog">("all");
  const [visible, setVisible] = useState<number>(6);
  const [shuffled, setShuffled] = useState<Headline[]>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const shuffled = [...STATIC_HEADLINES].sort(() => Math.random() - 0.5);
    setShuffled(shuffled);
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
        el.scrollBy({ left: 1.5, behavior: "auto" });
      }
    }, 30);
    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const filtered =
    activeFilter === "all"
      ? shuffled
      : shuffled.filter((h) => h.sourceType === activeFilter);

  const displayed = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <section className="relative py-20 md:py-28 px-6 bg-secondary/50 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Media &amp; Press
              </p>
              <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
                In the news
              </h2>
              <p className="mt-3 text-sm text-foreground/65 max-w-xl">
                The latest from the world of Elon Musk — verified news, official posts, and in-depth analysis.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <RefreshCw className="w-3 h-3" />
              Updated May 2026
            </div>
          </div>
        </motion.div>

        {/* Ticker tape */}
        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto pb-4 mb-10 cursor-grab active:cursor-grabbing [scrollbar-width:thin]"
          style={{ scrollbarColor: "hsl(var(--border)) transparent" }}
        >
          {shuffled.slice(0, 8).map((h, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[280px] md:w-[320px] p-4 border border-border bg-background"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/50 flex items-center gap-1">
                  {SOURCE_ICONS[h.sourceType]}
                  {h.source}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {formatDate(h.date)}
                </span>
              </div>
              <p className="text-sm font-medium tracking-tight text-foreground leading-snug line-clamp-2">
                {h.title}
              </p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto [scrollbar-width:none]">
          {(["all", "news", "social", "blog"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                setVisible(6);
              }}
              className={`shrink-0 px-4 py-2 text-[10px] uppercase tracking-[0.14em] border transition-colors ${
                activeFilter === filter
                  ? "bg-foreground text-background border-foreground dark:bg-primary dark:text-background dark:border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {filter === "all" ? "All" : filter === "news" ? "News" : filter === "social" ? "Social" : "Analysis"}
            </button>
          ))}
        </div>

        {/* Headlines grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {displayed.map((h, i) => (
            <motion.a
              key={`${h.source}-${i}`}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group block p-5 md:p-6 border border-border bg-background hover:border-foreground/30 dark:hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/50 flex items-center gap-1">
                    {SOURCE_ICONS[h.sourceType]}
                    {h.source}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {formatDate(h.date)}
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-foreground/30 group-hover:text-foreground/70 shrink-0 transition-colors" />
              </div>
              <h3 className="text-sm md:text-base font-medium tracking-tight text-foreground leading-snug mb-2 group-hover:text-foreground/80 transition-colors">
                {h.title}
              </h3>
              <p className="text-xs text-foreground/55 leading-relaxed line-clamp-2">
                {h.summary}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 border ${
                    SENTIMENT_COLORS[h.sentiment]
                  }`}
                >
                  {h.sentiment}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + 4)}
              className="text-xs uppercase tracking-[0.14em] border border-border px-6 py-3 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              Load more ({filtered.length - visible} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
