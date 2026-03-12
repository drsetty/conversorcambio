import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Conversor de Câmbio Online',
  description:
    'Converta moedas em tempo real e acompanhe os principais índices financeiros globais.',
  keywords: [
    'conversor de câmbio',
    'conversão de moedas',
    'câmbio online',
    'cotação dólar',
    'cotação euro',
    'índices financeiros',
  ],
  openGraph: {
    title: 'Conversor de Câmbio Online',
    description:
      'Converta moedas em tempo real e acompanhe os principais índices financeiros globais.',
    url: 'https://conversorcambio.com',
    siteName: 'Conversor de Câmbio',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conversor de Câmbio Online',
    description:
      'Converta moedas em tempo real e acompanhe os principais índices financeiros globais.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
