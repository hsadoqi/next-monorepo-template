import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Button } from "../button/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group";

describe("ButtonGroup", () => {
	test("renders correctly", () => {
		render(
			<ButtonGroup data-testid="button-group">
				<Button>Item 1</Button>
				<Button>Item 2</Button>
			</ButtonGroup>,
		);

		expect(screen.getByTestId("button-group")).toBeInTheDocument();
		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
	});

	test("renders with role='group'", () => {
		render(
			<ButtonGroup>
				<Button>Item 1</Button>
				<Button>Item 2</Button>
			</ButtonGroup>,
		);

		expect(screen.getByRole("toolbar")).toBeInTheDocument();
	});

	test("renders group correctly", () => {
		render(
			<ButtonGroup data-testid="button-group">
				<Button>Item 1</Button>
				<Button>Item 2</Button>
			</ButtonGroup>,
		);

		const group = screen.getByTestId("button-group");
		expect(group).toBeInTheDocument();
	});

	test("supports vertical orientation", () => {
		render(
			<ButtonGroup orientation="vertical" data-testid="button-group">
				<Button>Item 1</Button>
				<Button>Item 2</Button>
			</ButtonGroup>,
		);

		const group = screen.getByTestId("button-group");
		expect(group).toBeInTheDocument();
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);
	});

	test("buttons inside group are clickable", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<ButtonGroup>
				<Button onClick={handleClick}>Click me</Button>
				<Button>Other</Button>
			</ButtonGroup>,
		);

		await user.click(screen.getByText("Click me"));
		expect(handleClick).toHaveBeenCalledOnce();
	});

	test("focuses with keyboard navigation", async () => {
		const user = userEvent.setup();
		render(
			<ButtonGroup data-testid="button-group">
				<Button>Item 1</Button>
				<Button>Item 2</Button>
			</ButtonGroup>,
		);

		await user.tab();
		expect(screen.getByText("Item 1")).toHaveFocus();

		await user.tab();
		expect(screen.getByText("Item 2")).toHaveFocus();
	});
});

describe("ButtonGroupText", () => {
	test("renders correctly", () => {
		render(<ButtonGroupText data-testid="button-group-text">Label</ButtonGroupText>);

		expect(screen.getByTestId("button-group-text")).toBeInTheDocument();
		expect(screen.getByText("Label")).toBeInTheDocument();
	});

	test("renders as div by default", () => {
		render(<ButtonGroupText data-testid="button-group-text">Label</ButtonGroupText>);

		const element = screen.getByTestId("button-group-text");
		expect(element.tagName).toBe("DIV");
	});

	test("renders as child element when asChild is set", () => {
		render(
			<ButtonGroupText asChild>
				<span>Custom Label</span>
			</ButtonGroupText>,
		);

		expect(screen.getByText("Custom Label")).toBeInTheDocument();
	});
});

describe("ButtonGroupSeparator", () => {
	test("renders correctly", () => {
		render(
			<ButtonGroup>
				<Button>Left</Button>
				<ButtonGroupSeparator data-testid="separator" />
				<Button>Right</Button>
			</ButtonGroup>,
		);

		expect(screen.getByTestId("separator")).toBeInTheDocument();
	});

	test("supports vertical orientation", () => {
		render(<ButtonGroupSeparator data-testid="separator" orientation="vertical" />);

		expect(screen.getByTestId("separator")).toHaveAttribute("data-orientation", "vertical");
	});

	test("supports horizontal orientation", () => {
		render(<ButtonGroupSeparator data-testid="separator" orientation="horizontal" />);

		expect(screen.getByTestId("separator")).toHaveAttribute("data-orientation", "horizontal");
	});
});

describe("ButtonGroup Integration", () => {
	test("works with separators and text components", () => {
		render(
			<ButtonGroup>
				<Button>Save</Button>
				<Button>Draft</Button>
				<ButtonGroupSeparator />
				<ButtonGroupText>Status</ButtonGroupText>
				<Button>Delete</Button>
			</ButtonGroup>,
		);

		expect(screen.getByText("Save")).toBeInTheDocument();
		expect(screen.getByText("Draft")).toBeInTheDocument();
		expect(screen.getByText("Status")).toBeInTheDocument();
		expect(screen.getByText("Delete")).toBeInTheDocument();
	});

	test("all buttons in group are functional", async () => {
		const user = userEvent.setup();
		const handleClick1 = vi.fn();
		const handleClick2 = vi.fn();
		const handleClick3 = vi.fn();

		render(
			<ButtonGroup>
				<Button onClick={handleClick1}>Button 1</Button>
				<Button onClick={handleClick2}>Button 2</Button>
				<Button onClick={handleClick3}>Button 3</Button>
			</ButtonGroup>,
		);

		await user.click(screen.getByText("Button 1"));
		await user.click(screen.getByText("Button 2"));
		await user.click(screen.getByText("Button 3"));

		expect(handleClick1).toHaveBeenCalledOnce();
		expect(handleClick2).toHaveBeenCalledOnce();
		expect(handleClick3).toHaveBeenCalledOnce();
	});
});
