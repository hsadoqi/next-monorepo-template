# packages/configs/typescript-config

Shared TypeScript configuration bases for the monorepo. Each workspace package extends the appropriate base from here instead of duplicating `tsconfig.json` settings.

## Available configs

| Config | Extend path | Use case |
|---|---|---|
| `base.json` | `@repo/typescript-config/base.json` | Standard Node.js / library packages |
| `nextjs.json` | `@repo/typescript-config/nextjs.json` | Next.js app (`apps/web`) |

## Usage

In any `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

For a Next.js app:

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## What `base.json` sets

- `strict: true` — full strict mode (`strictNullChecks`, `noImplicitAny`, etc.)
- `target: "ES2022"` / `module: "ESNext"` / `moduleResolution: "bundler"`
- `moduleResolution: "bundler"` — required for pnpm workspace packages with `exports` maps
- `verbatimModuleSyntax: true` — enforces `import type` for type-only imports
- `isolatedModules: true` — ensures files can be transpiled independently (required for Vite/esbuild)
- No `baseUrl` — use `paths` explicitly if path aliases are needed

## What `nextjs.json` adds

- All `base.json` settings
- `jsx: "preserve"` — Next.js handles JSX transformation
- `lib: ["dom", "dom.iterable", "esnext"]`
- Next.js-specific type references

## TypeScript rules

- **Do not add `baseUrl`** — it's deprecated in bundler resolution mode. Use explicit `paths` only when needed (e.g. for `@/*` aliases).
- **Use `import type`** for type-only imports — enforced by `verbatimModuleSyntax`.
- **Do not disable strict mode** — `strict: true` is the baseline for all packages.

## Internal packages and TypeScript

Workspace packages that use the **internal packages pattern** (no build step) require `"moduleResolution": "bundler"` to resolve `package.json` `exports` fields correctly. All configs in this package use bundler resolution.

Consumers of `@repo/ui` must set a `paths` alias in their `tsconfig.json` so TypeScript can resolve the source TypeScript files:

```json
{
  "paths": {
    "@repo/ui": ["../../packages/ui/src/index.ts"]
  }
}
```

## Caveats

- TypeScript 6 dropped some legacy compiler options. Do not add deprecated options such as `importsNotUsedAsValues` (superseded by `verbatimModuleSyntax`).
- `"moduleResolution": "bundler"` is not compatible with `tsc --outDir` compilation for libraries. Use `noEmit: true` for type-checking only, and use a dedicated bundler (e.g. tsup) for package builds.

## Potential future work

- Add a `library.json` config for publishable packages with `declaration: true` and `declarationMap: true`
- Add a `react.json` config for non-Next.js React packages (e.g. CRA, Vite SPA)
- Pin TypeScript version constraints in `peerDependencies` for downstream consumers
