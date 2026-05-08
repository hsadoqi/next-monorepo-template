import type { Meta, StoryObj } from "@storybook/react";
import { CompletionMetrics } from "./completion-metrics";

const meta: Meta<typeof CompletionMetrics> = {
	title: "Widgets/Metrics & Analytics/CompletionMetrics",
	component: CompletionMetrics,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		completed: { control: "number", description: "Number of completed items" },
		total: { control: "number", description: "Total number of items" },
		title: { control: "text", description: "Optional title for the widget" },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		completed: 7,
		total: 10,
	},
};

export const WithTitle: Story = {
	args: {
		completed: 7,
		total: 10,
		title: "Project Tasks",
	},
};

export const FullCompletion: Story = {
	args: {
		completed: 15,
		total: 15,
		title: "Sprint Goals",
	},
};

export const NoProgress: Story = {
	args: {
		completed: 0,
		total: 10,
		title: "New Goals",
	},
};

export const HalfCompletion: Story = {
	args: {
		completed: 5,
		total: 10,
		title: "Weekly Tasks",
	},
};

export const LargeNumbers: Story = {
	args: {
		completed: 847,
		total: 1000,
		title: "Lifetime Achievements",
	},
};
