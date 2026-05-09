"use client";

import { type RefObject, useCallback, useEffect, useRef } from "react";
import type { Layout, ResponsiveLayouts } from "react-grid-layout/legacy";
import { Responsive, WidthProvider } from "react-grid-layout/legacy";
import { useCurrentGrid, useGridStore } from "./grid-context";
import { handleBreakpointChange, handleLayoutChange } from "./grid-handlers";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { GridItem } from "./grid-item";
import { normalizeLayouts } from "./grid-utils";
import type { LayoutItem, Layouts } from "./types";

export type { LayoutItem, Layouts } from "./types";

const ResponsiveGrid = WidthProvider(Responsive);

export const ReactGridLayout = ({ layoutRef }: { layoutRef: RefObject<LayoutItem[]> }) => {
	const { setState, state, config } = useCurrentGrid();
	const hasHydrated = useGridStore((state) => state.hasHydrated);
	const currentBreakpoint = state?.activeBreakpoint ?? "lg";
	const layoutUpdateTimeoutRef = useRef<ReturnType<typeof globalThis.setTimeout> | null>(null);

	const scheduleLayoutUpdate = useCallback(
		(bp: string, layout: Layout) => {
			if (layoutUpdateTimeoutRef.current) {
				globalThis.clearTimeout(layoutUpdateTimeoutRef.current);
			}

			layoutUpdateTimeoutRef.current = globalThis.setTimeout(() => {
				const layouts: Layouts = normalizeLayouts({ ...state?.layouts, [bp]: [...layout] });
				setState({ layouts: { ...layouts } });
			}, 500);
		},
		[setState, state?.layouts],
	);

	useEffect(
		() => () => {
			if (layoutUpdateTimeoutRef.current) {
				globalThis.clearTimeout(layoutUpdateTimeoutRef.current);
			}
		},
		[],
	);

	if (!hasHydrated) return null;

	const safeLayouts = normalizeLayouts(
		state?.layouts ?? {
			xxs: [],
			xs: [],
			sm: [],
			md: [],
			lg: [],
			xl: [],
			xxl: [],
		},
	);

	return (
		<ResponsiveGrid
			key={currentBreakpoint}
			{...config}
			data-testid="react-grid-layout"
			className="layout flex-1 overflow-y-auto no-scrollbar bg-background text-foreground h-full flex"
			layouts={safeLayouts}
			breakpoints={config?.breakpoints}
			cols={config?.cols}
			margin={config?.margin}
			containerPadding={config?.containerPadding}
			rowHeight={config?.rowHeight}
			resizeHandles={
				config?.resizeHandles as Array<"s" | "w" | "n" | "e" | "sw" | "nw" | "se" | "ne">
			}
			compactType={config?.compactType}
			autoSize={config?.autoSize}
			isDraggable={config?.flags?.isDraggable}
			isResizable={config?.flags?.isResizable}
			isDroppable={config?.flags?.isDroppable}
			isBounded={config?.flags?.isBounded}
			allowOverlap={config?.flags?.allowOverlap}
			preventCollision={config?.flags?.preventCollision}
			draggableCancel={config?.handles?.draggableCancel}
			draggableHandle={config?.handles?.draggableHandle}
			onLayoutChange={(layout: Layout, allLayouts: ResponsiveLayouts<string>) => {
				handleLayoutChange(
					layoutRef,
					scheduleLayoutUpdate,
					currentBreakpoint,
					allLayouts[currentBreakpoint] || layout,
				);
			}}
			onBreakpointChange={(bp: string) => {
				handleBreakpointChange(layoutRef, safeLayouts, bp, (breakpoint: string) =>
					setState({ activeBreakpoint: breakpoint }),
				);
			}}
			useCSSTransforms={hasHydrated}
		>
			{state?.layouts[currentBreakpoint]?.map((item) => (
				<div key={item.i} data-grid={{ ...item }} className="size-full">
					<GridItem />
				</div>
			))}
		</ResponsiveGrid>
	);
};
