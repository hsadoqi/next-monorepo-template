"use client";

import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
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
import { Badge, Button, Checkbox, Input, Label, Progress } from "@repo/ui-components/atoms";
import {
	Card,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@repo/ui-components/molecules";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@repo/ui-components/organisms";
import * as React from "react";
import { z } from "zod";

// ───────────────────────────────────────────────────────────────────────────────
// Schemas & Types
// ────────────────────────────────		───────────────────────────────────────────────

const Priority = z.enum(["low", "medium", "high"]);
const Status = z.enum(["backlog", "doing", "done"]);
const Cadence = z.enum(["daily", "weekly", "monthly", "custom"]);

export const Todo = z.object({
	id: z.string(),
	title: z.string().min(1),
	completed: z.boolean().default(false),
	status: Status.default("backlog"),
	priority: Priority.default("medium"),
	tags: z.array(z.string()).default([]),
	dueDate: z.string().optional(), // yyyy-mm-dd
	createdAt: z.string(),
	updatedAt: z.string(),
	notes: z.string().optional(),
});
export type TodoT = z.infer<typeof Todo>;

export const Goal = z.object({
	id: z.string(),
	title: z.string().min(1),
	category: z.string().optional(),
	targetDate: z.string().optional(),
	tags: z.array(z.string()).default([]),
	progress: z.object({
		current: z.number().min(0).default(0),
		target: z.number().min(1).default(1),
		mode: z.enum(["manual", "linkedTodos"]).default("linkedTodos"),
	}),
	linkedTodoIds: z.array(z.string()).default([]),
	createdAt: z.string(),
	updatedAt: z.string(),
	notes: z.string().optional(),
});
export type GoalT = z.infer<typeof Goal>;

export const Habit = z.object({
	id: z.string(),
	title: z.string().min(1),
	cadence: Cadence.default("daily"),
	streak: z.object({
		current: z.number().default(0),
		best: z.number().default(0),
		lastChecked: z.string().optional(), // yyyy-mm-dd
	}),
	reminder: z
		.object({
			hour: z.number().min(0).max(23),
			minute: z.number().min(0).max(59),
		})
		.optional(),
	tags: z.array(z.string()).default([]),
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type HabitT = z.infer<typeof Habit>;

export const TasksProps = z.object({
	hideTitle: z.boolean().default(false),
	title: z.string().default("Tasks"),
	variant: z.enum(["auto", "desktop", "mobile"]).default("auto"),
	showCompleted: z.boolean().default(true),
});
export type TasksPropsT = z.infer<typeof TasksProps>;

export const TasksSettings = z.object({
	todos: z.object({
		view: z.enum(["list", "board", "calendar"]).default("list"),
		boardBy: z.enum(["priority", "status"]).default("priority"),
		groupBy: z.enum(["none", "status", "priority", "tag", "due"]).default("none"),
		sortBy: z.enum(["createdAt", "updatedAt", "priority", "dueDate"]).default("createdAt"),
		sortDir: z.enum(["asc", "desc"]).default("desc"),
		compact: z.boolean().default(false),
		enableDragReorder: z.boolean().default(true),
		defaultFilter: z.enum(["all", "active", "completed"]).default("all"),
		savedViews: z
			.array(
				z.object({
					id: z.string(),
					name: z.string(),
					config: z.any(),
				}),
			)
			.default([]),
		activeViewId: z.string().optional(),
	}),
	goals: z.object({
		view: z.enum(["list"]).default("list"),
		groupBy: z.enum(["none", "category", "tag", "target"]).default("none"),
		showProgressBars: z.boolean().default(true),
	}),
	habits: z.object({
		view: z.enum(["list"]).default("list"),
		showStreaks: z.boolean().default(true),
	}),
});
export type TasksSettingsT = z.infer<typeof TasksSettings>;

// ───────────────────────────────────────────────────────────────────────────────
// Utilities
// ───────────────────────────────────────────────────────────────────────────────

const uid = () =>
	typeof crypto !== "undefined" && "randomUUID" in crypto
		? (crypto as any).randomUUID()
		: Math.random().toString(36).slice(2);

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const formatDate = (iso?: string) => {
	if (!iso) return "";
	try {
		const d = new Date(iso);
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, "0");
		const day = String(d.getDate()).padStart(2, "0");
		return `${y}-${m}-${day}`;
	} catch {
		return "";
	}
};

function saveLS(key: string, value: unknown) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
function loadLS<T>(key: string, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

function useMediaQuery(query: string) {
	const [matches, setMatches] = React.useState(false);
	React.useEffect(() => {
		const m = window.matchMedia(query);
		const listener = () => setMatches(m.matches);
		listener();
		m.addEventListener?.("change", listener);
		return () => m.removeEventListener?.("change", listener);
	}, [query]);
	return matches;
}

// swipe utility (very light)
function useSwipe(onLeft?: () => void, onRight?: () => void) {
	const startX = React.useRef<number | null>(null);
	const threshold = 42;
	return {
		onTouchStart: (e: React.TouchEvent) => {
			startX.current = e.touches[0].clientX;
		},
		onTouchMove: (_e: React.TouchEvent) => {
			// no-op
		},
		onTouchEnd: (e: React.TouchEvent) => {
			if (startX.current == null) return;
			const dx = e.changedTouches[0].clientX - startX.current;
			if (dx <= -threshold) onLeft?.();
			if (dx >= threshold) onRight?.();
			startX.current = null;
		},
	};
}

// Simple CSV parser (naive; handles commas; no quotes/escapes)
function parseCSV(text: string): string[][] {
	return text
		.split(/\r?\n/)
		.filter(Boolean)
		.map((line) => line.split(",").map((s) => s.trim()));
}

// ───────────────────────────────────────────────────────────────────────────────
// Sortable Row (Todos) with mobile sheet + swipe
// ───────────────────────────────────────────────────────────────────────────────

function SortableTodoRow({
	todo,
	idx,
	itemsLength,
	compact,
	onToggle,
	onUpdate,
	onDelete,
	onBump,
}: {
	todo: TodoT;
	idx: number;
	itemsLength: number;
	compact: boolean;
	onToggle: (id: string) => void;
	onUpdate: (id: string, patch: Partial<TodoT>) => void;
	onDelete: (id: string) => void;
	onBump: (from: number, to: number) => void;
}) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: todo.id,
	});
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const [open, setOpen] = React.useState(false);
	const swipe = useSwipe(
		() => onDelete(todo.id), // swipe left to delete
		() => onToggle(todo.id), // swipe right to complete
	);

	return (
		<li
			ref={setNodeRef}
			style={style}
			className={[
				"group flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm transition-all",
				"hover:border-primary/50 hover:shadow",
				todo.completed ? "opacity-60" : "",
				compact ? "py-1" : "",
				isDragging ? "ring-2 ring-primary/40" : "",
			].join(" ")}
			{...swipe}
		>
			<button
				className="cursor-grab select-none rounded p-1 text-muted-foreground hover:bg-muted"
				aria-label="Drag handle"
				{...attributes}
				{...listeners}
			>
				⋮⋮
			</button>
			<Checkbox
				checked={todo.completed}
				onCheckedChange={() => onToggle(todo.id)}
				className="mt-0.5"
				aria-label="Toggle"
			/>
			<input
				aria-label="Task title"
				value={todo.title}
				onChange={(e) => onUpdate(todo.id, { title: e.target.value })}
				className={[
					"flex-1 bg-transparent text-sm outline-none",
					"placeholder:text-muted-foreground",
					todo.completed ? "line-through text-muted-foreground" : "",
				].join(" ")}
				placeholder="Task"
			/>

			<Select
				value={todo.priority}
				onValueChange={(v) => onUpdate(todo.id, { priority: v as z.infer<typeof Priority> })}
			>
				<SelectTrigger className="h-8 w-[110px]">
					<SelectValue placeholder="Priority" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="low">Low</SelectItem>
					<SelectItem value="medium">Medium</SelectItem>
					<SelectItem value="high">High</SelectItem>
				</SelectContent>
			</Select>

			<Input
				type="date"
				aria-label="Due date"
				value={todo.dueDate ? formatDate(todo.dueDate) : ""}
				onChange={(e) => onUpdate(todo.id, { dueDate: e.target.value || undefined })}
				className="h-8 w-[140px]"
			/>

			<div className="ml-1 hidden items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
				<Button
					variant="ghost"
					size="icon"
					aria-label="Move up"
					onClick={() => onBump(idx, idx - 1)}
					disabled={idx === 0}
				>
					↑
				</Button>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Move down"
					onClick={() => onBump(idx, idx + 1)}
					disabled={idx === itemsLength - 1}
				>
					↓
				</Button>
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="sm">
							More
						</Button>
					</SheetTrigger>
					<SheetContent
						side="bottom"
						title="Edit task"
						description="Update additional task details and metadata."
						className="sm:max-w-xl"
					>
						<div className="mt-3 space-y-3">
							<div className="space-y-1">
								<Label className="text-xs">Notes</Label>
								<Input
									value={todo.notes || ""}
									onChange={(e) => onUpdate(todo.id, { notes: e.target.value })}
									placeholder="Add details…"
								/>
							</div>
							<div className="space-y-1">
								<Label className="text-xs">Tags (comma)</Label>
								<Input
									value={todo.tags.join(", ")}
									onChange={(e) =>
										onUpdate(todo.id, {
											tags: e.target.value
												.split(",")
												.map((s) => s.trim())
												.filter(Boolean),
										})
									}
								/>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div className="space-y-1">
									<Label className="text-xs">Priority</Label>
									<Select
										value={todo.priority}
										onValueChange={(v) => onUpdate(todo.id, { priority: v as any })}
									>
										<SelectTrigger className="h-8">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="low">Low</SelectItem>
											<SelectItem value="medium">Medium</SelectItem>
											<SelectItem value="high">High</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-1">
									<Label className="text-xs">Status</Label>
									<Select
										value={todo.status}
										onValueChange={(v) =>
											onUpdate(todo.id, {
												status: v as any,
												completed: v === "done",
											})
										}
									>
										<SelectTrigger className="h-8">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="backlog">Backlog</SelectItem>
											<SelectItem value="doing">Doing</SelectItem>
											<SelectItem value="done">Done</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-1">
								<Label className="text-xs">Due date</Label>
								<Input
									type="date"
									value={todo.dueDate ? formatDate(todo.dueDate) : ""}
									onChange={(e) => onUpdate(todo.id, { dueDate: e.target.value || undefined })}
								/>
							</div>
							<div className="flex items-center justify-between">
								<Button variant="destructive" onClick={() => (onDelete(todo.id), setOpen(false))}>
									Delete
								</Button>
								<Button onClick={() => setOpen(false)}>Close</Button>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</li>
	);
}

