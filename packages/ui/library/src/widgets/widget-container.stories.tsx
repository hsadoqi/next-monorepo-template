import type { Meta, StoryObj } from "@storybook/react";
import { WidgetContainer } from "./widget-container";

const meta: Meta<typeof WidgetContainer> = {
	title: "Widgets/WidgetContainer",
	component: WidgetContainer,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		id: {
			control: "text",
			description: "Unique widget ID",
		},
		title: {
			control: "text",
			description: "Widget title",
		},
		isFullscreen: {
			control: "boolean",
			description: "Whether widget is in fullscreen mode",
		},
		showSettings: {
			control: "boolean",
			description: "Show settings button",
		},
		showTheme: {
			control: "boolean",
			description: "Show theme button",
		},
		showRefresh: {
			control: "boolean",
			description: "Show refresh button",
		},
		showDuplicate: {
			control: "boolean",
			description: "Show duplicate button",
		},
		showDelete: {
			control: "boolean",
			description: "Show delete button",
		},
		showFullscreen: {
			control: "boolean",
			description: "Show fullscreen button",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	args: {
		id: "widget-1",
		title: "Widget Title",
		children: <div className="p-4 text-center text-muted-foreground">Widget content goes here</div>,
		showSettings: true,
		showRefresh: true,
		showDuplicate: true,
		showDelete: true,
		showFullscreen: true,
	},
};

// ─── Minimal Toolbar ─────────────────────────────────────────────────────────

export const MinimalToolbar: Story = {
	args: {
		id: "widget-2",
		title: "Simple Widget",
		children: (
			<div className="p-6 space-y-4">
				<p className="text-sm text-muted-foreground">
					This widget has a minimal toolbar with only essential actions.
				</p>
				<div className="space-y-2">
					<div className="h-2 bg-primary rounded"></div>
					<div className="h-2 bg-secondary rounded"></div>
					<div className="h-2 bg-accent rounded"></div>
				</div>
			</div>
		),
		showSettings: false,
		showRefresh: true,
		showDuplicate: false,
		showDelete: false,
		showFullscreen: true,
	},
};

// ─── Full Toolbar ────────────────────────────────────────────────────────────

export const FullToolbar: Story = {
	args: {
		id: "widget-3",
		title: "Feature-Rich Widget",
		children: (
			<div className="p-6">
				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-green-500"></div>
						<span className="text-sm">Status: Active</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-blue-500"></div>
						<span className="text-sm">Last updated: Just now</span>
					</div>
					<div className="mt-4 pt-4 border-t">
						<p className="text-xs text-muted-foreground">
							All actions are available in the toolbar
						</p>
					</div>
				</div>
			</div>
		),
		showSettings: true,
		showTheme: true,
		showRefresh: true,
		showDuplicate: true,
		showDelete: true,
		showFullscreen: true,
	},
};

// ─── Fullscreen Mode ─────────────────────────────────────────────────────────

export const FullscreenMode: Story = {
	args: {
		id: "widget-4",
		title: "Dashboard View",
		children: (
			<div className="p-8 space-y-6">
				<div className="grid grid-cols-3 gap-4">
					<div className="bg-primary/10 rounded-lg p-4 text-center">
						<div className="text-3xl font-bold">1,234</div>
						<div className="text-sm text-muted-foreground">Total Items</div>
					</div>
					<div className="bg-secondary/10 rounded-lg p-4 text-center">
						<div className="text-3xl font-bold">567</div>
						<div className="text-sm text-muted-foreground">Completed</div>
					</div>
					<div className="bg-accent/10 rounded-lg p-4 text-center">
						<div className="text-3xl font-bold">45%</div>
						<div className="text-sm text-muted-foreground">Progress</div>
					</div>
				</div>
			</div>
		),
		isFullscreen: true,
		showSettings: true,
		showRefresh: true,
		showDuplicate: false,
		showDelete: false,
		showFullscreen: true,
	},
};

// ─── Settings-Only ───────────────────────────────────────────────────────────

export const SettingsOnly: Story = {
	args: {
		id: "widget-5",
		title: "Configuration Widget",
		children: (
			<div className="p-4">
				<p className="text-sm text-muted-foreground mb-4">
					Only settings button is available for this read-only widget.
				</p>
			</div>
		),
		showSettings: true,
		showTheme: false,
		showRefresh: false,
		showDuplicate: false,
		showDelete: false,
		showFullscreen: false,
	},
};

// ─── With Custom Content ─────────────────────────────────────────────────────

export const WithComplexContent: Story = {
	args: {
		id: "widget-6",
		title: "Data Overview",
		children: (
			<div className="p-6 space-y-4">
				<div className="space-y-2">
					<h3 className="font-semibold">Recent Items</h3>
					<div className="space-y-2">
						{[1, 2, 3].map((i) => (
							<div key={i} className="flex justify-between items-center p-2 bg-muted rounded">
								<span className="text-sm">Item {i}</span>
								<span className="text-xs text-foreground/70">2 hours ago</span>
							</div>
						))}
					</div>
				</div>
				<div className="pt-4 border-t">
					<button type="button" className="text-sm text-primary hover:underline">
						View all →
					</button>
				</div>
			</div>
		),
		showSettings: true,
		showRefresh: true,
		showDuplicate: true,
		showDelete: true,
		showFullscreen: true,
		onSettingsClick: () => console.log("Settings clicked"),
		onRefresh: () => console.log("Refresh clicked"),
		onDuplicate: () => console.log("Duplicate clicked"),
		onDelete: () => console.log("Delete clicked"),
		onToggleFullscreen: () => console.log("Fullscreen toggled"),
	},
};
