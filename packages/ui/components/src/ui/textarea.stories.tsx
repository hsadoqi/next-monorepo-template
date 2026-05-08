import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta = {
	title: "UI/Textarea",
	component: Textarea,
	tags: ["autodocs"],
	args: {
		placeholder: "Type your message here...",
	},
	argTypes: {
		disabled: {
			control: "boolean",
			description: "Disables the textarea",
		},
		placeholder: {
			control: "text",
			description: "Placeholder text",
		},
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithValue: Story = {
	args: {
		defaultValue: "This is a textarea with default content.",
	},
};

export const Placeholder: Story = {
	args: {
		placeholder: "Enter your feedback here...",
	},
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: "This textarea is disabled",
	},
};

export const ErrorState: Story = {
	args: {
		"aria-invalid": true,
		placeholder: "This field has an error",
	},
};

// ─── Overviews ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
	render: () => (
		<div className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="all-default" className="text-sm font-medium">
					Default
				</label>
				<Textarea id="all-default" placeholder="Type something..." />
			</div>
			<div className="space-y-2">
				<label htmlFor="all-disabled" className="text-sm font-medium">
					Disabled
				</label>
				<Textarea id="all-disabled" placeholder="This is disabled" disabled />
			</div>
			<div className="space-y-2">
				<label htmlFor="all-value" className="text-sm font-medium">
					With value
				</label>
				<Textarea id="all-value" defaultValue="Some existing content" />
			</div>
		</div>
	),
};
