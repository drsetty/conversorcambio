import { getCached, setCache } from '../config/redis';
import { logger } from '../utils/logger';

const CACHE_KEY = 'market:indices';
const CACHE_TTL = 300; // 5 min

export interface MarketIndex {
  symbol: string;
  name: string;
  tradingViewSymbol: string;
}

const INDICES: MarketIndex[] = [
  { symbol: 'SPX', name: 'S&P 500', tradingViewSymbol: 'FOREXCOM:SPXUSD' },
  { symbol: 'NAS100', name: 'NASDAQ', tradingViewSymbol: 'OANDA:NAS100USD' },
  { symbol: 'DJI', name: 'Dow Jones', tradingViewSymbol: 'FOREXCOM:DJI' },
  { symbol: 'DAX', name: 'DAX', tradingViewSymbol: 'XETR:DAX' },
  { symbol: 'UK100', name: 'FTSE 100', tradingViewSymbol: 'OANDA:UK100GBP' },
  { symbol: 'JP225', name: 'Nikkei 225', tradingViewSymbol: 'OANDA:JP225USD' },
  { symbol: 'IBOV', name: 'Ibovespa', tradingViewSymbol: 'BMFBOVESPA:IBOV' },
];

export async function getIndices(): Promise<MarketIndex[]> {
  const cached = await getCached<MarketIndex[]>(CACHE_KEY);
  if (cached) return cached;

  await setCache(CACHE_KEY, INDICES, CACHE_TTL);
  logger.info('Market indices metadata cached');
  return INDICES;
}
