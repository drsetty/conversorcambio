'use client';

import { useState, useCallback } from 'react';
import { convertCurrency } from '@/services/api';

const IOF_RATES = [
  { id: 'card', label: 'Cartão de crédito/débito', rate: 0.0438, desc: '4,38%' },
  { id: 'cash', label: 'Compra de moeda em espécie', rate: 0.011, desc: '1,10%' },
  { id: 'wire', label: 'Transferência internacional', rate: 0.011, desc: '1,10%' },
  { id: 'prepaid', label: 'Cartão pré-pago / conta digital', rate: 0.0438, desc: '4,38%' },
];

const DESTINATIONS = [
  { code: 'USD', label: 'Estados Unidos (USD)', flag: '🇺🇸' },
  { code: 'EUR', label: 'Europa (EUR)', flag: '🇪🇺' },
  { code: 'GBP', label: 'Reino Unido (GBP)', flag: '🇬🇧' },
  { code: 'JPY', label: 'Japão (JPY)', flag: '🇯🇵' },
  { code: 'CAD', label: 'Canadá (CAD)', flag: '🇨🇦' },
  { code: 'AUD', label: 'Austrália (AUD)', flag: '🇦🇺' },
  { code: 'CHF', label: 'Suíça (CHF)', flag: '🇨🇭' },
  { code: 'MXN', label: 'México (MXN)', flag: '🇲🇽' },
];

interface TravelResult {
  converted: number;
  iofAmount: number;
  totalBRL: number;
  rate: number;
  dailyBudget: number;
  currency: string;
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatForeign(value: number, currency: string): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + currency;
}

export default function TravelCalculator() {
  const [budgetBRL, setBudgetBRL] = useState('5.000');
  const [destination, setDestination] = useState('USD');
  const [days, setDays] = useState('7');
  const [iofType, setIofType] = useState('card');
  const [result, setResult] = useState<TravelResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async () => {
    const normalized = budgetBRL.replace(/\./g, '').replace(',', '.');
    const numBudget = parseFloat(normalized);
    const numDays = parseInt(days, 10);

    if (isNaN(numBudget) || numBudget <= 0) {
      setError('Insira um orçamento válido.');
      return;
    }
    if (isNaN(numDays) || numDays <= 0) {
      setError('Insira a quantidade de dias.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await convertCurrency('BRL', destination, numBudget);
      const iof = IOF_RATES.find((i) => i.id === iofType)!;
      const iofAmount = numBudget * iof.rate;
      const totalBRL = numBudget + iofAmount;

      const effectiveRate = data.rate * (1 + iof.rate);
      const convertedAfterIOF = numBudget / (1 / data.rate * (1 + iof.rate));

      const converted = data.result - (data.result * iof.rate);
      const dailyBudget = converted / numDays;

      setResult({
        converted,
        iofAmount,
        totalBRL,
        rate: data.rate,
        dailyBudget,
        currency: destination,
      });
    } catch {
      setError('Erro ao calcular. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [budgetBRL, destination, days, iofType]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') calculate();
  };

  const selectedDest = DESTINATIONS.find((d) => d.code === destination);

  return (
    <section id="viagem" className="bg-gradient-to-b from-gray-50 to-white py-12 dark:from-gray-800 dark:to-gray-900">
      <div className="section-container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Calculadora de Viagem
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Descubra quanto você terá no destino, já com IOF incluso
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Orçamento */}
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Orçamento em R$
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={budgetBRL}
                  onChange={(e) => setBudgetBRL(e.target.value.replace(/[^0-9.,]/g, ''))}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-lg font-semibold text-gray-900 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700"
                  placeholder="5.000"
                />
              </div>
            </div>

            {/* Destino */}
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Destino
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.flag} {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dias */}
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Dias de viagem
              </label>
              <input
                type="number"
                min={1}
                max={365}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                onKeyDown={handleKeyDown}
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700"
                placeholder="7"
              />
            </div>

            {/* IOF */}
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Forma de pagamento
              </label>
              <select
                value={iofType}
                onChange={(e) => setIofType(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {IOF_RATES.map((iof) => (
                  <option key={iof.id} value={iof.id}>
                    {iof.label} — IOF {iof.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={calculate}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-primary-600 py-3.5 text-lg font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-gray-800"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Calculando...
              </span>
            ) : (
              'Calcular Viagem'
            )}
          </button>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && result && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ResultCard
                label="Você terá no destino"
                value={formatForeign(result.converted, result.currency)}
                accent
              />
              <ResultCard
                label="Orçamento diário"
                value={formatForeign(result.dailyBudget, result.currency)}
                sub={`${days} dias`}
              />
              <ResultCard
                label="IOF estimado"
                value={formatBRL(result.iofAmount)}
                sub={IOF_RATES.find((i) => i.id === iofType)?.desc}
              />
              <ResultCard
                label="Custo total em R$"
                value={formatBRL(result.totalBRL)}
                sub={`Câmbio + IOF`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ResultCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        accent
          ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-600/20'
          : 'bg-gray-50 dark:bg-gray-700/50'
      }`}
    >
      <p className={`text-xs font-medium uppercase tracking-wide ${accent ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'}`}>
        {label}
      </p>
      <p className={`mt-1 text-xl font-bold ${accent ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {value}
      </p>
      {sub && (
        <p className={`mt-0.5 text-xs ${accent ? 'text-primary-200' : 'text-gray-400'}`}>{sub}</p>
      )}
    </div>
  );
}
