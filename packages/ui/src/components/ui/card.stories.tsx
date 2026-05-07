import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Input } from "./input";

const meta = {
	title: "UI/Card",
	component: Card,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => (
		<Card className="w-80">
			<CardContent className="pt-6">A plain card with content.</CardContent>
		</Card>
	),
};

export const WithHeader: Story = {
	render: () => (
		<Card className="w-80">
			<CardHeader>
				<CardTitle>Card title</CardTitle>
				<CardDescription>Supplementary description for the card.</CardDescription>
			</CardHeader>
			<CardContent>Main content area.</CardContent>
		</Card>
	),
};

// ─── With actions ─────────────────────────────────────────────────────────────

export const WithFooterActions: Story = {
	render: () => (
		<Card className="w-80">
			<CardHeader>
				<CardTitle>Confirm deletion</CardTitle>
				<CardDescription>This action cannot be undone.</CardDescription>
			</CardHeader>
			<CardContent>All associated data will be permanently removed from our servers.</CardContent>
			<CardFooter className="gap-2">
				<Button variant="outline" className="flex-1">
					Cancel
				</Button>
				<Button variant="destructive" className="flex-1">
					Delete
				</Button>
			</CardFooter>
		</Card>
	),
};

// ─── Form composition ─────────────────────────────────────────────────────────

export const LoginForm: Story = {
	render: () => (
		<Card className="w-96">
			<CardHeader>
				<CardTitle>Sign in</CardTitle>
				<CardDescription>Enter your credentials to access your account.</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="flex flex-col gap-1.5">
					<label htmlFor="card-email" className="text-sm font-medium">
						Email
					</label>
					<Input id="card-email" type="email" placeholder="name@example.com" />
				</div>
				<div className="flex flex-col gap-1.5">
					<label htmlFor="card-password" className="text-sm font-medium">
						Password
					</label>
					<Input id="card-password" type="password" placeholder="••••••••" />
				</div>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button className="w-full">Sign in</Button>
				<Button variant="outline" className="w-full">
					Continue with Google
				</Button>
			</CardFooter>
		</Card>
	),
};

// ─── Notification card ────────────────────────────────────────────────────────

export const Notification: Story = {
	render: () => (
		<Card className="w-80" role="alert" aria-live="polite">
			<CardHeader>
				<CardTitle>Your report is ready</CardTitle>
				<CardDescription>May 7, 2026 — 3 minutes ago</CardDescription>
			</CardHeader>
			<CardContent className="text-sm text-muted-foreground">
				The Q1 performance report has been generated and is ready to download.
			</CardContent>
			<CardFooter>
				<Button variant="secondary" size="sm">
					Download
				</Button>
			</CardFooter>
		</Card>
	),
};
