import { Card } from "@repo/ui-components/ui/card";
import { Clock } from "lucide-react";
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
		<Card className="p-4">
			<h3 className="font-semibold mb-3">Recent Activity</h3>
			<div className="space-y-3">
				{activities.map((activity) => (
					<div key={activity.id} className="flex gap-3">
						<Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
						<div className="flex-1 min-w-0">
							<p className="text-sm truncate">{activity.description}</p>
							<p className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</p>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};
