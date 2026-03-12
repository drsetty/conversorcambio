'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchRates } from '@/services/api';
import { ExchangeRates } from '@/types';

interface CurrencyPair {
  pair: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
}

const MAJOR_PAIRS: CurrencyPair[] = [
  { pair: 'USD/BRL', from: 'USD', to: 'BRL', fromFlag: '🇺🇸', toFlag: '🇧🇷' },
  { pair: 'EUR/BRL', from: 'EUR', to: 'BRL', fromFlag: '🇪🇺', toFlag: '🇧🇷' },
  { pair: 'GBP/BRL', from: 'GBP', to: 'BRL', fromFlag: '🇬🇧', toFlag: '🇧🇷' },
  { pair: 'EUR/USD', from: 'EUR', to: 'USD', fromFlag: '🇪🇺', toFlag: '🇺🇸' },
  { pair: 'GBP/USD', from: 'GBP', to: 'USD', fromFlag: '🇬🇧', toFlag: '🇺🇸' },
  { pair: 'USD/JPY', from: 'USD', to: 'JPY', fromFlag: '🇺🇸', toFlag: '🇯🇵' },
  { pair: 'USD/CHF', from: 'USD', to: 'CHF', fromFlag: '🇺🇸', toFlag: '🇨🇭' },
  { pair: 'AUD/USD', from: 'AUD', to: 'USD', fromFlag: '🇦🇺', toFlag: '🇺🇸' },
  { pair: 'USD/CAD', from: 'USD', to: 'CAD', fromFlag: '🇺🇸', toFlag: '🇨🇦' },
  { pair: 'USD/CNY', from: 'USD', to: 'CNY', fromFlag: '🇺🇸', toFlag: '🇨🇳' },
  { pair: 'USD/MXN', from: 'USD', to: 'MXN', fromFlag: '🇺🇸', toFlag: '🇲🇽' },
  { pair: 'USD/INR', from: 'USD', to: 'INR', fromFlag: '🇺🇸', toFlag: '🇮🇳' },
];

interface QuoteRow {
  pair: string;
  fromFlag: string;
  toFlag: string;
  rate: number;
  inverse: number;
}

export default function CurrencyQuotesTable() {
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');

  const loadRates = useCallback(async () => {
    try {
      const data: ExchangeRates = await fetchRates();
      const rows: QuoteRow[] = MAJOR_PAIRS.map((p) => {
        const fromRate = data.rates[p.from] || 1;
        const toRate = data.rates[p.to] || 1;
        const rate = toRate / fromRate;
        return {
          pair: p.pair,
          fromFlag: p.fromFlag,
          toFlag: p.toFlag,
          rate,
          inverse: 1 / rate,
        };
      });
      setQuotes(rows);
      setLastUpdate(data.date);
    } catch {
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRates();
    const interval = setInterval(loadRates, 60000);
    return () => clearInterval(interval);
  }, [loadRates]);

  function formatRate(value: number, decimals: number = 4): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  return (
    <section id="cotacoes" className="py-16">
      <div className="section-container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Principais Cotações de Moedas em Tempo Real
          </h2>
          <p className="mt-2 text-gray-500">
            Acompanhe os pares de moedas mais negociados do mundo
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
          </div>
        ) : quotes.length === 0 ? (
          <p className="py-12 text-center text-gray-400">
            Cotações indisponíveis no momento.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Par
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Cotação
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Inverso
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {quotes.map((q) => (
                    <tr
                      key={q.pair}
                      className="transition-colors hover:bg-primary-50/30"
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center -space-x-1 text-base">
                            <span>{q.fromFlag}</span>
                            <span>{q.toFlag}</span>
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {q.pair}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <span className="text-sm font-semibold tabular-nums text-gray-900">
                          {formatRate(q.rate)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <span className="text-sm tabular-nums text-gray-500">
                          {formatRate(q.inverse)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {lastUpdate && (
              <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-right text-xs text-gray-400">
                Última atualização: {new Date(lastUpdate).toLocaleDateString('pt-BR')}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
