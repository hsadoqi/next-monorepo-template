import type { Meta, StoryObj } from "@storybook/react";
import {
	CalendarComponent,
	CompletionMetrics,
	QuickCapture,
	RecentActivity,
	StreakCalendar,
	TimeSpent,
	TodaysFocus,
} from "./index";

const meta: Meta = {
	title: "Widgets/Dashboard",
	parameters: {
		layout: "padded",
	},
};

export default meta;

const now = Date.now();

/* ============ COMPLETE DASHBOARD ============ */

export const CompleteDashboard: StoryObj = {
	render: () => (
		<div className="space-y-8">
			{/* Metrics Row */}
			<div>
				<h2 className="mb-4 text-2xl font-bold">Metrics & Analytics</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<CompletionMetrics completed={7} total={10} title="Sprint Progress" />
					<TimeSpent
						categories={[
							{ name: "Development", duration: 240, percentage: 50 },
							{ name: "Meetings", duration: 120, percentage: 25 },
							{ name: "Research", duration: 90, percentage: 18.75 },
							{ name: "Admin", duration: 30, percentage: 6.25 },
						]}
						total={480}
					/>
				</div>
			</div>

			{/* Time Management Row */}
			<div>
				<h2 className="mb-4 text-2xl font-bold">Time Management</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<StreakCalendar
						days={Array.from({ length: 42 }, (_, _i) => (Math.random() > 0.5 ? 1 : 0))}
						currentStreak={12}
					/>
					<TodaysFocus
						initialGoals={[
							{ id: "1", text: "Finish project proposal", completed: false },
							{ id: "2", text: "Review team feedback", completed: true },
							{ id: "3", text: "Plan next sprint", completed: false },
						]}
					/>
				</div>
			</div>

			{/* Activity & Input Row */}
			<div>
				<h2 className="mb-4 text-2xl font-bold">Activity & Input</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<RecentActivity
						activities={[
							{
								id: "1",
								description: "Completed 'Design review'",
								timestamp: new Date(now - 600000),
							},
							{ id: "2", description: "Pushed to main branch", timestamp: new Date(now - 1800000) },
							{ id: "3", description: "Approved PR #456", timestamp: new Date(now - 3600000) },
						]}
					/>
					<QuickCapture />
				</div>
			</div>

			{/* Calendar */}
			<div>
				<h2 className="mb-4 text-2xl font-bold">Calendar</h2>
				<CalendarComponent />
			</div>
		</div>
	),
};

/* ============ METRICS & ANALYTICS ============ */

export const MetricsSection: StoryObj = {
	render: () => (
		<div className="space-y-6">
			<div>
				<h3 className="mb-3 text-lg font-semibold">Completion Metrics - Variations</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<CompletionMetrics completed={0} total={10} title="Not Started" />
					<CompletionMetrics completed={5} total={10} title="In Progress" />
					<CompletionMetrics completed={10} total={10} title="Completed" />
				</div>
			</div>

			<div>
				<h3 className="mb-3 text-lg font-semibold">Time Spent - Team Overview</h3>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<TimeSpent
						categories={[
							{ name: "Coding", duration: 240, percentage: 50 },
							{ name: "Review", duration: 120, percentage: 25 },
							{ name: "Meetings", duration: 80, percentage: 16.67 },
							{ name: "Breaks", duration: 40, percentage: 8.33 },
						]}
						total={480}
					/>
					<TimeSpent
						categories={[
							{ name: "Design", duration: 200, percentage: 50 },
							{ name: "Feedback", duration: 120, percentage: 30 },
							{ name: "Planning", duration: 80, percentage: 20 },
						]}
						total={400}
					/>
				</div>
			</div>
		</div>
	),
};

/* ============ TIME MANAGEMENT ============ */

