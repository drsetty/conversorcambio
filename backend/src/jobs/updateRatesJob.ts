import cron from 'node-cron';
import { fetchAndCacheRates } from '../services/exchangeService';
import { logger } from '../utils/logger';

export function startRatesJob() {
  fetchAndCacheRates()
    .then(() => logger.info('Initial exchange rates loaded'))
    .catch((err) => logger.error('Failed to load initial rates', err));

  cron.schedule('0 3 * * *', async () => {
    logger.info('Cron: updating exchange rates...');
    try {
      await fetchAndCacheRates();
      logger.info('Cron: exchange rates updated successfully');
    } catch (err) {
      logger.error('Cron: failed to update exchange rates', err);
    }
  }, { timezone: 'UTC' });

  logger.info('Rates update job scheduled (daily at 03:00 UTC)');
}
