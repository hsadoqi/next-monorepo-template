import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { GridConfig, Layouts } from "./types";

interface GridState {
	layouts: Layouts;
	activeBreakpoint: string;
	config: GridConfig;
	hasHydrated: boolean;
	setState: (newState: Partial<GridState>) => void;
}

export const useGridStore = create<GridState>()(
	devtools(
		(set) => ({
			layouts: {
				xxs: [],
				xs: [],
				sm: [],
				md: [],
				lg: [],
				xl: [],
				xxl: [],
			},
			activeBreakpoint: "lg",
			config: {
				breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
				cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
				margin: [20, 20],
				containerPadding: { lg: [20, 20], md: [20, 20], sm: [20, 20], xs: [20, 20], xxs: [20, 20] },
				rowHeight: 30,
				resizeHandles: ["se", "sw", "ne", "nw", "e", "w", "s", "n"],
				compactType: "vertical",
				autoSize: true,
				flags: {
					isDraggable: true,
					isResizable: true,
					isDroppable: false,
					isBounded: false,
					allowOverlap: false,
					preventCollision: false,
				},
				handles: {
					draggableCancel: ".non-draggable",
					draggableHandle: ".draggable-handle",
				},
			},
			hasHydrated: false,
			setState: (newState) => set(newState),
		}),
		{ name: "GridStore" },
	),
);

export const useCurrentGrid = () => {
	const state = useGridStore();
	return { state, setState: state.setState, config: state.config };
};
