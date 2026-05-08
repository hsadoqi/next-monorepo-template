import type { Meta, StoryObj } from "@storybook/react";
import { CalendarComponent } from "./calendar";

const meta: Meta<typeof CalendarComponent> = {
	title: "Widgets/Calendar/Calendar",
	component: CalendarComponent,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <CalendarComponent />,
};

export const Compact: Story = {
	args: {
		compact: true,
	},
};

export const Expanded: Story = {
	args: {
		compact: false,
	},
};
