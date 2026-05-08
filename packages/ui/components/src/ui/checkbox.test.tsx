import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
	test("renders correctly", () => {
		render(<Checkbox data-testid="checkbox" />);
		expect(screen.getByTestId("checkbox")).toBeInTheDocument();
	});

	test("can be checked and unchecked via user interaction", async () => {
		const user = userEvent.setup();
		render(<Checkbox data-testid="checkbox" />);
		const checkbox = screen.getByTestId("checkbox");

		expect(checkbox).toHaveAttribute("data-state", "unchecked");

		await user.click(checkbox);
		expect(checkbox).toHaveAttribute("data-state", "checked");

		await user.click(checkbox);
		expect(checkbox).toHaveAttribute("data-state", "unchecked");
	});

	test("respects disabled state", async () => {
		const user = userEvent.setup();
		render(<Checkbox disabled data-testid="checkbox" />);
		const checkbox = screen.getByTestId("checkbox");

		expect(checkbox).toBeDisabled();

		await user.click(checkbox);
		expect(checkbox).toHaveAttribute("data-state", "unchecked");
	});

	test("works with a label", async () => {
		const user = userEvent.setup();
		render(
			<div className="flex items-center space-x-2">
				<Checkbox id="terms" />
				<label htmlFor="terms">Accept terms and conditions</label>
			</div>,
		);

		const label = screen.getByText("Accept terms and conditions");
		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).toHaveAttribute("data-state", "unchecked");

		await user.click(label);
		expect(checkbox).toHaveAttribute("data-state", "checked");
	});
});
