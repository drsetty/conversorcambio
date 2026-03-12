'use client';

import { useEffect, useState } from 'react';
import { fetchNews } from '@/services/api';
import { NewsItem } from '@/types';

function NewsCard({ item }: { item: NewsItem }) {
  const date = new Date(item.date);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {item.thumbnail && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
          {item.title}
        </h3>
        <div className="mt-auto flex items-center gap-2 pt-3">
          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
            {item.source}
          </span>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>
      </div>
    </a>
  );
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then((data) => setNews(data.items))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="noticias" className="bg-gray-50 py-16">
      <div className="section-container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Notícias Financeiras
          </h2>
          <p className="mt-2 text-gray-500">
            Últimas notícias dos principais portais financeiros
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
          </div>
        ) : news.length === 0 ? (
          <p className="py-12 text-center text-gray-400">
            Nenhuma notícia disponível no momento.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <NewsCard key={`${item.link}-${i}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
