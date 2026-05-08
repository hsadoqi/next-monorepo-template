"use client";

import { useEffect, useRef, useState } from "react";
import { WidgetAreaSkeleton } from "../skeletons/widget-area-skeleton";
import BreakpointToggleWrapper from "./breakpoint-toggle-wrapper";
import { useCurrentGrid } from "./grid-context";
import type { LayoutItem, Layouts } from "./react-grid-layout";
import { ReactGridLayout } from "./react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const defaultLayouts: Layouts = {
	xxs: [
		{ i: "a", x: 0, y: 0, w: 2, h: 2 },
		{ i: "b", x: 0, y: 2, w: 2, h: 2 },
		{ i: "c", x: 0, y: 4, w: 2, h: 2 },
	],
	xs: [
		{ i: "a", x: 0, y: 0, w: 4, h: 2 },
		{ i: "b", x: 0, y: 2, w: 4, h: 2 },
		{ i: "c", x: 0, y: 4, w: 4, h: 2 },
	],
	sm: [
		{ i: "a", x: 0, y: 0, w: 3, h: 2 },
		{ i: "b", x: 3, y: 0, w: 3, h: 2 },
		{ i: "c", x: 0, y: 2, w: 6, h: 2 },
	],
	md: [],
	lg: [],
	xl: [],
	xxl: [],
};

const Grid = () => {
	const [mounted, setMounted] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { state, setState } = useCurrentGrid();

	const layouts: Layouts = state?.layouts ?? defaultLayouts;
	const currentBreakpoint = state?.activeBreakpoint ?? "lg";
	const layoutRef = useRef<LayoutItem[]>(layouts?.[currentBreakpoint] || []);

	useEffect(() => {
		// Initialize store with defaults on first mount
		setState({ layouts: defaultLayouts, hasHydrated: true });
		setMounted(true);
	}, [setState]);

	return (
		<div
			ref={containerRef}
			className="bg-[var(--background-100)] flex-1 size-full max-size-full flex flex-col shadow-inner relative"
		>
			<BreakpointToggleWrapper containerRef={containerRef}>
				{mounted ? <ReactGridLayout layoutRef={layoutRef} /> : <WidgetAreaSkeleton />}
			</BreakpointToggleWrapper>
		</div>
	);
};

export default Grid;
