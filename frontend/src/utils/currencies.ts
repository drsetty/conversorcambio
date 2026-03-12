import { Currency } from '@/types';

export const currencies: Currency[] = [
  { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷', symbol: 'R$' },
  { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧', symbol: '£' },
  { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵', symbol: '¥' },
  { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦', symbol: 'C$' },
  { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺', symbol: 'A$' },
  { code: 'CHF', name: 'Franco Suíço', flag: '🇨🇭', symbol: 'CHF' },
  { code: 'CNY', name: 'Yuan Chinês', flag: '🇨🇳', symbol: '¥' },
  { code: 'MXN', name: 'Peso Mexicano', flag: '🇲🇽', symbol: 'Mex$' },
  { code: 'INR', name: 'Rupia Indiana', flag: '🇮🇳', symbol: '₹' },
  { code: 'KRW', name: 'Won Sul-Coreano', flag: '🇰🇷', symbol: '₩' },
];

export function getCurrency(code: string): Currency | undefined {
  return currencies.find((c) => c.code === code);
}
