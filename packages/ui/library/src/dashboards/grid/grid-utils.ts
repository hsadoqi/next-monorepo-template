import type { Layouts } from "./types";

export const getBreakpointForWidth = (width: number): string => {
	const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
	const sortedBreakpoints = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);

	for (const [breakpoint, minWidth] of sortedBreakpoints) {
		if (width >= minWidth) {
			return breakpoint;
		}
	}

	return "xxs";
};

export const normalizeLayouts = (layouts: Partial<Layouts>): Layouts => {
	const requiredBreakpoints = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"];
	const newLayouts = { ...layouts } as Layouts;

	for (const breakpoint of requiredBreakpoints) {
		if (!newLayouts[breakpoint]) {
			newLayouts[breakpoint] = [];
		}
	}

	return newLayouts;
};
