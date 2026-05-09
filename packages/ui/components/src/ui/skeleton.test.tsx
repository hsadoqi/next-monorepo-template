import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
	it("renders correctly with default styling", () => {
		render(<Skeleton data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");

		expect(skeleton).toBeInTheDocument();
		expect(skeleton).toHaveClass("animate-pulse");
		expect(skeleton).toHaveClass("bg-accent");
		expect(skeleton).toHaveClass("rounded-md");
	});

	it("applies custom className while preserving core styles", () => {
		const customClass = "h-12 w-full";
		render(<Skeleton data-testid="skeleton" className={customClass} />);
		const skeleton = screen.getByTestId("skeleton");

		expect(skeleton).toHaveClass("animate-pulse");
		expect(skeleton).toHaveClass("bg-accent");
		expect(skeleton).toHaveClass("h-12");
		expect(skeleton).toHaveClass("w-full");
	});

	it("renders as a div with correct data slot", () => {
		render(<Skeleton data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");

		expect(skeleton.tagName).toBe("DIV");
		expect(skeleton).toHaveAttribute("data-slot", "skeleton");
	});

	it("supports different sizes through className", () => {
		const { rerender } = render(<Skeleton data-testid="skeleton" className="h-4 w-full" />);
		let skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveClass("h-4", "w-full");

		rerender(<Skeleton data-testid="skeleton" className="h-12 w-12" />);
		skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveClass("h-12", "w-12");
	});

	it("supports rounded variants", () => {
		const { rerender } = render(<Skeleton data-testid="skeleton" className="rounded-md" />);
		let skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveClass("rounded-md");

		rerender(<Skeleton data-testid="skeleton" className="rounded-full" />);
		skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveClass("rounded-full");
	});

	it("forwards additional HTML attributes", () => {
		render(<Skeleton data-testid="skeleton" aria-label="Loading content" data-custom="value" />);
		const skeleton = screen.getByTestId("skeleton");

		expect(skeleton).toHaveAttribute("aria-label", "Loading content");
		expect(skeleton).toHaveAttribute("data-custom", "value");
	});
});
