# packages/configs/tailwind-config

Shared Tailwind CSS v4 styles and PostCSS configuration for the monorepo. Provides the design token system (shadcn/ui CSS variables), dark mode variant, and PostCSS plugin setup as a single importable CSS package.

## What it exports

| Export | File | Purpose |
|---|---|---|
| `@repo/tailwind-config` (default) | `shared-styles.css` | CSS design tokens, dark mode, theme mappings |
| `@repo/tailwind-config/postcss` | `postcss.config.js` | PostCSS plugin (`@tailwindcss/postcss`) |

## How to use in an app

### 1. Install the CSS entry point

In your app's CSS entry point (e.g. `app/globals.css`), add:

```css
@import "tailwindcss";          /* Tailwind v4 core — must come first */
@import "@repo/tailwind-config"; /* design tokens + dark mode */
@source "../../../packages/ui/src";  /* if using @repo/ui, scan its source */
```

**Do not** add `@import "tailwindcss"` inside `shared-styles.css`. It belongs in each app's own entry point.

### 2. Use the shared PostCSS config

In your app's `postcss.config.js`:

```js
export { default } from "@repo/tailwind-config/postcss";
```

This adds `@tailwindcss/postcss` as the PostCSS plugin — required for Tailwind v4 to process CSS.

## Design token system

`shared-styles.css` defines shadcn/ui CSS variables in `:root` using oklch colors:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --card: oklch(1 0 0);
  --muted: oklch(0.97 0 0);
  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
  /* ... */
}
```

oklch is used because it provides perceptually uniform color mixing, better than hex/hsl for theming.

The `@theme inline` block maps CSS variables to Tailwind utility classes:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* ... */
}
```

This enables classes like `bg-background`, `text-foreground`, `bg-primary` in components.

## Dark mode

Dark mode is implemented via a CSS custom variant (Tailwind v4 API):

```css
@custom-variant dark (&:is(.dark, .dark *));
```

A `.dark` class on `html` (or any ancestor) activates dark tokens:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

Toggle dark mode in JavaScript:

```ts
document.documentElement.classList.toggle("dark");
```

Storybook's toolbar decorator handles this automatically for story previews.

## Base layer resets

```css
@layer base {
  *, *::before, *::after {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

These apply the design tokens globally. They run in every app that imports this package.

## Customising tokens

Override any token in your app's CSS file **after** the import:

```css
@import "@repo/tailwind-config";

:root {
  --primary: oklch(0.45 0.2 270); /* purple primary */
  --radius: 0.25rem;              /* sharper corners */
}
```

## Files

| File | Purpose |
|---|---|
| `shared-styles.css` | CSS entry with tokens, dark mode, `@theme`, base layer |
| `postcss.config.js` | `{ plugins: { "@tailwindcss/postcss": {} } }` |
| `postcss.config.d.ts` | TypeScript type declaration for the PostCSS config |

## Caveats

- **No `@import "tailwindcss"` in this file.** It must live in each consuming app's entry point only. Importing it here would cause duplicate Tailwind output.
- **Biome warnings** on `@theme`, `@custom-variant`, `@apply`: Biome's CSS parser doesn't recognise Tailwind v4 custom at-rules. These are cosmetic warnings — builds pass.
- **`@source` is app-side.** This package doesn't know which external directories each app needs to scan. Add `@source` directives in each app's CSS entry point.

## Potential future work

- Add semantic color aliases (e.g. `--color-success`, `--color-warning`)
- Add fluid typography scale using `clamp()` CSS functions
- Export a `animations.css` with shared keyframes/transitions
- Add `color-scheme: light dark` support for OS-level preference fallback
