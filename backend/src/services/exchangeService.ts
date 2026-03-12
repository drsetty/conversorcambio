import axios from 'axios';
import { getCached, setCache } from '../config/redis';
import { logger } from '../utils/logger';

const FRANKFURTER_BASE = 'https://api.frankfurter.dev/v1';
const CACHE_KEY = 'exchange:rates';
const CACHE_TTL = 86400; // 24h

export interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

const SUPPORTED_CURRENCIES = [
  'BRL', 'USD', 'EUR', 'GBP', 'JPY', 'CAD',
  'AUD', 'CHF', 'CNY', 'MXN', 'INR', 'KRW',
];

export async function fetchAndCacheRates(): Promise<ExchangeRates> {
  try {
    const symbols = SUPPORTED_CURRENCIES.filter((c) => c !== 'USD').join(',');
    const { data } = await axios.get<ExchangeRates>(
      `${FRANKFURTER_BASE}/latest?base=USD&symbols=${symbols}`
    );

    const rates: ExchangeRates = {
      base: data.base,
      date: data.date,
      rates: { USD: 1, ...data.rates },
    };

    await setCache(CACHE_KEY, rates, CACHE_TTL);
    logger.info(`Exchange rates updated: ${rates.date} (${Object.keys(rates.rates).length} currencies)`);
    return rates;
  } catch (err) {
    logger.error('Failed to fetch exchange rates', err);
    throw err;
  }
}

export async function getRates(): Promise<ExchangeRates> {
  const cached = await getCached<ExchangeRates>(CACHE_KEY);
  if (cached) return cached;
  return fetchAndCacheRates();
}

export function convert(
  rates: ExchangeRates,
  from: string,
  to: string,
  amount: number
): { result: number; rate: number } {
  const fromRate = rates.rates[from];
  const toRate = rates.rates[to];

  if (!fromRate || !toRate) {
    throw new Error(`Unsupported currency pair: ${from}/${to}`);
  }

  const rate = toRate / fromRate;
  return {
    result: Math.round(amount * rate * 100) / 100,
    rate: Math.round(rate * 1000000) / 1000000,
  };
}
