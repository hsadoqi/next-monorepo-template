import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		exclude: ["**/.private/**", "node_modules/**", "dist/**", ".next/**", ".turbo/**"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"**/.private/**",
				"node_modules/**",
				"dist/**",
				".next/**",
				".turbo/**",
				"**/vitest.config.*",
			],
		},
	},
});
