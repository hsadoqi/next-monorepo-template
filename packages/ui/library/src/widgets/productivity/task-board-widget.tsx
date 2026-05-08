"use client";

import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge, Button, Checkbox, Input, Label, Textarea } from "@repo/ui-components/atoms";
import {
	Card,
	CardContent,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui-components/molecules";
import * as React from "react";
import { z } from "zod";

export type Priority = "low" | "medium" | "high";
export type Status = "backlog" | "doing" | "done" | "myday";

export interface Task {
	id: string;
	text: string;
	tags: string[];
	priority: Priority;
	dueDate?: string;
	status: Status;
	createdAt: string;
	updatedAt: string;
	done?: boolean;
}

const PropsSchema = z.object({
	title: z.string().default("Tasks"),
	enableMyDay: z.boolean().default(true),
});
export type TaskBoardProps = z.infer<typeof PropsSchema>;

const SettingsSchema = z.object({
	swimlanes: z
		.array(z.enum(["myday", "backlog", "doing", "done"]))
		.default(["myday", "backlog", "doing", "done"]),
	autoMyDay: z.boolean().default(true),
	showCounts: z.boolean().default(true),
});
export type TaskBoardSettings = z.infer<typeof SettingsSchema>;

export interface TaskBoardWidgetProps {
	widgetId: string;
	className?: string;
	props?: Partial<TaskBoardProps>;
	settings?: Partial<TaskBoardSettings>;
	initialTasks?: Task[];
	onUpdate?: (data: { tasks: Task[]; settings: TaskBoardSettings }) => void;
}

const uid = () =>
	typeof crypto !== "undefined" && "randomUUID" in crypto
		? (crypto as any).randomUUID()
		: Math.random().toString(36).slice(2);
const save = (k: string, v: any) => {
	try {
		localStorage.setItem(k, JSON.stringify(v));
	} catch {}
};
const load = <T,>(k: string, f: T): T => {
	try {
		const r = localStorage.getItem(k);
		return r ? (JSON.parse(r) as T) : f;
	} catch {
		return f;
	}
};

function useLocalTasks(key: string, seed: Task[]) {
	const [tasks, setTasks] = React.useState<Task[]>(load<Task[]>(key, seed));
	React.useEffect(() => {
		const id = setTimeout(() => save(key, tasks), 200);
		return () => clearTimeout(id);
	}, [tasks, key]);
	return [tasks, setTasks] as const;
}

// ---- Item card ----
function TaskCard({
	t,
	onToggle,
	onEdit,
}: {
	t: Task;
	onToggle: (id: string) => void;
	onEdit: (task: Task) => void;
}) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: t.id });
	const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition };
	const prBadge = (p: Priority) => (
		<Badge
			variant={p === "high" ? "default" : p === "medium" ? "secondary" : "outline"}
			className="px-1.5 py-0 text-[10px]"
		>
			{p[0].toUpperCase() + p.slice(1)}
		</Badge>
	);
	return (
		<div
			ref={setNodeRef}
			style={style}
			className="rounded-xl border bg-card p-3 shadow-sm hover:shadow transition"
		>
			<div className="flex items-center gap-2">
				<button
					className="cursor-grab select-none text-muted-foreground"
					aria-label="Drag"
					{...attributes}
					{...listeners}
				>
					⋮⋮
				</button>
				<Checkbox
					checked={!!t.done}
					onCheckedChange={() => onToggle(t.id)}
					aria-label={`Mark "${t.text}" as ${t.done ? "incomplete" : "complete"}`}
				/>
				<div className="min-w-0 flex-1">
					<div className="truncate text-sm font-medium">{t.text}</div>
					<div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
						{t.dueDate && <span>Due {new Date(t.dueDate).toLocaleDateString()}</span>}
						{t.tags.map((tag) => (
							<Badge key={tag} variant="outline" className="px-1.5 py-0 text-[10px]">
								#{tag}
							</Badge>
						))}
					</div>
				</div>
				{prBadge(t.priority)}
				<Button size="sm" variant="ghost" onClick={() => onEdit(t)}>
					Edit
				</Button>
			</div>
		</div>
	);
}

// ---- Column ----
function Column({
	title,
	id,
	children,
	count,
}: {
	title: string;
	id: Status;
	children: React.ReactNode;
	count: number;
}) {
	return (
		<Card className="flex min-h-[220px] flex-1 flex-col rounded-2xl border bg-background/60 backdrop-blur">
			<div className="flex items-center justify-between p-3">
				<div className="text-xs font-semibold">{title}</div>
				<Badge variant="secondary" className="rounded-full">
					{count}
				</Badge>
			</div>
			<CardContent className="flex-1 space-y-2 p-3">
				<SortableContext
					items={React.Children.toArray(children).map((c: any) => c.key)}
					strategy={rectSortingStrategy}
				>
					{children}
				</SortableContext>
			</CardContent>
		</Card>
	);
}

