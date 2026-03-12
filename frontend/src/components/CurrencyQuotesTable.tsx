'use client';

import { useEffect, useRef } from 'react';

const FOREX_GROUPS = [
  {
    name: 'Principais Pares (BRL)',
    symbols: [
      { s: 'FX_IDC:USDBRL', d: 'Dólar/Real' },
      { s: 'FX_IDC:EURBRL', d: 'Euro/Real' },
      { s: 'FX_IDC:GBPBRL', d: 'Libra/Real' },
      { s: 'FX_IDC:JPYBRL', d: 'Iene/Real' },
      { s: 'FX_IDC:CHFBRL', d: 'Franco Suíço/Real' },
      { s: 'FX_IDC:CADBRL', d: 'Dólar Canadense/Real' },
      { s: 'FX_IDC:AUDBRL', d: 'Dólar Australiano/Real' },
    ],
  },
  {
    name: 'Pares Globais',
    symbols: [
      { s: 'FX:EURUSD', d: 'EUR/USD' },
      { s: 'FX:GBPUSD', d: 'GBP/USD' },
      { s: 'FX:USDJPY', d: 'USD/JPY' },
      { s: 'FX:USDCHF', d: 'USD/CHF' },
      { s: 'FX:AUDUSD', d: 'AUD/USD' },
      { s: 'FX:USDCAD', d: 'USD/CAD' },
      { s: 'FX:EURGBP', d: 'EUR/GBP' },
      { s: 'FX:EURJPY', d: 'EUR/JPY' },
      { s: 'FX:GBPJPY', d: 'GBP/JPY' },
      { s: 'FX:USDMXN', d: 'USD/MXN' },
      { s: 'FX:USDCNY', d: 'USD/CNY' },
      { s: 'FX:USDINR', d: 'USD/INR' },
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
