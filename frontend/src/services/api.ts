import axios from 'axios';
import { ExchangeRates, ConversionResult, NewsResponse, IndicesResponse } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  timeout: 10000,
});

export async function fetchRates(): Promise<ExchangeRates> {
  const { data } = await api.get<ExchangeRates>('/api/rates');
  return data;
}

export async function convertCurrency(
  from: string,
  to: string,
  amount: number
): Promise<ConversionResult> {
  const { data } = await api.get<ConversionResult>('/api/rates', {
    params: { from, to, amount },
  });
  return data;
}

export async function fetchNews(): Promise<NewsResponse> {
  const { data } = await api.get<NewsResponse>('/api/news');
  return data;
}

export async function fetchIndices(): Promise<IndicesResponse> {
  const { data } = await api.get<IndicesResponse>('/api/indices');
  return data;
}
