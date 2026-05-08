import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
	it("renders a scroll area container", () => {
		render(
			<ScrollArea data-testid="scroll-area">
				<div>Content</div>
			</ScrollArea>,
		);
		expect(screen.getByTestId("scroll-area")).toBeInTheDocument();
	});

	it("renders children content", () => {
		render(
			<ScrollArea>
				<div>Test Content</div>
			</ScrollArea>,
		);
		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("applies correct container classes", () => {
		render(
			<ScrollArea data-testid="scroll-area">
				<div>Content</div>
			</ScrollArea>,
		);
		const scrollArea = screen.getByTestId("scroll-area");
		expect(scrollArea).toHaveClass("relative");
	});

	it("merges custom className", () => {
		render(
			<ScrollArea className="custom-class" data-testid="scroll-area">
				<div>Content</div>
			</ScrollArea>,
		);
		const scrollArea = screen.getByTestId("scroll-area");
		expect(scrollArea).toHaveClass("custom-class");
		expect(scrollArea).toHaveClass("relative");
	});
});
