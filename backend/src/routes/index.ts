import { Router } from 'express';
import { getRates } from '../controllers/ratesController';
import { getIndices } from '../controllers/indicesController';
import { getNews } from '../controllers/newsController';

const router = Router();

router.get('/rates', getRates);
router.get('/indices', getIndices);
router.get('/news', getNews);

export default router;
