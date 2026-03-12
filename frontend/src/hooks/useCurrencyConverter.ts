'use client';

import { useState, useEffect, useCallback } from 'react';
import { convertCurrency } from '@/services/api';
import { useDebounce } from './useDebounce';
import { ConversionResult } from '@/types';

export function useCurrencyConverter() {
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedAmount = useDebounce(amount, 300);

  const doConvert = useCallback(async () => {
    const normalized = debouncedAmount.replace(/\./g, '').replace(',', '.');
    const numAmount = parseFloat(normalized);
    if (isNaN(numAmount) || numAmount <= 0) {
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await convertCurrency(fromCurrency, toCurrency, numAmount);
      setResult(data);
    } catch {
      setError('Erro ao converter moeda. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [debouncedAmount, fromCurrency, toCurrency]);

  useEffect(() => {
    doConvert();
  }, [doConvert]);

  const swap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

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
  };
}
