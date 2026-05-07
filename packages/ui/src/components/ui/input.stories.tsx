import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { Input } from "./input";

const meta = {
	title: "UI/Input",
	component: Input,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["text", "email", "password", "number", "search", "tel", "url", "file"],
			description: "HTML input type",
			table: { defaultValue: { summary: "text" } },
		},
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base ────────────────────────────────────────────────────────────────────

export const Default: Story = {
	args: { placeholder: "Type something…" },
};

export const WithValue: Story = {
	args: { defaultValue: "Pre-filled value", placeholder: "Type something…" },
};

// ─── Types ───────────────────────────────────────────────────────────────────

export const Email: Story = {
	args: { type: "email", placeholder: "name@example.com" },
};

export const Password: Story = {
	args: { type: "password", placeholder: "Enter password" },
};

export const Search: Story = {
	args: { type: "search", placeholder: "Search…" },
};

export const File: Story = {
	args: { type: "file", "aria-label": "Upload file" },
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: "Cannot edit this value",
		placeholder: "Disabled",
	},
};

// ─── With label ──────────────────────────────────────────────────────────────

export const WithLabel: Story = {
	render: () => (
		<div className="flex w-64 flex-col gap-1.5">
			<label htmlFor="input-with-label" className="text-sm font-medium">
				Email address
			</label>
			<Input id="input-with-label" type="email" placeholder="name@example.com" />
			<p className="text-xs text-muted-foreground">We'll never share your email.</p>
		</div>
	),
};

// ─── Error / invalid state ────────────────────────────────────────────────────

/**
 * Use `aria-invalid="true"` to communicate validation errors to assistive
 * technology. The `aria-invalid` variant in the Input component automatically
 * applies `border-destructive` and `ring-destructive` focus styling.
 */
export const Invalid: Story = {
	render: () => (
		<div className="flex w-64 flex-col gap-1.5">
			<label htmlFor="input-invalid" className="text-sm font-medium">
				Username
			</label>
			<Input
				id="input-invalid"
				aria-invalid="true"
				aria-describedby="input-invalid-error"
				defaultValue="bad user!"
			/>
			<p id="input-invalid-error" className="text-sm text-destructive" role="alert">
				Username may only contain letters, numbers, and underscores.
			</p>
		</div>
	),
};

// ─── Interaction tests ────────────────────────────────────────────────────────

export const TypingInteraction: Story = {
	args: { placeholder: "Type here…" },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");
		await userEvent.click(input);
		await userEvent.type(input, "Hello, World!");
		await expect(input).toHaveValue("Hello, World!");
	},
};

export const DisabledNotFocusable: Story = {
	args: { disabled: true, placeholder: "Disabled" },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");
		await expect(input).toBeDisabled();
	},
};
