"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BreakpointToggle } from "../components/breakpoint-toggle";
import type { BreakpointType } from "../grid/types";

const meta: Meta<typeof BreakpointToggle> = {
	title: "Dashboard/BreakpointToggle",
	component: BreakpointToggle,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		containerWidth: { control: { type: "range", min: 0, max: 2000, step: 100 } },
	},
};

export default meta;

type Story = StoryObj<typeof BreakpointToggle>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState<BreakpointType>("lg");
		return (
			<div className="p-4 border rounded-lg bg-background">
				<BreakpointToggle value={value} onChange={setValue} />
				<p className="text-xs text-muted-foreground mt-2">Selected: {value}</p>
			</div>
		);
	},
};

export const AllBreakpoints: Story = {
	render: () => {
		const [value, setValue] = useState<BreakpointType>("xl");
		return (
			<div className="p-4 border rounded-lg bg-background">
				<p className="text-xs text-muted-foreground mb-3">Container width: unlimited</p>
				<BreakpointToggle value={value} onChange={setValue} containerWidth={Infinity} />
				<p className="text-xs text-muted-foreground mt-2">Selected: {value}</p>
			</div>
		);
	},
};

export const NarrowContainer: Story = {
	render: () => {
		const [value, setValue] = useState<BreakpointType>("sm");
		return (
			<div className="p-4 border rounded-lg bg-background">
				<p className="text-xs text-muted-foreground mb-3">Container width: 900px (hides xl, xxl)</p>
				<BreakpointToggle value={value} onChange={setValue} containerWidth={900} />
				<p className="text-xs text-muted-foreground mt-2">Selected: {value}</p>
			</div>
		);
	},
};

export const VeryNarrowContainer: Story = {
	render: () => {
		const [value, setValue] = useState<BreakpointType>("xs");
		return (
			<div className="p-4 border rounded-lg bg-background">
				<p className="text-xs text-muted-foreground mb-3">
					Container width: 500px (only xxs, xs visible)
				</p>
				<BreakpointToggle value={value} onChange={setValue} containerWidth={500} />
				<p className="text-xs text-muted-foreground mt-2">Selected: {value}</p>
			</div>
		);
	},
};

export const MobileOnly: Story = {
	render: () => {
		const [value, setValue] = useState<BreakpointType>("xxs");
		return (
			<div className="p-4 border rounded-lg bg-background">
				<p className="text-xs text-muted-foreground mb-3">Container width: 100px (only xxs)</p>
				<BreakpointToggle value={value} onChange={setValue} containerWidth={100} />
				<p className="text-xs text-muted-foreground mt-2">Selected: {value}</p>
			</div>
		);
	},
};

export const Interactive: Story = {
	render: () => {
		const [value, setValue] = useState<BreakpointType>("lg");
		const [containerWidth, setContainerWidth] = useState(1600);
		return (
			<div className="p-4 border rounded-lg bg-background space-y-4">
				<div>
					<label className="text-xs text-muted-foreground" htmlFor="width-slider">
						Simulate container width: {containerWidth}px
					</label>
					<input
						id="width-slider"
						type="range"
						min={0}
						max={2000}
						step={100}
						value={containerWidth}
						onChange={(e) => setContainerWidth(Number(e.target.value))}
						className="w-full mt-1"
					/>
				</div>
				<BreakpointToggle value={value} onChange={setValue} containerWidth={containerWidth} />
				<p className="text-xs text-muted-foreground">
					Selected: <strong>{value}</strong>
				</p>
			</div>
		);
	},
};
