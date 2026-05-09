import { ThemeProvider, useTheme, useThemeMode } from "@repo/ui-theme-react";
import { themePresets } from "@repo/ui-theme-tokens";
import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";

// Demo component that uses the theme hooks
function ThemeDemo() {
	const { themeName, setThemeName } = useTheme();
	const { isDark, toggle, setDark } = useThemeMode();

	return (
		<div className="p-6 space-y-4">
			<h2 className="text-2xl font-bold">Theme System Demo</h2>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Current Theme</h3>
				<p>
					Theme Name: <code className="bg-gray-100 px-2 py-1 rounded">{themeName}</code>
				</p>
				<p>
					Dark Mode:{" "}
					<code className="bg-gray-100 px-2 py-1 rounded">{isDark ? "true" : "false"}</code>
				</p>
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Theme Controls</h3>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={toggle}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Toggle Dark Mode
					</button>
					<button
						type="button"
						onClick={() => setDark(false)}
						className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
					>
						Light Mode
					</button>
					<button
						type="button"
						onClick={() => setDark(true)}
						className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
					>
						Dark Mode
					</button>
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Theme Presets</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
					{Object.keys(themePresets).map((presetName) => (
						<button
							key={presetName}
							type="button"
							onClick={() => setThemeName(presetName)}
							className={`px-3 py-2 rounded capitalize ${
								themeName === presetName
									? "bg-green-500 text-white"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
						>
							{presetName}
						</button>
					))}
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Sample Content</h3>
				<div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
					<p className="text-gray-900 dark:text-gray-100">
						This content demonstrates how the theme system affects styling. The background and text
						colors change based on the selected theme and mode.
					</p>
					<div className="mt-4 space-y-2">
						<div className="w-full bg-blue-500 h-4 rounded"></div>
						<div className="w-3/4 bg-green-500 h-4 rounded"></div>
						<div className="w-1/2 bg-yellow-500 h-4 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Wrapper component for stories
function StoryWrapper({ children }: { children: ReactNode }) {
	return <ThemeProvider>{children}</ThemeProvider>;
}

const meta: Meta<typeof ThemeDemo> = {
	title: "Theme/Theme System",
	component: ThemeDemo,
	decorators: [
		(Story: any) => (
			<StoryWrapper>
				<Story />
			</StoryWrapper>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					"Comprehensive demo of the theme system including ThemeProvider, useTheme hook, and useThemeMode hook.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeDemo>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: "Default theme system demo showing all available controls and theme presets.",
			},
		},
	},
};

export const LightMode: Story = {
	decorators: [
		(Story: any) => (
			<ThemeProvider initialThemeName="default">
				<Story />
			</ThemeProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				story: "Theme system initialized in light mode with default theme.",
			},
		},
	},
};

export const DarkMode: Story = {
	decorators: [
		(Story: any) => (
			<ThemeProvider initialThemeName="default">
				<div className="dark">
					<Story />
				</div>
			</ThemeProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				story: "Theme system initialized in dark mode with default theme.",
			},
		},
	},
};

export const ProfessionalTheme: Story = {
	decorators: [
		(Story: any) => (
			<ThemeProvider initialThemeName="professional">
				<Story />
			</ThemeProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				story: "Theme system using the professional theme preset.",
			},
		},
	},
};

export const FuturisticTheme: Story = {
	decorators: [
		(Story: any) => (
			<ThemeProvider initialThemeName="futuristic">
				<Story />
			</ThemeProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				story: "Theme system using the futuristic theme preset.",
			},
		},
	},
};

export const FantasyTheme: Story = {
	decorators: [
		(Story: any) => (
			<ThemeProvider initialThemeName="fantasy">
				<Story />
			</ThemeProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				story: "Theme system using the fantasy theme preset.",
			},
		},
	},
};

export const NeonTheme: Story = {
	decorators: [
		(Story: any) => (
			<ThemeProvider initialThemeName="neon">
				<Story />
			</ThemeProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				story: "Theme system using the neon theme preset.",
			},
		},
	},
};
