"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ColumnOverlay } from "../components/column-overlay";

const meta: Meta<typeof ColumnOverlay> = {
	title: "Dashboard/ColumnOverlay",
	component: ColumnOverlay,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		cols: { control: { type: "range", min: 1, max: 24, step: 1 } },
		marginX: { control: { type: "range", min: 0, max: 40, step: 2 } },
		containerPaddingX: { control: { type: "range", min: 0, max: 40, step: 2 } },
		containerWidth: { control: { type: "range", min: 100, max: 1200, step: 50 } },
	},
};

export default meta;

type Story = StoryObj<typeof ColumnOverlay>;

const CONTAINER_WIDTH = 600;

export const Default: Story = {
	render: () => (
		<div
			className="relative border rounded bg-muted/20"
			style={{ width: CONTAINER_WIDTH, height: 200 }}
		>
			<ColumnOverlay
				cols={12}
				marginX={10}
				containerPaddingX={20}
				containerWidth={CONTAINER_WIDTH}
			/>
		</div>
	),
};

export const FewColumns: Story = {
	render: () => (
		<div
			className="relative border rounded bg-muted/20"
			style={{ width: CONTAINER_WIDTH, height: 200 }}
		>
			<ColumnOverlay
				cols={3}
				marginX={10}
				containerPaddingX={20}
				containerWidth={CONTAINER_WIDTH}
			/>
		</div>
	),
};

export const ManyColumns: Story = {
	render: () => (
		<div
			className="relative border rounded bg-muted/20"
			style={{ width: CONTAINER_WIDTH, height: 200 }}
		>
			<ColumnOverlay
				cols={24}
				marginX={5}
				containerPaddingX={10}
				containerWidth={CONTAINER_WIDTH}
			/>
		</div>
	),
};

export const NoGap: Story = {
	render: () => (
		<div
			className="relative border rounded bg-muted/20"
			style={{ width: CONTAINER_WIDTH, height: 200 }}
		>
			<ColumnOverlay cols={6} marginX={0} containerPaddingX={0} containerWidth={CONTAINER_WIDTH} />
		</div>
	),
};

export const WideMargin: Story = {
	render: () => (
		<div
			className="relative border rounded bg-muted/20"
			style={{ width: CONTAINER_WIDTH, height: 200 }}
		>
			<ColumnOverlay
				cols={6}
				marginX={30}
				containerPaddingX={30}
				containerWidth={CONTAINER_WIDTH}
			/>
		</div>
	),
};

export const Interactive: Story = {
	render: () => {
		const [cols, setCols] = useState(12);
		const [marginX, setMarginX] = useState(10);
		const [containerPaddingX, setContainerPaddingX] = useState(20);
		return (
			<div className="space-y-4">
				<div className="grid grid-cols-3 gap-4 text-xs">
					<label>
						Cols: {cols}
						<input
							type="range"
							min={1}
							max={24}
							value={cols}
							onChange={(e) => setCols(Number(e.target.value))}
							className="w-full block mt-1"
						/>
					</label>
					<label>
						Margin: {marginX}px
						<input
							type="range"
							min={0}
							max={40}
							value={marginX}
							onChange={(e) => setMarginX(Number(e.target.value))}
							className="w-full block mt-1"
						/>
					</label>
					<label>
						Padding: {containerPaddingX}px
						<input
							type="range"
							min={0}
							max={40}
							value={containerPaddingX}
							onChange={(e) => setContainerPaddingX(Number(e.target.value))}
							className="w-full block mt-1"
						/>
					</label>
				</div>
				<div
					className="relative border rounded bg-muted/20"
					style={{ width: CONTAINER_WIDTH, height: 200 }}
				>
					<ColumnOverlay
						cols={cols}
						marginX={marginX}
						containerPaddingX={containerPaddingX}
						containerWidth={CONTAINER_WIDTH}
					/>
				</div>
			</div>
		);
	},
};
