import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
	it("renders a textarea element", () => {
		render(<Textarea data-testid="textarea" />);
		expect(screen.getByTestId("textarea")).toBeInTheDocument();
		expect(screen.getByTestId("textarea").tagName).toBe("TEXTAREA");
	});

	it("accepts placeholder prop", () => {
		render(<Textarea placeholder="Enter text..." data-testid="textarea" />);
		const textarea = screen.getByTestId("textarea");
		expect(textarea).toHaveAttribute("placeholder", "Enter text...");
	});

	it("accepts disabled prop", () => {
		render(<Textarea disabled data-testid="textarea" />);
		const textarea = screen.getByTestId("textarea");
		expect(textarea).toBeDisabled();
	});

	it("applies correct styling classes", () => {
		render(<Textarea data-testid="textarea" />);
		const textarea = screen.getByTestId("textarea");
		expect(textarea).toHaveClass("flex");
		expect(textarea).toHaveClass("rounded-md");
		expect(textarea).toHaveClass("border");
		expect(textarea).toHaveClass("px-3");
		expect(textarea).toHaveClass("py-2");
	});

	it("merges custom className", () => {
		render(<Textarea className="custom-class" data-testid="textarea" />);
		const textarea = screen.getByTestId("textarea");
		expect(textarea).toHaveClass("custom-class");
		expect(textarea).toHaveClass("rounded-md");
	});

	it("accepts value and onChange", () => {
		render(<Textarea defaultValue="Test content" data-testid="textarea" />);
		const textarea = screen.getByTestId("textarea") as HTMLTextAreaElement;
		expect(textarea.value).toBe("Test content");
	});
});
