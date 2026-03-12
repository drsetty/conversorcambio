'use client';

import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { getCurrency } from '@/utils/currencies';
import CurrencySelector from './CurrencySelector';

function formatCurrencyInput(raw: string): string {
  let clean = raw.replace(/[^0-9,]/g, '');

  const parts = clean.split(',');
  if (parts.length > 2) {
    clean = parts[0] + ',' + parts.slice(1).join('');
  }

  const [intPart, decPart] = clean.split(',');

  const digits = intPart.replace(/^0+(?=\d)/, '');

  const withDots = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (decPart !== undefined) {
    return withDots + ',' + decPart.slice(0, 2);
  }
  return withDots;
}

function completeDecimals(value: string): string {
  if (!value) return '0,00';
  if (!value.includes(',')) return value + ',00';
  const [intPart, decPart] = value.split(',');
  return intPart + ',' + (decPart || '').padEnd(2, '0').slice(0, 2);
}

export default function CurrencyConverter() {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    loading,
    error,
    swap,
    doConvert,
  } = useCurrencyConverter();

  const fromInfo = getCurrency(fromCurrency);
  const toInfo = getCurrency(toCurrency);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doConvert();
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-primary-900/5 dark:border-gray-700 dark:bg-gray-800 dark:shadow-black/20 sm:p-8">
        <div className="mb-6">
          <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Valor
          </label>
          <div className="relative mt-1.5">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
              {fromInfo?.symbol}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => {
                const masked = formatCurrencyInput(e.target.value);
                setAmount(masked);
              }}
              onBlur={() => setAmount(completeDecimals(amount))}
              onKeyDown={handleKeyDown}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-lg font-semibold text-gray-900 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700"
              placeholder="0,00"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <CurrencySelector
            value={fromCurrency}
            onChange={setFromCurrency}
            label="De"
          />

          <div className="flex items-end justify-center">
            <button
              onClick={swap}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-all hover:border-primary-300 hover:text-primary-600 hover:shadow-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:text-primary-400"
              aria-label="Inverter moedas"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <CurrencySelector
            value={toCurrency}
            onChange={setToCurrency}
            label="Para"
          />
        </div>

        <button
          onClick={doConvert}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-primary-600 py-3.5 text-lg font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-700/25 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-gray-800"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Convertendo...
            </span>
          ) : (
            'Converter'
          )}
        </button>

        <div className="mt-6 min-h-[80px]">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && result && (
            <div className="rounded-xl bg-gradient-to-r from-primary-50 to-blue-50 p-5 text-center dark:from-primary-900/30 dark:to-blue-900/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {amount || '0'} {fromInfo?.name}
              </p>
              <p className="mt-1 text-3xl font-bold text-primary-900 dark:text-primary-300">
                {toInfo?.symbol} {result.result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency} &middot; Atualizado em {result.date}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
