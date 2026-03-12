import Parser from 'rss-parser';
import { getCached, setCache } from '../config/redis';
import { logger } from '../utils/logger';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'ConversorCambio/1.0',
  },
});

const CACHE_KEY = 'finance:news';
const CACHE_TTL = 1800; // 30 min

const RSS_FEEDS = [
  { url: 'https://feeds.content.dowjones.io/public/rss/mw_topstories', source: 'MarketWatch' },
  { url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664', source: 'CNBC' },
  { url: 'https://feeds.content.dowjones.io/public/rss/mw_marketpulse', source: 'MarketWatch' },
];

export interface NewsItem {
  title: string;
  source: string;
  date: string;
  link: string;
  thumbnail: string | null;
}

function extractThumbnail(item: Record<string, unknown>): string | null {
  const enclosure = item.enclosure as { url?: string } | undefined;
  if (enclosure?.url) return enclosure.url;

  const mediaContent = item['media:content'] as { $?: { url?: string } } | undefined;
  if (mediaContent?.$?.url) return mediaContent.$.url;

  const mediaThumbnail = item['media:thumbnail'] as { $?: { url?: string } } | undefined;
  if (mediaThumbnail?.$?.url) return mediaThumbnail.$.url;

  const itunes = item['itunes:image'] as { $?: { href?: string } } | undefined;
  if (itunes?.$?.href) return itunes.$.href;

  return null;
}

async function parseFeed(feedUrl: string, source: string): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    return (feed.items || []).slice(0, 6).map((item) => ({
      title: item.title || '',
      source,
      date: item.pubDate || item.isoDate || new Date().toISOString(),
      link: item.link || '',
      thumbnail: extractThumbnail(item as unknown as Record<string, unknown>),
    }));
  } catch (err) {
    logger.error(`Failed to parse RSS feed: ${source}`, err);
    return [];
  }
}

export async function getNews(): Promise<NewsItem[]> {
  const cached = await getCached<NewsItem[]>(CACHE_KEY);
  if (cached) return cached;

  const results = await Promise.allSettled(
    RSS_FEEDS.map((f) => parseFeed(f.url, f.source))
  );

  const news = results
    .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 12);

  if (news.length > 0) {
    await setCache(CACHE_KEY, news, CACHE_TTL);
  }

  return news;
}
