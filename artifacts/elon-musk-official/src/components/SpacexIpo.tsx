import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, TrendingUp, DollarSign, Calendar, ExternalLink, RefreshCw, Loader2, Sparkles } from "lucide-react";
import { useLiveNews } from "@/hooks/useLiveNews";
import { formatRelativeTime, type NewsItem } from "@/lib/news";

const missionStats = [
  { icon: Rocket, label: "Launches in 2024", value: "134+", note: "Record-breaking year" },
  { icon: DollarSign, label: "Valuation", value: "$350B", note: "As of 2024 funding round" },
  { icon: TrendingUp, label: "Employees", value: "13,000+", note: "Global aerospace workforce" },
  { icon: Sparkles, label: "Starship Status", value: "Operational", note: "Fully reusable rocket" },
];

const CATEGORY_TINT: Record<NewsItem["category"], string> = {
  spacex: "text-blue-500 border-blue-500/30 bg-blue-500/5",
  tesla: "text-red-500 border-red-500/30 bg-red-500/5",
  neuralink: "text-cyan-500 border-cyan-500/30 bg-cyan-500/5",
  xai: "text-amber-500 border-amber-500/30 bg-amber-500/5",
  general: "text-foreground/60 border-border bg-secondary/30",
};

export default function SpacexIpo() {
  const { news, loading, lastUpdated, error, refresh } = useLiveNews({ limit: 8 });
  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-background via-secondary/20 to-background border-t border-border overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-amber-500 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-blue-500/30 bg-blue-500/5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 font-medium">
              Live Updates
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-foreground leading-[1.05]">
            SpaceX News
          </h2>
          <p className="mt-3 text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground/70 dark:text-primary/70">
            Latest updates and missions
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-foreground/70 leading-relaxed">
            Stay informed with real-time coverage of SpaceX launches, missions, and company developments. Updated regularly from live sources.
          </p>
        </motion.div>

        {/* Mission stats — gigantic display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-16 md:mb-20 border border-border">
          {missionStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background p-6 md:p-8 lg:p-10 flex flex-col gap-4 group hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-foreground/60 group-hover:text-foreground transition-colors" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground dark:text-primary leading-none">
                {stat.value}
              </p>
              <p className="text-[11px] md:text-xs text-foreground/55">{stat.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Live news ticker header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Real-time News Feed
            </p>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              Live coverage
            </h3>
          </div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {loading ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="w-3 h-3 animate-spin" />
                Loading
              </span>
            ) : lastUpdated ? (
              <span>Updated {formatRelativeTime(lastUpdated.toISOString())}</span>
            ) : null}
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 hover:border-foreground/40 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Marquee ticker */}
        <div
          ref={tickerRef}
          className="relative mb-8 overflow-hidden border-y border-border bg-background/50 backdrop-blur-sm"
          style={{ height: 64 }}
        >
          <div className="absolute inset-0 flex items-center gap-8 animate-[scroll_60s_linear_infinite] whitespace-nowrap px-6">
            {(news.length > 0 ? news : Array(6).fill(null)).map((n, i) => (
              <span key={i} className="inline-flex items-center gap-3 text-sm text-foreground/80">
                <span className="text-[10px] uppercase tracking-[0.14em] text-blue-500 font-medium">LIVE</span>
                <span>{n?.title || "Loading real-time coverage…"}</span>
                <span className="text-foreground/30">·</span>
              </span>
            ))}
          </div>
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        {/* News grid */}
        {error && (
          <div className="mb-6 p-4 border border-amber-500/30 bg-amber-500/5 text-xs text-amber-600 dark:text-amber-400">
            {error}
          </div>
        )}

        <AnimatePresence mode="popLayout">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((item, i) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group block p-5 md:p-6 border border-border bg-background hover:border-foreground/30 dark:hover:border-primary/40 transition-colors"
              >
                {item.imageUrl && (
                  <div className="mb-4 aspect-video overflow-hidden bg-secondary">
                    <img
                      src={item.imageUrl}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 border ${CATEGORY_TINT[item.category]}`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {item.source}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    · {formatRelativeTime(item.publishedAt)}
                  </span>
                </div>
                <h4 className="text-base md:text-lg font-medium tracking-tight text-foreground leading-snug mb-2 group-hover:text-foreground/80 transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-foreground/55 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-foreground/50 group-hover:text-foreground/80 transition-colors">
                  Read full story
                  <ExternalLink className="w-3 h-3" />
                </div>
              </motion.a>
            ))}
            {loading && news.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <Loader2 className="w-6 h-6 animate-spin text-foreground/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Fetching latest coverage…</p>
              </div>
            )}
          </div>
        </AnimatePresence>

        {/* Footer note */}
        <p className="mt-10 text-[11px] tracking-wide text-muted-foreground text-center">
          Aggregated from public sources via the Spaceflight News API. Not financial advice. All figures subject to change.
        </p>
      </div>
    </section>
  );
}
