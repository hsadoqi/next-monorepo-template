import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { BreakpointType } from "../grid/types";
import {
	BreakpointToggle,
	BreakpointToggleSkeleton,
	ColumnOverlay,
	OverlayToggle,
	RowOverlay,
	WidgetAreaSkeleton,
} from "../index";

const meta: Meta = {
	title: "Dashboard/Primitives",
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj;

export const BreakpointSelector: Story = {
	render: () => {
		const [value, setValue] = useState<BreakpointType>("lg");

		return (
			<div className="max-w-sm rounded-xl border border-border/60 bg-background p-4 shadow-sm">
				<BreakpointToggle value={value} onChange={setValue} containerWidth={920} />
			</div>
		);
	},
};

export const OverlayControls: Story = {
	render: () => {
		const [showCols, setShowCols] = useState(true);
		const [showRows, setShowRows] = useState(false);

		return (
			<div className="max-w-sm rounded-xl border border-border/60 bg-background p-4 shadow-sm">
				<OverlayToggle
					showCols={showCols}
					showRows={showRows}
					toggleCols={() => setShowCols((prev) => !prev)}
					toggleRows={() => setShowRows((prev) => !prev)}
				/>
			</div>
		);
	},
};

export const ColumnOverlayPreview: Story = {
	render: () => (
		<div className="relative h-72 overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm">
			<ColumnOverlay cols={12} marginX={16} containerPaddingX={24} containerWidth={960} />
		</div>
	),
};

export const RowOverlayPreview: Story = {
	render: () => (
		<div className="relative h-72 overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm">
			<RowOverlay rows={10} marginY={16} containerPaddingY={24} rowHeight={24} />
		</div>
	),
};

export const Skeletons: Story = {
	render: () => (
		<div className="space-y-4">
			<div className="rounded-xl border border-border/60 bg-background p-4 shadow-sm">
				<BreakpointToggleSkeleton />
			</div>
			<div className="h-72 rounded-xl border border-border/60 bg-background p-4 shadow-sm">
				<WidgetAreaSkeleton />
			</div>
		</div>
	),
};
