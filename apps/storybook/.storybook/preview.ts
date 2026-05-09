import "../src/styles/globals.css";

import { injectThemeCSS } from "@repo/ui-theme-styles";
import { generateCompleteThemeCSS, themePresets } from "@repo/ui-theme-tokens";
import type { Decorator, Preview } from "@storybook/react-vite";

const withTheme: Decorator = (Story, context) => {
	const style = (context.globals as Record<string, string>).themeStyle ?? "default";
	const mode = (context.globals as Record<string, string>).theme ?? "light";
	const preset = themePresets[style] ?? themePresets.default;

	if (typeof document !== "undefined") {
		const css = generateCompleteThemeCSS(preset.config);
		injectThemeCSS(css, style);
		document.documentElement.classList.toggle("dark", mode === "dark");
		document.querySelector(".docs-story")?.classList.toggle("dark", mode === "dark");
	}

	return Story();
};

const preview: Preview = {
	decorators: [withTheme],

	// NOTE: "No existing state found for follower" errors in the browser console are a
	// known Storybook 10 dev-mode race condition (UniversalStore channel timing).
	// They do not affect story rendering or the built storybook output.
	// A full fix requires @storybook/addon-test, which has no stable v10 release yet.

	globalTypes: {
		themeStyle: {
			description: "Visual style preset",
			defaultValue: "default",
			toolbar: {
				title: "Style",
				icon: "box",
				items: [
					{ value: "default", title: "Default" },
					{ value: "professional", title: "Professional" },
					{ value: "futuristic", title: "Futuristic" },
					{ value: "fantasy", title: "Fantasy" },
					{ value: "neon", title: "Neon" },
				],
				dynamicTitle: true,
			},
		},
		theme: {
			description: "Color scheme",
			defaultValue: "light",
			toolbar: {
				title: "Mode",
				icon: "paintbrush",
				items: [
					{ value: "light", icon: "sun", title: "Light" },
					{ value: "dark", icon: "moon", title: "Dark" },
				],
				dynamicTitle: true,
			},
		},
	},

	parameters: {
		a11y: {
			// Enable per story with `tags: ["a11y"]` for focused accessibility assertions.
			disable: true,
		},
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#ffffff" },
				{ name: "dark", value: "#09090b" },
			],
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default preview;
