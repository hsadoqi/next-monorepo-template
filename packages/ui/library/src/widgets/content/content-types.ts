export type NoteColor = "default" | "yellow" | "pink" | "blue" | "green" | "purple" | "gray";

export interface Note {
	id: string;
	title: string;
	body: string;
	tags: string[];
	color: NoteColor;
	pinned?: boolean;
	archived?: boolean;
	createdAt: string; // ISO
	updatedAt: string; // ISO
}

export type StylePreset = "linear" | "masonry";

export interface Entry {
	id: string;
	date: string;
	title?: string;
	body: string;
	mood?: "🙂" | "😐" | "🙁" | "🔥" | "💤";
	energy?: "low" | "medium" | "high";
	tags: string[];
	createdAt: string;
	updatedAt: string;
}
