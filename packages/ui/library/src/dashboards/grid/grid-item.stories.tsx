import type { Meta, StoryObj } from "@storybook/react";
import { GridItem } from "../grid/grid-item";

const meta: Meta<typeof GridItem> = {
	title: "Dashboard/GridItem",
	component: GridItem,
	parameters: {
		layout: "centered",
	},
};

export default meta;

type Story = StoryObj<typeof GridItem>;

export const Default: Story = {
	render: () => (
		<div style={{ width: 300, height: 200 }}>
			<GridItem />
		</div>
	),
};

export const WithContent: Story = {
	render: () => (
		<div style={{ width: 300, height: 200 }}>
			<GridItem>
				<div className="p-4">
					<h3 className="font-semibold text-sm">My Widget</h3>
					<p className="text-xs text-muted-foreground mt-1">Widget content goes here</p>
				</div>
			</GridItem>
		</div>
	),
};

export const Small: Story = {
	render: () => (
		<div style={{ width: 150, height: 120 }}>
			<GridItem>
				<div className="p-2 text-xs">Small widget</div>
			</GridItem>
		</div>
	),
};

export const Large: Story = {
	render: () => (
		<div style={{ width: 500, height: 350 }}>
			<GridItem>
				<div className="p-4">
					<h3 className="font-semibold">Large Widget</h3>
					<p className="text-sm text-muted-foreground mt-2">
						This is a large widget with more content space available for charts, tables, and other
						complex components.
					</p>
				</div>
			</GridItem>
		</div>
	),
};

export const CustomClassName: Story = {
	render: () => (
		<div style={{ width: 300, height: 200 }}>
			<GridItem className="border-2 border-primary">
				<div className="p-4 text-sm">Custom styled item</div>
			</GridItem>
		</div>
	),
};

export const Grid3x3: Story = {
	render: () => (
		<div className="grid grid-cols-3 gap-2" style={{ width: 600, height: 400 }}>
			{Array.from({ length: 9 }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: demo items
				<GridItem key={i}>
					<div className="p-2 text-xs text-center">Widget {i + 1}</div>
				</GridItem>
			))}
		</div>
	),
};
