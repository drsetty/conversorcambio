import cors from 'cors';
import { env } from '../config/env';

export const corsMiddleware = cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || env.allowedOrigins.some((o) => origin.startsWith(o.replace(/\/$/, '')))) {
      callback(null, true);
    } else if (origin.includes('conversorcambio')) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET'],
  optionsSuccessStatus: 200,
});
