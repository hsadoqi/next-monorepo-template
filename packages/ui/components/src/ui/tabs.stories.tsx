import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
	title: "UI/Tabs",
	component: Tabs,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Tab orientation",
		},
	},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="tab1">
			<TabsList>
				<TabsTrigger value="tab1">Tab 1</TabsTrigger>
				<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				<TabsTrigger value="tab3">Tab 3</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">Content for Tab 1</TabsContent>
			<TabsContent value="tab2">Content for Tab 2</TabsContent>
			<TabsContent value="tab3">Content for Tab 3</TabsContent>
		</Tabs>
	),
};

// ─── Vertical ────────────────────────────────────────────────────────────────

export const Vertical: Story = {
	render: () => (
		<Tabs defaultValue="tab1" orientation="vertical" className="flex gap-4">
			<TabsList className="flex-col">
				<TabsTrigger value="tab1">Tab 1</TabsTrigger>
				<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				<TabsTrigger value="tab3">Tab 3</TabsTrigger>
			</TabsList>
			<div>
				<TabsContent value="tab1">Content for Tab 1</TabsContent>
				<TabsContent value="tab2">Content for Tab 2</TabsContent>
				<TabsContent value="tab3">Content for Tab 3</TabsContent>
			</div>
		</Tabs>
	),
};

// ─── Disabled tabs ───────────────────────────────────────────────────────────

export const DisabledTabs: Story = {
	render: () => (
		<Tabs defaultValue="tab1">
			<TabsList>
				<TabsTrigger value="tab1">Enabled</TabsTrigger>
				<TabsTrigger value="tab2" disabled>
					Disabled
				</TabsTrigger>
				<TabsTrigger value="tab3">Enabled</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">Content for Tab 1</TabsContent>
			<TabsContent value="tab2">Content for Tab 2</TabsContent>
			<TabsContent value="tab3">Content for Tab 3</TabsContent>
		</Tabs>
	),
};

// ─── With content ────────────────────────────────────────────────────────────

export const WithContent: Story = {
	render: () => (
		<Tabs defaultValue="overview" className="w-96">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" className="space-y-2">
				<h3 className="font-semibold">Overview</h3>
				<p className="text-sm text-muted-foreground">Main overview information</p>
			</TabsContent>
			<TabsContent value="analytics" className="space-y-2">
				<h3 className="font-semibold">Analytics</h3>
				<p className="text-sm text-muted-foreground">Analytics data and charts</p>
			</TabsContent>
			<TabsContent value="settings" className="space-y-2">
				<h3 className="font-semibold">Settings</h3>
				<p className="text-sm text-muted-foreground">Configuration options</p>
			</TabsContent>
		</Tabs>
	),
};
