import type { Meta, StoryObj } from "@storybook/react";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = {
	title: "UI/Toggle",
	component: Toggle,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "outline"],
			description: "Visual style variant",
			table: { defaultValue: { summary: "default" } },
		},
		size: {
			control: "select",
			options: ["sm", "default", "lg"],
			description: "Toggle size",
			table: { defaultValue: { summary: "default" } },
		},
		disabled: {
			control: "boolean",
			description: "Prevents interaction and applies reduced opacity",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// ─── Variants ────────────────────────────────────────────────────────────────

export const Default: Story = {
	args: {
		children: "Toggle",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Toggle",
	},
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Small: Story = {
	args: {
		size: "sm",
		children: "Sm",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		children: "Large",
	},
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Disabled",
	},
};

export const DisabledActive: Story = {
	args: {
		disabled: true,
		pressed: true,
		children: "Disabled Active",
	},
};

// ─── With Icons ──────────────────────────────────────────────────────────────

export const WithIcon: Story = {
	args: {
		children: <BoldIcon />,
		"aria-label": "Bold",
	},
};

export const WithIconAndText: Story = {
	args: {
		children: (
			<>
				<BoldIcon />
				<span>Bold</span>
			</>
		),
	},
};

// ─── Overviews ───────────────────────────────────────────────────────────────

export const AllVariants: Story = {
	args: { children: undefined },
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<Toggle variant="default">Default</Toggle>
			<Toggle variant="outline">Outline</Toggle>
		</div>
	),
};

export const AllSizes: Story = {
	args: { children: undefined },
	render: () => (
		<div className="flex flex-wrap items-end gap-3">
			<Toggle size="sm">Small</Toggle>
			<Toggle size="default">Default</Toggle>
			<Toggle size="lg">Large</Toggle>
		</div>
	),
};

export const TextFormattingToolbar: Story = {
	args: { children: undefined },
	render: () => (
		<div className="flex flex-wrap items-center gap-1 rounded-md border p-2">
			<Toggle size="sm" aria-label="Bold">
				<BoldIcon />
			</Toggle>
			<Toggle size="sm" aria-label="Italic">
				<ItalicIcon />
			</Toggle>
			<Toggle size="sm" aria-label="Underline">
				<UnderlineIcon />
			</Toggle>
		</div>
	),
};
