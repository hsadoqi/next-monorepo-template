import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

const meta = {
	title: "UI/ScrollArea",
	component: ScrollArea,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Vertical: Story = {
	render: () => {
		const items = Array.from({ length: 50 }).map((_, i) => ({
			id: `item-${i + 1}`,
			label: `Item ${i + 1}`,
		}));

		return (
			<ScrollArea className="h-72 w-48 rounded-md border p-4">
				<div className="space-y-2">
					{items.map(({ id, label }) => (
						<div key={id} className="text-sm">
							{label}
						</div>
					))}
				</div>
			</ScrollArea>
		);
	},
};

export const Horizontal: Story = {
	render: () => {
		const items = Array.from({ length: 50 }).map((_, i) => ({
			id: `item-${i + 1}`,
			label: `Item ${i + 1}`,
		}));

		return (
			<ScrollArea className="h-40 w-96 rounded-md border p-4">
				<div className="flex gap-4">
					{items.map(({ id, label }) => (
						<div
							key={id}
							className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium"
						>
							{label}
						</div>
					))}
				</div>
			</ScrollArea>
		);
	},
};

// ─── With content ────────────────────────────────────────────────────────────

export const WithLongText: Story = {
	render: () => {
		const sections = Array.from({ length: 10 }).map((_, i) => ({
			id: `section-${i + 1}`,
			title: `Section ${i + 1}`,
		}));

		return (
			<ScrollArea className="h-48 w-80 rounded-md border p-4">
				<div className="space-y-4">
					{sections.map(({ id, title }) => (
						<div key={id} className="space-y-2">
							<h4 className="font-semibold">{title}</h4>
							<p className="text-sm text-muted-foreground">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					))}
				</div>
			</ScrollArea>
		);
	},
};
