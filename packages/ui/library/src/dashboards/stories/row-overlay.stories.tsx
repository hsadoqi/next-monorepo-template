"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RowOverlay } from "../components/row-overlay";

const meta: Meta<typeof RowOverlay> = {
	title: "Dashboard/RowOverlay",
	component: RowOverlay,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		rows: { control: { type: "range", min: 1, max: 30, step: 1 } },
		marginY: { control: { type: "range", min: 0, max: 40, step: 2 } },
		containerPaddingY: { control: { type: "range", min: 0, max: 40, step: 2 } },
		rowHeight: { control: { type: "range", min: 10, max: 100, step: 5 } },
	},
};

export default meta;

type Story = StoryObj<typeof RowOverlay>;

export const Default: Story = {
	render: () => (
		<div className="relative border rounded bg-muted/20" style={{ width: 400, height: 400 }}>
			<RowOverlay rows={10} marginY={10} containerPaddingY={20} rowHeight={30} />
		</div>
	),
};

export const FewRows: Story = {
	render: () => (
		<div className="relative border rounded bg-muted/20" style={{ width: 400, height: 200 }}>
			<RowOverlay rows={3} marginY={10} containerPaddingY={10} rowHeight={40} />
		</div>
	),
};

export const ManyRows: Story = {
	render: () => (
		<div className="relative border rounded bg-muted/20" style={{ width: 400, height: 400 }}>
			<RowOverlay rows={20} marginY={5} containerPaddingY={10} rowHeight={15} />
		</div>
	),
};

export const NoGap: Story = {
	render: () => (
		<div className="relative border rounded bg-muted/20" style={{ width: 400, height: 300 }}>
			<RowOverlay rows={6} marginY={0} containerPaddingY={0} rowHeight={50} />
		</div>
	),
};

export const TallRows: Story = {
	render: () => (
		<div className="relative border rounded bg-muted/20" style={{ width: 400, height: 400 }}>
			<RowOverlay rows={4} marginY={20} containerPaddingY={20} rowHeight={60} />
		</div>
	),
};

export const Interactive: Story = {
	render: () => {
		const [rows, setRows] = useState(10);
		const [marginY, setMarginY] = useState(10);
		const [containerPaddingY, setContainerPaddingY] = useState(20);
		const [rowHeight, setRowHeight] = useState(30);
		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4 text-xs">
					<label>
						Rows: {rows}
						<input
							type="range"
							min={1}
							max={30}
							value={rows}
							onChange={(e) => setRows(Number(e.target.value))}
							className="w-full block mt-1"
						/>
					</label>
					<label>
						Row height: {rowHeight}px
						<input
							type="range"
							min={10}
							max={100}
							value={rowHeight}
							onChange={(e) => setRowHeight(Number(e.target.value))}
							className="w-full block mt-1"
						/>
					</label>
					<label>
						Margin Y: {marginY}px
						<input
							type="range"
							min={0}
							max={40}
							value={marginY}
							onChange={(e) => setMarginY(Number(e.target.value))}
							className="w-full block mt-1"
						/>
					</label>
					<label>
						Padding Y: {containerPaddingY}px
						<input
							type="range"
							min={0}
							max={40}
							value={containerPaddingY}
							onChange={(e) => setContainerPaddingY(Number(e.target.value))}
							className="w-full block mt-1"
						/>
					</label>
				</div>
				<div className="relative border rounded bg-muted/20" style={{ width: 400, height: 400 }}>
					<RowOverlay
						rows={rows}
						marginY={marginY}
						containerPaddingY={containerPaddingY}
						rowHeight={rowHeight}
					/>
				</div>
			</div>
		);
	},
};
