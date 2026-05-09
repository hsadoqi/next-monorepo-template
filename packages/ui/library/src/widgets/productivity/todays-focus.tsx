import { Card } from "@repo/ui-components/ui/card";
import { CheckCircle2, Circle, Target, X } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface FocusGoal {
	id: string;
	text: string;
	completed: boolean;
}

export interface TodaysFocusProps {
	initialGoals?: FocusGoal[];
}

export const TodaysFocus: React.FC<TodaysFocusProps> = ({
	initialGoals = [
		{ id: "1", text: "Complete project proposal", completed: true },
		{ id: "2", text: "Review team feedback", completed: false },
		{ id: "3", text: "Update documentation", completed: false },
	],
}) => {
	const [goals, setGoals] = useState<FocusGoal[]>(initialGoals);

	const toggleGoal = (id: string) => {
		setGoals((prevGoals) =>
			prevGoals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)),
		);
	};

	const removeGoal = (id: string) => {
		setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
	};

	const completedCount = goals.filter((goal) => goal.completed).length;
	const totalCount = goals.length;
	const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

	return (
		<Card className="p-6 flex flex-col h-full bg-gradient-to-br from-card to-card/95">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-primary/10">
						<Target className="w-5 h-5 text-primary" />
					</div>
					<div>
						<h3 className="font-semibold text-foreground">Today&apos;s Focus</h3>
						<p className="text-xs text-muted-foreground">{completionPercentage}% complete</p>
					</div>
				</div>
				<span className="text-sm font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
					{completedCount}/{totalCount}
				</span>
			</div>

			{/* Progress Bar */}
			<div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
				<div
					className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-300"
					style={{ width: `${completionPercentage}%` }}
				/>
			</div>

			<div className="space-y-2 flex-1">
				{goals.length === 0 ? (
					<div className="flex items-center justify-center h-24 text-muted-foreground">
						<p className="text-sm">No goals set for today</p>
					</div>
				) : (
					goals.map((goal) => (
						<div
							key={goal.id}
							className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200"
						>
							<button
								type="button"
								onClick={() => toggleGoal(goal.id)}
								className="flex-shrink-0 transition-transform hover:scale-110"
								aria-label={goal.completed ? "Mark incomplete" : "Mark complete"}
							>
								{goal.completed ? (
									<CheckCircle2 className="w-5 h-5 text-success" />
								) : (
									<Circle className="w-5 h-5 text-muted-foreground" />
								)}
							</button>
							<span
								className={`flex-1 text-sm transition-all ${
									goal.completed
										? "line-through text-muted-foreground"
										: "text-foreground font-medium"
								}`}
							>
								{goal.text}
							</span>
							<button
								type="button"
								onClick={() => removeGoal(goal.id)}
								className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
								aria-label="Remove"
							>
								<X className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
							</button>
						</div>
					))
				)}
			</div>
		</Card>
	);
};
