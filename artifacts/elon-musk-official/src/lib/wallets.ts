/**
 * Elon Musk Office — Treasury wallet registry
 * Single site-controlled address per supported coin.
 * Treasury ops replace these via a future CMS / env-injection layer.
 *
 * Network identifiers and Trust Wallet deeplink asset codes are derived here
 * so the rest of the UI never needs to know them.
 */

export type CoinId = "BTC" | "ETH" | "USDT" | "USDC" | "BNB" | "SOL" | "TRX" | "DOGE";

export type CoinMeta = {
  id: CoinId;
  name: string;
  symbol: string;
  /** address rendered as QR + copied by user */
  address: string;
  /** Trust Wallet deeplink asset code (e.g. c0, c60, c195) */
  trustAsset: string;
  /** primary network name (shown in UI) */
  network: string;
  /** alternative networks we accept on the same address */
  altNetworks?: string[];
  /** Trust Wallet URL template */
  deeplink: (address: string, asset: string) => string;
  /** human-friendly accent color for UI */
  color: string;
  /** approximate block time */
  blockTime: string;
  /** minimum recommended confirmations */
  confirmations: number;
  /** fee tier label */
  fee: "Low" | "Medium" | "High";
  /** minimum donation in USD */
  minUsd: number;
  /** recommended for large transfers? */
  largeAmountOk: boolean;
  /** logo file under /assets/wallets */
  logo: string;
  /** brand mark component hint */
  brandHint: string;
};

const TW = (asset: string, address: string) =>
  `https://link.trustwallet.com/send?asset=${encodeURIComponent(asset)}&address=${encodeURIComponent(address)}`;

