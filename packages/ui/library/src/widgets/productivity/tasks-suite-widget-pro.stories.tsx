import type { Meta, StoryObj } from "@storybook/react";
import TasksSuiteWidgetPro from "./tasks-suite-widget-pro";

const meta: Meta<typeof TasksSuiteWidgetPro> = {
	title: "Widgets/Tasks/TasksSuite",
	component: TasksSuiteWidgetPro,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		widgetId: {
			control: "text",
			description: "Unique widget ID",
		},
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
		props: {
			variant: {
				control: "enum",
				options: ["auto", "desktop", "mobile"],
				default: "auto",
			},
			hideTitle: {
				control: "boolean",
			},
			showCompleted: {
				control: "boolean",
			},
			title: {
				control: "text",
				default: "Tasks",
			},
		},
	},
	args: {
		props: {},
	},
};

export default meta;
type Story = StoryObj<typeof TasksSuiteWidgetPro>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
	args: {
		widgetId: "tasks-suite-1",
	},
};

// ─── With Initial Data ───────────────────────────────────────────────────────

export const WithInitialData: Story = {
	args: {
		widgetId: "tasks-suite-2",
		// props: {

		// }
		// initialTodos: [
		//     {
		//         id: "1",
		//         title: "Complete design system documentation",
		//         completed: false,
		//         status: "doing",
		//         priority: "high",
		//         tags: ["design", "documentation"],
		//         dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//         notes: "Include component guidelines and usage examples",
		//     },
		//     {
		//         id: "2",
		//         title: "Review team PRs",
		//         completed: false,
		//         status: "backlog",
		//         priority: "medium",
		//         tags: ["review", "code"],
		//         dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "3",
		//         title: "Setup CI/CD pipeline",
		//         completed: true,
		//         status: "done",
		//         priority: "high",
		//         tags: ["devops"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "4",
		//         title: "Update dependencies",
		//         completed: false,
		//         status: "backlog",
		//         priority: "low",
		//         tags: ["maintenance"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
		// initialGoals: [
		//     {
		//         id: "g1",
		//         title: "Ship v2.0 release",
		//         dueDate: new Date(Date.now() + 2592000000).toISOString().split("T")[0],
		//         status: "in-progress",
		//         progress: 65,
		//         todos: ["1", "2", "3"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "g2",
		//         title: "Improve performance metrics",
		//         dueDate: new Date(Date.now() + 1296000000).toISOString().split("T")[0],
		//         status: "in-progress",
		//         progress: 40,
		//         todos: [],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
	},
};

// ─── Focused on Tasks ────────────────────────────────────────────────────────

export const TaskFocused: Story = {
	args: {
		widgetId: "tasks-suite-3",
		// initialTodos: [
		//     {
		//         id: "1",
		//         title: "Implement user authentication",
		//         completed: false,
		//         status: "doing",
		//         priority: "high",
		//         tags: ["backend", "security"],
		//         dueDate: new Date(Date.now() + 604800000).toISOString().split("T")[0],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//         notes: "Use OAuth2 with JWT tokens",
		//     },
		//     {
		//         id: "2",
		//         title: "Create API rate limiting",
		//         completed: false,
		//         status: "backlog",
		//         priority: "high",
		//         tags: ["backend", "api"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "3",
		//         title: "Add input validation",
		//         completed: false,
		//         status: "backlog",
		//         priority: "medium",
		//         tags: ["backend"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "4",
		//         title: "Database optimization",
		//         completed: false,
		//         status: "backlog",
		//         priority: "medium",
		//         tags: ["database"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
	},
};

// ─── Focused on Goals ────────────────────────────────────────────────────────

export const GoalFocused: Story = {
	args: {
		widgetId: "tasks-suite-4",
		// initialGoals: [
		//     {
		//         id: "g1",
		//         title: "Q2 Product Roadmap Completion",
		//         dueDate: new Date(Date.now() + 7776000000).toISOString().split("T")[0],
		//         status: "in-progress",
		//         progress: 55,
		//         todos: [],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "g2",
		//         title: "Improve Test Coverage",
		//         dueDate: new Date(Date.now() + 2592000000).toISOString().split("T")[0],
		//         status: "in-progress",
		//         progress: 75,
		//         todos: [],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "g3",
		//         title: "Team Training Program",
		//         dueDate: new Date(Date.now() + 5184000000).toISOString().split("T")[0],
		//         status: "planned",
		//         progress: 10,
		//         todos: [],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
	},
};

// ─── High Priority Focus ─────────────────────────────────────────────────────

export const HighPriorityFocus: Story = {
	args: {
		widgetId: "tasks-suite-5",
		// initialTodos: [
		//     {
		//         id: "1",
		//         title: "Critical production bug - Payment processing",
		//         completed: false,
		//         status: "doing",
		//         priority: "high",
		//         tags: ["urgent", "production", "bug"],
		//         dueDate: new Date(Date.now() + 3600000).toISOString().split("T")[0],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//         notes: "Users unable to complete purchases - ASAP fix required",
		//     },
		//     {
		//         id: "2",
		//         title: "Security patch required",
		//         completed: false,
		//         status: "backlog",
		//         priority: "high",
		//         tags: ["urgent", "security"],
		//         dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//         notes: "Apply patch before next deployment",
		//     },
		//     {
		//         id: "3",
		//         title: "Emergency meeting notes",
		//         completed: false,
		//         status: "backlog",
		//         priority: "high",
		//         tags: ["urgent"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
	},
};

// ─── Completed Sprint ────────────────────────────────────────────────────────

export const CompletedSprint: Story = {
	args: {
		widgetId: "tasks-suite-6",
		// initialTodos: [
		//     {
		//         id: "1",
		//         title: "Launch new dashboard",
		//         completed: true,
		//         status: "done",
		//         priority: "high",
		//         tags: ["launch", "feature"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "2",
		//         title: "Complete API documentation",
		//         completed: true,
		//         status: "done",
		//         priority: "medium",
		//         tags: ["documentation"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "3",
		//         title: "Fix reported bugs",
		//         completed: true,
		//         status: "done",
		//         priority: "high",
		//         tags: ["bug-fixes"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "4",
		//         title: "Performance optimization",
		//         completed: true,
		//         status: "done",
		//         priority: "medium",
		//         tags: ["optimization"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
		// initialGoals: [
		//     {
		//         id: "g1",
		//         title: "Sprint Goal - Complete",
		//         dueDate: new Date().toISOString().split("T")[0],
		//         status: "completed",
		//         progress: 100,
		//         todos: ["1", "2", "3", "4"],
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
	},
};
