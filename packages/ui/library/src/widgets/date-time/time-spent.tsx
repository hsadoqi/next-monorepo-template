import { cn } from "@repo/ui-components/lib/utils";
import { Card } from "@repo/ui-components/ui/card";
import { Activity } from "lucide-react";
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
	const colors = ["bg-primary", "bg-accent", "bg-warning", "bg-success"];

	const hours = Math.floor(total / 60);
	const minutes = total % 60;

	return (
		<Card className="p-6 flex flex-col h-full bg-gradient-to-br from-card to-card/95">
			<div className="flex items-center justify-between mb-6">
				<div>
					<p className="text-sm font-medium text-muted-foreground mb-1">Time Spent</p>
					<div className="text-3xl font-bold text-foreground">
						{hours}h {minutes}m
					</div>
				</div>
				<div className="p-2.5 rounded-lg bg-primary/10">
					<Activity className="w-6 h-6 text-primary" />
				</div>
			</div>
			<div className="space-y-4 flex-1">
				{categories.map((category, index) => (
					<div key={category.name}>
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm font-medium text-foreground">{category.name}</span>
							<span className="text-sm font-semibold text-muted-foreground">
								{Math.floor(category.duration / 60)}m
							</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
							<div
								className={cn(
									`h-full rounded-full transition-all duration-500 ease-out`,
									colors[index % colors.length],
								)}
								style={{ width: `${category.percentage}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};
