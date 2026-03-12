import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CurrencyConverter from '@/components/CurrencyConverter';
import MarketIndices from '@/components/MarketIndices';
import NewsFeed from '@/components/NewsFeed';
import AdBanner, { AffiliateSection } from '@/components/AdBanner';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero + Conversor */}
        <section
          id="conversor"
          className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-600 to-primary-500 pb-24 pt-16 sm:pt-20"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

          <div className="section-container relative">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Conversor de Câmbio em Tempo Real
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
                Converta moedas globais instantaneamente e acompanhe os mercados financeiros.
              </p>
            </div>

            <CurrencyConverter />
          </div>
        </section>

        {/* Ad slot abaixo da calculadora */}
        <AdBanner slot="1234567890" format="horizontal" className="bg-white py-2" />

        {/* Índices Financeiros */}
        <MarketIndices />

        {/* Notícias Financeiras */}
        <NewsFeed />

        {/* Ad slot entre notícias e afiliados */}
        <AdBanner slot="0987654321" format="horizontal" />

        {/* Afiliados */}
        <AffiliateSection />

        {/* Ad slot no rodapé */}
        <AdBanner slot="1122334455" format="horizontal" className="bg-gray-50 py-2" />
      </main>

      <Footer />
    </>
  );
}
