import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
	title: "UI/Label",
	component: Label,
	tags: ["autodocs"],
	args: {
		children: "Label text",
	},
	argTypes: {
		htmlFor: {
			control: "text",
			description: "HTML for attribute to associate with form inputs",
		},
	},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithInput: Story = {
	render: () => (
		<div className="space-y-2">
			<Label htmlFor="email">Email</Label>
			<input
				id="email"
				type="email"
				placeholder="Enter your email"
				className="w-full rounded border border-input px-3 py-2"
			/>
		</div>
	),
};

// ─── With checkbox ────────────────────────────────────────────────────────────

export const WithCheckbox: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Checkbox id="terms" />
			<Label htmlFor="terms" className="cursor-pointer">
				I agree to the terms and conditions
			</Label>
		</div>
	),
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
	render: () => (
		<div className="space-y-2">
			<Label htmlFor="disabled-input" className="opacity-50">
				Disabled input
			</Label>
			<input
				id="disabled-input"
				type="text"
				disabled
				defaultValue="Disabled"
				title="Disabled input field"
			/>
		</div>
	),
};
