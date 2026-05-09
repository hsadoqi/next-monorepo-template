import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTrigger,
} from "./alert-dialog";

const meta = {
	title: "UI/AlertDialog",
	component: AlertDialog,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">Open Alert</Button>
			</AlertDialogTrigger>
			<AlertDialogContent
				title="Are you sure?"
				description="This action cannot be undone. Please confirm before proceeding."
			>
				<div className="flex justify-end gap-2">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Confirm</AlertDialogAction>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	),
};

// ─── Delete confirmation ─────────────────────────────────────────────────────

export const DeleteConfirmation: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">Delete Account</Button>
			</AlertDialogTrigger>
			<AlertDialogContent
				title="Delete Account?"
				description="This will permanently delete your account and all associated data. This action cannot be undone."
			>
				<div className="flex justify-end gap-2">
					<AlertDialogCancel>Keep Account</AlertDialogCancel>
					<AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
						Delete Account
					</AlertDialogAction>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	),
};

// ─── Warning ─────────────────────────────────────────────────────────────────

export const Warning: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">Show Warning</Button>
			</AlertDialogTrigger>
			<AlertDialogContent
				title="Warning"
				description="This operation will affect multiple items. Are you sure you want to proceed?"
			>
				<div className="flex justify-end gap-2">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Proceed</AlertDialogAction>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	),
};
