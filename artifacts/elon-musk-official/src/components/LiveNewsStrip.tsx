import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, ExternalLink, RefreshCw, Loader2 } from "lucide-react";
import { useLiveNews } from "@/hooks/useLiveNews";
import { formatRelativeTime } from "@/lib/news";

/**
 * LiveNewsStrip
 *
 * Compact live news feed that auto-refreshes every 5 min.
 * Drop it anywhere on the site to show a rolling news ticker.
 */
export default function LiveNewsStrip({ limit = 5, title = "Live News" }: { limit?: number; title?: string }) {
  const { news, loading, lastUpdated, refresh } = useLiveNews({ limit });

  return (
    <section className="py-12 px-6 border-t border-border bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Newspaper className="w-5 h-5 text-foreground/80" />
            <h3 className="text-xl md:text-2xl font-medium tracking-tight">{title}</h3>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-widest border border-foreground/20 bg-foreground/5 rounded-full">
              <span className={`w-1.5 h-1.5 rounded-full ${loading ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
              {loading ? "Loading" : "Live"}
            </span>
          </div>
          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border hover:border-foreground/40 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {loading && news.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-foreground/60 py-8">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading the latest from across the network…
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {news.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="group block p-4 border border-border bg-background hover:border-foreground/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-foreground/60">{item.source}</span>
                    <span className="text-[10px] text-foreground/50">{formatRelativeTime(item.publishedAt)}</span>
                  </div>
                  <h4 className="text-sm font-medium leading-snug group-hover:text-foreground line-clamp-3">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-3 text-[10px] uppercase tracking-widest text-foreground/50">
                    Read
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        )}

        {lastUpdated && (
          <p className="mt-4 text-[10px] uppercase tracking-widest text-foreground/40">
            Last updated {lastUpdated.toLocaleTimeString()} · Auto-refresh every 5 min
          </p>
        )}
      </div>
    </section>
  );
}
