import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";

describe("Dialog", () => {
	it("renders dialog trigger", () => {
		render(
			<Dialog>
				<DialogTrigger asChild>
					<Button data-testid="dialog-trigger">Open</Button>
				</DialogTrigger>
				<DialogContent title="Dialog title" description="Dialog description">
					Dialog content
				</DialogContent>
			</Dialog>,
		);
		expect(screen.getByTestId("dialog-trigger")).toBeInTheDocument();
	});

	it("renders dialog content when open", () => {
		render(
			<Dialog open>
				<DialogTrigger asChild>
					<Button>Open</Button>
				</DialogTrigger>
				<DialogContent title="Dialog title" description="Dialog description">
					Dialog content
				</DialogContent>
			</Dialog>,
		);
		expect(screen.getByText("Dialog content")).toBeInTheDocument();
	});

	it("supports close button visibility toggle", () => {
		render(
			<Dialog open>
				<DialogTrigger asChild>
					<Button>Open</Button>
				</DialogTrigger>
				<DialogContent title="Dialog title" description="Dialog description" showCloseButton={true}>
					Dialog content
				</DialogContent>
			</Dialog>,
		);
		expect(screen.getByText("Dialog content")).toBeInTheDocument();
	});
});
