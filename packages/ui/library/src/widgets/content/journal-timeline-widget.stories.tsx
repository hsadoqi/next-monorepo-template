import type { Meta, StoryObj } from "@storybook/react";
import JournalTimelineWidget from "./journal-timeline-widget";

const meta: Meta<typeof JournalTimelineWidget> = {
	title: "Widgets/Journaling/JournalTimeline",
	component: JournalTimelineWidget,
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
		widgetId: "journal-1",
		props: {
			title: "Journal",
			enableTemplates: true,
		},
	},
};

// ─── With Daily Template ──────────────────────────────────────────────────────

export const WithDailyTemplate: Story = {
	args: {
		widgetId: "journal-2",
		props: {
			title: "Daily Reflection",
			enableTemplates: true,
		},
		settings: {
			defaultTemplate: "daily",
			showWeekRollup: true,
		},
	},
};

// ─── With Retrospective Template ──────────────────────────────────────────────

export const WithRetroTemplate: Story = {
	args: {
		widgetId: "journal-3",
		props: {
			title: "Sprint Retrospective",
			enableTemplates: true,
		},
		settings: {
			defaultTemplate: "retro",
			showWeekRollup: true,
		},
	},
};

// ─── With Standup Template ───────────────────────────────────────────────────

export const WithStandupTemplate: Story = {
	args: {
		widgetId: "journal-4",
		props: {
			title: "Daily Standup",
			enableTemplates: true,
		},
		settings: {
			defaultTemplate: "standup",
			showWeekRollup: false,
		},
	},
};

// ─── With Sample Entries ─────────────────────────────────────────────────────

export const WithSampleEntries: Story = {
	args: {
		widgetId: "journal-5",
		props: {
			title: "My Journal",
			enableTemplates: true,
		},
		initialEntries: [
			{
				id: "1",
				date: new Date().toISOString().split("T")[0],
				title: "Today's Reflection",
				body: "🎯 Top 3:\n1. Completed the design system overhaul\n2. Code reviewed 5 PRs\n3. Documented API endpoints\n\n✅ Wins:\n- Great team collaboration\n- Performance improvements deployed\n\n🧠 Notes:\n- Need to refactor auth module next",
				mood: "🔥",
				energy: "high",
				tags: ["productivity", "wins"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
			{
				id: "2",
				date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
				title: "Yesterday's Work",
				body: "Focused on bug fixes and maintenance tasks.",
				mood: "😐",
				energy: "medium",
				tags: ["maintenance"],
				createdAt: new Date(Date.now() - 86400000).toISOString(),
				updatedAt: new Date(Date.now() - 86400000).toISOString(),
			},
		],
	},
};

// ─── No Templates ────────────────────────────────────────────────────────────

export const NoTemplates: Story = {
	args: {
		widgetId: "journal-6",
		props: {
			title: "Free Writing",
			enableTemplates: false,
		},
	},
};
