import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./separator";

describe("Separator", () => {
	it("renders a separator element", () => {
		render(<Separator data-testid="separator" />);
		expect(screen.getByTestId("separator")).toBeInTheDocument();
	});

	it("renders horizontal separator by default", () => {
		render(<Separator data-testid="separator" />);
		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "horizontal");
	});

	it("renders vertical separator when orientation is set", () => {
		render(<Separator orientation="vertical" data-testid="separator" />);
		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "vertical");
	});

	it("marks element as decorative by default", () => {
		render(<Separator data-testid="separator" />);
		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("aria-hidden", "true");
	});

	it("can override decorative attribute", () => {
		render(<Separator decorative={false} data-testid="separator" />);
		const separator = screen.getByTestId("separator");
		expect(separator).not.toHaveAttribute("aria-hidden");
	});

	it("applies correct styling", () => {
		render(<Separator data-testid="separator" />);
		const separator = screen.getByTestId("separator");
		expect(separator).toHaveClass("shrink-0");
		expect(separator).toHaveClass("bg-border");
	});
});
