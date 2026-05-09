"use client";

import { Badge, Button, Input, Label, Separator, Textarea } from "@repo/ui-components/atoms";
import {
	Card,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui-components/molecules";
import * as React from "react";
import { z } from "zod";
import {
	type JournalProps,
	type JournalSettings,
	PropsSchema,
	SettingsSchema,
} from "./content-schemas";
import type { Entry } from "./content-types";
import { load, save, uid } from "./content-utils";
export interface JournalTimelineWidgetProps {
	widgetId: string;
	className?: string;
	props?: Partial<JournalProps>;
	settings?: Partial<JournalSettings>;
	initialEntries?: Entry[];
	onUpdate?: (data: { entries: Entry[]; settings: JournalSettings }) => void;
}

const TEMPLATES: Record<string, string> = {
	daily: "🎯 Top 3:\n1.\n2.\n3.\n\n✅ Wins:\n- \n\n🧠 Notes:\n- ",
	retro: "👍 What went well:\n- \n\n👎 What to improve:\n- \n\n📝 Action items:\n- ",
	standup: "Yesterday:\n- \nToday:\n- \nBlockers:\n- ",
	blank: "",
};

export default function JournalTimelineWidget({
	widgetId,
	className,
	props: rawProps,
	settings: rawSettings,
	initialEntries = [],
	onUpdate,
}: JournalTimelineWidgetProps) {
	const props = React.useMemo(() => PropsSchema.parse(rawProps ?? {}), [rawProps]);
	const settings = React.useMemo(() => SettingsSchema.parse(rawSettings ?? {}), [rawSettings]);
	const STORAGE = `journal:${widgetId}`;
	const [entries, setEntries] = React.useState<Entry[]>(load<Entry[]>(STORAGE, initialEntries));
	const [title, setTitle] = React.useState("");
	const [body, setBody] = React.useState("");
	const [mood, setMood] = React.useState<Entry["mood"]>("🙂");
	const [energy, setEnergy] = React.useState<Entry["energy"]>("medium");
	const [tags, setTags] = React.useState<string>("");

	React.useEffect(() => {
		const id = setTimeout(() => save(STORAGE, entries), 200);
		return () => clearTimeout(id);
	}, [entries, STORAGE]);
	React.useEffect(() => {
		onUpdate?.({ entries, settings });
	}, [entries, settings, onUpdate]);

	const today = new Date().toISOString().slice(0, 10);
	React.useEffect(() => {
		if (props.enableTemplates && !body) {
			setBody(TEMPLATES[settings.defaultTemplate]);
		}
	}, [props.enableTemplates, settings.defaultTemplate, body]);

	const add = () => {
		const now = new Date().toISOString();
		const e: Entry = {
			id: uid(),
			date: today,
			title: title.trim() || undefined,
			body,
			mood,
			energy,
			tags: tags
				? tags
						.split(",")
						.map((s) => s.trim())
						.filter(Boolean)
				: [],
			createdAt: now,
			updatedAt: now,
		};
		setEntries((prev) => [e, ...prev]);
		setTitle("");
		setBody(TEMPLATES[settings.defaultTemplate]);
		setTags("");
	};

	const byDay = entries.reduce<Record<string, Entry[]>>((acc, e) => {
		if (!acc[e.date]) acc[e.date] = [];
		acc[e.date].push(e);
		return acc;
	}, {});
	const days = Object.keys(byDay).sort((a, b) => b.localeCompare(a));

	const weekRollup = settings.showWeekRollup
		? (() => {
				const week = entries.filter(
					(e) => Date.now() - new Date(e.date + "T00:00:00").getTime() <= 7 * 86400000,
				);
				const count = week.length;
				const tags = Array.from(new Set(week.flatMap((e) => e.tags))).slice(0, 6);
				return { count, tags };
			})()
		: null;

	return (
		<div className={["flex h-full flex-col gap-3 p-3", className].filter(Boolean).join(" ")}>
			<div className="flex items-center gap-2">
				<h3 className="text-sm font-medium tracking-tight">{props.title}</h3>
				{weekRollup && (
					<div className="ml-2 flex items-center gap-2 text-xs text-muted-foreground">
						<Badge variant="secondary">{weekRollup.count} entries (7d)</Badge>
						{weekRollup.tags.map((t) => (
							<Badge key={t} variant="outline" className="px-1.5 py-0 text-[10px]">
								#{t}
							</Badge>
						))}
					</div>
				)}
				<div className="ml-auto flex items-center gap-2">
					<Select value={mood} onValueChange={(v) => setMood(v as Entry["mood"])}>
						<SelectTrigger className="h-8 w-[90px]" aria-label="Mood">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="🙂">🙂</SelectItem>
							<SelectItem value="😐">😐</SelectItem>
							<SelectItem value="🙁">🙁</SelectItem>
							<SelectItem value="🔥">🔥</SelectItem>
							<SelectItem value="💤">💤</SelectItem>
						</SelectContent>
					</Select>
					<Select value={energy} onValueChange={(v) => setEnergy(v as Entry["energy"])}>
						<SelectTrigger className="h-8 w-[120px]" aria-label="Energy level">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="low">Low</SelectItem>
							<SelectItem value="medium">Medium</SelectItem>
							<SelectItem value="high">High</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<Card className="rounded-2xl border bg-background/60 p-3 backdrop-blur">
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					<div className="space-y-1">
						<Label htmlFor="journal-title" className="text-xs">
							Title (optional)
						</Label>
						<Input id="journal-title" value={title} onChange={(e) => setTitle(e.target.value)} />
					</div>
					<div className="space-y-1">
						<Label htmlFor="journal-tags" className="text-xs">
							Tags (comma)
						</Label>
						<Input id="journal-tags" value={tags} onChange={(e) => setTags(e.target.value)} />
					</div>
					<div className="sm:col-span-2 space-y-1">
						<Label htmlFor="journal-entry" className="text-xs">
							Entry
						</Label>
						<Textarea
							id="journal-entry"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							className="min-h-[120px]"
						/>
					</div>
				</div>
				<div className="mt-2 flex justify-end">
					<Button size="sm" onClick={add}>
						Add entry
					</Button>
				</div>
			</Card>

			{days.map((d) => (
				<div key={d}>
					<div className="mt-2 text-xs font-semibold text-muted-foreground">
						{new Date(d).toDateString()}
					</div>
					<Separator className="my-2" />
					<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
						{byDay[d].map((e) => (
							<Card key={e.id} className="rounded-xl border bg-card p-3 shadow-sm">
								<div className="mb-1 flex items-center justify-between">
									<div className="truncate text-sm font-medium">{e.title || "(no title)"}</div>
									<div className="flex items-center gap-2">
										<Badge variant="outline">{e.mood}</Badge>
										<Badge variant="secondary">{e.energy}</Badge>
									</div>
								</div>
								<div className="whitespace-pre-wrap text-sm text-muted-foreground">{e.body}</div>
								<div className="mt-2 flex flex-wrap gap-1">
									{e.tags.map((t) => (
										<Badge key={t} variant="outline" className="px-1.5 py-0 text-[10px]">
											#{t}
										</Badge>
									))}
								</div>
							</Card>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
