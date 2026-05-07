# Repository Agent Guidelines

These rules apply to all AI coding agents working in this monorepo.

## Core Principles

- Always prefer currently installed versions and official docs over model memory.
- Do not introduce deprecated patterns when modern alternatives exist.
- Do not rename packages or aliases unless explicitly requested.
- Keep package namespace conventions as `@repo/*`.

## Stack Baseline

- Package manager: pnpm workspaces (`pnpm@10.x`)
- Monorepo runner: Turborepo (`turbo@2.x`)
- TypeScript: strict mode (`typescript@6.x`)
- Formatter/linter: Biome (`@biomejs/biome@2.x`)
- Web framework: Next.js 16 + React 19
- Styling: Tailwind CSS 4 + shadcn/ui

## Monorepo Conventions

- Use workspace imports with `@repo/*`.
- Shared configs live under `packages/configs/*`.
- Shared UI lives under `packages/ui`.
- Run installs from the repository root, not nested apps.

## TypeScript Rules

- Keep strict typing enabled.
- Do not add deprecated compiler options or deprecated patterns.
- Do not use `baseUrl`; use explicit `paths` only when required.
- Prefer package exports and workspace package imports over fragile relative deep paths.

## Biome Rules

- Use Biome as the single formatter/linter unless the task explicitly requires otherwise.
- Use:
  - `pnpm run format`
  - `pnpm run lint`
- If formatting and import ordering conflict, prefer `biome check --write` flows.

## Dependency Rules

- Prefer latest stable compatible versions.
- Keep majors aligned with the current stack unless migration is explicitly requested.
- Use `pnpm add` from the correct workspace scope.
- Avoid adding duplicate tooling that overlaps existing stack responsibilities.

## Validation Before Finishing

Run from repo root when relevant:

1. `pnpm install`
2. `pnpm run format`
3. `pnpm run lint`
4. `pnpm run check`
5. `pnpm run build`

Only leave failing checks when explicitly approved by the user.
