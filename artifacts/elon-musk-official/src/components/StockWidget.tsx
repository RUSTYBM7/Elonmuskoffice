'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TickerData {
  symbol: string;
  name: string;
  icon: string;
  logo?: string;
  price: number;
  change: number;
  changePercent: number;
  loading?: boolean;
  error?: boolean;
  isPrivate?: boolean;
}

const FALLBACK: Record<string, TickerData> = {
  TSLA: { symbol: 'TSLA', name: 'Tesla', icon: '', logo: 'https://companieslogo.com/img/orig/TSLA-6da550e5.png?t=1740128273', price: 251.42, change: 1.23, changePercent: 0.49 },
  BTC:  { symbol: 'BTC',  name: 'Bitcoin', icon: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/960px-Bitcoin.svg.png', price: 65123.50, change: -321.00, changePercent: -0.49 },
  DOGE: { symbol: 'DOGE', name: 'Dogecoin', icon: '', logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/dogecoin-doge-icon.png', price: 0.1632, change: 0.0081, changePercent: 5.22 },
};

function SkeletonCard() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/5 min-w-[160px]">
      <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
        <div className="h-5 w-20 bg-white/10 rounded animate-pulse" />
      </div>
    </div>
  );
}

function TickerCard({ ticker }: { ticker: TickerData }) {
  const up = ticker.change >= 0;
  const color = ticker.error ? 'text-white/50' : up ? 'text-green-400' : 'text-red-400';
  
  const formatPrice = () => {
    if (ticker.error) return '—';
    if (ticker.symbol === 'DOGE') return `$${ticker.price.toFixed(4)}`;
    if (ticker.symbol === 'BTC') return `$${ticker.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    if (ticker.symbol === 'NRL') return `$${ticker.price.toFixed(2)}`;
    return `$${ticker.price.toFixed(2)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-default min-w-[180px]"
    >
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        {ticker.logo ? (
          <img
            src={ticker.logo}
            alt={ticker.name}
            width={32}
            height={32}
            className="object-contain opacity-90"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) parent.innerHTML = `<span class="text-2xl">${ticker.icon}</span>`;
            }}
          />
        ) : (
          <span className="text-2xl">{ticker.icon}</span>
        )}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[10px] uppercase tracking-widest text-white/40">{ticker.symbol}</p>
          {ticker.isPrivate && (
            <span className="text-[8px] px-1 py-0.5 rounded bg-white/10 text-white/30 uppercase tracking-wider">Est.</span>
          )}
        </div>
        <p className="text-lg font-semibold text-white tabular-nums">
          {formatPrice()}
        </p>
        {ticker.error ? (
          <p className="text-[10px] text-white/30">unavailable</p>
        ) : (
          <p className={`text-xs font-medium ${color}`}>
            {up ? '+' : ''}{ticker.changePercent.toFixed(2)}%
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function StockWidget() {
  const [tickers, setTickers] = useState<Record<string, TickerData>>({
    TSLA: { ...FALLBACK.TSLA, loading: true },
    BTC:  { ...FALLBACK.BTC,  loading: true },
    DOGE: { ...FALLBACK.DOGE, loading: true },
  });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAll = useCallback(async () => {
    setRefreshing(true);

    // Fetch TSLA from Yahoo Finance
    try {
      const r = await fetch(
        'https://query1.finance.yahoo.com/v8/finance/chart/TSLA?interval=1d&range=1d',
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      );
      const j = await r.json();
      const meta = j?.chart?.result?.[0]?.meta;
      if (meta?.regularPrice && meta?.previousClose) {
        const price = meta.regularPrice;
        const prev = meta.previousClose;
        setTickers(t => ({
          ...t,
          TSLA: { ...t.TSLA, price, change: price - prev, changePercent: ((price - prev) / prev) * 100, loading: false, error: false },
        }));
      } else throw new Error('no data');
    } catch {
      setTickers(t => ({ ...t, TSLA: { ...t.TSLA, loading: false, error: true } }));
    }

    // Fetch crypto from CoinGecko
    try {
      const r = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin&vs_currencies=usd&include_24hr_change=true'
      );
      const j = await r.json();
      if (j?.bitcoin?.usd) {
        const price = j.bitcoin.usd;
        const change = j.bitcoin.usd_24h_change || 0;
        setTickers(t => ({
          ...t,
          BTC: { ...t.BTC, price, change: (change / 100) * price, changePercent: change, loading: false, error: false },
        }));
      }
      if (j?.dogecoin?.usd) {
        const price = j.dogecoin.usd;
        const change = j.dogecoin.usd_24h_change || 0;
        setTickers(t => ({
          ...t,
          DOGE: { ...t.DOGE, price, change: (change / 100) * price, changePercent: change, loading: false, error: false },
        }));
      }
    } catch {
      setTickers(t => ({ ...t, BTC: { ...t.BTC, loading: false, error: true }, DOGE: { ...t.DOGE, loading: false, error: true } }));
    }

    setLastUpdated(new Date());
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 60000);
    return () => clearInterval(id);
  }, [fetchAll]);

  const allLoading = Object.values(tickers).every(t => t.loading);

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Market Watch</h2>
            <p className="text-sm text-foreground/50">Live prices · Auto-refreshes every 60s</p>
          </div>
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-[10px] text-foreground/30">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchAll}
              disabled={refreshing}
              className="text-xs text-foreground/40 hover:text-foreground/70 transition-colors disabled:opacity-40"
            >
              {refreshing ? '⟳' : '↻'}
            </button>
          </div>
        </div>

        {allLoading ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {['TSLA', 'BTC', 'DOGE'].map(k => (
              <TickerCard key={k} ticker={tickers[k]} />
            ))}
          </div>
        )}

        <p className="text-[10px] text-foreground/20 mt-4 text-center">
          Prices are delayed by up to 15 minutes. Private company valuations are estimates. Not financial advice.
        </p>
      </div>
    </section>
  );
}
