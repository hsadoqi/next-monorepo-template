import { Card } from "@repo/ui-components/ui/card";
import { CheckCircle2 } from "lucide-react";
import type React from "react";

export interface CompletionMetricsProps {
	completed?: number;
	total?: number;
	title?: string;
}

export const CompletionMetrics: React.FC<
	{} extends CompletionMetricsProps ? CompletionMetricsProps : never
> = ({ completed = 0, total = 0, title = "Completion Metrics" }) => {
	const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

	return (
		<Card className="p-4">
			<h3 className="font-semibold mb-3">{title}</h3>
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<span className="text-sm text-muted-foreground">Progress</span>
					<span className="text-lg font-bold">{percentage}%</span>
				</div>
				<div className="w-full bg-muted rounded-full h-2">
					<div
						className="bg-green-500 h-2 rounded-full transition-all"
						style={{ width: `${percentage}%` }}
					/>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<CheckCircle2 className="w-4 h-4 text-green-500" />
					<span>
						{completed} of {total} completed
					</span>
				</div>
			</div>
		</Card>
	);
};
