import type { Meta, StoryObj } from "@storybook/react";
import { ScheduleComponent } from "./schedule";

const meta: Meta<typeof ScheduleComponent> = {
	title: "Widgets/Schedule/Schedule",
	component: ScheduleComponent,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <ScheduleComponent />,
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
