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
		showTrend: { control: "boolean", description: "Show trend indicator" },
		trend: { control: "number", description: "Trend percentage change" },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		completed: 7,
		total: 10,
		title: "Sprint Progress",
		showTrend: true,
		trend: 12,
	},
};

export const WithTrend: Story = {
	render: () => (
		<div className="space-y-4">
			<CompletionMetrics
				completed={7}
				total={10}
				title="Project Tasks"
				showTrend={true}
				trend={8}
			/>
			<CompletionMetrics
				completed={3}
				total={10}
				title="Blocked Tasks"
				showTrend={true}
				trend={-5}
			/>
		</div>
	),
};

export const FullCompletion: Story = {
	args: {
		completed: 15,
		total: 15,
		title: "Sprint Goals",
		showTrend: true,
		trend: 25,
	},
};

export const NoProgress: Story = {
	args: {
		completed: 0,
		total: 10,
		title: "New Goals",
		showTrend: true,
		trend: 0,
	},
};

export const HalfCompletion: Story = {
	args: {
		completed: 5,
		total: 10,
		title: "Weekly Tasks",
		showTrend: true,
		trend: 5,
	},
};

export const LargeNumbers: Story = {
	args: {
		completed: 847,
		total: 1000,
		title: "Lifetime Achievements",
		showTrend: true,
		trend: 15,
	},
};

export const ComparisonGrid: Story = {
	render: () => (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<CompletionMetrics completed={0} total={10} title="Not Started" showTrend={true} trend={0} />
			<CompletionMetrics completed={5} total={10} title="In Progress" showTrend={true} trend={8} />
			<CompletionMetrics completed={10} total={10} title="Completed" showTrend={true} trend={15} />
			<CompletionMetrics completed={12} total={15} title="Project A" showTrend={true} trend={3} />
			<CompletionMetrics completed={8} total={20} title="Project B" showTrend={true} trend={-2} />
			<CompletionMetrics completed={18} total={18} title="Project C" showTrend={true} trend={20} />
		</div>
	),
};

export const WithoutTrend: Story = {
	args: {
		completed: 7,
		total: 10,
		title: "Simple Metrics",
		showTrend: false,
	},
};
