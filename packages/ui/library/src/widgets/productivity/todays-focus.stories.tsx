import type { Meta, StoryObj } from "@storybook/react";
import { TodaysFocus } from "./todays-focus";

const meta: Meta<typeof TodaysFocus> = {
	title: "Widgets/Time Management/TodaysFocus",
	component: TodaysFocus,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <TodaysFocus />,
};

export const WithGoals: Story = {
	args: {
		initialGoals: [
			{ id: "1", text: "Finish project proposal", completed: false },
			{ id: "2", text: "Review team feedback", completed: true },
			{ id: "3", text: "Plan next sprint", completed: false },
			{ id: "4", text: "Update documentation", completed: false },
		],
	},
};

export const AllCompleted: Story = {
	args: {
		initialGoals: [
			{ id: "1", text: "Morning meeting", completed: true },
			{ id: "2", text: "Code review", completed: true },
			{ id: "3", text: "Deploy to staging", completed: true },
		],
	},
};

export const NoProgress: Story = {
	args: {
		initialGoals: [
			{ id: "1", text: "Design homepage redesign", completed: false },
			{ id: "2", text: "Fix critical bugs", completed: false },
			{ id: "3", text: "Optimize database queries", completed: false },
		],
	},
};

export const MixedProgress: Story = {
	args: {
		initialGoals: [
			{ id: "1", text: "Write unit tests", completed: true },
			{ id: "2", text: "Setup CI/CD pipeline", completed: false },
			{ id: "3", text: "Document API endpoints", completed: true },
			{ id: "4", text: "Deploy v2.0", completed: false },
		],
	},
};

export const SingleGoal: Story = {
	args: {
		initialGoals: [{ id: "1", text: "Focus on today's priorities", completed: false }],
	},
};

export const ManyGoals: Story = {
	args: {
		initialGoals: [
			{ id: "1", text: "Email team", completed: false },
			{ id: "2", text: "Standup meeting", completed: true },
			{ id: "3", text: "Code review PR #123", completed: false },
			{ id: "4", text: "Update burndown chart", completed: true },
			{ id: "5", text: "Lunch break", completed: false },
			{ id: "6", text: "Pair programming session", completed: false },
			{ id: "7", text: "Blog post draft", completed: false },
			{ id: "8", text: "Team retro prep", completed: true },
		],
	},
};
