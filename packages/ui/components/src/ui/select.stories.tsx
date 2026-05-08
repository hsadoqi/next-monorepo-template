import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const meta = {
	title: "UI/Select",
	component: Select,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		disabled: {
			control: "boolean",
			description: "Disables the select",
		},
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => (
		<Select>
			<SelectTrigger className="w-48" aria-label="Select an option">
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="option1">Option 1</SelectItem>
				<SelectItem value="option2">Option 2</SelectItem>
				<SelectItem value="option3">Option 3</SelectItem>
			</SelectContent>
		</Select>
	),
};

export const WithDefaultValue: Story = {
	render: () => (
		<Select defaultValue="option2">
			<SelectTrigger className="w-48" aria-label="Select an option">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="option1">Option 1</SelectItem>
				<SelectItem value="option2">Option 2</SelectItem>
				<SelectItem value="option3">Option 3</SelectItem>
			</SelectContent>
		</Select>
	),
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
	render: () => (
		<Select disabled>
			<SelectTrigger className="w-48" aria-label="Select an option">
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="option1">Option 1</SelectItem>
				<SelectItem value="option2">Option 2</SelectItem>
				<SelectItem value="option3">Option 3</SelectItem>
			</SelectContent>
		</Select>
	),
};

// ─── With many options ───────────────────────────────────────────────────────

export const ManyOptions: Story = {
	render: () => {
		const options = Array.from({ length: 20 }).map((_, i) => ({
			id: `option-${i + 1}`,
			label: `Option ${i + 1}`,
		}));

		return (
			<Select>
				<SelectTrigger className="w-48" aria-label="Select a number">
					<SelectValue placeholder="Select a number" />
				</SelectTrigger>
				<SelectContent>
					{options.map(({ id, label }) => (
						<SelectItem key={id} value={id}>
							{label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	},
};
