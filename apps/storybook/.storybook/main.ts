import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
	stories: [
		"../../web/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../../../packages/ui/library/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../../../packages/ui/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../../../packages/ui/theme/core/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../../../packages/ui/theme/foundations/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../../../packages/ui/theme/react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../../../packages/ui/theme/styles/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../../../packages/ui/theme/tokens/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"!**/.private/**",
	],
	addons: ["@storybook/addon-links", "@storybook/addon-docs", "@storybook/addon-a11y"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	core: {
		disableTelemetry: true,
	},
	staticDirs: ["../../web/public"],
	async viteFinal(config) {
		config.resolve ??= {};
		config.resolve.alias = {
			...(config.resolve.alias ?? {}),
			"@": path.resolve(dirname, "../../web/src"),
			"@repo/tailwind-config": path.resolve(dirname, "../../../packages/configs/tailwind-config"),
			"@repo/ui-components": path.resolve(dirname, "../../../packages/ui/components/src"),
			"@repo/ui-components/lib": path.resolve(dirname, "../../../packages/ui/components/src/lib"),
			"@repo/ui-library": path.resolve(dirname, "../../../packages/ui/library/src"),
			"@repo/ui-theme-foundations": path.resolve(
				dirname,
				"../../../packages/ui/theme/foundations/src",
			),
			"@repo/ui-theme-tokens": path.resolve(dirname, "../../../packages/ui/theme/tokens/src"),
			"@repo/ui-theme-styles": path.resolve(dirname, "../../../packages/ui/theme/styles/src"),
			"@repo/ui-theme-core": path.resolve(dirname, "../../../packages/ui/theme/core/src"),
			"@repo/ui-theme-react": path.resolve(dirname, "../../../packages/ui/theme/react/src"),
		};
		return config;
	},
};

export default config;
