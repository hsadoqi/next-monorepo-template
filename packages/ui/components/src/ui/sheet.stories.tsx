import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

const meta = {
	title: "UI/Sheet",
	component: Sheet,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open Sheet</Button>
			</SheetTrigger>
			<SheetContent
				title="Sheet Title"
				description="Make changes to your settings here. Click save when you're done."
			>
				<div className="py-4">Sheet content goes here</div>
			</SheetContent>
		</Sheet>
	),
};

// ─── Sides ───────────────────────────────────────────────────────────────────

export const FromRight: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">From Right</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				title="From Right Side"
				description="This sheet slides in from the right."
			>
				<div className="py-4">This sheet slides in from the right</div>
			</SheetContent>
		</Sheet>
	),
};

export const FromLeft: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">From Left</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				title="From Left Side"
				description="This sheet slides in from the left."
			>
				<div className="py-4">This sheet slides in from the left</div>
			</SheetContent>
		</Sheet>
	),
};

export const FromTop: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">From Top</Button>
			</SheetTrigger>
			<SheetContent
				side="top"
				title="From Top Side"
				description="This sheet slides in from the top."
			>
				<div className="py-4">This sheet slides in from the top</div>
			</SheetContent>
		</Sheet>
	),
};

export const FromBottom: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">From Bottom</Button>
			</SheetTrigger>
			<SheetContent
				side="bottom"
				title="From Bottom Side"
				description="This sheet slides in from the bottom."
			>
				<div className="py-4">This sheet slides in from the bottom</div>
			</SheetContent>
		</Sheet>
	),
};
