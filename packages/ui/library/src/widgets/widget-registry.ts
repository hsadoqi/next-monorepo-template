import type { ShowcaseComponentMeta } from "@/registry";
import { RecentActivity } from "./date-time/recent-activity";
import { ScheduleComponent } from "./date-time/schedule";
import { StreakCalendar } from "./date-time/streak-calendar";
import { TimeSpent } from "./date-time/time-spent";
import { CompletionMetrics } from "./productivity/completion-metrics";
import { QuickCapture } from "./productivity/quick-capture";
import { TodaysFocus } from "./productivity/todays-focus";

export const widgetRegistry: ShowcaseComponentMeta[] = [
	{
		name: "CompletionMetrics",
		description: "Display task completion metrics with progress visualization",
		component: CompletionMetrics,
		maturity: "stable",
		category: "widgets",
		tags: ["metrics", "progress", "dashboard"],
		props: {
			completed: 7,
			total: 10,
		},
		constraints: ["Requires numeric values for completed/total", "Supports 0-100% range"],
	},
	{
		name: "QuickCapture",
		description: "Quick entry form for capturing tasks or notes",
		component: QuickCapture,
		maturity: "stable",
		category: "widgets",
		tags: ["input", "capture", "form"],
		props: {},
		constraints: ["Uses internal local state", "Supports text input only"],
	},
	{
		name: "RecentActivity",
		description: "Timeline display of recent user activity",
		component: RecentActivity,
		maturity: "stable",
		category: "widgets",
		tags: ["timeline", "activity", "visualization"],
		props: {
			activities: [
				{
					id: "1",
					description: "Completed 'Write report'",
					timestamp: new Date(Date.now() - 3600000),
				},
				{
					id: "2",
					description: "Added note to 'Project X'",
					timestamp: new Date(Date.now() - 7200000),
				},
			],
		},
		constraints: ["Expects activity objects with timestamp", "Responsive to container width"],
	},
	{
		name: "StreakCalendar",
		description: "Heatmap calendar for tracking daily streaks",
		component: StreakCalendar,
		maturity: "incubating",
		category: "widgets",
		tags: ["calendar", "tracking", "visualization", "heatmap"],
		props: {
			days: Array.from({ length: 42 }, (_, _i) => (Math.random() > 0.5 ? 1 : 0)),
			currentStreak: 5,
		},
		constraints: ["Requires 42 day entries (6x7 grid)", "Uses fixed calendar layout"],
	},
	{
		name: "TimeSpent",
		description: "Time tracking widget with duration breakdown",
		component: TimeSpent,
		maturity: "incubating",
		category: "widgets",
		tags: ["productivity", "time", "tracking"],
		props: {
			categories: [
				{ name: "Focus Work", duration: 240, percentage: 50 },
				{ name: "Meetings", duration: 120, percentage: 25 },
				{ name: "Admin", duration: 80, percentage: 16 },
				{ name: "Breaks", duration: 40, percentage: 9 },
			],
			total: 480,
		},
		constraints: ["Categories must have numeric durations", "Uses Tailwind for styling"],
	},
	{
		name: "TodaysFocus",
		description: "Daily focus goals and priority management widget",
		component: TodaysFocus,
		maturity: "incubating",
		category: "widgets",
		tags: ["goals", "focus", "planning"],
		constraints: ["Stateful component with local useState", "Requires initial goals array"],
		props: {
			initialGoals: [
				{ id: "1", text: "Finish project proposal", completed: false },
				{ id: "2", text: "Review team feedback", completed: true },
				{ id: "3", text: "Plan next sprint", completed: false },
			],
		},
	},
	{
		name: "Schedule",
		description: "Interactive schedule widget with day/week/month views",
		component: ScheduleComponent,
		maturity: "incubating",
		category: "widgets",
		tags: ["schedule", "time", "visualization"],
		props: {
			compact: false,
			className: "",
		},
		constraints: ["Supports day/week/month views", "Requires date handling logic"],
	},
];
