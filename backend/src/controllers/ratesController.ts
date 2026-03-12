import { Request, Response, NextFunction } from 'express';
import * as exchangeService from '../services/exchangeService';

export async function getRates(req: Request, res: Response, next: NextFunction) {
  try {
    const rates = await exchangeService.getRates();
    const { from, to, amount } = req.query;

    if (from && to && amount) {
      const parsedAmount = parseFloat(amount as string);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ error: 'Invalid amount. Must be a positive number.' });
      }

      const fromCode = (from as string).toUpperCase();
      const toCode = (to as string).toUpperCase();

      if (!rates.rates[fromCode] || !rates.rates[toCode]) {
        return res.status(400).json({
          error: `Unsupported currency: ${!rates.rates[fromCode] ? fromCode : toCode}`,
          supported: Object.keys(rates.rates),
        });
      }

      const conversion = exchangeService.convert(rates, fromCode, toCode, parsedAmount);
      return res.json({
        ...conversion,
        from: fromCode,
        to: toCode,
        amount: parsedAmount,
        date: rates.date,
      });
    }

    return res.json(rates);
  } catch (err) {
    next(err);
  }
}
