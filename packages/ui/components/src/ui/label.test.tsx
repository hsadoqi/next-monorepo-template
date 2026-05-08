import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "./label";

describe("Label", () => {
	it("renders label element", () => {
		render(<Label>Test Label</Label>);
		const label = screen.getByText("Test Label");
		expect(label).toBeInTheDocument();
		expect(label.tagName).toBe("LABEL");
	});

	it("associates with input via htmlFor", () => {
		render(
			<>
				<Label htmlFor="test-input">Email</Label>
				<input id="test-input" type="text" title="email input" />
			</>,
		);

		const label = screen.getByText("Email");
		expect(label).toHaveAttribute("for", "test-input");
	});

	it("applies correct styling classes", () => {
		render(<Label>Styled Label</Label>);
		const label = screen.getByText("Styled Label");
		expect(label).toHaveClass("flex");
		expect(label).toHaveClass("items-center");
		expect(label).toHaveClass("gap-2");
	});

	it("merges custom className", () => {
		render(<Label className="custom-style">Custom</Label>);
		const label = screen.getByText("Custom");
		expect(label).toHaveClass("custom-style");
		expect(label).toHaveClass("flex");
	});
});
