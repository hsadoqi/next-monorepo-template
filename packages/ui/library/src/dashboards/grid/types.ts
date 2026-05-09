import type { CompactType } from "react-grid-layout/legacy";

export type BreakpointType = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export const defaultBreakpoints: Record<BreakpointType, number> = {
	xxs: 320,
	xs: 480,
	sm: 768,
	md: 996,
	lg: 1200,
	xl: 1500,
	xxl: 1920,
};

export interface LayoutItem {
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
	minW?: number;
	maxW?: number;
	minH?: number;
	maxH?: number;
	static?: boolean;
	isDraggable?: boolean;
	isResizable?: boolean;
}

export type Layouts = Record<string, LayoutItem[]>;

export interface GridConfig {
	breakpoints: Record<string, number>;
	cols: Record<string, number>;
	margin: [number, number];
	containerPadding: Record<string, [number, number]>;
	rowHeight: number;
	resizeHandles: string[];
	compactType: CompactType | null;
	autoSize: boolean;
	flags: {
		isDraggable: boolean;
		isResizable: boolean;
		isDroppable: boolean;
		isBounded: boolean;
		allowOverlap: boolean;
		preventCollision: boolean;
	};
	handles: {
		draggableCancel: string;
		draggableHandle: string;
	};
}
