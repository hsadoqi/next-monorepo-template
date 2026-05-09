import z from "zod";

export const NotesPropsSchema = z.object({
	title: z.string().default("Notes"),
	stylePreset: z.enum(["linear", "masonry"]).default("linear"),
	allowMarkdown: z.boolean().default(true),
	enableDnD: z.boolean().default(true),
	enableBulk: z.boolean().default(true),
	maxNotes: z.number().min(50).max(5000).default(1000),
});
export type NotesProps = z.infer<typeof NotesPropsSchema>;

export const NotesSettingsSchema = z.object({
	sortBy: z.enum(["updatedAt", "createdAt", "title"]).default("updatedAt"),
	sortDir: z.enum(["asc", "desc"]).default("desc"),
	showCounts: z.boolean().default(true),
	compact: z.boolean().default(false),
	theme: z.enum(["system", "light", "dark"]).default("system"),
});
export type NotesSettings = z.infer<typeof NotesSettingsSchema>;

export const PropsSchema = z.object({
	title: z.string().default("Journal"),
	enableTemplates: z.boolean().default(true),
});
export type JournalProps = z.infer<typeof PropsSchema>;

export const SettingsSchema = z.object({
	defaultTemplate: z.enum(["daily", "retro", "standup", "blank"]).default("daily"),
	showWeekRollup: z.boolean().default(true),
});
export type JournalSettings = z.infer<typeof SettingsSchema>;
