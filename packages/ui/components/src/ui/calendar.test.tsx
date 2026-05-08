import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./calendar";

describe("Calendar", () => {
	it("renders calendar component", () => {
		render(<Calendar mode="single" data-testid="calendar" />);
		expect(screen.getByTestId("calendar")).toBeInTheDocument();
	});

	it("renders in single selection mode", () => {
		const handleSelect = vi.fn();
		render(<Calendar mode="single" onSelect={handleSelect} data-testid="calendar" />);
		expect(screen.getByTestId("calendar")).toBeInTheDocument();
	});

	it("renders in multiple selection mode", () => {
		render(<Calendar mode="multiple" data-testid="calendar" />);
		expect(screen.getByTestId("calendar")).toBeInTheDocument();
	});

	it("renders in range selection mode", () => {
		render(<Calendar mode="range" data-testid="calendar" />);
		expect(screen.getByTestId("calendar")).toBeInTheDocument();
	});

	it("supports disabled dates", () => {
		const isDisabled = (date: Date) => date.getDay() === 0;
		render(<Calendar mode="single" disabled={isDisabled} data-testid="calendar" />);
		expect(screen.getByTestId("calendar")).toBeInTheDocument();
	});
});