// ───────────────────────────────────────────────────────────────────────────────
// Calendar view for Todos/Goals (month grid; simple)
// ───────────────────────────────────────────────────────────────────────────────

function MonthGrid({
	year,
	month, // 0-11
	renderDay,
}: {
	year: number;
	month: number;
	renderDay: (isoDate: string) => React.ReactNode;
}) {
	const first = new Date(year, month, 1);
	const start = new Date(first);
	start.setDate(first.getDay() === 0 ? 1 : 1 - first.getDay()); // start on Sunday row

	const days: Date[] = [];
	for (let i = 0; i < 42; i++) {
		// 6 weeks
		const d = new Date(start);
		d.setDate(start.getDate() + i);
		days.push(d);
	}

	const fmt = (d: Date) =>
		`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

	return (
		<div className="grid grid-cols-7 gap-1">
			{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
				<div key={w} className="px-2 py-1 text-center text-xs text-muted-foreground">
					{w}
				</div>
			))}
			{days.map((d) => {
				const inMonth = d.getMonth() === month;
				const iso = fmt(d);
				return (
					<div
						key={iso}
						className={[
							"min-h-[84px] rounded-md border p-1",
							inMonth ? "bg-card" : "bg-muted/30",
						].join(" ")}
					>
						<div className="mb-1 text-right text-[10px] text-muted-foreground">{d.getDate()}</div>
						<div className="space-y-1">{renderDay(iso)}</div>
					</div>
				);
			})}
		</div>
	);
}

// ───────────────────────────────────────────────────────────────────────────────
// Main Widget (Pro)
// ───────────────────────────────────────────────────────────────────────────────

export interface TasksSuiteWidgetProProps {
	widgetId: string;
	className?: string;
	props?: Partial<TasksPropsT>;
	settings?: Partial<TasksSettingsT>;
	onUpdate?: (data: {
		todos: TodoT[];
		goals: GoalT[];
		habits: HabitT[];
		settings: TasksSettingsT;
	}) => void;
}

type BoardColP = "high" | "medium" | "low";
const BOARD_COLS_P: BoardColP[] = ["high", "medium", "low"];
const _COL_ID_P = (c: BoardColP) => `colP:${c}`;

type BoardColS = "backlog" | "doing" | "done";
const BOARD_COLS_S: BoardColS[] = ["backlog", "doing", "done"];
const _COL_ID_S = (c: BoardColS) => `colS:${c}`;

export default function TasksSuiteWidgetPro({
	widgetId,
	className,
	props: rawProps,
	settings: rawSettings,
	onUpdate,
}: TasksSuiteWidgetProProps) {
	const props = React.useMemo(() => TasksProps.parse(rawProps ?? {}), [rawProps]);
	const defaults = React.useMemo(() => TasksProps.parse({}), []);
	const settings = React.useMemo(() => {
		const raw = rawSettings ?? {};
		return TasksSettings.parse({
			todos: (raw as Partial<TasksSettingsT>).todos ?? {},
			goals: (raw as Partial<TasksSettingsT>).goals ?? {},
			habits: (raw as Partial<TasksSettingsT>).habits ?? {},
		});
	}, [rawSettings]);

	const STORAGE_KEY = `tasks-suite:${widgetId}`;
	const initial = loadLS(STORAGE_KEY, {
		todos: [] as TodoT[],
		goals: [] as GoalT[],
		habits: [] as HabitT[],
		settingsOverride: null as any,
	});
	const [todos, setTodos] = React.useState<TodoT[]>(initial.todos);
	const [goals, setGoals] = React.useState<GoalT[]>(initial.goals);
	const [habits, setHabits] = React.useState<HabitT[]>(initial.habits);
	const [localSettings, setLocalSettings] = React.useState<TasksSettingsT | null>(
		initial.settingsOverride,
	);

	const effSettings = localSettings ?? settings;

	const saveRef = React.useRef<number | null>(null);
	React.useEffect(() => {
		if (saveRef.current) window.clearTimeout(saveRef.current);
		saveRef.current = window.setTimeout(() => {
			saveLS(STORAGE_KEY, {
				todos,
				goals,
				habits,
				settingsOverride: localSettings,
			});
			onUpdate?.({ todos, goals, habits, settings: effSettings });
		}, 250);
		return () => {
			if (saveRef.current) window.clearTimeout(saveRef.current);
		};
	}, [todos, goals, habits, effSettings, localSettings, STORAGE_KEY, onUpdate]);

	const isNarrow = useMediaQuery("(max-width: 640px)");
	const _isMobile = props.variant === "mobile" || (props.variant === "auto" && isNarrow);

	// sensors for DnD
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
		useSensor(KeyboardSensor),
	);

	// ── Todos CRUD/derived
	const [todoDraft, setTodoDraft] = React.useState({
		title: "",
		priority: "medium" as z.infer<typeof Priority>,
		dueDate: "",
	});

	const addTodo = () => {
		const title = todoDraft.title.trim();
		if (!title) return;
		const now = new Date().toISOString();
		const t: TodoT = {
			id: uid(),
			title,
			completed: false,
			status: "backlog",
			priority: todoDraft.priority,
			tags: [],
			dueDate: todoDraft.dueDate || undefined,
			createdAt: now,
			updatedAt: now,
			notes: "",
		};
		setTodos((prev) => [t, ...prev]);
		setTodoDraft({ title: "", priority: todoDraft.priority, dueDate: "" });
	};
	const updateTodo = (id: string, patch: Partial<TodoT>) => {
		setTodos((prev) =>
			prev.map((t) =>
				t.id === id
					? {
							...t,
							...patch,
							updatedAt: new Date().toISOString(),
							completed: patch.status ? patch.status === "done" : t.completed,
						}
					: t,
			),
		);
	};
	const toggleTodo = (id: string) => {
		setTodos((prev) =>
			prev.map((t) =>
				t.id === id
					? {
							...t,
							completed: !t.completed,
							status: !t.completed ? "done" : "backlog",
							updatedAt: new Date().toISOString(),
						}
					: t,
			),
		);
	};
	const deleteTodo = (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id));
	const reorderTodos = (from: number, to: number) => {
		setTodos((prev) => {
			const next = prev.slice();
			const [moved] = next.splice(from, 1);
			next.splice(clamp(to, 0, next.length), 0, moved);
			return next;
		});
	};

	const todoIds = React.useMemo(() => todos.map((t) => t.id), [todos]);

	const onTodoDragEndList = (e: DragEndEvent) => {
		const { active, over } = e;
		if (!over || active.id === over.id) return;
		const oldIndex = todoIds.indexOf(String(active.id));
		const newIndex = todoIds.indexOf(String(over.id));
		if (oldIndex === -1 || newIndex === -1) return;
		setTodos((prev) => arrayMove(prev, oldIndex, newIndex));
	};

	// Saved Views (store in localSettings)
	const applyTodosSettings = (patch: Partial<TasksSettingsT["todos"]>) => {
		const next = {
			...(effSettings as TasksSettingsT),
			todos: { ...effSettings.todos, ...patch },
		};
		setLocalSettings(next);
	};
	const saveCurrentView = () => {
		const id = uid();
		const view = {
			id,
			name: `View ${effSettings.todos.savedViews.length + 1}`,
			config: effSettings.todos,
		};
		const next = {
			...(effSettings as TasksSettingsT),
			todos: {
				...effSettings.todos,
				savedViews: [...effSettings.todos.savedViews, view],
				activeViewId: id,
			},
		};
		setLocalSettings(next);
	};
	const loadView = (id: string) => {
		const v = effSettings.todos.savedViews.find((x) => x.id === id);
		if (!v) return;
		const next = {
			...(effSettings as TasksSettingsT),
			todos: {
				...v.config,
				savedViews: effSettings.todos.savedViews,
				activeViewId: id,
			},
		};
		setLocalSettings(next as TasksSettingsT);
	};
	const deleteView = (id: string) => {
		const nextViews = effSettings.todos.savedViews.filter((x) => x.id !== id);
		const next = {
			...(effSettings as TasksSettingsT),
			todos: {
				...effSettings.todos,
				savedViews: nextViews,
				activeViewId: nextViews[0]?.id,
			},
		};
		setLocalSettings(next);
	};

	const todoCounts = React.useMemo(() => {
		const total = todos.length;
		const active = todos.filter((t) => !t.completed).length;
		const completed = total - active;
		return { total, active, completed };
	}, [todos]);

	// ── Goals CRUD
	const [goalDraft, setGoalDraft] = React.useState({
		title: "",
		targetDate: "",
	});
	const addGoal = () => {
		const title = goalDraft.title.trim();
		if (!title) return;
		const now = new Date().toISOString();
		const g: GoalT = {
			id: uid(),
			title,
			category: undefined,
			targetDate: goalDraft.targetDate || undefined,
			tags: [],
			progress: { current: 0, target: 1, mode: "linkedTodos" },
			linkedTodoIds: [],
			createdAt: now,
			updatedAt: now,
			notes: "",
		};
		setGoals((prev) => [g, ...prev]);
		setGoalDraft({ title: "", targetDate: "" });
	};
	const updateGoal = (id: string, patch: Partial<GoalT>) => {
		setGoals((prev) =>
			prev.map((g) => (g.id === id ? { ...g, ...patch, updatedAt: new Date().toISOString() } : g)),
		);
	};
	const deleteGoal = (id: string) => setGoals((prev) => prev.filter((g) => g.id !== id));

	const goalProgressPct = (g: GoalT) => {
		if (g.progress.mode === "linkedTodos" && g.linkedTodoIds.length) {
			const subset = todos.filter((t) => g.linkedTodoIds.includes(t.id));
			const done = subset.filter((t) => t.completed).length;
			const total = subset.length || 1;
			return Math.round((done / total) * 100);
		}
		return Math.round((g.progress.current / Math.max(1, g.progress.target)) * 100);
	};

	// Link Todos to Goal UI
	const [linkGoalId, setLinkGoalId] = React.useState<string | null>(null);
	const linkGoal = goals.find((g) => g.id === linkGoalId) || null;
	const toggleLink = (todoId: string) => {
		if (!linkGoal) return;
		const set = new Set(linkGoal.linkedTodoIds);
		if (set.has(todoId)) set.delete(todoId);
		else set.add(todoId);
		updateGoal(linkGoal.id, { linkedTodoIds: Array.from(set) });
	};

	// ── Habits CRUD
	const [habitDraft, setHabitDraft] = React.useState({ title: "" });
	const addHabit = () => {
		const title = habitDraft.title.trim();
		if (!title) return;
		const now = new Date().toISOString();
		const h: HabitT = {
			id: uid(),
			title,
			cadence: "daily",
			streak: { current: 0, best: 0, lastChecked: undefined },
			reminder: undefined,
			tags: [],
			createdAt: now,
			updatedAt: now,
		};
		setHabits((prev) => [h, ...prev]);
		setHabitDraft({ title: "" });
	};
	const checkHabit = (id: string) => {
		const today = new Date();
		const todayStr = formatDate(today.toISOString());
		setHabits((prev) =>
			prev.map((h) => {
				if (h.id !== id) return h;
				if (h.streak.lastChecked === todayStr) return h;
				const current = (h.streak.current ?? 0) + 1;
				const best = Math.max(current, h.streak.best ?? 0);
				return {
					...h,
					streak: { current, best, lastChecked: todayStr },
					updatedAt: new Date().toISOString(),
				};
			}),
		);
	};
	const resetHabit = (id: string) => {
		setHabits((prev) =>
			prev.map((h) =>
				h.id === id
					? {
							...h,
							streak: { ...h.streak, current: 0 },
							updatedAt: new Date().toISOString(),
						}
					: h,
			),
		);
	};
	const deleteHabit = (id: string) => setHabits((prev) => prev.filter((h) => h.id !== id));

	// ─────────────────────────────────────────────────────────────────────────────
	// DnD helpers for Board views
	// ─────────────────────────────────────────────────────────────────────────────

	const byPriority = React.useMemo(
		() => ({
			high: todos.filter((t) => t.priority === "high").map((t) => t.id),
			medium: todos.filter((t) => t.priority === "medium").map((t) => t.id),
			low: todos.filter((t) => t.priority === "low").map((t) => t.id),
		}),
		[todos],
	);
	const byStatus = React.useMemo(
		() => ({
			backlog: todos.filter((t) => t.status === "backlog").map((t) => t.id),
			doing: todos.filter((t) => t.status === "doing").map((t) => t.id),
			done: todos.filter((t) => t.status === "done").map((t) => t.id),
		}),
		[todos],
	);

	const findContainerPriority = (id: string) => {
		if (id.startsWith("colP:")) return id.split(":")[1] as BoardColP;
		const t = todos.find((x) => x.id === id);
		return (t?.priority ?? null) as BoardColP | null;
	};
	const findContainerStatus = (id: string) => {
		if (id.startsWith("colS:")) return id.split(":")[1] as BoardColS;
		const t = todos.find((x) => x.id === id);
		return (t?.status ?? null) as BoardColS | null;
	};

	const handleDragEndBoard = (e: DragEndEvent) => {
		const { active, over } = e;
		if (!over) return;
		const activeId = String(active.id);
		const overId = String(over.id);

		if (effSettings.todos.boardBy === "priority") {
			const fromCol = findContainerPriority(activeId);
			const toCol = findContainerPriority(overId);
			if (!fromCol || !toCol) return;
			if (fromCol !== toCol) updateTodo(activeId, { priority: toCol });
			// reorder omitted for brevity
		} else {
			const fromCol = findContainerStatus(activeId);
			const toCol = findContainerStatus(overId);
			if (!fromCol || !toCol) return;
			if (fromCol !== toCol) updateTodo(activeId, { status: toCol, completed: toCol === "done" });
		}
	};

	// CSV import
	const onImportCSV = async (file: File) => {
		const text = await file.text();
		const rows = parseCSV(text);
		// Map: title, priority, dueDate, status, tags
		const now = new Date().toISOString();
		const newTodos: TodoT[] = rows.map((r, idx) => ({
			id: uid(),
			title: r[0] || `Imported ${idx + 1}`,
			priority: (["low", "medium", "high"].includes((r[1] || "").toLowerCase())
				? r[1].toLowerCase()
				: "medium") as any,
			dueDate: r[2] || undefined,
			status: (["backlog", "doing", "done"].includes((r[3] || "").toLowerCase())
				? r[3].toLowerCase()
				: "backlog") as any,
			completed: (r[3] || "").toLowerCase() === "done",
			tags: (r[4] || "")
				.split("|")
				.map((s) => s.trim())
				.filter(Boolean),
			createdAt: now,
			updatedAt: now,
			notes: "",
		}));
		setTodos((prev) => [...newTodos, ...prev]);
	};

	// ─────────────────────────���───────────────────────────────────────────────────
	// UI
	// ─────────────────────────────────────────────────────────────────────────────

	// // sensors for List DnD
	// const sensors = useSensors(
	// 	useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
	// 	useSensor(KeyboardSensor),
	// );

	const year = new Date().getFullYear();
	const month = new Date().getMonth();

	return (
		<div className={["flex h-full flex-col gap-3 p-3", className].filter(Boolean).join(" ")}>
			{/* Header */}
			<div className="flex flex-wrap items-center gap-2">
				{!props.hideTitle && (
					<h3 className="text-sm font-medium tracking-tight">{props.title ?? defaults.title}</h3>
				)}
				<div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
					<Badge variant="secondary">{todoCounts.active} active</Badge>
					<Badge variant="outline">{todoCounts.completed} done</Badge>
					<Badge variant="default">{todoCounts.total} total</Badge>
				</div>
				{/* Saved views */}
				<div className="flex items-center gap-2">
					<Select value={effSettings.todos.activeViewId || ""} onValueChange={loadView}>
						<SelectTrigger className="h-8 w-[180px]">
							<SelectValue placeholder="Saved views" />
						</SelectTrigger>
						<SelectContent>
							{effSettings.todos.savedViews.map((v) => (
								<SelectItem key={v.id} value={v.id}>
									{v.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button size="sm" variant="ghost" onClick={saveCurrentView}>
						Save view
					</Button>
					{effSettings.todos.activeViewId && (
						<Button
							size="sm"
							variant="destructive"
							onClick={() => deleteView(effSettings.todos.activeViewId!)}
						>
							Delete view
						</Button>
					)}
					<label className="ml-2 text-xs">
						<input
							type="file"
							accept=".csv"
							className="hidden"
							onChange={(e) => e.target.files && onImportCSV(e.target.files[0])}
						/>
						<span className="cursor-pointer rounded-md border px-2 py-1 hover:bg-muted">
							Import CSV
						</span>
					</label>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => {
							const data = JSON.stringify({ todos, goals, habits }, null, 2);
							const blob = new Blob([data], { type: "application/json" });
							const url = URL.createObjectURL(blob);
							const a = document.createElement("a");
							a.href = url;
							a.download = `tasks-suite-${widgetId}.json`;
							a.click();
							URL.revokeObjectURL(url);
						}}
					>
						Export
					</Button>
				</div>
			</div>

			{/* Tabs: Todos / Goals / Habits */}
			<Tabs defaultValue="todos" className="flex min-h-0 flex-1 flex-col">
				<div className="flex items-center justify-between gap-2">
					<TabsList>
						<TabsTrigger value="todos">Todos</TabsTrigger>
						<TabsTrigger value="goals">Goals</TabsTrigger>
						<TabsTrigger value="habits">Habits</TabsTrigger>
					</TabsList>

					<div className="flex items-center gap-2">
						<Button
							variant="destructive"
							size="sm"
							onClick={() => {
								if (confirm("Clear all completed todos?")) {
									setTodos((prev) => prev.filter((t) => !t.completed));
								}
							}}
						>
							Clear completed
						</Button>
					</div>
				</div>

				{/* ── TODOS TAB */}
				<TabsContent value="todos" className="min-h-0 flex-1">
					{/* Add form */}
					<div className="mb-2 flex flex-wrap items-center gap-2 rounded-xl border bg-background p-2 shadow-sm">
						<Input
							aria-label="Add a task"
							placeholder="Add a task…"
							value={todoDraft.title}
							onChange={(e) => setTodoDraft((d) => ({ ...d, title: e.target.value }))}
							onKeyDown={(e) => e.key === "Enter" && addTodo()}
							className="flex-1 min-w-40"
						/>
						<Select
							value={todoDraft.priority}
							onValueChange={(v) =>
								setTodoDraft((d) => ({
									...d,
									priority: v as z.infer<typeof Priority>,
								}))
							}
						>
							<SelectTrigger className="w-[120px]">
								<SelectValue placeholder="Priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="low">Low</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="high">High</SelectItem>
							</SelectContent>
						</Select>
						<Input
							type="date"
							aria-label="Due date"
							value={todoDraft.dueDate}
							onChange={(e) => setTodoDraft((d) => ({ ...d, dueDate: e.target.value }))}
							className="w-[150px]"
						/>
						<Button size="sm" onClick={addTodo} disabled={!todoDraft.title.trim()}>
							Add
						</Button>
					</div>

					{/* View controls */}
					<div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
						<div className="inline-flex items-center gap-1 rounded-md border px-1 py-1">
							{(["list", "board", "calendar"] as const).map((v) => (
								<Button
									key={v}
									variant={effSettings.todos.view === v ? "default" : "ghost"}
									size="sm"
									onClick={() => applyTodosSettings({ view: v })}
								>
									{v[0].toUpperCase() + v.slice(1)}
								</Button>
							))}
						</div>
						{effSettings.todos.view === "board" && (
							<div className="inline-flex items-center gap-1 rounded-md border px-1 py-1">
								{(["priority", "status"] as const).map((v) => (
									<Button
										key={v}
										variant={effSettings.todos.boardBy === v ? "default" : "ghost"}
										size="sm"
										onClick={() => applyTodosSettings({ boardBy: v })}
									>
										{v === "priority" ? "By priority" : "By status"}
									</Button>
								))}
							</div>
						)}
					</div>

					{/* List view */}
					{effSettings.todos.view === "list" && (
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={onTodoDragEndList}
						>
							<SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
								<ul className="space-y-1">
									{todos.map((t, idx) => (
										<SortableTodoRow
											key={t.id}
											todo={t}
											idx={idx}
											itemsLength={todos.length}
											compact={effSettings.todos.compact}
											onToggle={toggleTodo}
											onUpdate={updateTodo}
											onDelete={deleteTodo}
											onBump={reorderTodos}
										/>
									))}
								</ul>
							</SortableContext>
						</DndContext>
					)}

					{/* Board view */}
					{effSettings.todos.view === "board" && (
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleDragEndBoard}
						>
							{effSettings.todos.boardBy === "priority" ? (
								<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
									{BOARD_COLS_P.map((col) => {
										const colIds = byPriority[col];
										return (
											<Card key={col} className="p-2">
												<div className="mb-2 flex items-center justify-between">
													<h4 className="text-xs font-semibold uppercase text-muted-foreground">
														{col} priority
													</h4>
													<Badge
														variant={
															col === "high"
																? "destructive"
																: col === "medium"
																	? "default"
																	: "secondary"
														}
													>
														{colIds.length}
													</Badge>
												</div>
												<ul className="space-y-1">
													{todos
														.filter((t) => t.priority === col)
														.map((t) => (
															<li
																key={t.id}
																className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm"
															>
																<span className="cursor-grab select-none text-muted-foreground">
																	⋮⋮
																</span>
																<Checkbox
																	checked={t.completed}
																	onCheckedChange={() => toggleTodo(t.id)}
																/>
																<span
																	className={[
																		"flex-1 truncate text-sm",
																		t.completed ? "line-through text-muted-foreground" : "",
																	].join(" ")}
																>
																	{t.title}
																</span>
																<Select
																	value={t.status}
																	onValueChange={(v) =>
																		updateTodo(t.id, {
																			status: v as any,
																			completed: v === "done",
																		})
																	}
																>
																	<SelectTrigger className="h-8 w-[110px]">
																		<SelectValue />
																	</SelectTrigger>
																	<SelectContent>
																		<SelectItem value="backlog">Backlog</SelectItem>
																		<SelectItem value="doing">Doing</SelectItem>
																		<SelectItem value="done">Done</SelectItem>
																	</SelectContent>
																</Select>
																<Button
																	variant="ghost"
																	size="icon"
																	onClick={() => deleteTodo(t.id)}
																>
																	✕
																</Button>
															</li>
														))}
												</ul>
											</Card>
										);
									})}
								</div>
							) : (
								<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
									{BOARD_COLS_S.map((col) => {
										const colIds = byStatus[col];
										return (
											<Card key={col} className="p-2">
												<div className="mb-2 flex items-center justify-between">
													<h4 className="text-xs font-semibold uppercase text-muted-foreground">
														{col}
													</h4>
													<Badge variant={col === "done" ? "secondary" : "default"}>
														{colIds.length}
													</Badge>
												</div>
												<ul className="space-y-1">
													{todos
														.filter((t) => t.status === col)
														.map((t) => (
															<li
																key={t.id}
																className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm"
															>
																<span className="cursor-grab select-none text-muted-foreground">
																	⋮⋮
																</span>
																<Checkbox
																	checked={t.completed}
																	onCheckedChange={() => toggleTodo(t.id)}
																/>
																<span
																	className={[
																		"flex-1 truncate text-sm",
																		t.completed ? "line-through text-muted-foreground" : "",
																	].join(" ")}
																>
																	{t.title}
																</span>
																<Select
																	value={t.priority}
																	onValueChange={(v) => updateTodo(t.id, { priority: v as any })}
																>
																	<SelectTrigger className="h-8 w-[110px]">
																		<SelectValue />
																	</SelectTrigger>
																	<SelectContent>
																		<SelectItem value="low">Low</SelectItem>
																		<SelectItem value="medium">Medium</SelectItem>
																		<SelectItem value="high">High</SelectItem>
																	</SelectContent>
																</Select>
																<Button
																	variant="ghost"
																	size="icon"
																	onClick={() => deleteTodo(t.id)}
																>
																	✕
																</Button>
															</li>
														))}
												</ul>
											</Card>
										);
									})}
								</div>
							)}
						</DndContext>
					)}

					{/* Calendar view */}
					{effSettings.todos.view === "calendar" && (
						<MonthGrid
							year={year}
							month={month}
							renderDay={(iso) => (
								<>
									{todos
										.filter((t) => t.dueDate === iso)
										.map((t) => (
											<div key={t.id} className="truncate text-[11px]">
												<span className="mr-1 inline-block h-2 w-2 rounded-full bg-primary align-middle" />
												{t.title}
											</div>
										))}
								</>
							)}
						/>
					)}
				</TabsContent>

				{/* ── GOALS TAB */}
				<TabsContent value="goals" className="min-h-0 flex-1">
					<div className="mb-2 flex flex-wrap items-center gap-2 rounded-xl border bg-background p-2 shadow-sm">
						<Input
							placeholder="New goal…"
							value={goalDraft.title}
							onChange={(e) => setGoalDraft((d) => ({ ...d, title: e.target.value }))}
							onKeyDown={(e) => e.key === "Enter" && addGoal()}
							className="flex-1 min-w-40"
						/>
						<Input
							type="date"
							value={goalDraft.targetDate}
							onChange={(e) => setGoalDraft((d) => ({ ...d, targetDate: e.target.value }))}
							className="w-[150px]"
						/>
						<Button size="sm" onClick={addGoal} disabled={!goalDraft.title.trim()}>
							Add
						</Button>
					</div>

					<ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
						{goals.map((g) => {
							const pct = goalProgressPct(g);
							return (
								<li key={g.id} className="rounded-lg border bg-background p-3 shadow-sm">
									<div className="mb-1 flex items-center gap-2">
										<input
											title="goal-title"
											value={g.title}
											onChange={(e) => updateGoal(g.id, { title: e.target.value })}
											className="flex-1 bg-transparent text-sm outline-none"
										/>
										<Dialog
											open={linkGoalId === g.id}
											onOpenChange={(o) => setLinkGoalId(o ? g.id : null)}
										>
											<DialogTrigger asChild>
												<Button variant="ghost" size="sm">
													Link todos
												</Button>
											</DialogTrigger>
											<DialogContent
												title={`Link todos to "${g.title}"`}
												description="Choose which todos should contribute to this goal."
												showTitle={false}
												showDescription={false}
												className="sm:max-w-xl"
											>
												<div className="max-h-[360px] overflow-y-auto">
													<ul className="space-y-1">
														{todos.map((t) => (
															<li key={t.id} className="flex items-center gap-2 rounded border p-2">
																<Checkbox
																	checked={g.linkedTodoIds.includes(t.id)}
																	onCheckedChange={() => toggleLink(t.id)}
																/>
																<span className="flex-1 truncate text-sm">{t.title}</span>
																<Badge variant="outline">{t.priority}</Badge>
																{t.dueDate && (
																	<span className="text-xs text-muted-foreground">{t.dueDate}</span>
																)}
															</li>
														))}
													</ul>
												</div>
												<div className="mt-3 text-right">
													<Button onClick={() => setLinkGoalId(null)}>Done</Button>
												</div>
											</DialogContent>
										</Dialog>
										<Button variant="ghost" size="icon" onClick={() => deleteGoal(g.id)}>
											✕
										</Button>
									</div>
									<div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
										<div className="flex items-center gap-1">
											<Label className="text-xs">Target</Label>
											<Input
												type="date"
												value={g.targetDate ? formatDate(g.targetDate) : ""}
												onChange={(e) =>
													updateGoal(g.id, {
														targetDate: e.target.value || undefined,
													})
												}
												className="h-8 w-[140px]"
											/>
										</div>
										<div className="ml-auto">{pct}%</div>
									</div>
									<Progress value={pct} className="h-2" />
									<div className="mt-2 space-y-2">
										<Label className="text-xs">Notes</Label>
										<Input
											value={g.notes || ""}
											onChange={(e) => updateGoal(g.id, { notes: e.target.value })}
											placeholder="Add details…"
										/>
									</div>
								</li>
							);
						})}
					</ul>
				</TabsContent>

				{/* ── HABITS TAB */}
				<TabsContent value="habits" className="min-h-0 flex-1">
					<div className="mb-2 flex flex-wrap items-center gap-2 rounded-xl border bg-background p-2 shadow-sm">
						<Input
							placeholder="New habit…"
							value={habitDraft.title}
							onChange={(e) => setHabitDraft((d) => ({ ...d, title: e.target.value }))}
							onKeyDown={(e) => e.key === "Enter" && addHabit()}
							className="flex-1 min-w-40"
						/>
						<Button size="sm" onClick={addHabit} disabled={!habitDraft.title.trim()}>
							Add
						</Button>
					</div>

					<ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
						{habits.map((h) => (
							<li key={h.id} className="rounded-lg border bg-background p-3 shadow-sm">
								<div className="mb-2 flex items-center gap-2">
									<input
										title="habit-title"
										value={h.title}
										onChange={(e) =>
											setHabits((prev) =>
												prev.map((x) =>
													x.id === h.id
														? {
																...x,
																title: e.target.value,
																updatedAt: new Date().toISOString(),
															}
														: x,
												),
											)
										}
										className="flex-1 bg-transparent text-sm outline-none"
									/>
									<Button variant="destructive" size="icon" onClick={() => deleteHabit(h.id)}>
										✕
									</Button>
								</div>
								<div className="flex items-center justify-between text-xs">
									<div className="flex items-center gap-2">
										<Badge variant="default">Streak {h.streak.current}</Badge>
										<Badge variant="secondary">Best {h.streak.best}</Badge>
									</div>
									<div className="text-muted-foreground">
										{h.streak.lastChecked
											? `Last: ${formatDate(h.streak.lastChecked)}`
											: "Not checked"}
									</div>
								</div>
								<div className="mt-2 flex items-center gap-2">
									<Button size="sm" onClick={() => checkHabit(h.id)}>
										Check-in
									</Button>
									<Button variant="ghost" size="sm" onClick={() => resetHabit(h.id)}>
										Reset streak
									</Button>
								</div>
							</li>
						))}
					</ul>
				</TabsContent>
			</Tabs>
		</div>
	);
}
