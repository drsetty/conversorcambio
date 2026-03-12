'use client';

const AFFILIATE_URL = 'https://amzn.to/3NzBkAa';

export function AmazonSideBanner() {
  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden items-center 2xl:flex">
      <a
        href={AFFILIATE_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="pointer-events-auto group ml-3 block w-[220px] overflow-hidden rounded-2xl shadow-xl transition-shadow hover:shadow-2xl"
        style={{ marginTop: '160px' }}
      >
        <div className="bg-[#232f3e] px-5 py-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ff9900] shadow-lg shadow-[#ff9900]/30">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-widest text-[#ff9900]">
            Amazon
          </p>

          <div className="my-5 h-px bg-gray-600" />

          <p className="text-lg font-extrabold leading-tight text-white">
            Ofertas do Dia
          </p>
          <p className="mt-3 text-xs leading-relaxed text-gray-300">
            Eletrônicos, livros, casa e muito mais com desconto
          </p>

          <div className="my-5 h-px bg-gray-600" />

          <p className="text-[11px] font-semibold text-gray-400">
            Frete GRÁTIS para
          </p>
          <p className="text-[11px] font-semibold text-gray-400">
            membros Prime
          </p>

          <div className="mt-6 rounded-xl bg-[#ff9900] px-4 py-3 text-sm font-bold text-[#232f3e] shadow-md shadow-[#ff9900]/20 transition-all group-hover:bg-[#ffad33] group-hover:shadow-lg">
            Ver Ofertas
          </div>

          <p className="mt-4 text-[10px] text-gray-500">
            Publicidade
          </p>
        </div>
      </a>
    </div>
  );
}

export function AmazonInlineBanner() {
  return (
    <div className="block 2xl:hidden">
      <a
        href={AFFILIATE_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="group block"
      >
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-[#232f3e] px-5 py-4 shadow-md transition-shadow hover:shadow-lg sm:px-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff9900]">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white sm:text-base">
                  Ofertas do Dia na Amazon
                </p>
                <p className="hidden text-xs text-gray-300 sm:block">
                  Eletrônicos, livros, casa e mais — Frete GRÁTIS para Prime
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-lg bg-[#ff9900] px-4 py-2 text-xs font-bold text-[#232f3e] transition-colors group-hover:bg-[#ffad33] sm:px-5 sm:text-sm">
              Ver Ofertas
            </div>
          </div>
          <p className="mt-1 text-center text-[9px] text-gray-400">Publicidade</p>
        </div>
      </a>
    </div>
  );
}
