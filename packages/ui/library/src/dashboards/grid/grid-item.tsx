import { cn } from "@repo/ui-components/lib/utils";
import React, { Suspense } from "react";
import { GridItemContainer } from "./grid-item-container";

interface GridItemProps {
	className?: string;
	style?: React.CSSProperties;
	onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onTouchEnd?: (event: React.TouchEvent<HTMLButtonElement>) => void;
	children?: React.ReactNode;
}

export const GridItem = React.forwardRef<HTMLButtonElement, GridItemProps>(
	({ className, style, onMouseDown, onMouseUp, onTouchEnd, children }, ref) => {
		return (
			<button
				type="button"
				ref={ref}
				className={cn(
					"flex flex-col size-full relative overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow group",
					className,
				)}
				style={style}
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				onTouchEnd={onTouchEnd}
				data-testid="grid-item"
			>
				<GridItemContainer isLocked={false}>
					<div className="flex-1 overflow-hidden p-4 relative">
						<Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
							{children ?? <div className="text-muted-foreground">Widget Content</div>}
						</Suspense>
					</div>
				</GridItemContainer>
			</button>
		);
	},
);
GridItem.displayName = "GridItem";
