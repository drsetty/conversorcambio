'use client';

import { useState, useCallback } from 'react';
import { convertCurrency } from '@/services/api';
import { ConversionResult } from '@/types';
import { saveConversion } from '@/components/ConversionHistory';

export function useCurrencyConverter() {
  const [amount, setAmount] = useState<string>('1.000,00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertWith = useCallback(async (from: string, to: string, rawAmount: string) => {
    const normalized = rawAmount.replace(/\./g, '').replace(',', '.');
    const numAmount = parseFloat(normalized);
    if (isNaN(numAmount) || numAmount <= 0) {
      setResult(null);
      setError('Insira um valor válido.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await convertCurrency(from, to, numAmount);
      setResult(data);

      saveConversion({
        from,
        to,
        amount: rawAmount,
        result: data.result,
        rate: data.rate,
        date: data.date,
      });
    } catch {
      setError('Erro ao converter moeda. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  const doConvert = useCallback(() => {
    convertWith(fromCurrency, toCurrency, amount);
  }, [convertWith, fromCurrency, toCurrency, amount]);

  const swap = useCallback(() => {
    const newFrom = toCurrency;
    const newTo = fromCurrency;
    setFromCurrency(newFrom);
    setToCurrency(newTo);

    if (result) {
      convertWith(newFrom, newTo, amount);
    }
  }, [fromCurrency, toCurrency, result, amount, convertWith]);

  return {
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
  };
}
