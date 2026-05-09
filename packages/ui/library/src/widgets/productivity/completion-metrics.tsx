import { Card } from "@repo/ui-components/ui/card";
import { CheckCircle2, TrendingUp } from "lucide-react";
import type React from "react";

export interface CompletionMetricsProps {
	completed?: number;
	total?: number;
	title?: string;
	showTrend?: boolean;
	trend?: number;
}

export const CompletionMetrics: React.FC<
	{} extends CompletionMetricsProps ? CompletionMetricsProps : never
> = ({ completed = 0, total = 0, title = "Completion Metrics", showTrend = false, trend = 0 }) => {
	const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
	const percentageChange = trend || 0;
	const isPositiveChange = percentageChange >= 0;

	return (
		<Card className="p-6 flex flex-col h-full bg-gradient-to-br from-card to-card/95">
			<div className="flex items-start justify-between mb-6">
				<div className="flex-1">
					<p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
					<h3 className="text-3xl font-bold text-foreground">{percentage}%</h3>
				</div>
				<div className="p-2 rounded-lg bg-primary/10">
					<CheckCircle2 className="w-6 h-6 text-primary" />
				</div>
			</div>

			<div className="space-y-4 flex-1">
				{/* Progress bar */}
				<div className="space-y-2">
					<div className="w-full bg-muted rounded-full h-3 overflow-hidden">
						<div
							className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500 ease-out"
							style={{ width: `${percentage}%` }}
						/>
					</div>
				</div>

				{/* Stats */}
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium text-muted-foreground">Progress</span>
					<span className="text-sm font-semibold text-foreground">
						{completed}/{total}
					</span>
				</div>

				{/* Trend indicator */}
				{showTrend && (
					<div className="flex items-center gap-2 pt-2 border-t border-border/50">
						<div
							className={`flex items-center gap-1 ${isPositiveChange ? "text-success" : "text-destructive"}`}
						>
							<TrendingUp className={`w-4 h-4 ${!isPositiveChange ? "rotate-180" : ""}`} />
							<span className="text-sm font-medium">
								{isPositiveChange ? "+" : ""}
								{percentageChange}%
							</span>
						</div>
						<span className="text-xs text-muted-foreground">vs last period</span>
					</div>
				)}
			</div>
		</Card>
	);
};
