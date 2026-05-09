import { cn } from "@repo/ui-components/lib/utils";
import type React from "react";

export const GridItemContainer = ({
	children,
	isLocked,
}: {
	children: React.ReactNode;
	isLocked?: boolean;
}) => {
	return (
		<div
			className={cn(
				"@container relative flex-1 flex flex-col size-full border border-border rounded-md bg-card transition-opacity",
				isLocked && "opacity-70 pointer-events-none",
			)}
		>
			{children}
		</div>
	);
};
