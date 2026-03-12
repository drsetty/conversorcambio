'use client';

const AFFILIATE_URL = 'https://amzn.to/3NzBkAa';

export default function AmazonBanner() {
  return (
    <div className="py-6">
      <div className="section-container">
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="group block overflow-hidden rounded-2xl bg-gradient-to-r from-[#131921] to-[#232f3e] shadow-lg transition-all hover:shadow-xl"
        >
          <div className="flex flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:px-10 sm:py-6">
            {/* Logo Amazon */}
            <div className="flex shrink-0 items-center gap-3">
              <svg className="h-8 w-8 text-[#ff9900]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.045 18.02c.07-.116.36-.468.536-.648C1.756 16.13 3.24 14.776 4.92 13.8c.24-.14.48-.26.73-.37l.12-.06c.08-.03.17-.06.26-.1.2-.07.39-.14.59-.19.6-.17 1.22-.27 1.84-.3h.18c.62.03 1.24.13 1.84.3.2.05.39.12.58.19l.13.05.12.05c.25.11.5.23.73.37 1.68.98 3.16 2.33 4.34 3.57.18.18.46.53.54.65l-.01.01c-.12.07-.41.2-.59.27-.72.27-1.47.5-2.23.67-.36.08-.71.15-1.07.2-1.78.22-3.53-.1-5.27-.56l-.47-.14c-.16-.05-.33-.12-.49-.19l-.03-.01a28.4 28.4 0 01-3.18-1.54c-.39-.22-.77-.45-1.14-.69-.12-.08-.21-.14-.27-.19z" />
                <path d="M21.54 17.88c-.23.33-.82.83-1.17 1.06-.36.23-.73.42-1.12.57-.4.15-.81.26-1.23.3h-.06c-.42-.03-.84-.14-1.23-.3-.4-.15-.77-.34-1.12-.57-.36-.23-.94-.73-1.17-1.06 0 0-.02-.03 0-.05.02-.02.05 0 .05 0 .74.41 1.53.73 2.35.93.42.1.84.16 1.27.17.43-.01.85-.07 1.27-.17.82-.2 1.61-.52 2.35-.93 0 0 .03-.02.05 0 .02.02 0 .05-.01.05z" />
              </svg>
              <div>
                <p className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  amazon
                </p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#ff9900]">
                  Ofertas do Dia
                </p>
              </div>
            </div>

            {/* Divisor vertical (desktop) / horizontal (mobile) */}
            <div className="h-px w-full bg-gray-600/50 sm:h-16 sm:w-px" />

            {/* Texto */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lg font-bold leading-tight text-white sm:text-xl">
                Descubra as melhores ofertas do dia
              </p>
              <p className="mt-1.5 text-sm text-gray-300">
                Eletrônicos, livros, casa, moda e muito mais com desconto.
                Frete GRÁTIS para membros Prime.
              </p>
            </div>

            {/* Botão */}
            <div className="shrink-0">
              <div className="rounded-xl bg-[#ff9900] px-8 py-3 text-center text-sm font-bold text-[#131921] shadow-md shadow-[#ff9900]/20 transition-all group-hover:bg-[#ffad33] group-hover:shadow-lg group-hover:shadow-[#ff9900]/30 sm:text-base">
                Ver Ofertas
                <span className="ml-2">→</span>
              </div>
            </div>
          </div>

          <p className="bg-[#0a0e14] py-1.5 text-center text-[10px] text-gray-500">
            Publicidade · Link de afiliado
          </p>
        </a>
      </div>
    </div>
  );
}
