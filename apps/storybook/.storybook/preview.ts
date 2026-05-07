import "../src/styles/globals.css";

import type { Decorator, Preview } from "@storybook/nextjs-vite";

// Toggles the `dark` class on <html> to activate Tailwind's class-based dark mode
// and trigger `.dark { ... }` CSS variable overrides from shared-styles.css.
const withTheme: Decorator = (Story, context) => {
	const theme = (context.globals as Record<string, string>).theme ?? "light";
	if (typeof document !== "undefined") {
		document.documentElement.classList.toggle("dark", theme === "dark");
		document.querySelector(".docs-story")?.classList.toggle("dark", theme === "dark");
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
		theme: {
			description: "Color scheme",
			defaultValue: "light",
			toolbar: {
				title: "Theme",
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
		layout: "centered",
	},
};

export default preview;
