import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: 'Conversor de Câmbio Online — Cotação em Tempo Real | ConversorCâmbio',
    template: '%s | ConversorCâmbio',
  },
  description:
    'Converta moedas em tempo real com o ConversorCâmbio. Cotação do dólar, euro, libra e mais 12 moedas. Acompanhe índices financeiros, criptomoedas e notícias do mercado.',
  keywords: [
    'conversor de câmbio',
    'conversor de moedas',
    'conversão de moedas',
    'câmbio online',
    'cotação dólar hoje',
    'cotação euro hoje',
    'dólar para real',
    'euro para real',
    'câmbio em tempo real',
    'calculadora de câmbio',
    'cotação de moedas',
    'índices financeiros',
    'cotação criptomoedas',
    'bitcoin cotação',
    'mercado financeiro',
  ],
  metadataBase: new URL('https://www.conversorcambio.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Conversor de Câmbio Online — Cotação em Tempo Real',
    description:
      'Converta moedas em tempo real. Cotação do dólar, euro, libra e mais. Índices financeiros, criptomoedas e notícias do mercado.',
    url: 'https://www.conversorcambio.com',
    siteName: 'ConversorCâmbio',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conversor de Câmbio Online — Cotação em Tempo Real',
    description:
      'Converta moedas em tempo real. Cotação do dólar, euro, libra e mais. Índices financeiros, criptomoedas e notícias.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
