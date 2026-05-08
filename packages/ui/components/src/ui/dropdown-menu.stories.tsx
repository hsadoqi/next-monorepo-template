import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./dropdown-menu";

const meta = {
	title: "UI/DropdownMenu",
	component: DropdownMenu,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Open Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Duplicate</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

// ─── With icons ──────────────────────────────────────────────────────────────

export const WithIcons: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Profile</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Help & Feedback</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

// ─── Disabled items ──────────────────────────────────────────────────────────

export const DisabledItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Options</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Enabled</DropdownMenuItem>
				<DropdownMenuItem disabled>Disabled</DropdownMenuItem>
				<DropdownMenuItem>Another enabled</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};
