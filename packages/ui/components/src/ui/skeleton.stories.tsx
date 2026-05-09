import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta = {
	title: "UI/Skeleton",
	component: Skeleton,
	tags: ["autodocs"],
	args: {
		className: "h-12 w-full rounded-md",
	},
	argTypes: {
		className: {
			control: "text",
			description: "Additional CSS classes for sizing and styling",
			table: { defaultValue: { summary: "h-12 w-full rounded-md" } },
		},
	},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const CircleAvatar: Story = {
	args: {
		className: "size-12 rounded-full",
	},
};

export const Text: Story = {
	args: {
		className: "h-4 w-full rounded-md",
	},
};

export const TextShort: Story = {
	args: {
		className: "h-4 w-2/3 rounded-md",
	},
};

// ─── Layouts ─────────────────────────────────────────────────────────────────

export const Card: Story = {
	render: () => (
		<div className="space-y-4 rounded-lg border border-border p-4">
			<Skeleton className="h-6 w-1/2 rounded-md" />
			<Skeleton className="h-4 w-full rounded-md" />
			<Skeleton className="h-4 w-5/6 rounded-md" />
		</div>
	),
};

export const UserProfile: Story = {
	render: () => (
		<div className="flex items-center space-x-4">
			<Skeleton className="size-12 rounded-full" />
			<div className="flex-1 space-y-2">
				<Skeleton className="h-4 w-40 rounded-md" />
				<Skeleton className="h-3 w-32 rounded-md" />
			</div>
		</div>
	),
};

export const ListWithThreeItems: Story = {
	render: () => (
		<div className="space-y-3">
			{[1, 2, 3].map((i) => (
				<div key={i} className="flex items-center space-x-3">
					<Skeleton className="size-10 rounded-full" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-20 rounded-md" />
						<Skeleton className="h-3 w-16 rounded-md" />
					</div>
				</div>
			))}
		</div>
	),
};

export const Article: Story = {
	render: () => (
		<div className="space-y-4">
			<Skeleton className="h-8 w-3/4 rounded-md" />
			<Skeleton className="h-4 w-1/4 rounded-md" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-full rounded-md" />
				<Skeleton className="h-4 w-full rounded-md" />
				<Skeleton className="h-4 w-5/6 rounded-md" />
			</div>
		</div>
	),
};
