import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// Types
// ============================================================================

interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  icon: string;
}

interface StockWidgetState {
  tesla: TickerData | null;
  bitcoin: TickerData | null;
  dogecoin: TickerData | null;
}

interface FetchError {
  message: string;
  timestamp: Date;
}

// ============================================================================
// Static Fallback Data
// ============================================================================

const FALLBACK_DATA: StockWidgetState = {
  tesla: {
    symbol: 'TSLA',
    name: 'Tesla Inc',
    price: 250.42,
    change: 3.21,
    changePercent: 1.30,
    icon: '⚡',
  },
  bitcoin: {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 65000.00,
    change: 1250.50,
    changePercent: 1.96,
    icon: '₿',
  },
  dogecoin: {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.16,
    change: -0.008,
    changePercent: -4.76,
    icon: 'Ð',
  },
};

// ============================================================================
// API Functions
// ============================================================================

async function fetchTeslaStock(): Promise<TickerData | null> {
  try {
    const response = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/TSLA?interval=1d&range=1d',
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Tesla API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const result = data?.chart?.result?.[0];

    if (!result?.meta) {
      throw new Error('Invalid Tesla API response structure');
    }

    const { regularMarketPrice, previousClose } = result.meta;
    const change = regularMarketPrice - previousClose;
    const changePercent = (change / previousClose) * 100;

    return {
      symbol: 'TSLA',
      name: 'Tesla Inc',
      price: regularMarketPrice,
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      icon: '⚡',
    };
  } catch (error) {
    console.error('Tesla fetch error:', error);
    return null;
  }
}

