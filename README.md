# Conversor de Câmbio

Conversor de moedas em tempo real com informações financeiras globais.

**Site**: [conversorcambio.com](https://conversorcambio.com)

## Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Cache**: Redis
- **APIs**: Frankfurter (câmbio), TradingView (índices), RSS (notícias)

## Estrutura

```
frontend/   → Next.js (Vercel)
backend/    → Express API (Render)
infra/      → Docker, configs de deploy
docs/       → Documentação da API
```

## Desenvolvimento Local

### Pré-requisitos

- Node.js 20+
- Docker (para Redis)

### Setup

```bash
# Subir Redis
docker compose -f infra/docker-compose.yml up -d

# Backend
cd backend
npm install
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm run dev
```

### URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Redis: localhost:6379

## Deploy

- **Frontend** → Vercel (auto-deploy via Git)
- **Backend** → Render (Web Service)
- **DNS** → GoDaddy (`conversorcambio.com` → Vercel, `api.conversorcambio.com` → Render)
