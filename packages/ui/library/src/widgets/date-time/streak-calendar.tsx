import { Card } from "@repo/ui-components/ui/card";
import { Flame } from "lucide-react";
import type React from "react";

interface StreakCalendarProps {
	days?: number[];
	currentStreak?: number;
}

export const StreakCalendar: React.FC<StreakCalendarProps> = ({
	days = Array.from({ length: 42 }, (_, _i) => (Math.random() > 0.3 ? 1 : 0)),
	currentStreak = 12,
}) => {
	const weeks = Array.from({ length: 6 }, (_, weekIndex) =>
		days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => ({
			day,
			id: `${weekIndex}-${dayIndex}`,
		})),
	);

	return (
		<Card className="p-6 flex flex-col h-full bg-gradient-to-br from-card to-card/95">
			<div className="flex items-center justify-between mb-6">
				<h3 className="font-semibold text-foreground">Streak Calendar</h3>
				<div className="flex items-center gap-2 bg-warning/10 px-3 py-1.5 rounded-lg">
					<Flame className="w-4 h-4 text-warning" />
					<span className="text-sm font-bold text-warning">{currentStreak}</span>
				</div>
			</div>
			<div className="space-y-2">
				<div className="text-xs text-muted-foreground">42-day activity view</div>
				<div className="grid gap-1.5">
					{weeks.map((week, weekIndex) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: This is a static calendar grid, so using index as key is acceptable here.
						<div key={weekIndex} className="flex gap-1.5">
							{week.map(({ day, id }) => (
								<div
									key={id}
									className={`flex-1 aspect-square rounded transition-all duration-200 hover:shadow-md ${
										day === 1
											? "bg-gradient-to-br from-success to-success/80 shadow-sm hover:shadow-md"
											: "bg-muted hover:bg-muted/80"
									}`}
									title={day === 1 ? "Active day" : "Inactive day"}
									role="img"
									aria-label={day === 1 ? "Active" : "Inactive"}
								/>
							))}
						</div>
					))}
				</div>
			</div>
			<div className="flex items-center gap-4 mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded bg-success" />
					<span>Active</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded bg-muted" />
					<span>Inactive</span>
				</div>
			</div>
		</Card>
	);
};
