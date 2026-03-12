'use client';

import { useEffect, useRef } from 'react';

interface IndexWidget {
  name: string;
  symbol: string;
}

const indices: IndexWidget[] = [
  { name: 'S&P 500', symbol: 'FOREXCOM:SPXUSD' },
  { name: 'NASDAQ', symbol: 'OANDA:NAS100USD' },
  { name: 'Dow Jones', symbol: 'FOREXCOM:DJI' },
  { name: 'DAX', symbol: 'XETR:DAX' },
  { name: 'FTSE 100', symbol: 'OANDA:UK100GBP' },
  { name: 'Nikkei 225', symbol: 'OANDA:JP225USD' },
  { name: 'Ibovespa', symbol: 'BMFBOVESPA:IBOV' },
];

function TradingViewMiniWidget({ symbol, name }: IndexWidget) {
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
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.type = 'text/javascript';
    script.textContent = JSON.stringify({
      symbol,
      width: '100%',
      height: '100%',
      locale: 'br',
      dateRange: '1D',
      colorTheme: 'light',
      isTransparent: true,
      autosize: true,
      largeChartUrl: '',
      noTimeScale: true,
      chartOnly: false,
    });

    widgetContainer.appendChild(script);
    containerRef.current.appendChild(widgetContainer);
  }, [symbol]);

  return (
    <div className="flex min-w-[280px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="border-b border-gray-50 px-4 pt-3 pb-1">
        <h3 className="text-sm font-semibold text-gray-700">{name}</h3>
      </div>
      <div ref={containerRef} className="h-[180px] w-full" />
    </div>
  );
}

export default function MarketIndices() {
  return (
    <section id="mercados" className="py-16">
      <div className="section-container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Índices Financeiros Globais
          </h2>
          <p className="mt-2 text-gray-500">
            Acompanhe os principais mercados em tempo real
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {indices.map((index) => (
            <TradingViewMiniWidget key={index.symbol} {...index} />
          ))}
        </div>
      </div>
    </section>
  );
}
