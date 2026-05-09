import type { Meta, StoryObj } from "@storybook/react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

const meta = {
	title: "UI/Table",
	component: Table,
	tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "User",
		status: "Active",
	},
	{
		id: "3",
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "User",
		status: "Inactive",
	},
	{
		id: "4",
		name: "Alice Williams",
		email: "alice@example.com",
		role: "Editor",
		status: "Active",
	},
];

export const Default: Story = {
	render: () => (
		<Table>
			<TableCaption>A list of recent users.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{sampleData.map((user) => (
					<TableRow key={user.id}>
						<TableCell className="font-medium">{user.name}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.role}</TableCell>
						<TableCell>
							<span
								className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
									user.status === "Active"
										? "bg-green-100 text-green-800"
										: "bg-gray-100 text-gray-800"
								}`}
							>
								{user.status}
							</span>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

export const WithoutCaption: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Product</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Stock</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Laptop</TableCell>
					<TableCell>$999</TableCell>
					<TableCell>15</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Mouse</TableCell>
					<TableCell>$29</TableCell>
					<TableCell>150</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Keyboard</TableCell>
					<TableCell>$79</TableCell>
					<TableCell>50</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};

export const Compact: Story = {
	render: () => (
		<Table className="text-sm">
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Updated</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>#12345</TableCell>
					<TableCell>Completed</TableCell>
					<TableCell>2 hours ago</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>#12346</TableCell>
					<TableCell>In Progress</TableCell>
					<TableCell>5 minutes ago</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>#12347</TableCell>
					<TableCell>Pending</TableCell>
					<TableCell>1 day ago</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};

export const WithHovering: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow className="hover:bg-muted/50 cursor-pointer">
					<TableCell>INV001</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
				<TableRow className="hover:bg-muted/50 cursor-pointer">
					<TableCell>INV002</TableCell>
					<TableCell>Pending</TableCell>
					<TableCell>PayPal</TableCell>
					<TableCell className="text-right">$1,800.00</TableCell>
				</TableRow>
				<TableRow className="hover:bg-muted/50 cursor-pointer">
					<TableCell>INV003</TableCell>
					<TableCell>Unpaid</TableCell>
					<TableCell>Bank Transfer</TableCell>
					<TableCell className="text-right">$3,100.00</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};

export const Striped: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Feature</TableHead>
					<TableHead>Free</TableHead>
					<TableHead>Pro</TableHead>
					<TableHead>Enterprise</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{[
					{ feature: "Basic Support", free: "✓", pro: "✓", enterprise: "✓" },
					{ feature: "Advanced Analytics", free: "✗", pro: "✓", enterprise: "✓" },
					{
						feature: "Custom Integrations",
						free: "✗",
						pro: "✗",
						enterprise: "✓",
					},
					{ feature: "API Access", free: "✗", pro: "✓", enterprise: "✓" },
				].map((row, idx) => (
					<TableRow key={row.feature} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
						<TableCell className="font-medium">{row.feature}</TableCell>
						<TableCell>{row.free}</TableCell>
						<TableCell>{row.pro}</TableCell>
						<TableCell>{row.enterprise}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};
