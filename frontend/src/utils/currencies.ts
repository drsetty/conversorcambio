import { Currency } from '@/types';

export const currencies: Currency[] = [
  { code: 'BRL', name: 'Real Brasileiro', flag: 'br', symbol: 'R$' },
  { code: 'USD', name: 'Dólar Americano', flag: 'us', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: 'eu', symbol: '€' },
  { code: 'GBP', name: 'Libra Esterlina', flag: 'gb', symbol: '£' },
  { code: 'JPY', name: 'Iene Japonês', flag: 'jp', symbol: '¥' },
  { code: 'CAD', name: 'Dólar Canadense', flag: 'ca', symbol: 'C$' },
  { code: 'AUD', name: 'Dólar Australiano', flag: 'au', symbol: 'A$' },
  { code: 'CHF', name: 'Franco Suíço', flag: 'ch', symbol: 'CHF' },
  { code: 'CNY', name: 'Yuan Chinês', flag: 'cn', symbol: '¥' },
  { code: 'MXN', name: 'Peso Mexicano', flag: 'mx', symbol: 'Mex$' },
  { code: 'INR', name: 'Rupia Indiana', flag: 'in', symbol: '₹' },
  { code: 'KRW', name: 'Won Sul-Coreano', flag: 'kr', symbol: '₩' },
];

export function getCurrency(code: string): Currency | undefined {
  return currencies.find((c) => c.code === code);
}

export function getFlagUrl(countryCode: string, size: number = 40): string {
  return `https://flagcdn.com/w${size}/${countryCode}.png`;
}
