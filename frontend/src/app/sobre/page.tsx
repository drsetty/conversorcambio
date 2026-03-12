import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sobre | Conversor de Câmbio',
  description: 'Conheça o Conversor de Câmbio — ferramenta gratuita para conversão de moedas e acompanhamento dos mercados financeiros globais.',
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-white py-16">
        <article className="section-container max-w-3xl">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Sobre o Conversor de Câmbio
          </h1>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-600">
            <p>
              O <strong className="text-gray-900">ConversorCâmbio</strong> é uma plataforma financeira gratuita
              desenvolvida para oferecer informações precisas e atualizadas sobre o mercado de câmbio global.
              Nossa missão é democratizar o acesso a dados financeiros, permitindo que qualquer pessoa —
              investidores, viajantes, empresários ou estudantes — possa consultar cotações de moedas
              de forma rápida e confiável.
            </p>

            <h2 className="text-xl font-bold text-gray-900">O que oferecemos</h2>

            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>Conversor de moedas</strong> — Conversão instantânea entre as principais moedas
                do mundo, incluindo Real (BRL), Dólar (USD), Euro (EUR), Libra (GBP), Iene (JPY) e outras.
              </li>
              <li>
                <strong>Cotações em tempo real</strong> — Tabela com os principais pares de moedas
                atualizados diariamente com dados do Banco Central Europeu.
              </li>
              <li>
                <strong>Índices financeiros globais</strong> — Acompanhe em tempo real os principais
                índices: S&P 500, NASDAQ, Dow Jones, DAX, FTSE 100, Nikkei 225 e Ibovespa.
              </li>
              <li>
                <strong>Notícias financeiras</strong> — Últimas notícias dos principais portais
                financeiros do Brasil, como InfoMoney e MoneyTimes.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900">Nossos dados</h2>

            <p>
              As taxas de câmbio são obtidas através do Banco Central Europeu (BCE), uma das fontes
              mais confiáveis do mundo para dados de câmbio. As taxas são atualizadas diariamente
              e armazenadas em cache para garantir desempenho e disponibilidade.
            </p>

            <p>
              Os índices financeiros são fornecidos pelo TradingView, plataforma líder global
              em gráficos e análise de mercados financeiros.
            </p>

            <h2 className="text-xl font-bold text-gray-900">Compromisso</h2>

            <p>
              O ConversorCâmbio é um projeto independente comprometido com a transparência e a
              qualidade da informação. Não oferecemos recomendações de investimento — nosso objetivo
              é fornecer ferramentas e dados para que você tome suas próprias decisões financeiras
              de forma informada.
            </p>

            <p>
              Dúvidas ou sugestões? Entre em contato conosco pela nossa{' '}
              <a href="/contato" className="font-medium text-primary-600 hover:text-primary-700 underline">
                página de contato
              </a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
