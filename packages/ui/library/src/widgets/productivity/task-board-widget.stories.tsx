import type { Meta, StoryObj } from "@storybook/react";
import TaskBoardWidget from "./task-board-widget";

const meta: Meta<typeof TaskBoardWidget> = {
	title: "Widgets/Tasks/TaskBoard",
	component: TaskBoardWidget,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		widgetId: {
			control: "text",
			description: "Unique widget ID",
		},
		props: {
			control: "object",
			description: "Widget configuration props",
		},
		settings: {
			control: "object",
			description: "Widget settings",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	args: {
		widgetId: "taskboard-1",
		props: {
			title: "Tasks",
			enableMyDay: true,
		},
		settings: {
			swimlanes: ["myday", "backlog", "doing", "done"],
			autoMyDay: true,
			showCounts: true,
		},
	},
};

// ─── With Sample Tasks ───────────────────────────────────────────────────────

export const WithSampleTasks: Story = {
	args: {
		widgetId: "taskboard-2",
		props: {
			title: "Project Tasks",
			enableMyDay: true,
		},
		settings: {
			swimlanes: ["myday", "backlog", "doing", "done"],
			autoMyDay: true,
			showCounts: true,
		},
		initialTasks: [
			{
				id: "1",
				text: "Design system overhaul",
				tags: ["design", "high-priority"],
				priority: "high",
				status: "doing",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "2",
				text: "API documentation",
				tags: ["documentation"],
				priority: "medium",
				status: "doing",
				dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "3",
				text: "Fix critical bug in auth",
				tags: ["bug"],
				priority: "high",
				status: "backlog",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "4",
				text: "Review PR #456",
				tags: ["review"],
				priority: "medium",
				status: "backlog",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "5",
				text: "Deploy to staging",
				tags: ["deployment"],
				priority: "high",
				status: "done",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: true,
			},
			{
				id: "6",
				text: "Update dependencies",
				tags: ["maintenance"],
				priority: "low",
				status: "done",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: true,
			},
		],
	},
};

// ─── My Day Only ─────────────────────────────────────────────────────────────

export const MyDayOnly: Story = {
	args: {
		widgetId: "taskboard-3",
		props: {
			title: "Today's Focus",
			enableMyDay: true,
		},
		settings: {
			swimlanes: ["myday", "doing", "done"],
			autoMyDay: true,
			showCounts: true,
		},
		initialTasks: [
			{
				id: "1",
				text: "Morning meeting with team",
				tags: ["meeting"],
				priority: "medium",
				status: "myday",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "2",
				text: "Code review",
				tags: ["review"],
				priority: "high",
				status: "myday",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "3",
				text: "Lunch break",
				tags: ["break"],
				priority: "low",
				status: "done",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: true,
			},
		],
	},
};

// ─── Simple Backlog ──────────────────────────────────────────────────────────

export const SimpleBacklog: Story = {
	args: {
		widgetId: "taskboard-4",
		props: {
			title: "Backlog",
			enableMyDay: false,
		},
		settings: {
			swimlanes: ["backlog", "doing", "done"],
			autoMyDay: false,
			showCounts: true,
		},
		initialTasks: [
			{
				id: "1",
				text: "Feature request: Dark mode",
				tags: ["feature"],
				priority: "low",
				status: "backlog",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "2",
				text: "Performance optimization",
				tags: ["optimization"],
				priority: "medium",
				status: "backlog",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "3",
				text: "User feedback improvements",
				tags: ["ux"],
				priority: "low",
				status: "backlog",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
		],
	},
};

// ─── Priority Levels ────────────────────────────────────────────────────────

export const WithPriorities: Story = {
	args: {
		widgetId: "taskboard-5",
		props: {
			title: "Prioritized Tasks",
			enableMyDay: true,
		},
		settings: {
			swimlanes: ["myday", "backlog", "doing", "done"],
			autoMyDay: true,
			showCounts: true,
		},
		initialTasks: [
			{
				id: "1",
				text: "Critical production bug",
				tags: ["urgent"],
				priority: "high",
				status: "doing",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "2",
				text: "Medium priority task",
				tags: ["work"],
				priority: "medium",
				status: "backlog",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "3",
				text: "Nice to have improvement",
				tags: ["enhancement"],
				priority: "low",
				status: "backlog",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
		],
	},
};

// ─── With Due Dates ──────────────────────────────────────────────────────────

export const WithDueDates: Story = {
	args: {
		widgetId: "taskboard-6",
		props: {
			title: "Deadline Tracking",
			enableMyDay: true,
		},
		settings: {
			swimlanes: ["myday", "backlog", "doing", "done"],
			autoMyDay: true,
			showCounts: true,
		},
		initialTasks: [
			{
				id: "1",
				text: "Client presentation",
				tags: ["client"],
				priority: "high",
				status: "doing",
				dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "2",
				text: "Design review",
				tags: ["design"],
				priority: "medium",
				status: "doing",
				dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
			{
				id: "3",
				text: "Overdue task - handle ASAP",
				tags: ["urgent"],
				priority: "high",
				status: "backlog",
				dueDate: new Date(Date.now() - 86400000).toISOString().split("T")[0],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				done: false,
			},
		],
	},
};
