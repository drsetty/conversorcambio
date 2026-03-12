'use client';

import { useEffect, useRef } from 'react';

const FOREX_GROUPS = [
  {
    name: 'Principais Pares (BRL)',
    symbols: [
      { name: 'FX_IDC:USDBRL', displayName: 'Dólar/Real' },
      { name: 'FX_IDC:EURBRL', displayName: 'Euro/Real' },
      { name: 'FX_IDC:GBPBRL', displayName: 'Libra/Real' },
      { name: 'FX_IDC:JPYBRL', displayName: 'Iene/Real' },
      { name: 'FX_IDC:CHFBRL', displayName: 'Franco Suíço/Real' },
      { name: 'FX_IDC:CADBRL', displayName: 'Dólar Canadense/Real' },
      { name: 'FX_IDC:AUDBRL', displayName: 'Dólar Australiano/Real' },
    ],
  },
  {
    name: 'Pares Globais',
    symbols: [
      { name: 'FX_IDC:EURUSD', displayName: 'EUR/USD' },
      { name: 'FX_IDC:GBPUSD', displayName: 'GBP/USD' },
      { name: 'FX_IDC:USDJPY', displayName: 'USD/JPY' },
      { name: 'FX_IDC:USDCHF', displayName: 'USD/CHF' },
      { name: 'FX_IDC:AUDUSD', displayName: 'AUD/USD' },
      { name: 'FX_IDC:USDCAD', displayName: 'USD/CAD' },
      { name: 'FX_IDC:EURGBP', displayName: 'EUR/GBP' },
      { name: 'FX_IDC:EURJPY', displayName: 'EUR/JPY' },
      { name: 'FX_IDC:GBPJPY', displayName: 'GBP/JPY' },
      { name: 'FX_IDC:USDMXN', displayName: 'USD/MXN' },
      { name: 'FX_IDC:USDCNY', displayName: 'USD/CNY' },
      { name: 'FX_IDC:USDINR', displayName: 'USD/INR' },
    ],
  },
];

export default function CurrencyQuotesTable() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetContainer.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.async = true;
    script.type = 'text/javascript';
    script.textContent = JSON.stringify({
      title: 'Câmbio',
      width: '100%',
      height: 660,
      symbolsGroups: FOREX_GROUPS,
      showSymbolLogo: true,
      isTransparent: false,
      colorTheme: 'light',
      locale: 'br',
      backgroundColor: '#ffffff',
    });

    widgetContainer.appendChild(script);
    containerRef.current.appendChild(widgetContainer);
  }, []);

  return (
    <section id="cotacoes" className="py-16">
      <div className="section-container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Principais Cotações de Moedas em Tempo Real
          </h2>
          <p className="mt-2 text-gray-500">
            Acompanhe os pares de moedas mais negociados do mundo
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div ref={containerRef} />
        </div>
      </div>
    </section>
  );
}
