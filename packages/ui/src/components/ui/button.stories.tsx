import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./button";

const meta = {
	title: "UI/Button",
	component: Button,
	tags: ["autodocs"],
	args: {
		children: "Button",
		onClick: fn(),
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "secondary", "outline", "ghost", "link", "destructive"],
			description: "Visual style variant",
			table: { defaultValue: { summary: "default" } },
		},
		size: {
			control: "select",
			options: ["default", "sm", "lg", "icon"],
			description: "Button size",
			table: { defaultValue: { summary: "default" } },
		},
		disabled: {
			control: "boolean",
			description: "Prevents interaction and applies reduced opacity",
		},
		asChild: {
			control: false,
			description: "Renders as the child element via Radix Slot (useful for links)",
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Variants ────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const Secondary: Story = {
	args: { variant: "secondary" },
};

export const Outline: Story = {
	args: { variant: "outline" },
};

export const Ghost: Story = {
	args: { variant: "ghost" },
};

export const Link: Story = {
	args: { variant: "link" },
};

export const Destructive: Story = {
	args: { variant: "destructive", children: "Delete account" },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Small: Story = {
	args: { size: "sm" },
};

export const Large: Story = {
	args: { size: "lg" },
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
	args: { disabled: true },
};

export const DisabledDestructive: Story = {
	args: { variant: "destructive", disabled: true, children: "Delete account" },
};

// ─── Overviews ───────────────────────────────────────────────────────────────

export const AllVariants: Story = {
	args: { onClick: undefined },
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Button variant="default">Default</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
			<Button variant="destructive">Destructive</Button>
		</div>
	),
};

export const AllSizes: Story = {
	args: { onClick: undefined },
	render: () => (
		<div className="flex flex-wrap items-end gap-2">
			<Button size="sm">Small</Button>
			<Button size="default">Default</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};

// ─── Interaction tests ────────────────────────────────────────────────────────

export const ClickInteraction: Story = {
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalledOnce();
	},
};

export const KeyboardInteraction: Story = {
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await userEvent.tab();
		await expect(button).toHaveFocus();
		await userEvent.keyboard("{Enter}");
		await expect(args.onClick).toHaveBeenCalledOnce();
	},
};

export const DisabledNotClickable: Story = {
	args: { disabled: true },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await expect(button).toBeDisabled();
		await userEvent.click(button);
		await expect(args.onClick).not.toHaveBeenCalled();
	},
};
