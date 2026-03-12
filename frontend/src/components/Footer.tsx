export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="section-container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-900 to-primary-500">
                <span className="text-sm font-bold text-white">C</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Conversor<span className="text-primary-600 dark:text-primary-400">Câmbio</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Converta moedas em tempo real e acompanhe os principais mercados financeiros globais.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#conversor" className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  Conversor
                </a>
              </li>
              <li>
                <a href="#mercados" className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  Mercados
                </a>
              </li>
              <li>
                <a href="#noticias" className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  Notícias
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/sobre" className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/privacidade" className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/contato" className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-sm text-gray-400 dark:border-gray-800">
          <p>&copy; {currentYear} ConversorCâmbio. Todos os direitos reservados.</p>
          <p className="mt-1">Desenvolvido por Leonardo Aziz</p>
        </div>
      </div>
    </footer>
  );
}
