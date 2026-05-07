# Copilot Instructions

Follow repository guidance in `AGENTS.md` first, then app-level guidance in `apps/web/AGENTS.md` when working in the web app.

## Required Defaults

- Use `@repo/*` workspace package naming and imports.
- Prefer current installed versions and official docs over memory.
- Avoid deprecated patterns (especially legacy Next.js and deprecated TypeScript options such as `baseUrl`).
- Use Biome for formatting/linting and Turborepo for task execution.

## Validation

Before finalizing changes, run from repository root when relevant:

1. `pnpm run format`
2. `pnpm run lint`
3. `pnpm run check`
4. `pnpm run build`
