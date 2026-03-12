export interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ConversionResult {
  result: number;
  rate: number;
  from: string;
  to: string;
  amount: number;
  date: string;
}

export interface NewsItem {
  title: string;
  source: string;
  date: string;
  link: string;
  thumbnail: string | null;
}

export interface NewsResponse {
  items: NewsItem[];
  count: number;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  tradingViewSymbol: string;
}

export interface IndicesResponse {
  indices: MarketIndex[];
}

export interface Currency {
  code: string;
  name: string;
  flag: string;
  symbol: string;
}
