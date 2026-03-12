'use client';

import { currencies } from '@/utils/currencies';

interface CurrencySelectorProps {
  value: string;
  onChange: (code: string) => void;
  label: string;
}

export default function CurrencySelector({ value, onChange, label }: CurrencySelectorProps) {
  const selected = currencies.find((c) => c.code === value);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-10 text-sm font-medium text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} — {c.name}
            </option>
          ))}
        </select>
        {selected && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
            {selected.flag}
          </span>
        )}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
