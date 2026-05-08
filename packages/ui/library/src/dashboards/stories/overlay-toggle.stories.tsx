"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { OverlayToggle } from "../components/overlay-toggle";

const meta: Meta<typeof OverlayToggle> = {
	title: "Dashboard/OverlayToggle",
	component: OverlayToggle,
	parameters: {
		layout: "centered",
	},
};

export default meta;

type Story = StoryObj<typeof OverlayToggle>;

export const Default: Story = {
	render: () => {
		const [showCols, setShowCols] = useState(false);
		const [showRows, setShowRows] = useState(false);
		return (
			<div className="p-4 border rounded-lg bg-background">
				<OverlayToggle
					showCols={showCols}
					showRows={showRows}
					toggleCols={() => setShowCols((p) => !p)}
					toggleRows={() => setShowRows((p) => !p)}
				/>
				<p className="text-xs text-muted-foreground mt-2">
					Cols: {showCols ? "on" : "off"} | Rows: {showRows ? "on" : "off"}
				</p>
			</div>
		);
	},
};

export const ColsActive: Story = {
	render: () => {
		const [showCols, setShowCols] = useState(true);
		const [showRows, setShowRows] = useState(false);
		return (
			<div className="p-4 border rounded-lg bg-background">
				<OverlayToggle
					showCols={showCols}
					showRows={showRows}
					toggleCols={() => setShowCols((p) => !p)}
					toggleRows={() => setShowRows((p) => !p)}
				/>
			</div>
		);
	},
};

export const RowsActive: Story = {
	render: () => {
		const [showCols, setShowCols] = useState(false);
		const [showRows, setShowRows] = useState(true);
		return (
			<div className="p-4 border rounded-lg bg-background">
				<OverlayToggle
					showCols={showCols}
					showRows={showRows}
					toggleCols={() => setShowCols((p) => !p)}
					toggleRows={() => setShowRows((p) => !p)}
				/>
			</div>
		);
	},
};

export const BothActive: Story = {
	render: () => {
		const [showCols, setShowCols] = useState(true);
		const [showRows, setShowRows] = useState(true);
		return (
			<div className="p-4 border rounded-lg bg-background">
				<OverlayToggle
					showCols={showCols}
					showRows={showRows}
					toggleCols={() => setShowCols((p) => !p)}
					toggleRows={() => setShowRows((p) => !p)}
				/>
			</div>
		);
	},
};

export const WithGridPreview: Story = {
	render: () => {
		const [showCols, setShowCols] = useState(false);
		const [showRows, setShowRows] = useState(false);
		return (
			<div className="space-y-4">
				<div className="p-2 border rounded bg-background inline-block">
					<OverlayToggle
						showCols={showCols}
						showRows={showRows}
						toggleCols={() => setShowCols((p) => !p)}
						toggleRows={() => setShowRows((p) => !p)}
					/>
				</div>
				<div className="relative border rounded bg-muted/20" style={{ width: 400, height: 250 }}>
					{showCols && (
						<div className="absolute inset-0 flex pointer-events-none">
							{Array.from({ length: 4 }).map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: overlay columns
								<div key={i} className="flex-1 border-r border-blue-400/40 bg-blue-400/10" />
							))}
						</div>
					)}
					{showRows && (
						<div className="absolute inset-0 flex flex-col pointer-events-none">
							{Array.from({ length: 4 }).map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: overlay rows
								<div key={i} className="flex-1 border-b border-red-400/40 bg-red-400/10" />
							))}
						</div>
					)}
					<div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
						Grid preview area
					</div>
				</div>
			</div>
		);
	},
};
