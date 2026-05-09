"use client";
import type React from "react";
import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { BreakpointToggle } from "../components/breakpoint-toggle";
import { ColumnOverlay } from "../components/column-overlay";
import { OverlayToggle } from "../components/overlay-toggle";
import { RowOverlay } from "../components/row-overlay";
import { useCurrentGrid } from "./grid-context";
import { getBreakpointForWidth } from "./grid-utils";
import type { BreakpointType } from "./types";

export type { BreakpointType } from "./types";

const widths: Record<BreakpointType, string> = {
	xxs: "max-w-[479px]",
	xs: "max-w-[767px]",
	sm: "max-w-[995px]",
	md: "max-w-[1199px]",
	lg: "max-w-[1499px]",
	xl: "max-w-full",
	xxl: "max-w-full",
};

export const defaultCols: Record<BreakpointType, number> = {
	xxs: 2,
	xs: 4,
	sm: 6,
	md: 10,
	lg: 12,
	xl: 12,
	xxl: 12,
};

export const defaultContainerPadding: Record<BreakpointType, [number, number]> = {
	xxs: [20, 20],
	xs: [20, 20],
	sm: [20, 20],
	md: [20, 20],
	lg: [20, 20],
	xl: [20, 20],
	xxl: [20, 20],
};

export const defaultMargin: Record<BreakpointType, [number, number]> = {
	xxs: [20, 20],
	xs: [20, 20],
	sm: [20, 20],
	md: [20, 20],
	lg: [20, 20],
	xl: [20, 20],
	xxl: [20, 20],
};

const BreakpointToggleWrapper = ({
	children,
	containerRef: externalContainerRef,
}: {
	children: React.ReactNode;
	containerRef: RefObject<HTMLDivElement | null>;
}) => {
	const { config } = useCurrentGrid();
	const [breakpoint, setBreakpoint] = useState<BreakpointType>("xl");
	const [rows, setRows] = useState(20);
	const [showCols, setShowCols] = useState(false);
	const [showRows, setShowRows] = useState(false);
	const [containerWidth, setContainerWidth] = useState<number>(
		typeof window !== "undefined" ? window.innerWidth : 0,
	);
	const [gridWidth, setGridWidth] = useState<number>(0);
	const manualBreakpointRef = useRef(false);

	const containerRef = useRef<HTMLDivElement>(null);

	const columnCount = defaultCols[breakpoint];
	const containerWidthClass = widths[breakpoint];

	const rowHeight = config?.rowHeight ?? 30;
	const marginX = defaultMargin[breakpoint][0];
	const marginY = defaultMargin[breakpoint][1];
	const containerPaddingX = defaultContainerPadding[breakpoint][0];
	const containerPaddingY = defaultContainerPadding[breakpoint][1];

	const calculateRows = useCallback(() => {
		if (!containerRef.current) return;
		const height = containerRef.current.clientHeight;
		const availableHeight = height - 2 * containerPaddingY;
		const rowSpace = rowHeight + marginY;
		const newRows = Math.floor((availableHeight + marginY) / rowSpace);
		setRows(newRows > 0 ? newRows : 1);
	}, [containerPaddingY, marginY, rowHeight]);

	const syncLayoutMetrics = useCallback(() => {
		const parentWidth = externalContainerRef.current?.clientWidth ?? window.innerWidth;
		const contentWidth = containerRef.current?.clientWidth ?? parentWidth;
		const usableGridWidth = Math.max(contentWidth - containerPaddingX, 0);

		setContainerWidth(parentWidth);
		setGridWidth(usableGridWidth);

		if (!manualBreakpointRef.current) {
			setBreakpoint(getBreakpointForWidth(parentWidth) as BreakpointType);
		}

		calculateRows();
	}, [calculateRows, containerPaddingX, externalContainerRef]);

	useEffect(() => {
		syncLayoutMetrics();

		const handleResize = () => {
			syncLayoutMetrics();
		};

		const observer = new ResizeObserver(() => {
			syncLayoutMetrics();
		});

		if (externalContainerRef.current) observer.observe(externalContainerRef.current);
		if (containerRef.current) observer.observe(containerRef.current);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			observer.disconnect();
		};
	}, [externalContainerRef, syncLayoutMetrics]);

	return (
		<div className="relative w-full h-full flex flex-col">
			<div className="relative z-50 flex items-center justify-between shrink-0 px-4 py-3 border-b border-border bg-background">
				<OverlayToggle
					showCols={showCols}
					showRows={showRows}
					toggleCols={() => setShowCols((prev) => !prev)}
					toggleRows={() => setShowRows((prev) => !prev)}
				/>
				<BreakpointToggle
					value={breakpoint}
					onChange={(next) => {
						manualBreakpointRef.current = true;
						setBreakpoint(next);
					}}
					containerWidth={containerWidth}
				/>
			</div>

			<div
				ref={containerRef}
				className={`relative flex-1 ${containerWidthClass} flex flex-col transition-all duration-200 ease-linear mx-auto w-full overflow-auto`}
			>
				{showCols && (
					<ColumnOverlay
						cols={columnCount}
						marginX={marginX}
						containerPaddingX={containerPaddingX}
						containerWidth={gridWidth}
					/>
				)}
				{showRows && (
					<RowOverlay
						rows={rows}
						marginY={marginY}
						containerPaddingY={containerPaddingY}
						rowHeight={rowHeight}
					/>
				)}
				{children}
			</div>
		</div>
	);
};

export default BreakpointToggleWrapper;
