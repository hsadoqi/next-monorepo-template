import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Toggle } from "./toggle";

describe("Toggle", () => {
	test("renders correctly", () => {
		render(<Toggle data-testid="toggle">Toggle me</Toggle>);
		expect(screen.getByTestId("toggle")).toBeInTheDocument();
		expect(screen.getByText("Toggle me")).toBeInTheDocument();
	});

	test("toggles pressed state on click", async () => {
		const user = userEvent.setup();
		render(<Toggle data-testid="toggle">Toggle</Toggle>);
		const toggle = screen.getByTestId("toggle");

		expect(toggle).toHaveAttribute("data-state", "off");

		await user.click(toggle);
		expect(toggle).toHaveAttribute("data-state", "on");

		await user.click(toggle);
		expect(toggle).toHaveAttribute("data-state", "off");
	});

	test("supports disabled state", async () => {
		const user = userEvent.setup();
		render(
			<Toggle disabled data-testid="toggle">
				Disabled
			</Toggle>,
		);
		const toggle = screen.getByTestId("toggle");

		expect(toggle).toBeDisabled();

		await user.click(toggle);
		expect(toggle).toHaveAttribute("data-state", "off");
	});

	test("supports both variants", () => {
		const { rerender } = render(
			<Toggle variant="default" data-testid="toggle">
				Default
			</Toggle>,
		);
		let toggle = screen.getByTestId("toggle");
		expect(toggle).toBeInTheDocument();

		rerender(
			<Toggle variant="outline" data-testid="toggle">
				Outline
			</Toggle>,
		);
		toggle = screen.getByTestId("toggle");
		expect(toggle).toBeInTheDocument();
	});

	test("supports all size variants", () => {
		const { rerender } = render(
			<Toggle size="sm" data-testid="toggle">
				Sm
			</Toggle>,
		);
		let toggle = screen.getByTestId("toggle");
		expect(toggle).toBeInTheDocument();

		rerender(
			<Toggle size="default" data-testid="toggle">
				Default
			</Toggle>,
		);
		toggle = screen.getByTestId("toggle");
		expect(toggle).toBeInTheDocument();

		rerender(
			<Toggle size="lg" data-testid="toggle">
				Lg
			</Toggle>,
		);
		toggle = screen.getByTestId("toggle");
		expect(toggle).toBeInTheDocument();
	});

	test("supports keyboard interaction", async () => {
		const user = userEvent.setup();
		render(<Toggle data-testid="toggle">Toggle</Toggle>);
		const toggle = screen.getByTestId("toggle");

		await user.tab();
		expect(toggle).toHaveFocus();

		await user.keyboard("[Space]");
		expect(toggle).toHaveAttribute("data-state", "on");
	});

	test("renders with aria-label", () => {
		render(
			<Toggle aria-label="Bold">
				<span>B</span>
			</Toggle>,
		);
		expect(screen.getByLabelText("Bold")).toBeInTheDocument();
	});
});
