import { cn } from "@repo/ui-components/lib/utils";
import { Card } from "@repo/ui-components/ui/card";
import { Zap } from "lucide-react";
import type React from "react";

interface TimeCategory {
	name: string;
	duration: number;
	percentage: number;
}

interface TimeSpentProps {
	categories?: TimeCategory[];
	total?: number;
}

export const TimeSpent: React.FC<TimeSpentProps> = ({
	categories = [
		{ name: "Focus Work", duration: 240, percentage: 50 },
		{ name: "Meetings", duration: 120, percentage: 25 },
		{ name: "Admin", duration: 80, percentage: 16 },
		{ name: "Breaks", duration: 40, percentage: 9 },
	],
	total = 480,
}) => {
	const colors = ["bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-green-500"];

	const hours = Math.floor(total / 60);
	const minutes = total % 60;

	return (
		<Card className="p-4">
			<div className="flex items-center gap-2 mb-3">
				<h3 className="font-semibold">Time Spent</h3>
				<Zap className="w-4 h-4 text-amber-500" />
			</div>
			<div className="mb-3 text-2xl font-bold">
				{hours}h {minutes}m
			</div>
			<div className="space-y-2">
				{categories.map((category, index) => (
					<div key={category.name}>
						<div className="flex justify-between text-sm mb-1">
							<span>{category.name}</span>
							<span className="text-muted-foreground">{Math.floor(category.duration / 60)}m</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div
								className={cn(`h-2 rounded-full transition-all`, colors[index % colors.length])}
								style={{ width: `${category.percentage}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};
