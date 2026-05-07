# Next.js Monorepo Template

A production-ready monorepo template built with [Turborepo](https://turbo.build/repo) and [pnpm workspaces](https://pnpm.io/workspaces). Ships with a shared design system (shadcn/ui + Tailwind CSS v4), Storybook, strict TypeScript, Biome for linting/formatting, Husky pre-commit hooks, and GitHub Actions CI out of the box.

## Repository Structure

```
├── apps/
│   ├── web/              # Next.js 16 application
│   └── storybook/        # Storybook 10 component explorer
├── packages/
│   ├── ui/               # Shared shadcn/ui component library
│   └── configs/
│       ├── biome-config/       # Shared Biome (lint + format) rules
│       ├── tailwind-config/    # Shared Tailwind CSS v4 styles + PostCSS config
│       ├── typescript-config/  # Shared tsconfig bases
│       └── vitest-config/      # Shared Vitest base config
├── .github/
│   └── workflows/        # CI (lint, check, build) + dependency review
├── .husky/               # pre-commit (lint-staged) + pre-push (lint, check) hooks
├── turbo.json            # Turborepo task pipeline
├── biome.json            # Root Biome config (extends @repo/biome-config)
└── pnpm-workspace.yaml   # Workspace package globs
```

## Stack

| Layer | Technology |
|---|---|
| Package manager | pnpm v10 + workspaces |
| Monorepo runner | Turborepo v2 |
| Web framework | Next.js 16 + React 19 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Component explorer | Storybook 10 (`@storybook/react-vite`) |
| Language | TypeScript 6 (strict) |
| Lint + format | Biome v2 |
| Git hooks | Husky v9 + lint-staged v17 |
| CI | GitHub Actions |

## Getting Started

```bash
# 1. Install all workspace dependencies from the repo root
pnpm install

# 2. Start the Next.js dev server
pnpm dev

# 3. Start Storybook
pnpm storybook
```

## Scripts

Run all scripts from the repo root — Turborepo fans them out to each workspace.

| Script | Description |
|---|---|
| `pnpm dev` | Start Next.js in watch mode |
| `pnpm build` | Production build (Next.js) |
| `pnpm storybook` | Start Storybook dev server on :6006 |
| `pnpm storybook:build` | Static Storybook build |
| `pnpm lint` | Biome lint across all packages |
| `pnpm format` | Biome auto-format across all packages |
| `pnpm check` | TypeScript type-check across all packages |
| `pnpm clean` | Delete all build artifacts and `node_modules` |
| `pnpm shadcn:add -- <component>` | Add a shadcn component to `@repo/ui` |

### Full clean + reinstall

```bash
pnpm clean        # removes .next/, storybook-static/, all node_modules
pnpm install      # reinstall everything
pnpm build        # verify clean state
```

## Packages

### `apps/web` — Next.js application

The primary consumer of `@repo/ui`. Uses App Router. Imports shared Tailwind styles and components via workspace packages. See [apps/web/README.md](apps/web/README.md).

### `apps/storybook` — Component explorer

Runs Storybook 10 with `@storybook/react-vite`. Discovers stories co-located in `packages/ui/**` and `apps/web/**`. Includes dark mode toolbar, a11y addon, and autodocs. See [apps/storybook/README.md](apps/storybook/README.md).

### `packages/ui` — Shared component library

Internal package (no build step — source TypeScript is consumed directly by apps). Contains shadcn/ui components with full accessibility styling (focus rings, disabled states, `aria-invalid` variants). See [packages/ui/README.md](packages/ui/README.md).

### `packages/configs/tailwind-config` — Tailwind CSS v4 shared styles

The CSS entry point shared across all apps. Defines the design token system (shadcn CSS variables), dark mode via `@custom-variant`, and `@theme inline` mappings. See [packages/configs/tailwind-config/README.md](packages/configs/tailwind-config/README.md).

### `packages/configs/biome-config` — Shared Biome config

Centralized lint + format rules. All packages extend `@repo/biome-config`. See [packages/configs/biome-config/README.md](packages/configs/biome-config/README.md).

### `packages/configs/typescript-config` — Shared tsconfig

Base TypeScript configs for different environments (`base.json`, `nextjs.json`). See [packages/configs/typescript-config/README.md](packages/configs/typescript-config/README.md).

### `packages/configs/vitest-config` — Shared Vitest config

Base Vitest configuration for unit tests. Currently unused (no test tasks configured). See [packages/configs/vitest-config/README.md](packages/configs/vitest-config/README.md).

## Adding a new app or package

```bash
# Scaffold a new workspace package interactively
pnpm exec turbo gen workspace
```

Then add `"@repo/ui": "workspace:*"` and other shared configs as dependencies.

## Adding a new shadcn component

```bash
pnpm shadcn:add -- button card input
```

Components are added to `packages/ui/src/components/ui/`. Export them from `packages/ui/src/index.ts`.

## CI

Two GitHub Actions workflows run on push/PR to `main`:

- **CI** (`.github/workflows/ci.yml`): `lint → check → build` with Turborepo remote-cache-ready setup.
- **Dependency Review** (`.github/workflows/dependency-review.yml`): Flags dependency changes with known vulnerabilities.

## Caveats

- **Storybook UniversalStore warnings** in dev mode (`No existing state found for follower`): Known Storybook 10 race condition. Doesn't affect rendering or builds. Will resolve once `@storybook/addon-test` ships a stable v10 release.
- **Storybook framework**: This workspace uses `@storybook/react-vite` instead of the Next-specific Vite preset because the current `@storybook/nextjs-vite` preset pulls a CommonJS plugin path that is incompatible with ESM-only Vite dependencies.
- **Biome CSS `@theme`/`@apply` warnings**: Biome's CSS parser doesn't recognise Tailwind v4 custom at-rules. Warnings are cosmetic — builds pass.
- **`pnpm install` peer warnings**: `@storybook/react` requires `storybook@^10` as a peer. Both are installed; pnpm surfaces this as a non-fatal warning.

## Potential future work

- Add Vitest unit tests to `packages/ui` with `@storybook/test` interaction tests wired up
- Configure Turborepo remote caching (Vercel or self-hosted)
- Add a `docs` app (e.g. Nextra or Starlight) consuming `@repo/ui`
- Add Playwright E2E tests in `apps/web`
- Publish `@repo/ui` to a private registry (add `tsup` build step + `dist/` exports)
- Add Chromatic for visual regression testing on Storybook stories

- `pnpm run lint` - Lint all apps and packages
- `pnpm run test` - Run tests workspace-wide using Vitest
- `pnpm run check` - Typecheck the codebase

## 🛠️ Typical Workflow

1. **Create an App**: Add your Next.js frontend in the `apps/` directory.
2. **Create a Internal Package**: Add a shared UI component library or utility package in `packages/`.
3. **Link them**: Add your internal packages to your app's `package.json` dependencies (e.g., `"my-ui": "workspace:*"`).
4. **Build with Turbo**: Let Turborepo handle caching and dependency graphs to build incredibly fast!
