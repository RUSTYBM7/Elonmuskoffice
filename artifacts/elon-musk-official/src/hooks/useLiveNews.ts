import { useEffect, useState, useCallback } from "react";
import { fetchMuskNews, type NewsItem } from "@/lib/news";

/**
 * Hook: useLiveNews
 *
 * Centralized live news feed. Every component that shows news should use
 * this so the data refreshes consistently across the site. Auto-refreshes
 * every 5 minutes; manual refresh via the returned `refresh()` function.
 */
export function useLiveNews(opts: { limit?: number; refreshMs?: number } = {}) {
  const { limit = 8, refreshMs = 5 * 60_000 } = opts;
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchMuskNews({ limit });
      setNews(items);
      setLastUpdated(new Date());
    } catch (e: any) {
      setError(e?.message || "Failed to load news");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, refreshMs);
    const onVisible = () => {
      // Refresh when user returns to the tab
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh, refreshMs]);

  return { news, loading, lastUpdated, error, refresh };
}
