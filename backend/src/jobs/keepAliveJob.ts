import cron from 'node-cron';
import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${env.port}`;

export function startKeepAliveJob() {
  if (!env.isProduction) {
    logger.info('Keep-alive job skipped (development mode)');
    return;
  }

  cron.schedule('*/10 * * * *', async () => {
    try {
      const { data } = await axios.get(`${SELF_URL}/health`, { timeout: 10000 });
      logger.info(`Keep-alive ping OK: ${data.timestamp}`);
    } catch (err) {
      logger.error('Keep-alive ping failed', err);
    }
  });

  logger.info(`Keep-alive job scheduled (every 10 min → ${SELF_URL}/health)`);
}
