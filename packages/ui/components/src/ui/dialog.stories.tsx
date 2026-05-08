import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";

const meta = {
	title: "UI/Dialog",
	component: Dialog,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Open Dialog</Button>
			</DialogTrigger>
			<DialogContent title="Dialog Title" description="This is the dialog description">
				<div className="py-4">Dialog content goes here</div>
				<div className="flex justify-end gap-2">
					<Button variant="outline">Cancel</Button>
					<Button>Confirm</Button>
				</div>
			</DialogContent>
		</Dialog>
	),
};

// ─── With form ───────────────────────────────────────────────────────────────

export const WithForm: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create New</Button>
			</DialogTrigger>
			<DialogContent title="Create New Item" description="Enter the details for the new item">
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<label htmlFor="form-name" className="text-sm font-medium">
							Name
						</label>
						<input
							id="form-name"
							type="text"
							placeholder="Enter name"
							className="w-full rounded border border-input px-3 py-2"
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="form-desc" className="text-sm font-medium">
							Description
						</label>
						<textarea
							id="form-desc"
							placeholder="Enter description"
							className="w-full rounded border border-input px-3 py-2"
						/>
					</div>
				</div>
				<div className="flex justify-end gap-2">
					<Button variant="outline">Cancel</Button>
					<Button>Create</Button>
				</div>
			</DialogContent>
		</Dialog>
	),
};

// ─── Confirmation ────────────────────────────────────────────────────────────

export const Confirmation: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive">Delete Item</Button>
			</DialogTrigger>
			<DialogContent title="Confirm Deletion" description="This action cannot be undone.">
				<div className="py-4">Are you sure you want to delete this item?</div>
				<div className="flex justify-end gap-2">
					<Button variant="outline">Cancel</Button>
					<Button variant="destructive">Delete</Button>
				</div>
			</DialogContent>
		</Dialog>
	),
};
