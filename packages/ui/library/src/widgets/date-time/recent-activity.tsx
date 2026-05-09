import { Card } from "@repo/ui-components/ui/card";
import { ActivitySquare } from "lucide-react";
import type React from "react";

interface Activity {
	id: string;
	description: string;
	timestamp: Date;
	icon?: React.ReactNode;
}

interface RecentActivityProps {
	activities?: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
	activities = [
		{
			id: "1",
			description: "Completed project setup",
			timestamp: new Date(Date.now() - 3600000),
		},
		{
			id: "2",
			description: "Updated documentation",
			timestamp: new Date(Date.now() - 7200000),
		},
		{
			id: "3",
			description: "Reviewed pull request",
			timestamp: new Date(Date.now() - 10800000),
		},
	],
}) => {
	const formatTime = (date: Date) => {
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);

		if (diffMins < 60) return `${diffMins}m ago`;
		const diffHours = Math.floor(diffMins / 60);
		if (diffHours < 24) return `${diffHours}h ago`;
		return date.toLocaleDateString();
	};

	return (
		<Card className="p-6 flex flex-col h-full bg-gradient-to-br from-card to-card/95">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 rounded-lg bg-primary/10">
					<ActivitySquare className="w-5 h-5 text-primary" />
				</div>
				<h3 className="font-semibold text-foreground">Recent Activity</h3>
			</div>
			<div className="space-y-3 flex-1">
				{activities.length === 0 ? (
					<div className="flex items-center justify-center h-20 text-muted-foreground">
						<p className="text-sm">No recent activity</p>
					</div>
				) : (
					activities.map((activity, index) => (
						<div
							key={activity.id}
							className="flex gap-4 pb-3 last:pb-0"
							style={
								index !== activities.length - 1 ? { borderBottom: "1px solid var(--border)" } : {}
							}
						>
							<div className="flex flex-col items-center">
								<div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
								{index !== activities.length - 1 && <div className="w-0.5 h-8 bg-border my-1" />}
							</div>
							<div className="flex-1 min-w-0 pt-0.5">
								<p className="text-sm font-medium text-foreground line-clamp-2">
									{activity.description}
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									{formatTime(activity.timestamp)}
								</p>
							</div>
						</div>
					))
				)}
			</div>
		</Card>
	);
};
