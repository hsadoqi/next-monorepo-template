import { Card } from "@repo/ui-components/ui/card";
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
		<Card className="p-4">
			<div className="flex items-center justify-between mb-3">
				<h3 className="font-semibold">Streak Calendar</h3>
				<span className="text-sm font-bold text-orange-500">🔥 {currentStreak}</span>
			</div>
			<div className="grid gap-1">
				{weeks.map((week, weekIndex) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: Calendar layout is fixed
						key={`week-${weekIndex}`}
						className="flex gap-1"
					>
						{week.map(({ day, id }) => (
							<div
								key={id}
								className={`w-3 h-3 rounded-sm ${day === 1 ? "bg-green-500" : "bg-muted"}`}
								title={day === 1 ? "Active" : "Inactive"}
							/>
						))}
					</div>
				))}
			</div>
		</Card>
	);
};
