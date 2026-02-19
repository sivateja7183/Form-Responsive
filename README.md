# AutoApply AI (MVP Scaffold)

Production-style full-stack scaffold for a SaaS-ready job automation assistant.

## 1) Project Folder Structure

```txt
autoapply-ai/
├── backend/
│   ├── src/
│   │   ├── ai/                   # Ollama integration client
│   │   ├── automation/           # WebdriverIO browser factory, scrapers, form assistant
│   │   ├── config/               # env config
│   │   ├── controllers/          # REST request handlers
│   │   ├── database/             # sqlite connection + migrations
│   │   ├── middleware/           # auth stub, logging, error handling
│   │   ├── models/               # repository layer
│   │   ├── queue/                # BullMQ queue registration
│   │   ├── routes/               # API routes
│   │   ├── services/             # business services
│   │   ├── workers/              # async worker handlers
│   │   ├── app.js
│   │   └── server.js
│   ├── wdio.conf.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/                  # axios client + endpoint wrappers
│   │   ├── components/           # reusable UI blocks
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── index.html
└── package.json                  # npm workspace root
```

## 2) Backend Code Scaffold

- **Express REST API** with layered architecture (routes/controllers/services/repositories).
- **SQLite** storage (`Users`, `Resumes`, `Jobs`, `Applications`, `MatchScores`) via migrations.
- **Queue worker pattern** using BullMQ queues:
  - `job-search` queue -> scraper + AI scoring workflow
  - `assist-apply` queue -> semi-auto apply helper
- **Logging** with pino + pino-http middleware.
- **Error handling** with centralized middleware.
- **Config** centralized in `src/config/env.js`.

### API Endpoints (MVP)

- `POST /api/resumes/upload`
- `POST /api/jobs/search`
- `GET /api/jobs`
- `POST /api/ai/match-score`
- `POST /api/ai/resume-optimize`
- `POST /api/ai/cover-letter`
- `POST /api/applications/assist-apply`
- `GET /api/applications/analytics`

## 3) Frontend Scaffold

React + Vite dashboard with 3 pages:

- **Dashboard**: resume upload + job search trigger
- **Jobs**: extracted jobs table + "Assist Apply" action
- **Analytics**: totals + average match + pipeline

## 4) WebdriverIO Config

`backend/wdio.conf.js` includes:

- local runner
- chromedriver service
- mocha framework
- single-instance configuration for deterministic execution

## 5) Worker Queue Design

- **API request** enqueues async job, returns immediately with queue ID.
- **Worker** processes automation and AI tasks out-of-band.
- Suitable for horizontal scaling by increasing worker pods/processes.

## 6) Ollama Integration

`backend/src/ai/ollamaClient.js` uses local Ollama REST endpoint:

- `POST /api/generate`
- JSON output mode for match scoring
- plain text mode for resume optimization and cover letters

## 7) API Route Example

```bash
curl -X POST http://localhost:4000/api/jobs/search \
  -H 'Content-Type: application/json' \
  -d '{"keywords":"Node.js","location":"Remote"}'
```

## 8) Run Instructions

### Prerequisites

- Node.js 20+
- Redis (for BullMQ)
- Chrome + ChromeDriver
- Ollama running locally

### Setup

```bash
npm install
cp backend/.env.example backend/.env
npm run dev
```

### Optional manual migration

```bash
npm run migrate --workspace backend
```

## Responsible Automation / Legal Notes

- Keep scraping within platform Terms of Service.
- Respect robots directives, account limits, and anti-abuse policies.
- Use semi-automated mode with human-in-the-loop review before final submission.
- Do not bypass authentication, CAPTCHA, or anti-bot protections.
