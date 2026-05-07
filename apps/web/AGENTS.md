# Web App Agent Guidelines

This app inherits repository-wide rules from `../../AGENTS.md`.

<!-- BEGIN:nextjs-agent-rules -->
## Next.js 16 Rules

This is not legacy Next.js behavior. Before implementing framework-level changes:

- Read relevant docs from `node_modules/next/dist/docs/`.
- Follow deprecations and migration guidance for Next 16 and React 19.
- Prefer App Router patterns and current conventions.
- Avoid deprecated APIs/patterns from older Next versions.

## shadcn/ui Rules

- Shared components should be added in `packages/ui`, not duplicated in `apps/web`.
- Keep aliases and imports aligned with `@repo/*`.
- When adding components, run commands from `packages/ui` unless explicitly requested otherwise.

## Pre-merge Validation For This App

From repo root, run:

1. `pnpm run format`
2. `pnpm run lint`
3. `pnpm run check`
4. `pnpm run build`

<!-- END:nextjs-agent-rules -->
