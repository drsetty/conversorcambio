'use client';

import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { getCurrency } from '@/utils/currencies';
import CurrencySelector from './CurrencySelector';

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
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-primary-900/5 sm:p-8">
        <div className="mb-6">
          <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
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
                const val = e.target.value.replace(/[^0-9.,]/g, '');
                setAmount(val);
              }}
              onKeyDown={handleKeyDown}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-lg font-semibold text-gray-900 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="0.00"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-all hover:border-primary-300 hover:text-primary-600 hover:shadow-md"
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
          className="mt-6 w-full rounded-xl bg-primary-600 py-3.5 text-lg font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-700/25 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
            <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && result && (
            <div className="rounded-xl bg-gradient-to-r from-primary-50 to-blue-50 p-5 text-center">
              <p className="text-sm text-gray-500">
                {Number(amount.replace(/\./g, '').replace(',', '.')).toLocaleString('pt-BR') || '0'} {fromInfo?.name}
              </p>
              <p className="mt-1 text-3xl font-bold text-primary-900">
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
