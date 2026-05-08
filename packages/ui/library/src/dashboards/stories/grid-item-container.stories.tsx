import type { Meta, StoryObj } from "@storybook/react";
import { GridItemContainer } from "../grid/grid-item-container";

const meta: Meta<typeof GridItemContainer> = {
	title: "Dashboard/GridItemContainer",
	component: GridItemContainer,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		isLocked: { control: "boolean" },
	},
};

export default meta;

type Story = StoryObj<typeof GridItemContainer>;

export const Default: Story = {
	render: (args) => (
		<div style={{ width: 300, height: 200 }}>
			<GridItemContainer {...args}>
				<div className="p-4">
					<p className="text-sm">Widget content</p>
				</div>
			</GridItemContainer>
		</div>
	),
	args: { isLocked: false },
};

export const Unlocked: Story = {
	render: () => (
		<div style={{ width: 300, height: 200 }}>
			<GridItemContainer isLocked={false}>
				<div className="p-4">
					<p className="text-sm font-medium">Unlocked Container</p>
					<p className="text-xs text-muted-foreground mt-1">This container is fully interactive</p>
				</div>
			</GridItemContainer>
		</div>
	),
};

export const Locked: Story = {
	render: () => (
		<div style={{ width: 300, height: 200 }}>
			<GridItemContainer isLocked>
				<div className="p-4">
					<p className="text-sm font-medium">Locked Container</p>
					<p className="text-xs text-muted-foreground mt-1">
						This container is locked and non-interactive
					</p>
				</div>
			</GridItemContainer>
		</div>
	),
};

export const ComparisonLockedUnlocked: Story = {
	render: () => (
		<div className="flex gap-4">
			<div style={{ width: 240, height: 180 }}>
				<p className="text-xs text-muted-foreground mb-1">Unlocked</p>
				<GridItemContainer isLocked={false}>
					<div className="p-4 text-sm">Interactive content</div>
				</GridItemContainer>
			</div>
			<div style={{ width: 240, height: 180 }}>
				<p className="text-xs text-muted-foreground mb-1">Locked</p>
				<GridItemContainer isLocked>
					<div className="p-4 text-sm">Locked content</div>
				</GridItemContainer>
			</div>
		</div>
	),
};
