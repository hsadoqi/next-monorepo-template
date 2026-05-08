import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

describe("Sheet", () => {
	it("renders sheet trigger", () => {
		render(
			<Sheet>
				<SheetTrigger asChild>
					<Button data-testid="sheet-trigger">Open</Button>
				</SheetTrigger>
				<SheetContent title="Sheet title" description="Sheet description">
					Sheet content
				</SheetContent>
			</Sheet>,
		);
		expect(screen.getByTestId("sheet-trigger")).toBeInTheDocument();
	});

	it("renders sheet content when open", () => {
		render(
			<Sheet open>
				<SheetTrigger asChild>
					<Button>Open</Button>
				</SheetTrigger>
				<SheetContent title="Sheet title" description="Sheet description">
					Sheet content
				</SheetContent>
			</Sheet>,
		);
		expect(screen.getByText("Sheet content")).toBeInTheDocument();
	});

	it("accepts side prop for positioning", () => {
		render(
			<Sheet open>
				<SheetTrigger asChild>
					<Button>Open</Button>
				</SheetTrigger>
				<SheetContent title="Sheet title" description="Sheet description" side="right">
					Sheet content
				</SheetContent>
			</Sheet>,
		);
		expect(screen.getByText("Sheet content")).toBeInTheDocument();
	});
});
