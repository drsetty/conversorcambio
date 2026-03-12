'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const w = window as unknown as Record<string, unknown>;
      if (w.adsbygoogle) {
        (w.adsbygoogle as unknown[]).push({});
      }
    } catch {
      // AdSense not loaded
    }
  }, []);

  return (
    <div className={`mx-auto my-6 flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AffiliateSection() {
  const affiliates = [
    {
      name: 'Wise',
      description: 'Transferências internacionais com as melhores taxas do mercado.',
      url: '#',
      badge: 'Câmbio',
    },
    {
      name: 'XP Investimentos',
      description: 'Plataforma completa para investir no Brasil e no exterior.',
      url: '#',
      badge: 'Investimentos',
    },
    {
      name: 'Interactive Brokers',
      description: 'Acesse mercados globais com comissões competitivas.',
      url: '#',
      badge: 'Corretora',
    },
  ];

  return (
    <section className="py-16">
      <div className="section-container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Ferramentas Financeiras Recomendadas
          </h2>
          <p className="mt-2 text-gray-500">
            Plataformas confiáveis para suas operações financeiras
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {affiliates.map((aff) => (
            <a
              key={aff.name}
              href={aff.url}
              rel="sponsored noopener noreferrer"
              target="_blank"
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                {aff.badge}
              </span>
              <h3 className="mt-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                {aff.name}
              </h3>
              <p className="mt-1.5 text-sm text-gray-500">{aff.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                Saiba mais
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