async function fetchCryptoPrices(): Promise<{ bitcoin: TickerData | null; dogecoin: TickerData | null }> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin&vs_currencies=usd&include_24hr_change=true'
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API responded with status: ${response.status}`);
    }

    const data = await response.json();

    const bitcoin: TickerData | null = data.bitcoin
      ? {
          symbol: 'BTC',
          name: 'Bitcoin',
          price: data.bitcoin.usd,
          change: 0,
          changePercent: data.bitcoin.usd_24h_change || 0,
          icon: '₿',
        }
      : null;

    const dogecoin: TickerData | null = data.dogecoin
      ? {
          symbol: 'DOGE',
          name: 'Dogecoin',
          price: data.dogecoin.usd,
          change: 0,
          changePercent: data.dogecoin.usd_24h_change || 0,
          icon: 'Ð',
        }
      : null;

    return { bitcoin, dogecoin };
  } catch (error) {
    console.error('Crypto fetch error:', error);
    return { bitcoin: null, dogecoin: null };
  }
}

// ============================================================================
// Components
// ============================================================================

const TickerCard: React.FC<{ data: TickerData; index: number }> = ({ data, index }) => {
  const isPositive = data.changePercent >= 0;
  const changeColorClass = isPositive
    ? 'text-emerald-400'
    : 'text-red-400';
  
  const bgColorClass = isPositive
    ? 'bg-emerald-500/10 border-emerald-500/20'
    : 'bg-red-500/10 border-red-500/20';

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    if (price >= 1) {
      return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    });
  };

  const formatChange = (percent: number): string => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative flex-shrink-0 w-[280px] sm:w-auto sm:flex-1
        rounded-2xl p-5
        bg-white dark:bg-slate-800/50
        border border-slate-200 dark:border-slate-700
        shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50
        backdrop-blur-sm
        transition-all duration-300
        hover:shadow-xl hover:scale-[1.02]
        ${bgColorClass}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`
          w-12 h-12 rounded-xl
          flex items-center justify-center
          text-2xl font-bold
          bg-gradient-to-br from-slate-100 to-slate-200
          dark:from-slate-700 dark:to-slate-800
          shadow-inner
        `}>
          {data.icon}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {data.symbol}
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {data.name}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {formatPrice(data.price)}
        </div>
        <div className={`flex items-center gap-2 text-sm font-semibold ${changeColorClass}`}>
          <svg
            className={`w-4 h-4 transition-transform ${isPositive ? 'rotate-0' : 'rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          <span>{formatChange(data.changePercent)}</span>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className={`
        absolute inset-0 rounded-2xl pointer-events-none
        bg-gradient-to-br from-transparent via-transparent to-current
        opacity-[0.02] dark:opacity-[0.05]
        ${isPositive ? 'to-emerald-500' : 'to-red-500'}
      `} />
    </motion.div>
  );
};

const LoadingSkeleton: React.FC<{ index: number }> = ({ index }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="
      relative flex-shrink-0 w-[280px] sm:w-auto sm:flex-1
      rounded-2xl p-5
      bg-white dark:bg-slate-800/50
      border border-slate-200 dark:border-slate-700
      animate-pulse
    "
  >
    {/* Header skeleton */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
      <div className="flex flex-col gap-2">
        <div className="w-12 h-3 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="w-20 h-4 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>

    {/* Price skeleton */}
    <div className="space-y-2">
      <div className="w-28 h-8 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="w-16 h-5 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  </motion.div>
);

const ErrorState: React.FC<{ error: FetchError; onRetry: () => void }> = ({ error, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="
      w-full rounded-2xl p-6
      bg-amber-50 dark:bg-amber-900/20
      border border-amber-200 dark:border-amber-800/50
      text-center
    "
  >
    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
      <svg
        className="w-6 h-6 text-amber-600 dark:text-amber-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
      Market data unavailable
    </h3>
    <p className="text-sm text-amber-700 dark:text-amber-300/80 mb-4">
      {error.message}
    </p>
    <button
      onClick={onRetry}
      className="
        px-4 py-2 rounded-lg
        bg-amber-500 hover:bg-amber-600
        dark:bg-amber-600 dark:hover:bg-amber-700
        text-white text-sm font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
      "
    >
      Try Again
    </button>
  </motion.div>
);

// ============================================================================
// Main Component
// ============================================================================

const StockWidget: React.FC = () => {
  const [data, setData] = useState<StockWidgetState>({
    tesla: null,
    bitcoin: null,
    dogecoin: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const REFRESH_INTERVAL = 60000; // 60 seconds

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [teslaResult, cryptoResult] = await Promise.all([
        fetchTeslaStock(),
        fetchCryptoPrices(),
      ]);

      const hasAnyData = teslaResult || cryptoResult.bitcoin || cryptoResult.dogecoin;

      if (!hasAnyData) {
        throw new Error('Unable to fetch any market data');
      }

      setData({
        tesla: teslaResult || FALLBACK_DATA.tesla,
        bitcoin: cryptoResult.bitcoin || FALLBACK_DATA.bitcoin,
        dogecoin: cryptoResult.dogecoin || FALLBACK_DATA.dogecoin,
      });

      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError({
        message: errorMessage,
        timestamp: new Date(),
      });

      // Use fallback data when API fails
      setData(FALLBACK_DATA);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();

    const intervalId = setInterval(fetchAllData, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [fetchAllData]);

  const formatLastUpdated = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const tickerArray = data.tesla && data.bitcoin && data.dogecoin
    ? [data.tesla, data.bitcoin, data.dogecoin]
    : [];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Live Markets
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time stock & crypto prices
          </p>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Updated {formatLastUpdated(lastUpdated)}</span>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-4">
          <ErrorState error={error} onRetry={fetchAllData} />
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {[0, 1, 2].map((index) => (
            <LoadingSkeleton key={index} index={index} />
          ))}
        </div>
      )}

      {/* Data Display */}
      {!isLoading && tickerArray.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 -mx-2 px-2 sm:mx-0 sm:px-0"
        >
          {tickerArray.map((ticker, index) => (
            <TickerCard key={ticker.symbol} data={ticker} index={index} />
          ))}
        </motion.div>
      )}

      {/* Footer note */}
      <div className="mt-4 text-center sm:text-left">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Data provided by Yahoo Finance & CoinGecko • Updates every 60 seconds
        </p>
      </div>
    </div>
  );
};

export default StockWidget;
