import { Request, Response, NextFunction } from 'express';
import * as newsService from '../services/newsService';

export async function getNews(_req: Request, res: Response, next: NextFunction) {
  try {
    const news = await newsService.getNews();
    return res.json({ items: news, count: news.length });
  } catch (err) {
    next(err);
  }
}