export const COINS: Record<CoinId, CoinMeta> = {
  BTC: {
    id: "BTC",
    name: "Bitcoin",
    symbol: "BTC",
    address: "bc1q8uv250vclwhpwytcw0xn4asa98244rx9tks5yg",
    trustAsset: "c0",
    network: "Bitcoin Mainnet",
    deeplink: TW,
    color: "#F7931A",
    blockTime: "~10 min",
    confirmations: 1,
    fee: "Medium",
    minUsd: 25,
    largeAmountOk: true,
    logo: "/wallets/btc.svg",
    brandHint: "The original cryptocurrency. Best for long-term, high-value transfers.",
  },
  ETH: {
    id: "ETH",
    name: "Ethereum",
    symbol: "ETH",
    address: "0xeE89706C94fD57774916Ec9452252e01D0413274",
    trustAsset: "c60",
    network: "Ethereum Mainnet (ERC-20)",
    altNetworks: ["Arbitrum", "Optimism", "Base"],
    deeplink: TW,
    color: "#627EEA",
    blockTime: "~12 sec",
    confirmations: 12,
    fee: "High",
    minUsd: 25,
    largeAmountOk: true,
    logo: "/wallets/eth.svg",
    brandHint: "Programmable blockchain. Higher fees, deepest liquidity, smart-contract native.",
  },
  USDT: {
    id: "USDT",
    name: "Tether",
    symbol: "USDT",
    address: "TRG6JiqQySTCJqmvqbis2XsRYaBLVytrvZ",
    trustAsset: "c195_tTR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    network: "Tron (TRC-20)",
    altNetworks: ["Ethereum (ERC-20)", "Solana"],
    deeplink: TW,
    color: "#26A17B",
    blockTime: "~3 sec",
    confirmations: 1,
    fee: "Low",
    minUsd: 10,
    largeAmountOk: true,
    logo: "/wallets/usdt.svg",
    brandHint: "Stablecoin pegged to USD. Cheapest transfer network (TRC-20).",
  },
  USDC: {
    id: "USDC",
    name: "USD Coin",
    symbol: "USDC",
    address: "0xeE89706C94fD57774916Ec9452252e01D0413274",
    trustAsset: "c60_t0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    network: "Ethereum (ERC-20)",
    altNetworks: ["Solana", "Base", "Polygon"],
    deeplink: TW,
    color: "#2775CA",
    blockTime: "~12 sec",
    confirmations: 12,
    fee: "Medium",
    minUsd: 10,
    largeAmountOk: true,
    logo: "/wallets/usdc.svg",
    brandHint: "US-regulated stablecoin. Ideal for institutional and recurring transfers.",
  },
  BNB: {
    id: "BNB",
    name: "BNB",
    symbol: "BNB",
    address: "0xeE89706C94fD57774916Ec9452252e01D0413274",
    trustAsset: "c20000714",
    network: "BNB Smart Chain (BEP-20)",
    deeplink: TW,
    color: "#F3BA2F",
    blockTime: "~3 sec",
    confirmations: 15,
    fee: "Low",
    minUsd: 10,
    largeAmountOk: true,
    logo: "/wallets/bnb.svg",
    brandHint: "Binance's native coin. Fast and cheap on BSC.",
  },
  SOL: {
    id: "SOL",
    name: "Solana",
    symbol: "SOL",
    address: "9d6cJmcCubZppJ11cD6o9fQiszBeqsrg798VeEWG27uz",
    trustAsset: "c501",
    network: "Solana Mainnet",
    deeplink: TW,
    color: "#9945FF",
    blockTime: "~0.4 sec",
    confirmations: 1,
    fee: "Low",
    minUsd: 5,
    largeAmountOk: true,
    logo: "/wallets/sol.svg",
    brandHint: "Fastest major chain. Sub-second finality, sub-cent fees.",
  },
  TRX: {
    id: "TRX",
    name: "Tron",
    symbol: "TRX",
    address: "TRG6JiqQySTCJqmvqbis2XsRYaBLVytrvZ",
    trustAsset: "c195",
    network: "Tron Mainnet",
    deeplink: TW,
    color: "#FF060A",
    blockTime: "~3 sec",
    confirmations: 1,
    fee: "Low",
    minUsd: 5,
    largeAmountOk: true,
    logo: "/wallets/trx.svg",
    brandHint: "Hosts USDT-TRC20. The cheapest major chain for stablecoin transfers.",
  },
  DOGE: {
    id: "DOGE",
    name: "Dogecoin",
    symbol: "DOGE",
    address: "D798MwznVdTsRqcPVbkffda4qTkSd8tqCP",
    trustAsset: "c3",
    network: "Dogecoin Mainnet",
    deeplink: TW,
    color: "#C3A000",
    blockTime: "~1 min",
    confirmations: 6,
    fee: "Low",
    minUsd: 5,
    largeAmountOk: true,
    logo: "/wallets/doge.svg",
    brandHint: "The people's coin. Originally a meme, now a global payments rail.",
  },
};

export const COIN_LIST: CoinMeta[] = Object.values(COINS);

/** Approximate USD prices — refreshed every 60s from CoinGecko (no key). */
export async function fetchUsdPrices(): Promise<Partial<Record<CoinId, number>>> {
  const ids: Record<CoinId, string> = {
    BTC: "bitcoin",
    ETH: "ethereum",
    USDT: "tether",
    USDC: "usd-coin",
    BNB: "binancecoin",
    SOL: "solana",
    TRX: "tron",
    DOGE: "dogecoin",
  };
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${Object.values(ids).join(",")}&vs_currencies=usd`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return {};
    const data = await res.json();
    const out: Partial<Record<CoinId, number>> = {};
    for (const [coin, geckoId] of Object.entries(ids)) {
      const v = data[geckoId]?.usd;
      if (typeof v === "number") out[coin as CoinId] = v;
    }
    return out;
  } catch {
    return {};
  }
}

/** Convert USD amount to a coin amount at the given spot price. */
export function usdToCoin(usd: number, priceUsd: number | undefined): number {
  if (!priceUsd || priceUsd <= 0) return 0;
  return usd / priceUsd;
}

/** Format a coin amount for display (preserve significant digits, trim trailing zeros). */
export function formatCoin(amount: number, decimals = 6): string {
  if (!isFinite(amount) || amount === 0) return "0";
  if (amount >= 1) return amount.toFixed(Math.min(decimals, 4));
  return amount.toFixed(decimals);
}
