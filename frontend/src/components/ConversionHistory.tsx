'use client';

import { useEffect, useState } from 'react';
import { getCurrency } from '@/utils/currencies';

export interface HistoryEntry {
  id: string;
  from: string;
  to: string;
  amount: string;
  result: number;
  rate: number;
  date: string;
  timestamp: number;
}

const STORAGE_KEY = 'conversion_history';
const MAX_ENTRIES = 10;

export function saveConversion(entry: Omit<HistoryEntry, 'id' | 'timestamp'>) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const history: HistoryEntry[] = raw ? JSON.parse(raw) : [];
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    history.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_ENTRIES)));
    window.dispatchEvent(new Event('history-updated'));
  } catch {}
}

export default function ConversionHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        setHistory(raw ? JSON.parse(raw) : []);
      } catch {
        setHistory([]);
      }
    };
    load();
    window.addEventListener('history-updated', load);
    return () => window.removeEventListener('history-updated', load);
  }, []);

  const clear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <div className="mx-auto mt-6 w-full max-w-2xl">
      <button
        onClick={() => setShow(!show)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition-all hover:border-gray-200 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600"
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Suas conversões recentes ({history.length})
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${show ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {show && (
        <div className="mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="max-h-[320px] divide-y divide-gray-50 overflow-y-auto dark:divide-gray-700/50">
            {history.map((entry) => {
              const fromInfo = getCurrency(entry.from);
              const toInfo = getCurrency(entry.to);
              const time = new Date(entry.timestamp);
              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {entry.amount} {entry.from} &rarr; {toInfo?.symbol}{' '}
                      {entry.result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                      {entry.to}
                    </p>
                    <p className="text-xs text-gray-400">
                      Taxa: 1 {entry.from} = {entry.rate.toFixed(4)} {entry.to}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400">
                      {time.toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-100 px-5 py-2 text-right dark:border-gray-700">
            <button
              onClick={clear}
              className="text-xs font-medium text-red-500 transition-colors hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            >
              Limpar histórico
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
