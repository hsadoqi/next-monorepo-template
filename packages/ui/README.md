# packages/ui

Shared component library for the monorepo. Built on [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS v4. Uses the **internal packages pattern**: source TypeScript is consumed directly by apps with no build step.

## Stack

| Layer | Technology |
|---|---|
| Components | shadcn/ui (Radix UI primitives + Tailwind) |
| Styling | Tailwind CSS v4 via `@repo/tailwind-config` |
| Utilities | `clsx` + `tailwind-merge` (via `cn()` in `lib/utils.ts`) |
| Language | TypeScript 6 (strict) |
| Stories | Storybook 10 co-located stories |
| Lint + format | Biome v2 |

## Internal packages pattern

This package has **no build step**. Its `package.json` exports point directly to TypeScript source:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./components/*": "./src/components/*",
    "./lib/*": "./src/lib/*"
  }
}
```

Apps bundle these TypeScript files themselves (Next.js/Vite handle transpilation). This avoids a separate build step and makes changes instantly visible without rebuilding.

**Trade-off**: This package cannot be published to npm as-is. To publish externally, add a build step (`tsup`) and point exports to `dist/`.

## Package Layout

```
packages/ui/
├── src/
│   ├── index.ts                     # Public barrel export
│   ├── lib/
│   │   └── utils.ts                 # cn() helper (clsx + tailwind-merge)
│   ├── styles/
│   │   └── globals.css              # Re-exports @repo/tailwind-config for consumers
│   └── components/
│       └── ui/
│           ├── button.tsx           # Button component + stories
│           ├── button.stories.tsx
│           ├── card.tsx             # Card component + stories
│           ├── card.stories.tsx
│           ├── input.tsx            # Input component + stories
│           └── input.stories.tsx
├── components.json                  # shadcn/ui config
└── tsconfig.json
```

## Installed components

| Component | Export | Description |
|---|---|---|
| `Button` | `@repo/ui` | Action button with variant/size props and full a11y |
| `Card` | `@repo/ui` | Composable card with header, content, footer sub-components |
| `Input` | `@repo/ui` | Text input with focus, disabled, and `aria-invalid` styles |

## Exported names

From `src/index.ts`:

```ts
export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./components/ui/input";
export * from "./lib/utils";
```

Import in any app or package:

```tsx
import { Button, Card, CardHeader, CardContent, Input, cn } from "@repo/ui";
```

## Adding a new shadcn component

Run from the **repo root** (shadcn is configured to add components to this package):

```bash
pnpm shadcn:add -- <component-name>
# e.g.
pnpm shadcn:add -- dialog
pnpm shadcn:add -- select
```

The component is written to `src/components/ui/<name>.tsx`. Then:

1. Export it from `src/index.ts`:
   ```ts
   export * from "./components/ui/dialog";
   ```
2. Create a co-located story (`dialog.stories.tsx`) with at least a Default story and autodocs tag.

## The `cn()` utility

All components use `cn()` to merge class names:

```ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This ensures Tailwind classes are correctly de-duped and overridable by consumers.

## Accessibility patterns

Components follow these conventions (enforced via Tailwind classes):

- **Focus rings**: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` — visible only on keyboard navigation, not mouse click.
- **Disabled state**: `disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50` + matching `aria-disabled:*` variants for non-native-button elements.
- **Invalid state**: `aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20` on Input.
- **Active state**: `active:scale-[0.98]` on Button for tactile press feedback.

## Styling requirements for consumers

Consuming apps must:

1. Import `@repo/tailwind-config` in their CSS entry point to get design tokens.
2. Add `@source "../../../packages/ui/src"` (relative to the app) so Tailwind v4 scans this package for class names.

Without `@source`, Tailwind won't generate utility classes used by shadcn components and styles will be missing.

## Storybook stories

Each component has a co-located `*.stories.tsx` file. Discovered by `apps/storybook` via path glob. Stories include:

- Default / variant / size stories
- Disabled and `aria-*` state stories  
- Composition stories (e.g. Card with Button + Input)
- Play function interaction tests (click, keyboard, typing)

## Scripts

| Script | Command |
|---|---|
| `lint` | `biome check .` |
| `format` | `biome check --write .` |
| `check` | `tsc --noEmit` |
| `shadcn:init` | `pnpm dlx shadcn@latest init` (run once to set up) |
| `shadcn:add` | `pnpm dlx shadcn@latest add` |
| `clean` | Remove `.turbo/`, `node_modules/` |

## Caveats

- No `build` script — apps handle transpilation. This means IDE "Go to definition" jumps to `.ts` source directly.
- The `@storybook/react` devDependency is present for story type imports only (`Meta`, `StoryObj`). It is not a runtime dependency.
- `components.json` sets `tailwind.config: ""` because Tailwind v4 needs no config file.

## Potential future work

- Add `tsup` build step + `dist/` exports to enable npm publishing
- Add Vitest unit tests for `cn()` and component render behaviour
- Add `@storybook/addon-test` interaction test runner once a stable v10 release ships
- Add more shadcn components: `Select`, `Dialog`, `Toast`, `Tooltip`, `Popover`
- Generate component docs from JSDoc with Storybook autodocs
- Add a Figma token sync workflow for design system alignment
