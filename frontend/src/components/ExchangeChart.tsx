'use client';

import { useRef, useEffect, useState } from 'react';

const PAIRS = [
  { label: 'USD/BRL', symbol: 'FX_IDC:USDBRL' },
  { label: 'EUR/BRL', symbol: 'FX_IDC:EURBRL' },
  { label: 'GBP/BRL', symbol: 'FX_IDC:GBPBRL' },
  { label: 'EUR/USD', symbol: 'FX_IDC:EURUSD' },
  { label: 'BTC/USD', symbol: 'BITSTAMP:BTCUSD' },
  { label: 'JPY/BRL', symbol: 'FX_IDC:JPYBRL' },
];

export default function ExchangeChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePair, setActivePair] = useState(PAIRS[0]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container';
    wrapper.style.height = '100%';
    wrapper.style.width = '100%';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = 'calc(100% - 32px)';
    widgetDiv.style.width = '100%';
    wrapper.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.textContent = JSON.stringify({
      autosize: true,
      symbol: activePair.symbol,
      interval: 'D',
      timezone: 'America/Sao_Paulo',
      theme: 'light',
      style: '1',
      locale: 'br',
      allow_symbol_change: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });

    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);
  }, [activePair]);

  return (
    <section id="grafico" className="bg-white py-12">
      <div className="section-container">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Gráfico Histórico de Câmbio
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Acompanhe a evolução das cotações ao longo do tempo
          </p>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {PAIRS.map((pair) => (
            <button
              key={pair.symbol}
              onClick={() => setActivePair(pair)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activePair.symbol === pair.symbol
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {pair.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div ref={containerRef} style={{ height: 480 }} />
        </div>
      </div>
    </section>
  );
}
