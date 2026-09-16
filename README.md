# Fleet Management ERP Demo

Public demo edition of a fleet management and maintenance platform covering vehicles, workshop operations, spare parts, tires, purchasing, fuel, missions and billing.

This repository is intentionally separate from the private production codebase. Only code, configuration and data that are safe to publish belong here.

## Scope

The system is organized around the workflows that connect day-to-day fleet operations:

- **Fleet** — vehicle records, status history, documents and compliance tracking
- **Workshop** — maintenance requests, work orders, preventive maintenance and technician activity
- **Inventory** — spare parts, stock movements and replenishment
- **Tires** — tire inventory, mounting positions, inspections and rotations
- **Purchasing** — suppliers, purchase orders and receiving workflows
- **Fuel** — refuelling records and consumption tracking
- **Operations** — missions, drivers and vehicle assignments
- **Billing** — operational billing and payment follow-up

## Architecture

```text
React + TypeScript + Vite
          │
          ▼
Express + TypeScript
          │
          ▼
Drizzle ORM + PostgreSQL

Realtime updates: WebSocket / PostgreSQL notifications
```

The application follows a shared-schema approach so that client and server rely on the same domain types and status definitions.

## Migration status

The current repository contains a temporary placeholder implementation. It is **not** the final public edition of the real product.

The migration backlog is tracked through GitHub Issues and AppFactory Project Automation. The target is to replace the placeholder with a sanitized edition derived from the private `fleet-management-and-erp` codebase while preserving the real architecture, components and workflows.

## Public demo policy

The public repository will only contain sanitized material. In particular, it will not include:

- production or client data;
- private business documents or source spreadsheets;
- database backups;
- credentials, tokens or deployment secrets;
- private infrastructure details;
- internal reports or customer-specific configuration.

Any sample records included here will be synthetic and created only for demonstration and testing.

## Stack

`TypeScript` · `React` · `Vite` · `Express` · `Drizzle ORM` · `PostgreSQL` · `WebSocket`

---

Built and maintained by [EagleFox31](https://github.com/EagleFox31).
