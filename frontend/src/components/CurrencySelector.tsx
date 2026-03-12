'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { currencies, getFlagUrl } from '@/utils/currencies';

interface CurrencySelectorProps {
  value: string;
  onChange: (code: string) => void;
  label: string;
}

export default function CurrencySelector({ value, onChange, label }: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = currencies.find((c) => c.code === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </label>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-10 text-left text-sm font-medium text-gray-900 transition-all hover:border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          {selected && (
            <Image
              src={getFlagUrl(selected.flag)}
              alt={selected.name}
              width={24}
              height={16}
              className="rounded-sm object-cover"
              unoptimized
            />
          )}
          <span>{selected?.code} — {selected?.name}</span>
        </button>

        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>

        {open && (
          <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
            {currencies.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-primary-50 ${
                  c.code === value ? 'bg-primary-50 font-semibold text-primary-700' : 'text-gray-700'
                }`}
              >
                <Image
                  src={getFlagUrl(c.flag)}
                  alt={c.name}
                  width={24}
                  height={16}
                  className="rounded-sm object-cover"
                  unoptimized
                />
                <span>{c.code}</span>
                <span className="text-gray-400">—</span>
                <span className="truncate">{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
