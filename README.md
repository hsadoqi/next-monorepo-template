# Next.js Monorepo Template

A modern, high-performance monorepo template powered by [Turborepo](https://turbo.build/repo) and [pnpm workspaces](https://pnpm.io/workspaces). This repository is designed to be highly scalable, providing shared tooling and configurations out of the box so you can focus on building your applications.

## 📦 Packages Breakdown

This monorepo comes pre-configured with several essential utility packages in the `packages/` directory. These are meant to be imported and used by your applications (`apps/`) and other local packages.

### 1. `typescript-config`
- **What it is:** Shared TypeScript configurations (`tsconfig.json`).
- **Functionality:** Provides strict, modern (ES2022/ESNext) baseline configurations.
- **When to use:** Extend these in your apps/packages to maintain consistent typing rules across the workspace.
  - `typescript-config/base.json`: For Node.js/Standard TS packages.
  - `typescript-config/nextjs.json`: Specifically tuned for Next.js apps.

### 2. `eslint-config`
- **What it is:** Shared [ESLint v9 (Flat Config)](https://eslint.org/docs/latest/use/configure/configuration-files) rules.
- **Functionality:** Centralized linting rules using `@eslint/js` and `typescript-eslint`. Prevents rule drift and reduces duplicate boilerplate.
- **When to use:** Import and export this base config in the `eslint.config.js` or `eslint.config.mjs` of any app or package to instantly inherit standard workspace code quality rules.

### 3. `vitest-config`
- **What it is:** Shared [Vitest](https://vitest.dev/) configuration.
- **Functionality:** Configures Vite-based testing with V8 coverage tools unified testing across your repository. 
- **When to use:** Import into your local `vitest.config.ts` files to share test coverage reporting, exclusions, and test environments without rewriting boilerplate.

### 4. `tailwind-config`
- **What it is:** Workspace-wide Tailwind CSS configurations and shared styles.
- **Functionality:** Allows you to define your core design system, themes, and plugins once.
- **When to use:** Import the shared styles or PostCSS configurations directly into your app to ensure a consistent UI/UX design language across multiple frontends.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v22+ (Strict engine requirements configured)
- **pnpm**: v10+

### Installation
```bash
# Install dependencies across all workspaces
pnpm install
```

### Useful Commands

This template supports Turborepo commands natively. Running these from the root will execute the corresponding scripts in all workspaces defined in your `turbo.json`:

- `pnpm run build` - Build all apps and packages
- `pnpm run dev` - Start all apps in development mode
- `pnpm run lint` - Lint all apps and packages
- `pnpm run test` - Run tests workspace-wide using Vitest
- `pnpm run check` - Typecheck the codebase

## 🛠️ Typical Workflow

1. **Create an App**: Add your Next.js frontend in the `apps/` directory.
2. **Create a Internal Package**: Add a shared UI component library or utility package in `packages/`.
3. **Link them**: Add your internal packages to your app's `package.json` dependencies (e.g., `"my-ui": "workspace:*"`).
4. **Build with Turbo**: Let Turborepo handle caching and dependency graphs to build incredibly fast!