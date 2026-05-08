import type { RefObject } from "react";
import type { Layout, ResponsiveLayouts } from "react-grid-layout/legacy";
import type { LayoutItem } from "./types";

export const handleLayoutChange = (
	layoutRef: RefObject<LayoutItem[]>,
	scheduleLayoutUpdate: (bp: string, layout: Layout) => void,
	currentBreakpoint: string,
	newLayout: Layout,
) => {
	if (layoutRef.current && JSON.stringify(layoutRef.current) !== JSON.stringify(newLayout)) {
		layoutRef.current = [...newLayout];
		scheduleLayoutUpdate(currentBreakpoint, newLayout);
	}
};

export const handleBreakpointChange = (
	layoutRef: RefObject<LayoutItem[]>,
	layouts: ResponsiveLayouts<string>,
	newBreakpoint: string,
	setActiveBreakpoint: (breakpoint: string) => void,
) => {
	layoutRef.current = [...(layouts[newBreakpoint] || [])];
	setActiveBreakpoint(newBreakpoint);
};
