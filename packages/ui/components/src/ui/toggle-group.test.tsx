import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("ToggleGroup", () => {
	test("renders correctly", () => {
		render(
			<ToggleGroup data-testid="toggle-group" type="single">
				<ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
				<ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
			</ToggleGroup>,
		);

		expect(screen.getByTestId("toggle-group")).toBeInTheDocument();
		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
	});

	test("single selection allows only one item to be selected", async () => {
		const user = userEvent.setup();
		render(
			<ToggleGroup type="single" data-testid="toggle-group">
				<ToggleGroupItem value="item1" data-testid="item1">
					Item 1
				</ToggleGroupItem>
				<ToggleGroupItem value="item2" data-testid="item2">
					Item 2
				</ToggleGroupItem>
			</ToggleGroup>,
		);

		const item1 = screen.getByTestId("item1");
		const item2 = screen.getByTestId("item2");

		await user.click(item1);
		expect(item1).toHaveAttribute("data-state", "on");
		expect(item2).toHaveAttribute("data-state", "off");

		await user.click(item2);
		expect(item1).toHaveAttribute("data-state", "off");
		expect(item2).toHaveAttribute("data-state", "on");
	});

	test("multiple selection allows multiple items to be selected", async () => {
		const user = userEvent.setup();
		render(
			<ToggleGroup type="multiple" data-testid="toggle-group">
				<ToggleGroupItem value="item1" data-testid="item1">
					Item 1
				</ToggleGroupItem>
				<ToggleGroupItem value="item2" data-testid="item2">
					Item 2
				</ToggleGroupItem>
				<ToggleGroupItem value="item3" data-testid="item3">
					Item 3
				</ToggleGroupItem>
			</ToggleGroup>,
		);

		const item1 = screen.getByTestId("item1");
		const item2 = screen.getByTestId("item2");
		const item3 = screen.getByTestId("item3");

		await user.click(item1);
		expect(item1).toHaveAttribute("data-state", "on");

		await user.click(item2);
		expect(item1).toHaveAttribute("data-state", "on");
		expect(item2).toHaveAttribute("data-state", "on");

		await user.click(item3);
		expect(item1).toHaveAttribute("data-state", "on");
		expect(item2).toHaveAttribute("data-state", "on");
		expect(item3).toHaveAttribute("data-state", "on");
	});

	test("supports default values", () => {
		render(
			<ToggleGroup type="single" defaultValue="item2" data-testid="toggle-group">
				<ToggleGroupItem value="item1" data-testid="item1">
					Item 1
				</ToggleGroupItem>
				<ToggleGroupItem value="item2" data-testid="item2">
					Item 2
				</ToggleGroupItem>
			</ToggleGroup>,
		);

		expect(screen.getByTestId("item1")).toHaveAttribute("data-state", "off");
		expect(screen.getByTestId("item2")).toHaveAttribute("data-state", "on");
	});

	test("respects disabled state on group", () => {
		render(
			<ToggleGroup type="single" disabled data-testid="toggle-group">
				<ToggleGroupItem value="item1" data-testid="item1">
					Item 1
				</ToggleGroupItem>
				<ToggleGroupItem value="item2" data-testid="item2">
					Item 2
				</ToggleGroupItem>
			</ToggleGroup>,
		);

		expect(screen.getByTestId("item1")).toBeDisabled();
		expect(screen.getByTestId("item2")).toBeDisabled();
	});

	test("respects disabled state on individual items", async () => {
		const user = userEvent.setup();
		render(
			<ToggleGroup type="single" data-testid="toggle-group">
				<ToggleGroupItem value="item1" data-testid="item1">
					Item 1
				</ToggleGroupItem>
				<ToggleGroupItem value="item2" data-testid="item2" disabled>
					Item 2
				</ToggleGroupItem>
			</ToggleGroup>,
		);

		const item2 = screen.getByTestId("item2");
		expect(item2).toBeDisabled();

		await user.click(item2);
		expect(item2).toHaveAttribute("data-state", "off");
	});

	test("keyboard navigation works", async () => {
		const user = userEvent.setup();
		render(
			<ToggleGroup type="single" data-testid="toggle-group">
				<ToggleGroupItem value="item1" data-testid="item1">
					Item 1
				</ToggleGroupItem>
				<ToggleGroupItem value="item2" data-testid="item2">
					Item 2
				</ToggleGroupItem>
			</ToggleGroup>,
		);

		const item1 = screen.getByTestId("item1");

		await user.tab();
		expect(item1).toHaveFocus();

		await user.keyboard("[Space]");
		expect(item1).toHaveAttribute("data-state", "on");
	});
});
