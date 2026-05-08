import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./progress";

describe("Progress", () => {
	it("renders a progress element", () => {
		render(<Progress value={50} data-testid="progress" />);
		expect(screen.getByTestId("progress")).toBeInTheDocument();
	});

	it("renders with value of 0", () => {
		render(<Progress value={0} data-testid="progress" />);
		const progress = screen.getByTestId("progress");
		expect(progress).toBeInTheDocument();
	});

	it("renders with value of 100", () => {
		render(<Progress value={100} data-testid="progress" />);
		const progress = screen.getByTestId("progress");
		expect(progress).toBeInTheDocument();
	});

	it("applies correct styling", () => {
		render(<Progress value={50} data-testid="progress" />);
		const progress = screen.getByTestId("progress");
		expect(progress).toHaveClass("relative");
		expect(progress).toHaveClass("h-2");
		expect(progress).toHaveClass("w-full");
		expect(progress).toHaveClass("rounded-full");
	});

	it("merges custom className", () => {
		render(<Progress value={50} className="custom-class" data-testid="progress" />);
		const progress = screen.getByTestId("progress");
		expect(progress).toHaveClass("custom-class");
		expect(progress).toHaveClass("w-full");
	});
});
