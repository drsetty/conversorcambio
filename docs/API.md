# API - Conversor de Câmbio

**Base URL**: `https://api.conversorcambio.com`

---

## GET /api/rates

Retorna todas as taxas de câmbio (base USD).

**Response:**

```json
{
  "base": "USD",
  "date": "2026-03-12",
  "rates": {
    "USD": 1,
    "BRL": 5.12,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.5,
    "CAD": 1.36,
    "AUD": 1.53,
    "CHF": 0.88,
    "CNY": 7.24,
    "MXN": 17.15,
    "ARS": 875.50,
    "INR": 83.10
  }
}
```

---

## GET /api/rates?from=BRL&to=USD&amount=1000

Converte um valor entre moedas.

**Parâmetros:**

| Param  | Tipo   | Descrição         |
|--------|--------|-------------------|
| from   | string | Moeda de origem   |
| to     | string | Moeda de destino  |
| amount | number | Valor a converter |

**Response:**

```json
{
  "result": 195.31,
  "rate": 0.195312,
  "from": "BRL",
  "to": "USD",
  "amount": 1000,
  "date": "2026-03-12"
}
```

---

## GET /api/indices

Retorna metadados dos índices financeiros com símbolos TradingView.

**Response:**

```json
{
  "indices": [
    { "symbol": "SPX", "name": "S&P 500", "tradingViewSymbol": "FOREXCOM:SPXUSD" },
    { "symbol": "NDX", "name": "NASDAQ", "tradingViewSymbol": "NASDAQ:NDX" },
    { "symbol": "DJI", "name": "Dow Jones", "tradingViewSymbol": "DJ:DJI" },
    { "symbol": "DAX", "name": "DAX", "tradingViewSymbol": "XETR:DAX" },
    { "symbol": "UKX", "name": "FTSE 100", "tradingViewSymbol": "FTSE:UKX" },
    { "symbol": "NI225", "name": "Nikkei 225", "tradingViewSymbol": "TVC:NI225" },
    { "symbol": "IBOV", "name": "Ibovespa", "tradingViewSymbol": "BMFBOVESPA:IBOV" }
  ]
}
```

---

## GET /api/news

Retorna as últimas notícias financeiras (máximo 12).

**Response:**

```json
{
  "items": [
    {
      "title": "S&P 500 closes at record high...",
      "source": "MarketWatch",
      "date": "2026-03-12T14:30:00.000Z",
      "link": "https://marketwatch.com/...",
      "thumbnail": "https://..."
    }
  ],
  "count": 12
}
```

---

## Cache

| Endpoint      | TTL     |
|---------------|---------|
| /api/rates    | 24 horas|
| /api/indices  | 5 min   |
| /api/news     | 30 min  |

---

## Rate Limiting

100 requisições por IP a cada 15 minutos.

---

## Health Check

```
GET /health
```

```json
{ "status": "ok", "timestamp": "2026-03-12T10:00:00.000Z" }
```
