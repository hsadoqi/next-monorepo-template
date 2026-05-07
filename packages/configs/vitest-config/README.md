# packages/configs/vitest-config

Shared [Vitest](https://vitest.dev/) base configuration for the monorepo. Packages can import and extend this to share coverage settings, environment setup, and exclusions without duplicating config.

## What it exports

| Export | File |
|---|---|
| `@repo/vitest-config/base` | `base.js` |

## Usage

In any `vitest.config.ts`:

```ts
import baseConfig from "@repo/vitest-config/base";
import { mergeConfig } from "vitest/config";

export default mergeConfig(baseConfig, {
  test: {
    environment: "jsdom", // override for browser-like tests
  },
});
```

## What the base config provides

- `coverage.provider: "v8"` — fast native V8 coverage (no Istanbul instrumentation overhead)
- `coverage.exclude` — common exclusions (`node_modules`, `dist`, `**/*.stories.*`, `**/*.config.*`)
- `reporter: ["text", "lcov"]` — text output for local dev + LCOV for CI coverage upload
- `include` glob: `**/*.{test,spec}.{ts,tsx}`

## Current status

`packages/ui` is wired to this config with a small baseline unit test. Add new package tests using the same package-task pattern.

```bash
pnpm test
```

The root `test` script delegates to `turbo run test`.

## Adding tests to a package

1. Add `vitest` as a devDependency in the package (peer dep is already declared).
2. Create `vitest.config.ts` extending the base:
   ```ts
   import baseConfig from "@repo/vitest-config/base";
   import { mergeConfig } from "vitest/config";
   export default mergeConfig(baseConfig, {});
   ```
3. Add a `test` script: `"test": "vitest run"`
4. Add test files: `src/lib/utils.test.ts`
5. Register the task in the root `turbo.json`.

## Example test (packages/ui)

```ts
// packages/ui/src/lib/utils.test.ts
import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "px-2")).toBe("px-2"); // tailwind-merge resolves conflict
  });
});
```

## Caveats

- Vitest v3 requires `vitest` to be installed as a direct devDependency in each consuming package (peer dep). This package declares `vitest@^3.2.0` as a peer.
- For React component tests, install `@testing-library/react` and `@testing-library/user-event` in the consuming package. The base config does not include these.
- The shared config is exported as plain ESM JavaScript so Vitest config files can import it directly across workspace package boundaries without a TypeScript loader.

## Potential future work

- Add `setupFiles` for `@testing-library/jest-dom` matchers
- Add `globalSetup` for database or server setup in integration tests
- Add Storybook interaction test runner integration once `@storybook/addon-test` ships v10
- Configure coverage thresholds (e.g. 80% line coverage minimum)
- Add a CI step that uploads LCOV reports to Codecov or Coveralls
