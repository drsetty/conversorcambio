import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Conversor de Câmbio',
  description: 'Política de Privacidade do Conversor de Câmbio — saiba como tratamos seus dados pessoais.',
};

export default function PrivacidadePage() {
  const lastUpdate = '12 de março de 2026';

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-white py-16">
        <article className="section-container max-w-3xl">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-2 text-sm text-gray-400">Última atualização: {lastUpdate}</p>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-600">
            <p>
              O <strong className="text-gray-900">ConversorCâmbio</strong> (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo;),
              acessível em <strong>conversorcambio.com</strong>, tem o compromisso de proteger a privacidade
              dos seus usuários. Esta Política de Privacidade descreve como coletamos, usamos e
              protegemos suas informações ao utilizar nosso site.
            </p>

            <h2 className="text-xl font-bold text-gray-900">1. Informações que coletamos</h2>

            <p><strong>1.1 Dados fornecidos voluntariamente</strong></p>
            <p>
              Quando você utiliza nosso formulário de contato, coletamos: nome, endereço de e-mail
              e o conteúdo da mensagem enviada. Esses dados são utilizados exclusivamente para
              responder à sua solicitação.
            </p>

            <p><strong>1.2 Dados coletados automaticamente</strong></p>
            <p>
              Ao acessar nosso site, podemos coletar automaticamente informações como: endereço IP,
              tipo de navegador, sistema operacional, páginas visitadas, tempo de permanência e
              dados de cookies. Esses dados são utilizados para melhorar a experiência do usuário
              e para fins analíticos.
            </p>

            <h2 className="text-xl font-bold text-gray-900">2. Uso das informações</h2>

            <p>Utilizamos as informações coletadas para:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Fornecer e manter nossos serviços de conversão de moedas e informações financeiras;</li>
              <li>Responder a mensagens e solicitações de contato;</li>
              <li>Analisar o uso do site para melhorias contínuas;</li>
              <li>Exibir anúncios relevantes através do Google AdSense;</li>
              <li>Cumprir obrigações legais aplicáveis.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900">3. Cookies</h2>

            <p>
              Nosso site utiliza cookies para melhorar sua experiência de navegação. Cookies são
              pequenos arquivos de texto armazenados no seu dispositivo. Utilizamos cookies próprios
              e de terceiros (como Google AdSense e Google Analytics) para personalizar conteúdo,
              analisar tráfego e exibir anúncios. Você pode configurar seu navegador para recusar
              cookies, mas isso pode afetar a funcionalidade do site.
            </p>

            <h2 className="text-xl font-bold text-gray-900">4. Google AdSense</h2>

            <p>
              Utilizamos o Google AdSense para exibir anúncios em nosso site. O Google e seus parceiros
              podem usar cookies para exibir anúncios com base em visitas anteriores ao nosso site
              ou a outros sites na internet. Você pode desativar a publicidade personalizada acessando
              as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
              className="font-medium text-primary-600 hover:text-primary-700 underline">
              Configurações de anúncios do Google</a>.
            </p>

            <h2 className="text-xl font-bold text-gray-900">5. Compartilhamento de dados</h2>

            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros,
              exceto nas seguintes situações:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Quando necessário para cumprir obrigações legais;</li>
              <li>Para proteger nossos direitos, propriedade ou segurança;</li>
              <li>Com provedores de serviços que nos auxiliam na operação do site (ex: hospedagem, analytics).</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900">6. Segurança</h2>

            <p>
              Adotamos medidas técnicas e organizacionais para proteger suas informações contra
              acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum
              método de transmissão pela internet é 100% seguro.
            </p>

            <h2 className="text-xl font-bold text-gray-900">7. Seus direitos</h2>

            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018),
              você tem direito a:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Confirmar a existência de tratamento de dados pessoais;</li>
              <li>Acessar seus dados pessoais;</li>
              <li>Solicitar a correção de dados incompletos ou desatualizados;</li>
              <li>Solicitar a exclusão de dados pessoais;</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>

            <p>
              Para exercer seus direitos, entre em contato conosco através da nossa{' '}
              <a href="/contato" className="font-medium text-primary-600 hover:text-primary-700 underline">
                página de contato
              </a>.
            </p>

            <h2 className="text-xl font-bold text-gray-900">8. Links externos</h2>

            <p>
              Nosso site pode conter links para sites de terceiros. Não nos responsabilizamos
              pelas práticas de privacidade desses sites. Recomendamos a leitura das políticas
              de privacidade de cada site que você visitar.
            </p>

            <h2 className="text-xl font-bold text-gray-900">9. Alterações nesta política</h2>

            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que
              você revise esta página regularmente. Alterações entram em vigor imediatamente
              após sua publicação no site.
            </p>

            <h2 className="text-xl font-bold text-gray-900">10. Contato</h2>

            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato pelo
              e-mail <strong>leonardoaziz@gmail.com</strong> ou pela nossa{' '}
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
