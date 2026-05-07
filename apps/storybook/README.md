# apps/storybook

Storybook 10 component explorer for the monorepo. Discovers stories co-located alongside components in `packages/ui` and `apps/web`. Includes a dark mode toolbar, accessibility (a11y) checks, and interactive play functions.

## Stack

| Layer | Technology |
|---|---|
| Storybook | v10.3.6 |
| Framework | `@storybook/react-vite` |
| Addons | `@storybook/addon-docs`, `@storybook/addon-a11y`, `@storybook/addon-links` |
| Test utilities | `storybook/test` (built-in `fn`, `userEvent`, `within`, `expect`) |
| Styling | Tailwind CSS v4 via `@repo/tailwind-config` |

## Scripts

| Script | Command |
|---|---|
| `dev` | `storybook dev -p 6006` — start dev server on :6006 |
| `build:storybook` | `storybook build` — static build to `storybook-static/` |
| `lint` | `biome check .` |
| `format` | `biome check --write .` |
| `check` | `tsc --noEmit` |
| `test` | Start Storybook and run play-function + axe accessibility checks in Chromium |
| `clean` | Remove `storybook-static/`, `.next/`, `.turbo/`, `node_modules/` |

From repo root:

```bash
pnpm storybook              # start dev server
pnpm storybook:build        # static build
pnpm storybook:test         # interaction + accessibility checks
```

## Project Layout

```
apps/storybook/
├── .storybook/
│   ├── main.ts            # Story discovery paths, framework, addons
│   └── preview.ts         # Global decorators, toolbar globals, CSS import
├── src/
│   ├── styles/
│   │   └── globals.css    # Imports @repo/tailwind-config (Tailwind entry)
│   └── types/
│       └── css.d.ts       # Ambient *.css module declaration (fixes TS error)
├── turbo.json
└── tsconfig.json
```

## Story discovery

`main.ts` tells Storybook where to look for stories:

```ts
stories: [
  "../../packages/ui/**/*.stories.{tsx,jsx,mdx}",
  "../web/**/*.stories.{tsx,jsx,mdx}",
]
```

Stories live **co-located** with their components — not inside `apps/storybook/`. This keeps stories close to the source and visible in both the component editor and the Storybook UI.

## Adding a story

Create a `*.stories.tsx` file next to the component it documents:

```tsx
// packages/ui/src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Click me" },
};
```

- Use `tags: ["autodocs"]` to auto-generate a Docs page from JSDoc + prop types.
- Use `play` functions for interaction tests:

```tsx
import { expect, fn, userEvent, within } from "storybook/test";

export const ClickInteraction: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalled();
  },
};
```

## Dark mode toolbar

`preview.ts` includes a custom `Theme` global with Light / Dark options. When Dark is selected, `.dark` is toggled on `document.documentElement` and on `.docs-story` (for Docs page previews). The theme respects shadcn's `@custom-variant dark (&:is(.dark, .dark *))` CSS selector.

## Interaction and accessibility tests

`pnpm storybook:test` starts Storybook locally, waits for `http://127.0.0.1:6006`, then runs `test-storybook` in Chromium. Story `play` functions exercise interactions, and `.storybook/test-runner.ts` injects axe into every story and fails on accessibility violations.

In CI, Playwright Chromium is installed before `pnpm test` runs. Locally, install it once with:

```bash
pnpm --filter=storybook exec playwright install chromium
```

## Styling

`preview.ts` imports `./src/styles/globals.css`, which in turn imports `@repo/tailwind-config`. This provides Tailwind v4 design tokens (CSS variables for colors, radii, etc.) to all stories. Components from `@repo/ui` use these tokens via `var(--*)` CSS variables, so they render correctly inside Storybook.

## TypeScript

`tsconfig.json` extends `@repo/typescript-config/base.json` and has explicit `paths` for:

- `@repo/ui` → `../../packages/ui/src/index.ts`
- `@/*` → `../web/*`

The `src/types/css.d.ts` ambient declaration suppresses the TypeScript error for side-effect CSS imports in `preview.ts`:

```ts
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
```

## Turborepo integration

`turbo.json` registers `storybook#build` as a cacheable task with `storybook-static/**` as output. The root `pnpm storybook:build` runs `turbo run build --filter=storybook`.

The `storybook` (dev) task is marked `cache: false, persistent: true` in the root `turbo.json` so Turborepo doesn't try to cache a long-running server process.

## Known issues / caveats

- **UniversalStore dev warnings** (`No existing state found for follower`): Known Storybook 10 race condition in manager/preview handshake. Cosmetic — no rendering impact. Tracked upstream; expected to resolve with `@storybook/addon-test` stable v10.
- **Framework choice**: Storybook uses `@storybook/react-vite` for reliable Vite builds in this workspace. Re-test `pnpm storybook:build` before switching back to a Next-specific Storybook preset.
- **`@storybook/addon-test`**: Not installed — no stable v10 release. Use built-in `storybook/test` utilities for interaction tests and `@storybook/test-runner` for browser execution.
- **Biome CSS warnings** on `@theme`, `@apply`, `@source`: Biome's CSS parser doesn't recognise Tailwind v4 at-rules. Not real errors.

## Potential future work

- Add Chromatic for visual regression testing (`npx chromatic --project-token=...`)
- Add `@storybook/addon-test` once a stable Storybook 10 release ships
- Add MSW (`msw-storybook-addon`) for API mocking in stories
- Add a `parameters.viewport` preset for responsive story previews
