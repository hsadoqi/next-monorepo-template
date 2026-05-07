# apps/web

The primary Next.js 16 application. Consumes the shared `@repo/ui` component library and Tailwind CSS design tokens from `@repo/tailwind-config`.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 + `@repo/tailwind-config` |
| Components | `@repo/ui` (shadcn/ui) |
| Language | TypeScript 6 (strict) |
| Lint + format | Biome v2 (via `@repo/biome-config`) |

## Scripts

Run from this directory (`apps/web/`) or from the repo root with `--filter=web`.

| Script | Command |
|---|---|
| `dev` | `next dev` — start dev server on :3000 |
| `build` | `next build` — production build |
| `start` | `next start` — serve production build |
| `lint` | `biome check .` |
| `format` | `biome check --write .` |
| `check` | `tsc --noEmit` — type-check only |
| `test` | `vitest run` — jsdom unit/component tests |
| `clean` | Remove `.next/`, `.turbo/`, `node_modules/` |

## Project Layout

```
apps/web/
├── app/
│   ├── layout.tsx        # Root layout — imports globals.css
│   ├── page.tsx          # Home route
│   └── globals.css       # Tailwind v4 entry point (all @import directives)
├── components/           # App-local components (not shared)
├── components.json       # shadcn/ui config (points to @repo/ui)
├── next.config.ts
└── tsconfig.json
```

## Tailwind CSS entry point

`app/globals.css` is the only file that should contain `@import "tailwindcss"`. It also imports shared design tokens and tells Tailwind where to scan for class names:

```css
@import "tailwindcss";
@import "@repo/tailwind-config";
@source "../../../packages/ui/src";   /* scan UI package for shadcn class names */
```

The `@source` directive is required with Tailwind v4 because it only auto-scans the app directory. Without it, shadcn component styles don't apply.

## Adding pages

Create a file under `app/` following Next.js App Router conventions:

```
app/about/page.tsx       → /about
app/blog/[slug]/page.tsx → /blog/:slug
```

## Using shared components

```tsx
import { Button, Card } from "@repo/ui";

export default function Page() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

## Adding app-local components

Place components only needed by this app under `app/components/` or `components/`. These are **not** exported to the workspace. If a component needs to be shared across apps, add it to `packages/ui` instead.

## Adding a new shadcn component

Run from the repo root:

```bash
pnpm shadcn:add -- <component-name>
```

This adds the component to `packages/ui/src/components/ui/`. The `components.json` in this app points to that shared location:

```json
{
  "tailwind": { "config": "" },
  "aliases": { "components": "@repo/ui/components" }
}
```

## Environment variables

Next.js loads `.env.local` automatically. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never commit `.env.local`; use `.env.example` to document required keys.

## TypeScript

`tsconfig.json` extends `@repo/typescript-config/nextjs.json`. Strict mode is enabled. Do not add `baseUrl`; use package exports and workspace imports instead.

## Clean and rebuild

```bash
pnpm clean     # from repo root, or pnpm --filter=web clean
pnpm install
pnpm build
```

## Caveats

- `@source` in `globals.css` must point to any external package whose classes you want to use in this app. If you add another workspace package with Tailwind classes, add a corresponding `@source` directive.
- PostCSS is configured via `@repo/tailwind-config/postcss` — the `postcss.config.js` at the app root re-exports this.
- The `.next/` directory is gitignored and not tracked by Turborepo inputs (it is tracked as an output).

## Potential future work

- Add React Server Components with `use server` + server actions for form handling
- Configure `next/image` with a CDN origin
- Add `next-intl` for i18n
- Add Playwright E2E tests (`pnpm exec playwright test`)
- Enable Next.js Bundle Analyzer (`@next/bundle-analyzer`) to audit JS payload size
- Add OpenGraph metadata and JSON-LD structured data in layout
