'use client';

import { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContatoPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://formsubmit.co/ajax/leonardoaziz@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Contato ConversorCâmbio: ${name}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-gray-50 py-16 dark:bg-gray-900">
        <div className="section-container max-w-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Contato
            </h1>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Tem alguma dúvida, sugestão ou parceria? Envie sua mensagem.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-8">
            {status === 'success' ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Mensagem enviada!</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Obrigado pelo contato. Responderemos o mais breve possível.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1.5 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700"
                    placeholder="Escreva sua mensagem aqui..."
                  />
                </div>

                {status === 'error' && (
                  <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    Erro ao enviar mensagem. Tente novamente.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-xl bg-gradient-to-r from-primary-900 to-primary-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/20 transition-all hover:shadow-xl hover:shadow-primary-900/30 disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Enviando...
                    </span>
                  ) : (
                    'Enviar mensagem'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
