import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
	stories: [
		// "../src/**/*.mdx",
		// "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		// "../../web/**/*.mdx",
		"../../web/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		// "../../../packages/ui/**/*.mdx",
		"../../../packages/ui/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
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
			"@": path.resolve(dirname, "../../web"),
			"@repo/ui-components": path.resolve(dirname, "../../../packages/ui/components/src"),
			"@repo/ui-components/lib": path.resolve(dirname, "../../../packages/ui/components/src/lib"),
		};
		return config;
	},
};

export default config;
