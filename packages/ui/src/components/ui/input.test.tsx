import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "./input";

describe("Input", () => {
	it("renders an accessible textbox", () => {
		render(<Input aria-label="Email" type="email" placeholder="name@example.com" />);

		const input = screen.getByRole("textbox", { name: "Email" });
		expect(input).toHaveAttribute("type", "email");
		expect(input).toHaveAttribute("placeholder", "name@example.com");
		expect(input).toHaveClass("border-input", "focus-visible:ring-ring/20");
	});

	it("accepts typed input", async () => {
		const user = userEvent.setup();
		render(<Input aria-label="Search" type="search" />);

		const input = screen.getByRole("searchbox", { name: "Search" });
		await user.type(input, "portfolio");

		expect(input).toHaveValue("portfolio");
	});

	it("supports disabled and invalid states", () => {
		render(<Input aria-label="Username" aria-invalid="true" disabled />);

		const input = screen.getByLabelText("Username");
		expect(input).toBeDisabled();
		expect(input).toHaveAttribute("aria-invalid", "true");
		expect(input).toHaveClass("aria-invalid:border-destructive");
	});
});
