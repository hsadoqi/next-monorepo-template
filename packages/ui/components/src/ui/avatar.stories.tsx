import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
	title: "UI/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	),
};

export const WithInitials: Story = {
	render: () => (
		<Avatar>
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	),
};

export const WithBrokenImage: Story = {
	render: () => (
		<Avatar>
			<AvatarImage src="https://broken-url.com/image.png" alt="broken" />
			<AvatarFallback>BK</AvatarFallback>
		</Avatar>
	),
};

export const Multiple: Story = {
	render: () => (
		<div className="flex -space-x-2">
			{[
				{ src: "https://github.com/shadcn.png", initials: "SC" },
				{ src: "https://github.com/vercel.png", initials: "VL" },
				{ src: "https://github.com/nextjs.png", initials: "NJ" },
			].map((user) => (
				<Avatar key={user.src} className="border-2 border-background">
					<AvatarImage src={user.src} />
					<AvatarFallback>{user.initials}</AvatarFallback>
				</Avatar>
			))}
		</div>
	),
};

export const InUserCard: Story = {
	render: () => (
		<div className="flex items-center gap-4 rounded-lg border border-border p-4">
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold">Sarah Chen</p>
				<p className="text-sm text-muted-foreground">Product Designer</p>
			</div>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<Avatar className="size-8">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback className="text-xs">SM</AvatarFallback>
			</Avatar>
			<Avatar className="size-10">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>MD</AvatarFallback>
			</Avatar>
			<Avatar className="size-12">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>LG</AvatarFallback>
			</Avatar>
			<Avatar className="size-16">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback className="text-lg">XL</AvatarFallback>
			</Avatar>
		</div>
	),
};
