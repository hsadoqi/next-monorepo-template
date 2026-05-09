import type { Meta, StoryObj } from "@storybook/react";
import Grid from "../grid/grid";

const meta: Meta<typeof Grid> = {
	title: "Dashboard/Grid",
	component: Grid,
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
	render: () => (
		<div className="size-full min-h-screen bg-background flex flex-col">
			<div className="border-b border-border px-6 py-4 bg-card">
				<h1 className="text-5xl font-bold text-foreground">Responsive Grid Dashboard</h1>
			</div>
			<Grid />
		</div>
	),
};

export const Compact: Story = {
	render: () => (
		<div className="size-full min-h-screen bg-background flex flex-col">
			<div className="border-b border-border px-4 py-3 bg-card">
				<h2 className="text-lg font-semibold text-foreground">Compact Grid Layout</h2>
				<p className="text-xs text-muted-foreground mt-1">Optimized for smaller screens</p>
			</div>
			<Grid />
		</div>
	),
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
};

export const Expanded: Story = {
	render: () => (
		<div className="w-full h-screen bg-background flex flex-col">
			<div className="border-b border-border px-6 py-4 bg-card">
				<h1 className="text-2xl font-bold text-foreground">Full Screen Grid</h1>
				<p className="text-sm text-muted-foreground mt-1">Maximum information at a glance</p>
			</div>
			<Grid />
		</div>
	),
	parameters: {
		viewport: {
			defaultViewport: "desktop",
		},
	},
};
