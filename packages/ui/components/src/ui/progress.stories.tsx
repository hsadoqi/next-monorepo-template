import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta = {
	title: "UI/Progress",
	component: Progress,
	tags: ["autodocs"],
	args: {
		value: 65,
		"aria-label": "Progress",
	},
	argTypes: {
		value: {
			control: { type: "range", min: 0, max: 100 },
			description: "Progress value (0-100)",
		},
	},
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const Empty: Story = {
	args: { value: 0 },
};

export const Half: Story = {
	args: { value: 50 },
};

export const Complete: Story = {
	args: { value: 100 },
};

// ─── Overviews ───────────────────────────────────────────────────────────────

export const AllValues: Story = {
	render: () => (
		<div className="w-96 space-y-4">
			<div className="space-y-2">
				<p className="text-sm font-medium">0%</p>
				<Progress value={0} aria-label="0% progress" />
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium">25%</p>
				<Progress value={25} aria-label="25% progress" />
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium">50%</p>
				<Progress value={50} aria-label="50% progress" />
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium">75%</p>
				<Progress value={75} aria-label="75% progress" />
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium">100%</p>
				<Progress value={100} aria-label="100% progress" />
			</div>
		</div>
	),
};
