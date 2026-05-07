# packages/configs/biome-config

Shared [Biome](https://biomejs.dev/) configuration for the monorepo. Centralises lint and format rules so all packages stay consistent without duplicating config.

## What it exports

| Export | File |
|---|---|
| `@repo/biome-config` | `index.json` |

## Usage

In any package or app's `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.x/schema.json",
  "extends": ["@repo/biome-config"]
}
```

The root `biome.json` already uses this pattern. Per-package `biome.json` files can extend it and override specific rules.

## What's configured

`index.json` sets up:

- **Formatter**: consistent indentation (tabs, 2-space equivalent), line width, semicolons, quotes, trailing commas
- **Linter**: enabled recommended rules + TypeScript-aware rules
- **Organizer**: import sorting (auto-applied with `biome check --write`)

Run the full Biome pipeline from the repo root:

```bash
pnpm lint       # biome check . (lint only)
pnpm format     # biome check --write . (lint + format + fix)
```

Or via Turborepo per-package:

```bash
turbo run lint --filter=web
turbo run format --filter=@repo/ui
```

## lint-staged integration

The root `package.json` wires Biome into pre-commit hooks via lint-staged:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,json,css,md}": "biome check --write --no-errors-on-unmatched"
  }
}
```

`--no-errors-on-unmatched` prevents failures when lint-staged passes files that Biome doesn't handle (e.g. binary files).

## Caveats

- Biome replaces ESLint **and** Prettier. Do not install both.
- Biome's CSS parser doesn't recognise Tailwind v4 at-rules (`@theme`, `@apply`, `@source`, `@custom-variant`). Warnings from these are safe to ignore.
- Biome doesn't yet have full parity with all ESLint plugins (e.g. `eslint-plugin-react-hooks`). Evaluate before removing any remaining ESLint rules.

## Potential future work

- Configure `biome.json` to report unused imports as errors
- Add `overrides` for test files to allow `console.log` and relaxed assertions
- Evaluate Biome's GQL and GraphQL support as it matures
