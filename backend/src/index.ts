import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { env } from './config/env';
import { corsMiddleware } from './middlewares/cors';
import { apiLimiter } from './middlewares/rateLimit';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './utils/logger';
import routes from './routes';
import { startRatesJob } from './jobs/updateRatesJob';

const app = express();

app.use(helmet());
app.use(compression());
app.use(corsMiddleware);
app.use(apiLimiter);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', routes);

app.use(errorHandler);

app.listen(env.port, () => {
  logger.info(`Server running on port ${env.port}`);
  startRatesJob();
});
