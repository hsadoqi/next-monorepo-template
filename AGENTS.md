# Repository Agent Guidelines

These rules apply to all AI coding agents working in this monorepo.

## Core Principles

- Always prefer currently installed/latest versions and official docs over model memory.
- Do not introduce deprecated patterns when modern alternatives exist.
- Do not rename packages or aliases unless explicitly requested.
- Keep package namespace conventions as `@repo/*`.
- Use latest modern best practices and techniques.
- Always co-locate stories and tests with source files.
- Avoid unnecessary abstraction or indirection; prefer direct and clear code.
- Use kebab-case for all file names, including test and story files, and folders. 
- Create folders for related components and their stories/tests when it improves organization, but do not create unnecessary nesting.
- Use PascalCase for React component names and export identifiers.

## Stack Baseline

- Package manager: pnpm workspaces (`pnpm@10.x`)
- Runtime: Node.js 20 LTS or 22+; avoid Node 21 because installed tooling such as Vitest does not support it.
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
- Root scripts should delegate to package tasks through `turbo run`; put actual task logic in each package.
- Keep package-specific Turbo outputs on package tasks such as `web#build` and `storybook#build`, not broad generic tasks.

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
- Keep shared runtime/tooling versions aligned across packages. Update root `pnpm.overrides` when changing React, Next.js, TypeScript, Storybook, Tailwind CSS, Vitest, or shared `@types/*` versions.
- Do not introduce duplicate React or React DOM versions in workspace packages.
- If a transitive package needs an override to keep the build working, document why in `package.json` or the relevant PR notes.

## Build Reproducibility Rules

- Builds must pass without fetching runtime assets from the network.
- Do not use `next/font/google` unless fonts are vendored locally or the build environment is explicitly allowed to fetch them.
- Prefer local assets, checked-in public assets, or CSS fallback stacks for baseline app typography.

## CI And Validation Rules

- CI should use non-mutating check scripts such as `format:check`; reserve `format` for local write/fix flows.
- Add new validation tasks as package tasks first, register them in `turbo.json`, then delegate from root scripts.

## Validation Before Finishing

Run from repo root when relevant:

1. `pnpm install`
2. `pnpm run format:check`
3. `pnpm run lint`
4. `pnpm run check`
5. `pnpm run test`
6. `pnpm run build`

Only leave failing checks when explicitly approved by the user.
