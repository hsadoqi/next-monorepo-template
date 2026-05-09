import { useTheme, useThemeMode } from "@repo/ui-theme-react";
import { themePresets } from "@repo/ui-theme-tokens";
import type { Meta, StoryObj } from "@storybook/react";

// Demo component for useTheme hook
function UseThemeDemo() {
	const { theme, setTheme, themeName, setThemeName } = useTheme();

	return (
		<div className="p-6 space-y-4">
			<h2 className="text-2xl font-bold">useTheme Hook Demo</h2>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Current Theme State</h3>
				<div className="bg-gray-50 p-4 rounded-lg">
					<p>
						<strong>Theme Name:</strong> <code>{themeName}</code>
					</p>
					<p>
						<strong>Theme Config:</strong>
					</p>
					<pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-32">
						{JSON.stringify(theme, null, 2)}
					</pre>
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Theme Controls</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
					{Object.keys(themePresets).map((presetName) => (
						<button
							key={presetName}
							type="button"
							onClick={() => setThemeName(presetName)}
							className={`px-3 py-2 rounded capitalize ${
								themeName === presetName
									? "bg-blue-500 text-white"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
						>
							{presetName}
						</button>
					))}
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Direct Theme Setting</h3>
				<button
					type="button"
					onClick={() => setTheme(themePresets.professional.config)}
					className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
				>
					Set Professional Theme Directly
				</button>
			</div>
		</div>
	);
}

// Demo component for useThemeMode hook
function UseThemeModeDemo() {
	const { isDark, toggle, setDark } = useThemeMode();

	return (
		<div className="p-6 space-y-4">
			<h2 className="text-2xl font-bold">useThemeMode Hook Demo</h2>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Current Mode State</h3>
				<div className="bg-gray-50 p-4 rounded-lg">
					<p>
						<strong>Is Dark Mode:</strong> <code>{isDark ? "true" : "false"}</code>
					</p>
					<p>
						<strong>Document Class:</strong>{" "}
						<code>{document.documentElement.classList.contains("dark") ? "dark" : "light"}</code>
					</p>
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Mode Controls</h3>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={toggle}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Toggle Mode
					</button>
					<button
						type="button"
						onClick={() => setDark(false)}
						className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
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
				<h3 className="text-lg font-semibold">Visual Feedback</h3>
				<div
					className={`p-4 rounded-lg transition-colors ${
						isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900 border"
					}`}
				>
					<p>This box changes appearance based on the dark mode state.</p>
					<p>
						Current mode: <strong>{isDark ? "Dark" : "Light"}</strong>
					</p>
				</div>
			</div>
		</div>
	);
}

// Combined hooks demo
function CombinedHooksDemo() {
	const { themeName, setThemeName } = useTheme();
	const { isDark, toggle } = useThemeMode();

	return (
		<div className="p-6 space-y-4">
			<h2 className="text-2xl font-bold">Combined Hooks Demo</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-gray-50 p-4 rounded-lg">
					<h3 className="text-lg font-semibold mb-2">Theme State</h3>
					<p>
						<strong>Theme:</strong> {themeName}
					</p>
					<p>
						<strong>Mode:</strong> {isDark ? "Dark" : "Light"}
					</p>
				</div>

				<div className="bg-gray-50 p-4 rounded-lg">
					<h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
					<div className="space-y-2">
						<button
							type="button"
							onClick={toggle}
							className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Toggle Mode
						</button>
						<button
							type="button"
							onClick={() => setThemeName("futuristic")}
							className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
						>
							Futuristic Theme
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const meta: Meta = {
	title: "Theme/Hooks",
	parameters: {
		docs: {
			description: {
				component: "Demonstration of individual theme hooks: useTheme and useThemeMode.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;

export const UseThemeHook: StoryObj<typeof UseThemeDemo> = {
	render: () => <UseThemeDemo />,
	parameters: {
		docs: {
			description: {
				story: "Demonstrates the useTheme hook for accessing and modifying theme configuration.",
			},
		},
	},
};

export const UseThemeModeHook: StoryObj<typeof UseThemeModeDemo> = {
	render: () => <UseThemeModeDemo />,
	parameters: {
		docs: {
			description: {
				story: "Demonstrates the useThemeMode hook for managing dark/light mode state.",
			},
		},
	},
};

export const CombinedHooks: StoryObj<typeof CombinedHooksDemo> = {
	render: () => <CombinedHooksDemo />,
	parameters: {
		docs: {
			description: {
				story: "Shows how to use both hooks together in a single component.",
			},
		},
	},
};
