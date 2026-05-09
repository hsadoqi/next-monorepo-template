import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
	it("renders with correct content", () => {
		render(<Badge>Test Badge</Badge>);
		expect(screen.getByText("Test Badge")).toBeInTheDocument();
	});

	it("applies correct variant classes", () => {
		const { rerender } = render(<Badge variant="default">Default</Badge>);
		let badge = screen.getByText("Default");
		expect(badge).toHaveClass("bg-primary");

		rerender(<Badge variant="secondary">Secondary</Badge>);
		badge = screen.getByText("Secondary");
		expect(badge).toHaveClass("bg-secondary");

		rerender(<Badge variant="destructive">Destructive</Badge>);
		badge = screen.getByText("Destructive");
		expect(badge).toHaveClass("bg-destructive");
	});

	it("merges custom className", () => {
		render(<Badge className="custom-class">Custom</Badge>);
		const badge = screen.getByText("Custom");
		expect(badge).toHaveClass("custom-class");
		expect(badge).toHaveClass("inline-flex");
	});
});
