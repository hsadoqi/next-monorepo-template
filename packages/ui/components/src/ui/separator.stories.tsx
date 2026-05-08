import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta = {
	title: "UI/Separator",
	component: Separator,
	tags: ["autodocs"],
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Direction of the separator",
			table: { defaultValue: { summary: "horizontal" } },
		},
		decorative: {
			control: "boolean",
			description: "Whether the separator is decorative (aria-hidden)",
			table: { defaultValue: { summary: "true" } },
		},
	},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Horizontal: Story = {};

export const Vertical: Story = {
	args: { orientation: "vertical" },
	render: () => (
		<div className="flex h-20 items-center gap-4">
			<span>Left</span>
			<Separator orientation="vertical" />
			<span>Right</span>
		</div>
	),
};

// ─── In context ──────────────────────────────────────────────────────────────

export const WithContent: Story = {
	render: () => (
		<div className="space-y-2">
			<h3 className="font-semibold">Section 1</h3>
			<p className="text-sm text-muted-foreground">Content for the first section</p>
			<Separator />
			<h3 className="font-semibold">Section 2</h3>
			<p className="text-sm text-muted-foreground">Content for the second section</p>
		</div>
	),
};

export const Decorative: Story = {
	args: { decorative: true },
	render: () => (
		<div className="space-y-2">
			<span>Decorative separator</span>
			<Separator decorative />
		</div>
	),
};
