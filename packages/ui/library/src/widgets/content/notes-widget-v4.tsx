"use client";

import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// shadcn/ui (adjust import paths in your app)
import {
	Badge,
	Button,
	Checkbox,
	Input,
	Label,
	Separator,
	Textarea,
} from "@repo/ui-components/atoms";
import {
	Card,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@repo/ui-components/molecules";
import * as React from "react";
import { z } from "zod";

// Optional markdown (lazy)
let ReactMarkdown: any = null;
let rehypeSanitize: any = null;
let rehypeHighlight: any = null;
if (typeof window !== "undefined") {
	import("react-markdown").then((m) => (ReactMarkdown = m.default)).catch(() => {});
	import("rehype-sanitize").then((m) => (rehypeSanitize = (m as any).default || m)).catch(() => {});
	import("rehype-highlight")
		.then((m) => (rehypeHighlight = (m as any).default || m))
		.catch(() => {});
}

// ---------------- Types & Schemas ----------------

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

const NotesPropsSchema = z.object({
	title: z.string().default("Notes"),
	stylePreset: z.enum(["linear", "masonry"]).default("linear"),
	allowMarkdown: z.boolean().default(true),
	enableDnD: z.boolean().default(true),
	enableBulk: z.boolean().default(true),
	maxNotes: z.number().min(50).max(5000).default(1000),
});
export type NotesProps = z.infer<typeof NotesPropsSchema>;

const NotesSettingsSchema = z.object({
	sortBy: z.enum(["updatedAt", "createdAt", "title"]).default("updatedAt"),
	sortDir: z.enum(["asc", "desc"]).default("desc"),
	showCounts: z.boolean().default(true),
	compact: z.boolean().default(false),
	theme: z.enum(["system", "light", "dark"]).default("system"),
});
export type NotesSettings = z.infer<typeof NotesSettingsSchema>;

export interface NotesWidgetV4Props {
	widgetId: string;
	className?: string;
	props?: Partial<NotesProps>;
	settings?: Partial<NotesSettings>;
	store?: NotesStore;
	onUpdate?: (payload: { notes: Note[]; settings: NotesSettings }) => void;
}

// ---------------- Store abstraction ----------------

export interface NotesStore {
	list(): Promise<Note[]> | Note[];
	create(n: Omit<Note, "id" | "createdAt" | "updatedAt">): Promise<Note> | Note;
	update(id: string, patch: Partial<Note>): Promise<Note> | Note;
	remove(id: string): Promise<void> | void;
	import(data: Note[], mode: "replace" | "merge"): Promise<Note[]> | Note[];
	export(): Promise<Note[]> | Note[];
}

const uid = () =>
	typeof crypto !== "undefined" && "randomUUID" in crypto
		? (crypto as any).randomUUID()
		: Math.random().toString(36).slice(2);

// Local store as default
function createLocalStore(key: string): NotesStore {
	const read = (): Note[] => {
		try {
			const raw = localStorage.getItem(key);
			return raw ? (JSON.parse(raw) as Note[]) : [];
		} catch {
			return [];
		}
	};
	const write = (arr: Note[]) => {
		try {
			localStorage.setItem(key, JSON.stringify(arr));
		} catch {}
	};
	return {
		list() {
			return read();
		},
		create(n) {
			const now = new Date().toISOString();
			const note: Note = { id: uid(), createdAt: now, updatedAt: now, ...n };
			const next = [note, ...read()];
			write(next);
			return note;
		},
		update(id, patch) {
			const next = read().map((n) =>
				n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n,
			);
			write(next);
			return next.find((n) => n.id === id)!;
		},
		remove(id) {
			write(read().filter((n) => n.id !== id));
		},
		import(data, mode) {
			const cur = read();
			let next: Note[] = [];
			if (mode === "replace") {
				next = data;
			} else {
				// merge by id or (title+createdAt)
				const keyOf = (n: Note) => n.id || `${n.title}|${n.createdAt}`;
				const map = new Map<string, Note>();
				for (const n of cur) map.set(keyOf(n), n);
				for (const n of data) {
					const k = keyOf(n);
					const existing = map.get(k);
					if (!existing) map.set(k, n);
					else {
						// keep the newer one
						map.set(k, new Date(n.updatedAt) > new Date(existing.updatedAt) ? n : existing);
					}
				}
				next = Array.from(map.values());
			}
			write(next);
			return next;
		},
		export() {
			return read();
		},
	};
}

// --------------- UI helpers ---------------
function cx(...cls: (string | false | undefined | null)[]) {
	return cls.filter(Boolean).join(" ");
}
const colorToBg: Record<NoteColor, string> = {
	default: "bg-card",
	yellow: "bg-yellow-100/50 dark:bg-yellow-900/20",
	pink: "bg-pink-100/50 dark:bg-pink-900/20",
	blue: "bg-blue-100/50 dark:bg-blue-900/20",
	green: "bg-green-100/50 dark:bg-green-900/20",
	purple: "bg-purple-100/50 dark:bg-purple-900/20",
	gray: "bg-gray-100/50 dark:bg-gray-800/40",
};

function useDebounced<T>(value: T, delay = 300) {
	const [v, setV] = React.useState(value);
	React.useEffect(() => {
		const id = setTimeout(() => setV(value), delay);
		return () => clearTimeout(id);
	}, [value, delay]);
	return v;
}

// --------------- Sortable Note Row (linear) ---------------
function SortableNoteRow({
	note,
	selected,
	onToggleSelect,
	onEdit,
	onPinToggle,
}: {
	note: Note;
	selected: boolean;
	onToggleSelect: (id: string) => void;
	onEdit: (n: Note) => void;
	onPinToggle: (id: string) => void;
}) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: note.id });
	const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition };
	return (
		<li
			ref={setNodeRef}
			style={style}
			className={cx(
				"group rounded-xl border p-3 shadow-sm hover:shadow transition",
				colorToBg[note.color],
			)}
		>
			<div className="flex items-center gap-3">
				<button
					className="cursor-grab select-none text-muted-foreground"
					aria-label="Drag"
					{...attributes}
					{...listeners}
				>
					⋮⋮
				</button>
				<Checkbox
					checked={selected}
					onCheckedChange={() => onToggleSelect(note.id)}
					aria-label="Select note"
				/>
				<div className="min-w-0 flex-1">
					<div className="truncate text-sm font-medium">{note.title || "(Untitled)"}</div>
					<div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
						<span>{new Date(note.updatedAt).toLocaleString()}</span>
						{note.pinned && <Badge variant="secondary">Pinned</Badge>}
						{note.tags.map((t) => (
							<Badge key={t} variant="outline" className="px-1.5 py-0 text-[10px]">
								#{t}
							</Badge>
						))}
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm">
							Actions
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onPinToggle(note.id)}>
							{note.pinned ? "Unpin" : "Pin"}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onEdit(note)}>Edit</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</li>
	);
}

