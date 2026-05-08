import type { Meta, StoryObj } from "@storybook/react";
import { TimeSpent } from "./time-spent";

const meta: Meta<typeof TimeSpent> = {
	title: "Widgets/Metrics & Analytics/TimeSpent",
	component: TimeSpent,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <TimeSpent />,
};

export const DeveloperDay: Story = {
	args: {
		categories: [
			{ name: "Coding", duration: 240, percentage: 50 },
			{ name: "Code Review", duration: 120, percentage: 25 },
			{ name: "Meetings", duration: 60, percentage: 12 },
			{ name: "Planning", duration: 60, percentage: 13 },
		],
		total: 480,
	},
};

export const DesignerDay: Story = {
	args: {
		categories: [
			{ name: "Design Work", duration: 240, percentage: 48 },
			{ name: "Prototyping", duration: 120, percentage: 24 },
			{ name: "Design Review", duration: 90, percentage: 18 },
			{ name: "Communication", duration: 30, percentage: 10 },
		],
		total: 480,
	},
};

export const ProjectManagerDay: Story = {
	args: {
		categories: [
			{ name: "Meetings", duration: 300, percentage: 60 },
			{ name: "Planning", duration: 120, percentage: 24 },
			{ name: "Documentation", duration: 60, percentage: 12 },
			{ name: "Follow-ups", duration: 20, percentage: 4 },
		],
		total: 500,
	},
};

export const BalancedDay: Story = {
	args: {
		categories: [
			{ name: "Focus Work", duration: 180, percentage: 45 },
			{ name: "Collaboration", duration: 120, percentage: 30 },
			{ name: "Admin", duration: 60, percentage: 15 },
			{ name: "Breaks", duration: 40, percentage: 10 },
		],
		total: 400,
	},
};

export const ShortDay: Story = {
	args: {
		categories: [
			{ name: "Work", duration: 240, percentage: 80 },
			{ name: "Breaks", duration: 60, percentage: 20 },
		],
		total: 300,
	},
};
