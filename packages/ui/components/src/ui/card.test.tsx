import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

describe("Card", () => {
	it("renders the full card composition", () => {
		render(
			<Card aria-label="Project summary">
				<CardHeader>
					<CardTitle>Portfolio refresh</CardTitle>
					<CardDescription>Current sprint status</CardDescription>
				</CardHeader>
				<CardContent>Three tasks are ready for review.</CardContent>
				<CardFooter>Updated today</CardFooter>
			</Card>,
		);

		expect(screen.getByLabelText("Project summary")).toHaveClass("rounded-xl");
		expect(screen.getByLabelText("Project summary")).toHaveClass("border");
		expect(screen.getByLabelText("Project summary")).toHaveClass("bg-card");
		expect(screen.getByText("Portfolio refresh")).toHaveClass("font-semibold");
		expect(screen.getByText("Current sprint status")).toHaveClass("text-muted-foreground");
		expect(screen.getByText("Three tasks are ready for review.")).toHaveClass("p-6");
		expect(screen.getByText("Updated today")).toHaveClass("flex");
		expect(screen.getByText("Updated today")).toHaveClass("items-center");
	});

	it("merges custom classes without dropping base styles", () => {
		render(<Card className="w-80 shadow-none">Content</Card>);

		const card = screen.getByText("Content");
		expect(card).toHaveClass("w-80");
		expect(card).toHaveClass("shadow-none");
		expect(card).toHaveClass("rounded-xl");
		expect(card).toHaveClass("border");
	});
});