// ---- Editor Sheet (inline simple) ----
function TaskEditor({
	draft,
	onChange,
	onSave,
}: {
	draft: Task;
	onChange: (t: Task) => void;
	onSave: () => void;
}) {
	return (
		<div className="rounded-xl border bg-card p-3 shadow-sm">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				<div className="space-y-1">
					<Label className="text-xs">Text</Label>
					<Textarea
						value={draft.text}
						onChange={(e) => onChange({ ...draft, text: e.target.value })}
					/>
				</div>
				<div className="space-y-1">
					<Label className="text-xs">Priority</Label>
					<Select
						value={draft.priority}
						onValueChange={(v) => onChange({ ...draft, priority: v as Priority })}
					>
						<SelectTrigger className="h-8">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="high">High</SelectItem>
							<SelectItem value="medium">Medium</SelectItem>
							<SelectItem value="low">Low</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-1">
					<Label className="text-xs">Due date</Label>
					<Input
						type="date"
						value={draft.dueDate || ""}
						onChange={(e) => onChange({ ...draft, dueDate: e.target.value || undefined })}
					/>
				</div>
				<div className="space-y-1">
					<Label className="text-xs">Tags (comma)</Label>
					<Input
						value={draft.tags.join(", ")}
						onChange={(e) =>
							onChange({
								...draft,
								tags: e.target.value
									.split(",")
									.map((s) => s.trim())
									.filter(Boolean),
							})
						}
					/>
				</div>
			</div>
			<div className="mt-2 flex justify-end gap-2">
				<Button size="sm" onClick={onSave}>
					Save
				</Button>
			</div>
		</div>
	);
}

// ---- Main ----
export default function TaskBoardWidget({
	widgetId,
	className,
	props: rawProps,
	settings: rawSettings,
	initialTasks = [],
	onUpdate,
}: TaskBoardWidgetProps) {
	const props = React.useMemo(() => PropsSchema.parse(rawProps ?? {}), [rawProps]);
	const settings = React.useMemo(() => SettingsSchema.parse(rawSettings ?? {}), [rawSettings]);
	const STORAGE = `tasks:${widgetId}`;
	const [tasks, setTasks] = useLocalTasks(STORAGE, initialTasks);
	const [draft, setDraft] = React.useState<Task | null>(null);

	// quick add
	const [newText, setNewText] = React.useState("");

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

	React.useEffect(() => {
		if (settings.autoMyDay) {
			setTasks((prev) =>
				prev.map((t) => {
					const overdue = !!t.dueDate && new Date(t.dueDate) < new Date() && !t.done;
					const dueToday =
						!!t.dueDate && new Date(t.dueDate).toDateString() === new Date().toDateString();
					if ((overdue || dueToday) && t.status === "backlog")
						return { ...t, status: "myday" as Status };
					return t;
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings.autoMyDay, setTasks]);

	React.useEffect(() => {
		onUpdate?.({ tasks, settings });
	}, [tasks, settings, onUpdate]);

	const moveTask = (id: string, to: Status) => {
		setTasks((prev) =>
			prev.map((t) =>
				t.id === id
					? {
							...t,
							status: to,
							updatedAt: new Date().toISOString(),
							done: to === "done" ? true : t.done,
						}
					: t,
			),
		);
	};

	const onDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (!over) return;
		const targetCol = (over.id as string).startsWith("col:")
			? ((over.id as string).slice(4) as Status)
			: undefined;
		if (targetCol) moveTask(String(active.id), targetCol);
	};

	const addQuick = () => {
		const text = newText.trim();
		if (!text) return;
		const t: Task = {
			id: uid(),
			text,
			tags: [],
			priority: "medium",
			status: "backlog",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		setTasks((prev) => [t, ...prev]);
		setNewText("");
	};

	const toggleDone = (id: string) =>
		setTasks((prev) =>
			prev.map((t) =>
				t.id === id ? { ...t, done: !t.done, status: !t.done ? "done" : "backlog" } : t,
			),
		);
	const editTask = (t: Task) => setDraft(t);
	const saveDraft = () => {
		if (!draft) return;
		setTasks((prev) =>
			prev.map((t) => (t.id === draft.id ? { ...draft, updatedAt: new Date().toISOString() } : t)),
		);
		setDraft(null);
	};

	const byStatus = (s: Status) =>
		tasks.filter((t) => t.status === s).sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));

	const lane = (s: Status, title: string) => (
		<div key={s} id={`col:${s}`} className="flex min-w-[260px] flex-1 flex-col gap-2">
			<Column title={title} id={s} count={byStatus(s).length}>
				{byStatus(s).map((t) => (
					<TaskCard key={t.id} t={t} onToggle={toggleDone} onEdit={editTask} />
				))}
			</Column>
		</div>
	);

	return (
		<div className={["flex h-full flex-col gap-3 p-3", className].filter(Boolean).join(" ")}>
			<div className="flex items-center gap-2">
				<h3 className="text-sm font-medium tracking-tight">{props.title}</h3>
				{settings.showCounts && (
					<Badge variant="outline" className="ml-2">
						{tasks.filter((t) => !t.done).length} open
					</Badge>
				)}
				<div className="ml-auto flex items-center gap-2">
					<Input
						aria-label="Quick add task"
						placeholder="Quick add…"
						value={newText}
						onChange={(e) => setNewText(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") addQuick();
						}}
						className="h-8 w-[280px]"
					/>
					<Button size="sm" onClick={addQuick}>
						Add
					</Button>
				</div>
			</div>

			{draft && <TaskEditor draft={draft} onChange={setDraft} onSave={saveDraft} />}

			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
					{settings.autoMyDay && lane("myday", "My Day")}
					{lane("backlog", "Backlog")}
					{lane("doing", "Doing")}
					{lane("done", "Done")}
				</div>
			</DndContext>
		</div>
	);
}

export { PropsSchema as TaskBoardPropsSchema, SettingsSchema as TaskBoardSettingsSchema };
