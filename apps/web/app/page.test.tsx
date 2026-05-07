import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
	it("renders the portfolio welcome screen", () => {
		render(<Home />);

		expect(
			screen.getByRole("heading", { level: 1, name: "Welcome to Portfolio v2" }),
		).toBeVisible();
		expect(
			screen.getByText("Powered by Next.js, Tailwind CSS v4, Biome, and Shadcn UI."),
		).toBeVisible();
		expect(screen.getByRole("button", { name: "This is a Shadcn Button!" })).toHaveClass(
			"bg-primary",
		);
	});
});
