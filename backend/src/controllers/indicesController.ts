import { Request, Response, NextFunction } from 'express';
import * as marketService from '../services/marketService';

export async function getIndices(_req: Request, res: Response, next: NextFunction) {
  try {
    const indices = await marketService.getIndices();
    return res.json({ indices });
  } catch (err) {
    next(err);
  }
}
