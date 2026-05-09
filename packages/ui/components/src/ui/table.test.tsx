import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

describe("Table", () => {
	it("renders table structure correctly", () => {
		render(
			<Table data-testid="table">
				<TableHeader>
					<TableRow>
						<TableHead>Header</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Cell</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);

		const table = screen.getByTestId("table");
		expect(table.tagName).toBe("TABLE");
	});

	it("renders table caption", () => {
		render(
			<Table>
				<TableCaption>Users List</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>John</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);

		const caption = screen.getByText("Users List");
		expect(caption).toBeInTheDocument();
		expect(caption.tagName).toBe("CAPTION");
	});

	it("renders semantic table header", () => {
		render(
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead data-testid="header-cell">Email</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>user@example.com</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);

		const headerCell = screen.getByTestId("header-cell");
		expect(headerCell.tagName).toBe("TH");
	});

	it("renders table rows and cells", () => {
		render(
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Age</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Alice</TableCell>
						<TableCell>28</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Bob</TableCell>
						<TableCell>32</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);

		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
		expect(screen.getByText("28")).toBeInTheDocument();
		expect(screen.getByText("32")).toBeInTheDocument();
	});

	it("renders body cells as td elements", () => {
		render(
			<Table>
				<TableBody>
					<TableRow>
						<TableCell data-testid="body-cell">Data</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);

		const bodyCell = screen.getByTestId("body-cell");
		expect(bodyCell.tagName).toBe("TD");
	});

	it("supports custom className on table", () => {
		render(
			<Table data-testid="table" className="border-collapse">
				<TableBody>
					<TableRow>
						<TableCell>Cell</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);

		const table = screen.getByTestId("table");
		expect(table).toHaveClass("border-collapse");
	});

	it("supports custom className on rows and cells", () => {
		render(
			<Table>
				<TableBody>
					<TableRow data-testid="row" className="hover:bg-gray-100">
						<TableCell data-testid="cell" className="text-bold">
							Content
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);

		const row = screen.getByTestId("row");
		const cell = screen.getByTestId("cell");

		expect(row).toHaveClass("hover:bg-gray-100");
		expect(cell).toHaveClass("text-bold");
	});

	it("renders multiple rows and columns", () => {
		const data = [
			{ name: "Alice", email: "alice@test.com", role: "Admin" },
			{ name: "Bob", email: "bob@test.com", role: "User" },
			{ name: "Charlie", email: "charlie@test.com", role: "User" },
		];

		render(
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row) => (
						<TableRow key={row.email}>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.email}</TableCell>
							<TableCell>{row.role}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>,
		);

		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
		expect(screen.getByText("Charlie")).toBeInTheDocument();
		expect(screen.getByText("alice@test.com")).toBeInTheDocument();
	});
});
