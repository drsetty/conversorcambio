'use client';

import { useEffect, useRef } from 'react';

const CRYPTO_GROUPS = [
  {
    name: 'Principais Criptomoedas',
    symbols: [
      { name: 'BINANCE:BTCUSDT', displayName: 'Bitcoin' },
      { name: 'BINANCE:ETHUSDT', displayName: 'Ethereum' },
      { name: 'BINANCE:BNBUSDT', displayName: 'BNB' },
      { name: 'BINANCE:XRPUSDT', displayName: 'XRP' },
      { name: 'BINANCE:SOLUSDT', displayName: 'Solana' },
      { name: 'BINANCE:ADAUSDT', displayName: 'Cardano' },
      { name: 'BINANCE:DOGEUSDT', displayName: 'Dogecoin' },
      { name: 'BINANCE:TRXUSDT', displayName: 'TRON' },
      { name: 'BINANCE:LINKUSDT', displayName: 'Chainlink' },
      { name: 'BINANCE:AVAXUSDT', displayName: 'Avalanche' },
    ],
  },
  {
    name: 'Altcoins Populares',
    symbols: [
      { name: 'BINANCE:DOTUSDT', displayName: 'Polkadot' },
      { name: 'BINANCE:MATICUSDT', displayName: 'Polygon' },
      { name: 'BINANCE:LTCUSDT', displayName: 'Litecoin' },
      { name: 'BINANCE:BCHUSDT', displayName: 'Bitcoin Cash' },
      { name: 'BINANCE:UNIUSDT', displayName: 'Uniswap' },
      { name: 'BINANCE:XLMUSDT', displayName: 'Stellar' },
      { name: 'BINANCE:ATOMUSDT', displayName: 'Cosmos' },
      { name: 'BINANCE:NEARUSDT', displayName: 'NEAR Protocol' },
      { name: 'BINANCE:AAVEUSDT', displayName: 'Aave' },
      { name: 'BINANCE:APTUSDT', displayName: 'Aptos' },
    ],
  },
];

export default function CryptoQuotesTable() {
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
      title: 'Criptomoedas',
      width: '100%',
      height: 660,
      symbolsGroups: CRYPTO_GROUPS,
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
    <section id="crypto" className="py-16 bg-gray-50">
      <div className="section-container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Principais Cotações de Criptomoedas em Tempo Real
          </h2>
          <p className="mt-2 text-gray-500">
            Acompanhe as criptomoedas mais negociadas do mundo
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div ref={containerRef} />
        </div>
      </div>
    </section>
  );
}