// --------------- Masonry Note Card ---------------
function MasonryNoteCard({
	note,
	onEdit,
	onPinToggle,
}: {
	note: Note;
	onEdit: (n: Note) => void;
	onPinToggle: (id: string) => void;
}) {
	return (
		<Card
			className={cx(
				"rounded-2xl border p-3 shadow-sm hover:shadow transition",
				colorToBg[note.color],
			)}
		>
			<div className="mb-2 flex items-center justify-between">
				<div className="truncate text-sm font-semibold">{note.title || "(Untitled)"}</div>
				<div className="flex items-center gap-2">
					{note.pinned && <Badge variant="secondary">Pinned</Badge>}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm">
								•••
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => onPinToggle(note.id)}>
								{note.pinned ? "Unpin" : "Pin"}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onEdit(note)}>Edit</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			{note.body && (
				<div className="prose prose-sm max-w-none dark:prose-invert">
					{ReactMarkdown ? (
						<ReactMarkdown rehypePlugins={[rehypeSanitize, rehypeHighlight]}>
							{note.body}
						</ReactMarkdown>
					) : (
						<pre className="whitespace-pre-wrap text-xs text-muted-foreground">{note.body}</pre>
					)}
				</div>
			)}
			<div className="mt-3 flex flex-wrap gap-1">
				{note.tags.map((t) => (
					<Badge key={t} variant="outline" className="px-1.5 py-0 text-[10px]">
						#{t}
					</Badge>
				))}
			</div>
		</Card>
	);
}

