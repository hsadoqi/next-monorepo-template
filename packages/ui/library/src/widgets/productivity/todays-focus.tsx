import { Card } from "@repo/ui-components/ui/card";
import { CheckCircle2, Circle, X } from "lucide-react";
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

	return (
		<Card className="p-4">
			<div className="flex items-center justify-between mb-3">
				<h3 className="font-semibold">Today&apos;s Focus</h3>
				<span className="text-sm text-muted-foreground">
					{completedCount}/{goals.length}
				</span>
			</div>
			<div className="space-y-2">
				{goals.map((goal) => (
					<div
						key={goal.id}
						className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
					>
						<button
							type="button"
							onClick={() => toggleGoal(goal.id)}
							className="flex-shrink-0"
							aria-label={goal.completed ? "Mark incomplete" : "Mark complete"}
						>
							{goal.completed ? (
								<CheckCircle2 className="w-4 h-4 text-green-500" />
							) : (
								<Circle className="w-4 h-4 text-muted-foreground" />
							)}
						</button>
						<span
							className={`flex-1 text-sm ${
								goal.completed ? "line-through text-muted-foreground" : ""
							}`}
						>
							{goal.text}
						</span>
						<button
							type="button"
							onClick={() => removeGoal(goal.id)}
							className="flex-shrink-0 opacity-0 group-hover:opacity-100"
							aria-label="Remove"
						>
							<X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
						</button>
					</div>
				))}
			</div>
		</Card>
	);
};
