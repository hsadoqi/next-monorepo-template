import type { Meta, StoryObj } from "@storybook/react";
import { CopyIcon, DeleteIcon, EditIcon } from "lucide-react";
import { Button } from "./button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group";

const meta: Meta<typeof ButtonGroup> = {
	title: "UI/ButtonGroup",
	component: ButtonGroup,
	tags: ["autodocs"],
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Group orientation",
			table: { defaultValue: { summary: "horizontal" } },
		},
	},
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	args: {
		orientation: "horizontal",
		children: (
			<>
				<Button variant="outline">Left</Button>
				<Button variant="outline">Middle</Button>
				<Button variant="outline">Right</Button>
			</>
		),
	},
};

// ─── Orientations ────────────────────────────────────────────────────────────

export const Vertical: Story = {
	args: {
		orientation: "vertical",
		children: (
			<>
				<Button variant="outline">Top</Button>
				<Button variant="outline">Middle</Button>
				<Button variant="outline">Bottom</Button>
			</>
		),
	},
};

// ─── With Icons ──────────────────────────────────────────────────────────────

export const WithIcons: Story = {
	args: {
		orientation: "horizontal",
		children: (
			<>
				<Button variant="outline" size="icon" aria-label="Edit">
					<EditIcon />
				</Button>
				<Button variant="outline" size="icon" aria-label="Copy">
					<CopyIcon />
				</Button>
				<Button variant="outline" size="icon" aria-label="Delete">
					<DeleteIcon />
				</Button>
			</>
		),
	},
};

// ─── With Separators ─────────────────────────────────────────────────────────

export const WithSeparator: Story = {
	args: {
		orientation: "horizontal",
		children: (
			<>
				<Button variant="outline" size="sm">
					Save
				</Button>
				<Button variant="outline" size="sm">
					Draft
				</Button>
				<ButtonGroupSeparator />
				<Button variant="outline" size="sm">
					Delete
				</Button>
			</>
		),
	},
};

// ─── With Text ───────────────────────────────────────────────────────────────

export const WithText: Story = {
	args: {
		orientation: "horizontal",
		children: (
			<>
				<Button variant="outline">Copy</Button>
				<Button variant="outline">Paste</Button>
				<ButtonGroupSeparator />
				<ButtonGroupText>Align</ButtonGroupText>
				<Button variant="outline">Left</Button>
				<Button variant="outline">Center</Button>
				<Button variant="outline">Right</Button>
			</>
		),
	},
};

// ─── Button Group Text ───────────────────────────────────────────────────────

export const TextComponent: Story = {
	args: {
		orientation: "horizontal",
		children: (
			<>
				<Button variant="outline" size="sm">
					Option 1
				</Button>
				<Button variant="outline" size="sm">
					Option 2
				</Button>
				<ButtonGroupSeparator />
				<ButtonGroupText>
					<span>Active: Option 1</span>
				</ButtonGroupText>
			</>
		),
	},
};

// ─── Vertical With Separators ────────────────────────────────────────────────

export const VerticalWithSeparators: Story = {
	args: {
		orientation: "vertical",
		children: (
			<>
				<Button variant="outline">Edit</Button>
				<Button variant="outline">View</Button>
				<ButtonGroupSeparator orientation="horizontal" />
				<Button variant="outline">Delete</Button>
			</>
		),
	},
};

// ─── Different Button Variants ───────────────────────────────────────────────

export const MixedVariants: Story = {
	args: {
		orientation: "horizontal",
		children: (
			<>
				<Button variant="default">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="ghost">Ghost</Button>
			</>
		),
	},
};
