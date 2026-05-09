import { ThemeProvider } from "@repo/ui-theme-react";
import { themePresets } from "@repo/ui-theme-tokens";
import type { Meta, StoryObj } from "@storybook/react";

// Simple themed component
function ThemedCard({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
			<div className="text-gray-700 dark:text-gray-300">{children}</div>
		</div>
	);
}

// Demo component showing ThemeProvider usage
function ThemeProviderDemo() {
	return (
		<div className="space-y-6">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
					ThemeProvider Demo
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					This content is wrapped with ThemeProvider and responds to theme changes.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<ThemedCard title="Default Theme">
					<p>This card uses the default theme styling with CSS custom properties.</p>
					<div className="mt-3 space-y-1">
						<div className="w-full bg-blue-500 h-2 rounded"></div>
						<div className="w-4/5 bg-green-500 h-2 rounded"></div>
						<div className="w-3/5 bg-yellow-500 h-2 rounded"></div>
					</div>
				</ThemedCard>

				<ThemedCard title="Responsive Design">
					<p>The theme system works across all screen sizes and adapts to user preferences.</p>
					<ul className="mt-2 space-y-1 text-sm">
						<li>• Light and dark mode support</li>
						<li>• Multiple theme presets</li>
						<li>• CSS custom properties</li>
					</ul>
				</ThemedCard>

				<ThemedCard title="Accessibility">
					<p>Theme changes maintain proper contrast ratios and accessibility standards.</p>
					<div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
						WCAG AA compliant color schemes
					</div>
				</ThemedCard>
			</div>

			<div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
				<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
					Theme Information
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Available Themes</h3>
						<ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
							{Object.keys(themePresets).map((preset) => (
								<li key={preset} className="capitalize">
									• {preset}
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Features</h3>
						<ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
							<li>• React Context integration</li>
							<li>• TypeScript support</li>
							<li>• CSS-in-JS compatible</li>
							<li>• Runtime theme switching</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

const meta: Meta<typeof ThemeProvider> = {
	title: "Theme/ThemeProvider",
	component: ThemeProvider,
	parameters: {
		docs: {
			description: {
				component:
					"ThemeProvider wraps your application and provides theme context to all child components.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const Default: Story = {
	args: {
		children: <ThemeProviderDemo />,
	},
	parameters: {
		docs: {
			description: {
				story: "Default ThemeProvider usage with default theme settings.",
			},
		},
	},
};

export const WithInitialTheme: Story = {
	args: {
		initialTheme: themePresets.professional.config,
		initialThemeName: "professional",
		children: <ThemeProviderDemo />,
	},
	parameters: {
		docs: {
			description: {
				story: "ThemeProvider initialized with a specific theme preset.",
			},
		},
	},
};

export const WithCustomTheme: Story = {
	args: {
		initialTheme: {
			...themePresets.default.config,
			colors: {
				...themePresets.default.config.colors,
				primary: { h: 280, s: 85, l: 55 }, // Custom purple
				secondary: { h: 160, s: 70, l: 45 }, // Custom teal
			},
		},
		initialThemeName: "custom",
		children: <ThemeProviderDemo />,
	},
	parameters: {
		docs: {
			description: {
				story: "ThemeProvider with a custom theme configuration.",
			},
		},
	},
};

export const NestedProviders: Story = {
	render: () => (
		<ThemeProvider initialThemeName="default">
			<div className="space-y-4">
				<ThemedCard title="Outer Provider (Default)">
					<p>This content uses the default theme from the outer provider.</p>
				</ThemedCard>

				<ThemeProvider initialThemeName="futuristic">
					<ThemedCard title="Inner Provider (Futuristic)">
						<p>This content uses the futuristic theme from the inner provider.</p>
						<p className="text-sm text-gray-500 mt-2">
							Note: Nested providers allow for component-level theme overrides.
						</p>
					</ThemedCard>
				</ThemeProvider>

				<ThemedCard title="Back to Outer Provider">
					<p>This content is back to using the default theme.</p>
				</ThemedCard>
			</div>
		</ThemeProvider>
	),
	parameters: {
		docs: {
			description: {
				story: "Demonstrates nested ThemeProvider usage for component-level theme overrides.",
			},
		},
	},
};
