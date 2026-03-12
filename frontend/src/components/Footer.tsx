export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="section-container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-900 to-primary-500">
                <span className="text-sm font-bold text-white">C</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                Conversor<span className="text-primary-600">Câmbio</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Converta moedas em tempo real e acompanhe os principais mercados financeiros globais.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#conversor" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Conversor
                </a>
              </li>
              <li>
                <a href="#mercados" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Mercados
                </a>
              </li>
              <li>
                <a href="#noticias" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Notícias
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-sm text-gray-400">
          &copy; {currentYear} ConversorCâmbio. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
