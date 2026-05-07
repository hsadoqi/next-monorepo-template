import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "./input";

describe("Input", () => {
	it("renders an accessible textbox", () => {
		render(<Input aria-label="Email" type="email" placeholder="name@example.com" />);

		const input = screen.getByRole("textbox", { name: "Email" });
		expect(input).toHaveProperty("type", "email");
		expect(input).toHaveProperty("placeholder", "name@example.com");
		expect(input).toHaveClass("border-input");
		expect(input).toHaveClass("focus-visible:ring-ring/20");
	});

	it("accepts typed input", async () => {
		const user = userEvent.setup();
		render(<Input aria-label="Search" type="search" />);

		const input = screen.getByRole("searchbox", { name: "Search" }) as HTMLInputElement;
		await user.type(input, "portfolio");

		expect(input.value).toEqual("portfolio");
	});

	it("supports disabled and invalid states", () => {
		render(<Input aria-label="Username" aria-invalid="true" disabled />);

		const input = screen.getByLabelText("Username");
		expect(input).toHaveProperty("disabled", true);
		expect(input).toHaveAttribute("aria-invalid", "true");
		expect(input).toHaveClass("aria-invalid:border-destructive");
	});
});
