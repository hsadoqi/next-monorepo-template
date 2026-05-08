import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

// Mock ResizeObserver
beforeAll(() => {
	if (typeof window !== "undefined" && !window.ResizeObserver) {
		window.ResizeObserver = class ResizeObserver {
			observe() {}
			unobserve() {}
			disconnect() {}
		} as unknown as typeof ResizeObserver;
	}
});

describe("Tooltip", () => {
	it("renders tooltip trigger", () => {
		render(
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button data-testid="trigger">Hover</Button>
					</TooltipTrigger>
					<TooltipContent>Tooltip text</TooltipContent>
				</Tooltip>
			</TooltipProvider>,
		);
		expect(screen.getByTestId("trigger")).toBeInTheDocument();
	});

	it("renders tooltip content when visible", () => {
		render(
			<TooltipProvider delayDuration={0}>
				<Tooltip open>
					<TooltipTrigger asChild>
						<Button>Hover</Button>
					</TooltipTrigger>
					<TooltipContent>Tooltip text</TooltipContent>
				</Tooltip>
			</TooltipProvider>,
		);
		expect(screen.getByRole("tooltip")).toBeInTheDocument();
	});

	it("supports side positioning", () => {
		render(
			<TooltipProvider delayDuration={0}>
				<Tooltip open>
					<TooltipTrigger asChild>
						<Button>Hover</Button>
					</TooltipTrigger>
					<TooltipContent side="right">Tooltip text</TooltipContent>
				</Tooltip>
			</TooltipProvider>,
		);
		expect(screen.getByRole("tooltip")).toBeInTheDocument();
	});
});
