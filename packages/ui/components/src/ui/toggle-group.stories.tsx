import type { Meta, StoryObj } from "@storybook/react";
import {
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta: Meta<typeof ToggleGroup> = {
	title: "UI/ToggleGroup",
	component: ToggleGroup,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["single", "multiple"],
			description: "Selection type",
			table: { defaultValue: { summary: "single" } },
		},
		disabled: {
			control: "boolean",
			description: "Disables all items in the group",
		},
	},
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	args: {
		type: "single",
		children: (
			<>
				<ToggleGroupItem value="bold" aria-label="Bold">
					<BoldIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<ItalicIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="underline" aria-label="Underline">
					<UnderlineIcon />
				</ToggleGroupItem>
			</>
		),
	},
};

// ─── Multiple Selection ───────────────────────────────────────────────────────

export const Multiple: Story = {
	args: {
		type: "multiple",
		defaultValue: ["bold"],
		children: (
			<>
				<ToggleGroupItem value="bold" aria-label="Bold">
					<BoldIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<ItalicIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="underline" aria-label="Underline">
					<UnderlineIcon />
				</ToggleGroupItem>
			</>
		),
	},
};

// ─── Variants ────────────────────────────────────────────────────────────────

export const Outline: Story = {
	args: {
		type: "single",
		variant: "outline",
		children: (
			<>
				<ToggleGroupItem value="left" aria-label="Align left">
					<AlignLeftIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Align center">
					<AlignCenterIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right">
					<AlignRightIcon />
				</ToggleGroupItem>
			</>
		),
	},
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Small: Story = {
	args: {
		type: "single",
		size: "sm",
		children: (
			<>
				<ToggleGroupItem value="bold" aria-label="Bold">
					<BoldIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<ItalicIcon />
				</ToggleGroupItem>
			</>
		),
	},
};

export const Large: Story = {
	args: {
		type: "single",
		size: "lg",
		children: (
			<>
				<ToggleGroupItem value="bold" aria-label="Bold">
					<BoldIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<ItalicIcon />
				</ToggleGroupItem>
			</>
		),
	},
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
	args: {
		type: "single",
		disabled: true,
		children: (
			<>
				<ToggleGroupItem value="bold" aria-label="Bold">
					<BoldIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<ItalicIcon />
				</ToggleGroupItem>
			</>
		),
	},
};

// ─── With Text ───────────────────────────────────────────────────────────────

export const WithText: Story = {
	args: {
		type: "single",
		defaultValue: "left",
		children: (
			<>
				<ToggleGroupItem value="left" aria-label="Align left">
					<AlignLeftIcon />
					<span>Left</span>
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Align center">
					<AlignCenterIcon />
					<span>Center</span>
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right">
					<AlignRightIcon />
					<span>Right</span>
				</ToggleGroupItem>
			</>
		),
	},
};

// ─── Text Formatting Toolbar ─────────────────────────────────────────────────

export const TextFormattingToolbar: Story = {
	args: {
		type: "multiple",
		defaultValue: ["bold"],
		children: (
			<>
				<ToggleGroupItem value="bold" aria-label="Bold">
					<BoldIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<ItalicIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="underline" aria-label="Underline">
					<UnderlineIcon />
				</ToggleGroupItem>
			</>
		),
	},
	render: (args) => (
		<div className="rounded-md border p-2">
			<ToggleGroup {...args} />
		</div>
	),
};
