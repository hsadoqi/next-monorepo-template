import type { Meta, StoryObj } from "@storybook/react";
import NotesWidget from "./notes-widget-v4";

const meta: Meta<typeof NotesWidget> = {
	title: "Widgets/Notes/NotesWidget",
	component: NotesWidget,
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
		widgetId: "notes-1",
		props: {
			title: "Notes",
			stylePreset: "linear",
			allowMarkdown: true,
			enableDnD: true,
			enableBulk: true,
		},
	},
};

// ─── Masonry Layout ──────────────────────────────────────────────────────────

export const MasonryLayout: Story = {
	args: {
		widgetId: "notes-2",
		props: {
			title: "Notes Board",
			stylePreset: "masonry",
			allowMarkdown: true,
			enableDnD: true,
			enableBulk: true,
			// notes: [
			//     {
			//         id: "1",
			//         title: "Project Ideas",
			//         body: "- AI-powered dashboard\n- Mobile app redesign\n- API v2 planning",
			//         tags: ["ideas", "planning"],
			//         color: "blue",
			//         createdAt: new Date().toISOString(),
			//         updatedAt: new Date().toISOString(),
			//     },
			//     {
			//         id: "2",
			//         title: "Important Reminder",
			//         body: "Don't forget to review the design system documentation before the meeting",
			//         tags: ["urgent"],
			//         color: "pink",
			//         pinned: true,
			//         createdAt: new Date().toISOString(),
			//         updatedAt: new Date().toISOString(),
			//     },
			//     {
			//         id: "3",
			//         title: "Code Snippets",
			//         body: "```ts\nconst handler = async () => {\n  await fetchData();\n}\n```",
			//         tags: ["code"],
			//         color: "green",
			//         createdAt: new Date().toISOString(),
			//         updatedAt: new Date().toISOString(),
			//     },
			// ],
		},
	},
};

// ─── With Multiple Colors ────────────────────────────────────────────────────

export const MultipleColors: Story = {
	args: {
		widgetId: "notes-3",
		props: {
			title: "Categorized Notes",
			stylePreset: "linear",
			allowMarkdown: true,
			enableDnD: false,
			enableBulk: true,
		},
		// initialNotes: [
		//     {
		//         id: "1",
		//         title: "Work Tasks",
		//         body: "Complete quarterly review and plan roadmap",
		//         tags: ["work"],
		//         color: "blue",
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "2",
		//         title: "Personal Goals",
		//         body: "Start running routine, read 3 books",
		//         tags: ["personal"],
		//         color: "green",
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "3",
		//         title: "Shopping List",
		//         body: "Milk, eggs, vegetables, coffee",
		//         tags: ["errands"],
		//         color: "yellow",
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "4",
		//         title: "Ideas",
		//         body: "New product features and improvements",
		//         tags: ["ideas"],
		//         color: "purple",
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
	},
};

// ─── Markdown Disabled ────────────────────────────────────────────────────────

export const PlainText: Story = {
	args: {
		widgetId: "notes-4",
		props: {
			title: "Quick Notes",
			stylePreset: "linear",
			allowMarkdown: false,
			enableDnD: true,
			enableBulk: false,
		},
	},
};

// ─── DnD Disabled ────────────────────────────────────────────────────────────

export const NoDragAndDrop: Story = {
	args: {
		widgetId: "notes-5",
		props: {
			title: "Static Notes",
			stylePreset: "linear",
			allowMarkdown: true,
			enableDnD: false,
			enableBulk: true,
		},
		// initialNotes: [
		//     {
		//         id: "1",
		//         title: "Note 1",
		//         body: "This is a static note without drag-and-drop enabled",
		//         tags: ["static"],
		//         color: "default",
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
	},
};

// ─── Archived & Pinned ───────────────────────────────────────────────────────

export const ArchivedAndPinned: Story = {
	args: {
		widgetId: "notes-6",
		props: {
			title: "Notes with Priority",
			stylePreset: "linear",
			allowMarkdown: true,
			enableDnD: true,
			enableBulk: true,
		},
		// },
		// initialNotes: [
		//     {
		//         id: "1",
		//         title: "Important",
		//         body: "This is pinned at the top",
		//         tags: ["priority"],
		//         color: "pink",
		//         pinned: true,
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "2",
		//         title: "Regular Note",
		//         body: "Standard note in the middle",
		//         tags: ["regular"],
		//         color: "default",
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		//     {
		//         id: "3",
		//         title: "Archived",
		//         body: "This note is archived",
		//         tags: ["archive"],
		//         color: "gray",
		//         archived: true,
		//         createdAt: new Date().toISOString(),
		//         updatedAt: new Date().toISOString(),
		//     },
		// ],
	},
};