// --------------- Note Editor (sheet on mobile) ---------------
function useIsNarrow() {
	const [m, setM] = React.useState(false);
	React.useEffect(() => {
		const mm = window.matchMedia("(max-width: 820px)");
		const cb = () => setM(mm.matches);
		cb();
		mm.addEventListener?.("change", cb);
		return () => mm.removeEventListener?.("change", cb);
	}, []);
	return m;
}

function NoteEditor({
	draft,
	onChange,
	onSave,
	onDelete,
}: {
	draft: Note;
	onChange: (n: Note) => void;
	onSave: () => void;
	onDelete: () => void;
}) {
	const setTitle = (v: string) => onChange({ ...draft, title: v });
	const setBody = (v: string) => onChange({ ...draft, body: v });
	const setTags = (v: string) =>
		onChange({
			...draft,
			tags: v
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
		});
	const setColor = (v: NoteColor) => onChange({ ...draft, color: v });
	return (
		<div className="flex h-full flex-col gap-2">
			<div className="grid grid-cols-1 gap-2 md:grid-cols-3">
				<div className="md:col-span-2 space-y-1">
					<Label className="text-xs">Title</Label>
					<Input
						value={draft.title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Title"
					/>
				</div>
				<div className="space-y-1">
					<Label className="text-xs">Color</Label>
					<Select value={draft.color} onValueChange={(v) => setColor(v as NoteColor)}>
						<SelectTrigger className="h-8">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{["default", "yellow", "pink", "blue", "green", "purple", "gray"].map((c) => (
								<SelectItem key={c} value={c}>
									{c}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="md:col-span-3 space-y-1">
					<Label className="text-xs">
						Body{" "}
						{ReactMarkdown ? (
							<span className="text-muted-foreground">(Markdown enabled)</span>
						) : (
							<span className="text-muted-foreground">(plain)</span>
						)}
					</Label>
					<Textarea
						className="min-h-[220px]"
						value={draft.body}
						onChange={(e) => setBody(e.target.value)}
						placeholder="Write… Use /todo, /meeting-notes, /daily for quick templates"
					/>
				</div>
				<div className="md:col-span-2 space-y-1">
					<Label className="text-xs">Tags (comma)</Label>
					<Input
						value={draft.tags.join(", ")}
						onChange={(e) => setTags(e.target.value)}
						placeholder="work, idea, research"
					/>
				</div>
			</div>
			<div className="mt-1 flex items-center gap-2">
				<Button size="sm" onClick={onSave}>
					Save (⌘/Ctrl+Enter)
				</Button>
				<Button size="sm" variant="destructive" onClick={onDelete}>
					Delete
				</Button>
			</div>
		</div>
	);
}

// --------------- Main Widget ---------------

export default function NotesWidgetV4({
	widgetId,
	className,
	props: rawProps,
	settings: rawSettings,
	store,
	onUpdate,
}: NotesWidgetV4Props) {
	const props = React.useMemo(() => NotesPropsSchema.parse(rawProps ?? {}), [rawProps]);
	const settings = React.useMemo(() => NotesSettingsSchema.parse(rawSettings ?? {}), [rawSettings]);

	const STORAGE = `notes:${widgetId}`;
	const local = React.useMemo(() => store ?? createLocalStore(STORAGE), [store, STORAGE]);

	const [notes, setNotes] = React.useState<Note[]>([]);
	const [sel, setSel] = React.useState<Record<string, true>>({});
	const [query, setQuery] = React.useState("");
	const [tagFilter, setTagFilter] = React.useState<string>("all");
	const [draft, setDraft] = React.useState<Note | null>(null);
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const isNarrow = useIsNarrow();

	React.useEffect(() => {
		const load = async () => {
			const list = await Promise.resolve(local.list());
			setNotes(list);
		};
		load();
	}, [local]);

	// keyboard shortcuts
	// biome-ignore lint/correctness/useExhaustiveDependencies: newNote/saveDraft are stable handler refs
	React.useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "n" && !e.metaKey && !e.ctrlKey) {
				e.preventDefault();
				newNote();
			}
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "enter") {
				if (draft) {
					e.preventDefault();
					saveDraft();
				}
			}
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				const el = document.getElementById(`notes-search-${widgetId}`) as HTMLInputElement | null;
				el?.focus();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [draft, widgetId]);

	// persistence callback
	React.useEffect(() => {
		onUpdate?.({ notes, settings });
	}, [notes, settings, onUpdate]);

	const debouncedQuery = useDebounced(query, 200);

	const filtered = React.useMemo(() => {
		let list = notes.slice();
		// search
		if (debouncedQuery.trim()) {
			const q = debouncedQuery.toLowerCase();
			list = list.filter(
				(n) =>
					(n.title || "").toLowerCase().includes(q) ||
					(n.body || "").toLowerCase().includes(q) ||
					n.tags.some((t) => t.toLowerCase().includes(q)),
			);
		}
		// tags
		if (tagFilter !== "all") list = list.filter((n) => n.tags.includes(tagFilter));
		// sort pinned first, then setting
		list.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
		const dir = settings.sortDir === "asc" ? 1 : -1;
		const key = settings.sortBy;
		list.sort(
			(a, b) => (new Date((a as any)[key]).getTime() - new Date((b as any)[key]).getTime()) * dir,
		);
		return list.filter((n) => !n.archived);
	}, [notes, debouncedQuery, tagFilter, settings]);

	const allTags = React.useMemo(
		() => Array.from(new Set(notes.flatMap((n) => n.tags))).sort(),
		[notes],
	);
	const selectedIds = React.useMemo(() => Object.keys(sel).filter((k) => sel[k]), [sel]);

	function newNote() {
		const now = new Date().toISOString();
		const n: Omit<Note, "id" | "createdAt" | "updatedAt"> = {
			title: "New note",
			body: "",
			tags: [],
			color: "default",
			pinned: false,
			archived: false,
		};
		const created = local.create(n);
		Promise.resolve(created).then((c) => {
			setNotes((prev) => [c, ...prev].slice(0, props.maxNotes));
			setDraft(c);
			if (isNarrow) setMobileOpen(true);
		});
	}

	function openEdit(n: Note) {
		setDraft(n);
		if (isNarrow) setMobileOpen(true);
	}

	function saveDraft() {
		if (!draft) return;
		// quick slash commands
		let body = draft.body;
		if (body.startsWith("/todo")) body = "- [ ] \n- [ ] \n- [ ] ";
		if (body.startsWith("/meeting-notes")) body = "Attendees:\n- \nAgenda:\n- \nNotes:\n- ";
		if (body.startsWith("/daily")) body = "Top 3:\n1.\n2.\n3.\nWins:\n- \nLearned:\n- ";
		const patch = { ...draft, body };
		const updated = local.update(draft.id, patch);
		Promise.resolve(updated).then((u) => {
			setNotes((prev) => prev.map((n) => (n.id === u.id ? u : n)));
			if (!isNarrow) setDraft(u);
		});
	}

	function removeNote(id: string) {
		local.remove(id);
		setNotes((prev) => prev.filter((n) => n.id !== id));
		setSel((s) => {
			const x = { ...s };
			delete x[id];
			return x;
		});
		if (draft?.id === id) setDraft(null);
	}

	function togglePin(id: string) {
		const n = notes.find((n) => n.id === id);
		if (!n) return;
		const updated = local.update(id, { pinned: !n.pinned });
		Promise.resolve(updated).then((u) =>
			setNotes((prev) => prev.map((x) => (x.id === id ? u : x))),
		);
	}

	function toggleSelect(id: string) {
		setSel((s) => ({ ...s, [id]: s[id] ? (undefined as any) : true }));
	}

	function bulkArchive(ids: string[]) {
		const next = notes.map((n) => (ids.includes(n.id) ? { ...n, archived: true } : n));
		// persist
		ids.forEach((id) => {
			local.update(id, { archived: true });
		});
		setNotes(next);
		setSel({});
	}

	// DnD reorder (linear list only)
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
	function onDragEnd(e: DragEndEvent) {
		const { active, over } = e;
		if (!over || active.id === over.id) return;
		setNotes((prev) => {
			const ids = filtered.map((n) => n.id);
			const oldIndex = ids.indexOf(String(active.id));
			const newIndex = ids.indexOf(String(over.id));
			if (oldIndex === -1 || newIndex === -1) return prev;
			const reorderedFiltered = arrayMove(filtered, oldIndex, newIndex);
			// merge back with non-filtered
			const map = new Map(reorderedFiltered.map((n) => [n.id, n] as const));
			return prev.map((n) => map.get(n.id) || n);
		});
	}

	return (
		<div className={cx("flex h-full flex-col gap-3 p-3", className)}>
			{/* Header */}
			<div className="flex items-center gap-2">
				<h3 className="text-sm font-medium tracking-tight">{props.title}</h3>
				<Badge variant="outline" className="ml-1">
					{filtered.length} notes
				</Badge>
				<div className="ml-auto flex items-center gap-2">
					<Input
						id={`notes-search-${widgetId}`}
						aria-label="Search notes"
						placeholder="Search (⌘/Ctrl+K)"
						className="h-8 w-[260px]"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<Select value={tagFilter} onValueChange={(v) => setTagFilter(v)}>
						<SelectTrigger className="h-8 w-[160px]" aria-label="Filter by tag">
							<SelectValue placeholder="Filter by tag" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All tags</SelectItem>
							{allTags.map((t) => (
								<SelectItem key={t} value={t}>
									{t}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button size="sm" onClick={newNote}>
						New (n)
					</Button>
				</div>
			</div>

			{/* Bulk bar */}
			{props.enableBulk && selectedIds.length > 0 && (
				<div className="sticky top-0 z-10 flex items-center gap-2 rounded-xl border bg-background/80 p-2 backdrop-blur">
					<div className="text-xs">{selectedIds.length} selected</div>
					<Separator orientation="vertical" className="mx-2 h-4" />
					<Button size="sm" onClick={() => bulkArchive(selectedIds)}>
						Archive
					</Button>
					<Button size="sm" variant="destructive" onClick={() => selectedIds.forEach(removeNote)}>
						Delete
					</Button>
					<div className="ml-auto">
						<Button size="sm" variant="outline" onClick={() => setSel({})}>
							Clear
						</Button>
					</div>
				</div>
			)}

			{/* Body: split layout for linear preset */}
			{props.stylePreset === "linear" ? (
				<div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(320px,420px)_1fr]">
					<Card className="min-h-0 overflow-y-auto rounded-2xl border p-3">
						{filtered.length === 0 ? (
							<div className="py-8 text-center text-sm text-muted-foreground">No notes yet</div>
						) : (
							<DndContext
								sensors={sensors}
								collisionDetection={closestCenter}
								onDragEnd={onDragEnd}
							>
								<SortableContext
									items={filtered.map((n) => n.id)}
									strategy={verticalListSortingStrategy}
								>
									<ul className="space-y-2">
										{filtered.map((n) => (
											<SortableNoteRow
												key={n.id}
												note={n}
												selected={!!sel[n.id]}
												onToggleSelect={toggleSelect}
												onEdit={openEdit}
												onPinToggle={togglePin}
											/>
										))}
									</ul>
								</SortableContext>
							</DndContext>
						)}
					</Card>

					<Card className="min-h-0 overflow-y-auto rounded-2xl border p-3">
						{draft ? (
							<NoteEditor
								draft={draft}
								onChange={setDraft}
								onSave={saveDraft}
								onDelete={() => removeNote(draft.id)}
							/>
						) : (
							<div className="grid h-full place-items-center text-sm text-muted-foreground">
								Select a note to edit
							</div>
						)}
					</Card>

					{/* Mobile editor (sheet) */}
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetContent
							side="bottom"
							title="Edit note"
							description="Update note details and save your changes."
							className="h-[80vh] overflow-y-auto p-4"
						>
							{draft && (
								<NoteEditor
									draft={draft}
									onChange={setDraft}
									onSave={saveDraft}
									onDelete={() => removeNote(draft.id)}
								/>
							)}
						</SheetContent>
					</Sheet>
				</div>
			) : (
				// Masonry preset
				<div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filtered.map((n) => (
						<div key={n.id} className="break-inside-avoid">
							<MasonryNoteCard note={n} onEdit={openEdit} onPinToggle={togglePin} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export { NotesPropsSchema, NotesSettingsSchema };
