import type { Meta, StoryObj } from "@storybook/react";
import { RecentActivity } from "./recent-activity";

const meta: Meta<typeof RecentActivity> = {
	title: "Widgets/Activity/RecentActivity",
	component: RecentActivity,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const now = Date.now();

export const Default: Story = {
	render: () => <RecentActivity />,
};

export const WithActivities: Story = {
	args: {
		activities: [
			{ id: "1", description: "Completed 'Design review'", timestamp: new Date(now - 600000) },
			{ id: "2", description: "Pushed to main branch", timestamp: new Date(now - 1800000) },
			{ id: "3", description: "Approved PR #456", timestamp: new Date(now - 3600000) },
			{ id: "4", description: "Deployed to production", timestamp: new Date(now - 7200000) },
		],
	},
};

export const DeveloperActivity: Story = {
	args: {
		activities: [
			{ id: "1", description: "Merged feature/dark-mode", timestamp: new Date(now - 300000) },
			{ id: "2", description: "Fixed bug in auth flow", timestamp: new Date(now - 1200000) },
			{
				id: "3",
				description: "Created PR for performance optimization",
				timestamp: new Date(now - 3600000),
			},
			{ id: "4", description: "Updated dependencies", timestamp: new Date(now - 10800000) },
			{ id: "5", description: "Code review: 4 files changed", timestamp: new Date(now - 18000000) },
		],
	},
};

export const DesignerActivity: Story = {
	args: {
		activities: [
			{
				id: "1",
				description: "Exported design system components",
				timestamp: new Date(now - 600000),
			},
			{ id: "2", description: "Updated color palette", timestamp: new Date(now - 5400000) },
			{ id: "3", description: "Created mobile mockups", timestamp: new Date(now - 14400000) },
			{
				id: "4",
				description: "Reviewed feedback from stakeholders",
				timestamp: new Date(now - 25200000),
			},
		],
	},
};

export const TeamActivity: Story = {
	args: {
		activities: [
			{
				id: "1",
				description: "Posted update to #engineering channel",
				timestamp: new Date(now - 300000),
			},
			{ id: "2", description: "Shared new design specs", timestamp: new Date(now - 2700000) },
			{ id: "3", description: "Scheduled team brainstorm", timestamp: new Date(now - 5400000) },
			{ id: "4", description: "Completed project milestone", timestamp: new Date(now - 9000000) },
			{ id: "5", description: "Started sprint planning", timestamp: new Date(now - 16200000) },
		],
	},
};

export const EmptyState: Story = {
	args: {
		activities: [],
	},
};
