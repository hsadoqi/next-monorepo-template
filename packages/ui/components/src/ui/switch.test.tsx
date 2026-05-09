import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
	it("renders correctly with default state", () => {
		render(<Switch data-testid="switch" />);
		const switchElement = screen.getByTestId("switch");

		expect(switchElement).toBeInTheDocument();
		expect(switchElement).toHaveAttribute("data-slot", "switch");
		expect(switchElement).toHaveAttribute("data-state", "unchecked");
		expect(switchElement).toHaveAttribute("data-size", "default");
	});

	it("toggles between checked and unchecked state via user interaction", async () => {
		const user = userEvent.setup();
		render(<Switch data-testid="switch" />);
		const switchElement = screen.getByTestId("switch");

		expect(switchElement).toHaveAttribute("data-state", "unchecked");

		await user.click(switchElement);
		expect(switchElement).toHaveAttribute("data-state", "checked");

		await user.click(switchElement);
		expect(switchElement).toHaveAttribute("data-state", "unchecked");
	});

	it("renders with default checked state", () => {
		render(<Switch data-testid="switch" defaultChecked />);
		const switchElement = screen.getByTestId("switch");

		expect(switchElement).toHaveAttribute("data-state", "checked");
	});

	it("respects disabled state and prevents interaction", async () => {
		const user = userEvent.setup();
		render(<Switch data-testid="switch" disabled />);
		const switchElement = screen.getByTestId("switch");

		expect(switchElement).toBeDisabled();

		await user.click(switchElement);
		expect(switchElement).toHaveAttribute("data-state", "unchecked");
	});

	it("supports small size variant", () => {
		render(<Switch data-testid="switch" size="sm" />);
		const switchElement = screen.getByTestId("switch");

		expect(switchElement).toHaveAttribute("data-size", "sm");
	});

	it("calls onCheckedChange callback when toggled", async () => {
		const user = userEvent.setup();
		const handleCheckedChange = vi.fn();

		render(<Switch data-testid="switch" onCheckedChange={handleCheckedChange} />);
		const switchElement = screen.getByTestId("switch");

		await user.click(switchElement);
		expect(handleCheckedChange).toHaveBeenCalledWith(true);

		await user.click(switchElement);
		expect(handleCheckedChange).toHaveBeenCalledWith(false);
	});

	it("works with controlled state", async () => {
		const user = userEvent.setup();
		const handleCheckedChange = vi.fn();

		const { rerender } = render(
			<Switch data-testid="switch" checked={false} onCheckedChange={handleCheckedChange} />,
		);
		const switchElement = screen.getByTestId("switch");

		expect(switchElement).toHaveAttribute("data-state", "unchecked");

		await user.click(switchElement);
		expect(handleCheckedChange).toHaveBeenCalledWith(true);

		// Rerender with new checked state
		rerender(<Switch data-testid="switch" checked={true} onCheckedChange={handleCheckedChange} />);

		expect(switchElement).toHaveAttribute("data-state", "checked");
	});

	it("is keyboard accessible via Enter and Space keys", async () => {
		const user = userEvent.setup();
		render(<Switch data-testid="switch" />);
		const switchElement = screen.getByTestId("switch");

		// Focus the switch
		switchElement.focus();
		expect(switchElement).toHaveFocus();

		// Toggle with Space key
		await user.keyboard(" ");
		expect(switchElement).toHaveAttribute("data-state", "checked");

		// Toggle with Enter key
		await user.keyboard("{Enter}");
		expect(switchElement).toHaveAttribute("data-state", "unchecked");
	});

	it("renders with custom className", () => {
		render(<Switch data-testid="switch" className="custom-class" />);
		const switchElement = screen.getByTestId("switch");

		expect(switchElement).toHaveClass("custom-class");
		expect(switchElement).toHaveClass("peer");
		expect(switchElement).toHaveClass("group/switch");
	});

	it("forwards aria attributes for accessibility", () => {
		render(
			<Switch
				data-testid="switch"
				aria-label="Enable feature"
				aria-describedby="feature-description"
			/>,
		);
		const switchElement = screen.getByTestId("switch");

		expect(switchElement).toHaveAttribute("aria-label", "Enable feature");
		expect(switchElement).toHaveAttribute("aria-describedby", "feature-description");
	});
});
