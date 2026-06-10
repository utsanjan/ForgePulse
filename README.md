# ForgePulse

> Modern Manufacturing Execution System (MES) — real-time production insights, inventory optimization, and workforce coordination for smart factories.

ForgePulse is a modern Manufacturing Execution System designed to help manufacturers streamline operations through real-time production visibility, intelligent inventory management, and efficient workforce coordination. Built using a scalable TypeScript-based architecture, ForgePulse focuses on reliability, maintainability, and developer productivity.

---

## ✨ Features

- 📊 **Real-time Production Monitoring** – Track manufacturing activities and operational performance as they happen.
- 📦 **Inventory Optimization** – Improve stock visibility and reduce shortages or excess inventory.
- 👥 **Workforce Coordination** – Support efficient task allocation and workforce management across production lines.
- 🔒 **End-to-End Type Safety** – Leverage TypeScript, Zod, and generated API contracts for safer development.
- ⚡ **Modern Monorepo Architecture** – Built with pnpm workspaces for scalability and maintainability.

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Package Management | pnpm Workspaces |
| Runtime | Node.js 24 |
| Language | TypeScript 5.9 |
| API Framework | Express 5 |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Validation | Zod (`zod/v4`), `drizzle-zod` |
| API Code Generation | Orval |
| Build Tool | esbuild |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 24 or later
- pnpm
- PostgreSQL

### Environment Variables

Create a `.env` file and configure the following variable:

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

---

## 📦 Installation

```bash
git clone <repository-url>
cd forgepulse
pnpm install
```

---

## 🧑‍💻 Development

Start the API server:

```bash
pnpm --filter @workspace/forgepulse-api run dev
```

The API server runs on:

```text
http://localhost:5000
```

---

## 📋 Available Commands

### Run the API Server

```bash
pnpm --filter @workspace/forgepulse-api run dev
```

### Type Check All Packages

```bash
pnpm run typecheck
```

### Build the Entire Workspace

```bash
pnpm run build
```

### Regenerate API Hooks and Zod Schemas

Regenerate API clients and validation schemas from the OpenAPI specification:

```bash
pnpm --filter @workspace/forgepulse-spec run codegen
```

### Push Database Schema Changes (Development Only)

```bash
pnpm --filter @workspace/db run push
```

> **Note:** Avoid using database push commands directly in production environments.

---

## 🏗️ Project Structure

```text
forgepulse/
├── apps/                # Application packages
├── packages/            # Shared libraries and utilities
├── db/                  # Database schema and migrations
├── forgepulse-spec/     # OpenAPI specifications and code generation
└── ...
```

Update this section as the repository evolves to accurately reflect the workspace structure.

---

## 🧠 Architecture Principles

- **API-First Development** using OpenAPI specifications as the source of truth.
- **End-to-End Type Safety** powered by TypeScript, Zod, and generated clients.
- **Modular Monorepo Design** that promotes code reuse and clear package boundaries.
- **Schema-Driven Database Development** using Drizzle ORM.
- **Automated Code Generation** to minimize manual maintenance and improve consistency.

---

## 🎯 Product Vision

ForgePulse aims to empower manufacturers with:

- Greater visibility into production performance.
- Better coordination across factory teams.
- Smarter inventory decision-making.
- Scalable infrastructure that adapts to evolving manufacturing requirements.

---

## ⚠️ Gotchas

- Ensure `DATABASE_URL` is configured before running database-related commands.
- Regenerate API clients and schemas after updating the OpenAPI specification.
- Run type checks before creating production builds.
- Use database push commands only in development environments unless a migration strategy is in place.

---

## 📚 Additional Resources

- Review the workspace configuration for package relationships and scripts.
- Refer to the OpenAPI specification for API contracts and generated artifacts.
- Consult database schema definitions as the source of truth for persistence models.

---

## 📄 License

This project is licensed under the terms specified in the repository's `LICENSE` file.