export const TimeManagementSection: StoryObj = {
	render: () => (
		<div className="space-y-6">
			<div>
				<h3 className="mb-3 text-lg font-semibold">Streak Streaks - Different Patterns</h3>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<StreakCalendar days={Array.from({ length: 42 }, () => 1)} currentStreak={42} />
					<StreakCalendar
						days={Array.from({ length: 42 }, (_, _i) => (Math.random() > 0.2 ? 1 : 0))}
						currentStreak={38}
					/>
				</div>
			</div>

			<div>
				<h3 className="mb-3 text-lg font-semibold">Today's Focus - Different States</h3>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<TodaysFocus
						initialGoals={[
							{ id: "1", text: "Feature implementation", completed: false },
							{ id: "2", text: "Code review", completed: true },
							{ id: "3", text: "Documentation", completed: false },
						]}
					/>
					<TodaysFocus
						initialGoals={[
							{ id: "1", text: "All goals completed!", completed: true },
							{ id: "2", text: "Extra mile task", completed: true },
							{ id: "3", text: "Tomorrow's preview", completed: false },
						]}
					/>
				</div>
			</div>
		</div>
	),
};

/* ============ ACTIVITY & COLLABORATION ============ */

export const ActivitySection: StoryObj = {
	render: () => (
		<div className="space-y-6">
			<div>
				<h3 className="mb-3 text-lg font-semibold">Recent Activity - Different Timelines</h3>
				<div className="grid grid-cols-1 gap-4">
					<RecentActivity
						activities={[
							{
								id: "1",
								description: "Deployed version 2.1.0 to production",
								timestamp: new Date(now - 300000),
							},
							{
								id: "2",
								description: "Merged feature/dark-mode PR",
								timestamp: new Date(now - 1800000),
							},
							{
								id: "3",
								description: "Code review completed for database optimization",
								timestamp: new Date(now - 7200000),
							},
							{
								id: "4",
								description: "Started sprint planning session",
								timestamp: new Date(now - 18000000),
							},
							{
								id: "5",
								description: "Fixed critical bug in auth flow",
								timestamp: new Date(now - 43200000),
							},
						]}
					/>
				</div>
			</div>

			<div>
				<h3 className="mb-3 text-lg font-semibold">Quick Capture - Ready for Input</h3>
				<QuickCapture />
			</div>
		</div>
	),
};

/* ============ RESPONSIVE LAYOUTS ============ */

export const MobileLayout: StoryObj = {
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
	render: () => (
		<div className="space-y-4">
			<CompletionMetrics completed={7} total={10} title="Today" />
			<TimeSpent
				categories={[
					{ name: "Work", duration: 300, percentage: 60 },
					{ name: "Breaks", duration: 200, percentage: 40 },
				]}
				total={500}
			/>
			<StreakCalendar
				days={Array.from({ length: 42 }, (_, _i) => (Math.random() > 0.5 ? 1 : 0))}
				currentStreak={8}
			/>
			<TodaysFocus initialGoals={[{ id: "1", text: "Mobile first task", completed: false }]} />
			<RecentActivity
				activities={[{ id: "1", description: "Last activity", timestamp: new Date(now) }]}
			/>
			<QuickCapture />
		</div>
	),
};

export const TabletLayout: StoryObj = {
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
	},
	render: () => (
		<div className="grid grid-cols-2 gap-4">
			<CompletionMetrics completed={7} total={10} />
			<TimeSpent />
			<StreakCalendar currentStreak={12} />
			<TodaysFocus initialGoals={[{ id: "1", text: "Task 1", completed: false }]} />
		</div>
	),
};

export const DesktopLayout: StoryObj = {
	parameters: {
		viewport: {
			defaultViewport: "desktop",
		},
	},
	render: () => (
		<div className="grid grid-cols-3 gap-4">
			<CompletionMetrics completed={7} total={10} />
			<TimeSpent />
			<StreakCalendar currentStreak={12} />
			<RecentActivity />
			<TodaysFocus initialGoals={[{ id: "1", text: "Task", completed: false }]} />
			<QuickCapture />
		</div>
	),
};

export const TodaysFocusStory: StoryObj = {
	render: () => <TodaysFocus />,
};
