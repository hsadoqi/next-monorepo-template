import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
	title: "UI/Switch",
	component: Switch,
	tags: ["autodocs"],
	args: {
		onCheckedChange: fn(),
	},
	argTypes: {
		defaultChecked: {
			control: "boolean",
			description: "Initial checked state",
			table: { defaultValue: { summary: "false" } },
		},
		checked: {
			control: "boolean",
			description: "Controlled checked state",
		},
		disabled: {
			control: "boolean",
			description: "Prevents interaction and applies reduced opacity",
		},
		size: {
			control: "select",
			options: ["sm", "default"],
			description: "Switch size variant",
			table: { defaultValue: { summary: "default" } },
		},
		onCheckedChange: {
			action: "checked",
			description: "Callback fired when checked state changes",
		},
	},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Variants ────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const Checked: Story = {
	args: {
		defaultChecked: true,
	},
};

export const Small: Story = {
	args: {
		size: "sm",
	},
};

export const SmallChecked: Story = {
	args: {
		size: "sm",
		defaultChecked: true,
	},
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const DisabledChecked: Story = {
	args: {
		disabled: true,
		defaultChecked: true,
	},
};

// ─── With Label ──────────────────────────────────────────────────────────────

export const WithLabel: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Switch id="airplane-mode" />
			<Label htmlFor="airplane-mode">Airplane mode</Label>
		</div>
	),
};

export const WithLabelChecked: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Switch id="airplane-mode" defaultChecked />
			<Label htmlFor="airplane-mode">Airplane mode</Label>
		</div>
	),
};

export const WithDescription: Story = {
	render: () => (
		<div className="space-y-2">
			<div className="flex items-center space-x-2">
				<Switch id="notifications" />
				<Label htmlFor="notifications">Enable notifications</Label>
			</div>
			<p className="text-sm text-muted-foreground">
				Receive email notifications for important updates
			</p>
		</div>
	),
};

// ─── Interactions ────────────────────────────────────────────────────────────

export const Interactive: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Switch id="test-switch" />
			<Label htmlFor="test-switch">Toggle me</Label>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const switchElement = canvas.getByRole("switch");
		await userEvent.click(switchElement);
		expect(switchElement).toHaveAttribute("data-state", "checked");
	},
};
