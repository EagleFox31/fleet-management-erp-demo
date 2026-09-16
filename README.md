# Fleet Management ERP Demo

Public demo edition of a fleet management and maintenance platform covering vehicles, workshop operations, spare parts and tire tracking.

This repository is intentionally separate from the private working codebase. It contains only code and synthetic data that are safe to publish.

## What is included

The current public build focuses on four connected areas:

- **Fleet** — vehicle records, mileage and operational status
- **Workshop** — maintenance work orders with a simple status lifecycle
- **Inventory** — spare-parts stock and reorder alerts
- **Tires** — mounting position, tread depth and inspection status

The demo is interactive: work orders can be advanced through their lifecycle from the UI. Changes are kept in memory and reset when the server restarts.

## Run it locally

Requirements: Node.js 22+.

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

The React client runs through Vite and proxies API requests to the Express server on port `5000`.

For a production-style build:

```bash
npm run build
NODE_ENV=production npm start
```

The Express server will serve the built client from `http://localhost:5000`.

## Public demo architecture

```text
React + TypeScript + Vite
          │
          ▼
Express + TypeScript
          │
          ▼
Synthetic in-memory dataset
```

Client and server share the same TypeScript domain types through `shared/`.

The private implementation goes further with PostgreSQL, Drizzle ORM, realtime events and broader business workflows. Those project-specific pieces are not copied here automatically.

## Demo data

Every record in this repository is synthetic. Registrations, work orders, part references and tire serial numbers are demonstration values created for this public build.

No production data, customer data, private documents, database backups, credentials or deployment secrets are included.

## Project structure

```text
client/           React UI
server/           Express API and synthetic demo data
shared/           shared domain types
.github/workflows CI type-check and build
```

## Current stack

`TypeScript` · `React` · `Vite` · `Express`

## Next steps

The public edition will grow only when a feature can be exposed without carrying private project material with it. Planned additions include screenshots, a richer synthetic dataset and selected workflows from purchasing, fuel and operations.

---

Built and maintained by [EagleFox31](https://github.com/EagleFox31).
