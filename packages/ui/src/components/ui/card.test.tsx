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

		expect(screen.getByLabelText("Project summary")).toHaveProperty("class", "rounded-xl");
		expect(screen.getByLabelText("Project summary")).toHaveProperty("class", "border");
		expect(screen.getByLabelText("Project summary")).toHaveProperty("class", "bg-card");
		expect(screen.getByText("Portfolio refresh")).toHaveProperty("class", "font-semibold");
		expect(screen.getByText("Current sprint status")).toHaveProperty(
			"class",
			"text-muted-foreground",
		);
		expect(screen.getByText("Three tasks are ready for review.")).toHaveProperty("class", "p-6");
		expect(screen.getByText("Updated today")).toHaveProperty("class", "flex");
		expect(screen.getByText("Updated today")).toHaveProperty("class", "items-center");
	});

	it("merges custom classes without dropping base styles", () => {
		render(<Card className="w-80 shadow-none">Content</Card>);

		const card = screen.getByText("Content");
		expect(card).toHaveProperty("class", "w-80");
		expect(card).toHaveProperty("class", "shadow-none");
		expect(card).toHaveProperty("class", "rounded-xl");
		expect(card).toHaveProperty("class", "border");
	});
});
