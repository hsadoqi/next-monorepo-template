import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const meta = {
	title: "UI/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	decorators: [
		(Story) => (
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		),
	],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Hover me</Button>
			</TooltipTrigger>
			<TooltipContent>This is a tooltip</TooltipContent>
		</Tooltip>
	),
};

// ─── Sides ───────────────────────────────────────────────────────────────────

export const SideTop: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Top</Button>
			</TooltipTrigger>
			<TooltipContent side="top">Tooltip at the top</TooltipContent>
		</Tooltip>
	),
};

export const SideRight: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Right</Button>
			</TooltipTrigger>
			<TooltipContent side="right">Tooltip on the right</TooltipContent>
		</Tooltip>
	),
};

export const SideBottom: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Bottom</Button>
			</TooltipTrigger>
			<TooltipContent side="bottom">Tooltip at the bottom</TooltipContent>
		</Tooltip>
	),
};

export const SideLeft: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Left</Button>
			</TooltipTrigger>
			<TooltipContent side="left">Tooltip on the left</TooltipContent>
		</Tooltip>
	),
};

// ─── Multiple ────────────────────────────────────────────────────────────────

export const Multiple: Story = {
	render: () => (
		<div className="flex gap-2">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="outline">Button 1</Button>
				</TooltipTrigger>
				<TooltipContent>First tooltip</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="outline">Button 2</Button>
				</TooltipTrigger>
				<TooltipContent>Second tooltip</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="outline">Button 3</Button>
				</TooltipTrigger>
				<TooltipContent>Third tooltip</TooltipContent>
			</Tooltip>
		</div>
	),
};
