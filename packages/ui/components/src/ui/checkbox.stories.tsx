import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
	title: "UI/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	argTypes: {
		disabled: {
			control: "boolean",
		},
		checked: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: { "aria-label": "Accept" },
};

export const Checked: Story = {
	args: {
		"aria-label": "Accept",
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		"aria-label": "Accept",
		disabled: true,
	},
};

export const DisabledChecked: Story = {
	args: {
		"aria-label": "Accept",
		disabled: true,
		checked: true,
	},
};

export const WithText: Story = {
	render: (args) => (
		<div className="items-top flex space-x-2">
			<Checkbox id="terms1" {...args} />
			<div className="grid gap-1.5 leading-none">
				<label
					htmlFor="terms1"
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Accept terms and conditions
				</label>
				<p className="text-sm text-muted-foreground p-0 m-0">
					You agree to our Terms of Service and Privacy Policy.
				</p>
			</div>
		</div>
	),
};
