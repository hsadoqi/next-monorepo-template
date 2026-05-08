import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

describe("Select", () => {
	it("renders select component", () => {
		render(
			<Select>
				<SelectTrigger data-testid="select-trigger">
					<SelectValue placeholder="Choose..." />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">Option 1</SelectItem>
				</SelectContent>
			</Select>,
		);
		expect(screen.getByTestId("select-trigger")).toBeInTheDocument();
	});

	it("displays placeholder when no value selected", () => {
		render(
			<Select>
				<SelectTrigger data-testid="select-trigger">
					<SelectValue placeholder="Select an option" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">Option 1</SelectItem>
				</SelectContent>
			</Select>,
		);
		expect(screen.getByText("Select an option")).toBeInTheDocument();
	});

	it("accepts disabled prop", () => {
		render(
			<Select disabled>
				<SelectTrigger data-testid="select-trigger">
					<SelectValue placeholder="Choose..." />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">Option 1</SelectItem>
				</SelectContent>
			</Select>,
		);
		const trigger = screen.getByTestId("select-trigger");
		expect(trigger).toHaveAttribute("disabled");
	});

	it("renders select items", () => {
		render(
			<Select>
				<SelectTrigger data-testid="select-trigger">
					<SelectValue placeholder="Choose..." />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">Option 1</SelectItem>
					<SelectItem value="2">Option 2</SelectItem>
					<SelectItem value="3">Option 3</SelectItem>
				</SelectContent>
			</Select>,
		);
		expect(screen.getByTestId("select-trigger")).toBeInTheDocument();
	});
});
