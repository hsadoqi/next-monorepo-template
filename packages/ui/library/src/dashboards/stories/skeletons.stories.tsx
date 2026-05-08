import type { Meta, StoryObj } from "@storybook/react";
import { BreakpointToggleSkeleton } from "../skeletons/breakpoint-toggle-skeleton";
import { WidgetAreaSkeleton } from "../skeletons/widget-area-skeleton";
import { WidgetGridSkeleton } from "../skeletons/widget-grid-skeleton";
import { WidgetSkeleton } from "../skeletons/widget-skeleton";

const meta: Meta = {
	title: "Dashboard/Skeletons",
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj;

export const BreakpointToggleSkeletonStory: Story = {
	name: "BreakpointToggleSkeleton",
	render: () => (
		<div className="p-4 border rounded-lg bg-background">
			<BreakpointToggleSkeleton />
		</div>
	),
};

export const WidgetSkeletonStory: Story = {
	name: "WidgetSkeleton",
	render: () => (
		<div style={{ width: 280 }}>
			<WidgetSkeleton />
		</div>
	),
};

export const WidgetGridSkeletonDefault: Story = {
	name: "WidgetGridSkeleton (6 items)",
	render: () => <WidgetGridSkeleton />,
};

export const WidgetGridSkeletonFew: Story = {
	name: "WidgetGridSkeleton (3 items)",
	render: () => <WidgetGridSkeleton count={3} />,
};

export const WidgetGridSkeletonMany: Story = {
	name: "WidgetGridSkeleton (12 items)",
	render: () => <WidgetGridSkeleton count={12} />,
};

export const WidgetAreaSkeletonStory: Story = {
	name: "WidgetAreaSkeleton",
	render: () => (
		<div style={{ height: 400 }}>
			<WidgetAreaSkeleton />
		</div>
	),
};

export const WidgetAreaSkeletonWithChildren: Story = {
	name: "WidgetAreaSkeleton with children",
	render: () => (
		<div style={{ height: 400 }}>
			<WidgetAreaSkeleton>
				<p className="text-xs text-muted-foreground mt-4">Custom loading message</p>
			</WidgetAreaSkeleton>
		</div>
	),
};

export const AllSkeletons: Story = {
	name: "All Skeletons",
	render: () => (
		<div className="space-y-8">
			<div>
				<p className="text-xs font-medium text-muted-foreground mb-2">BreakpointToggleSkeleton</p>
				<BreakpointToggleSkeleton />
			</div>
			<div>
				<p className="text-xs font-medium text-muted-foreground mb-2">WidgetSkeleton</p>
				<div style={{ width: 280 }}>
					<WidgetSkeleton />
				</div>
			</div>
			<div>
				<p className="text-xs font-medium text-muted-foreground mb-2">WidgetGridSkeleton</p>
				<WidgetGridSkeleton count={3} />
			</div>
		</div>
	),
};
