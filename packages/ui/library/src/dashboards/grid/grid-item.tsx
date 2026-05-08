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
					"flex flex-col size-full relative overflow-hidden rounded-lg shadow-md group",
					className,
				)}
				style={style}
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				onTouchEnd={onTouchEnd}
				data-testid="grid-item"
			>
				<GridItemContainer isLocked={false}>
					<div className="flex-1 overflow-hidden p-2 relative pt-6">
						<Suspense fallback={<div>Loading...</div>}>
							{children ?? <div>Widget Content</div>}
						</Suspense>
					</div>
				</GridItemContainer>
			</button>
		);
	},
);
GridItem.displayName = "GridItem";
