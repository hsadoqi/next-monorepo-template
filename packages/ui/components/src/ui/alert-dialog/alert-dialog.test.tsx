import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTrigger,
} from "./alert-dialog";

describe("AlertDialog", () => {
	it("renders alert dialog trigger", () => {
		render(
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button data-testid="alert-trigger">Open</Button>
				</AlertDialogTrigger>
				<AlertDialogContent title="Alert title" description="Alert description">
					Alert content
				</AlertDialogContent>
			</AlertDialog>,
		);
		expect(screen.getByTestId("alert-trigger")).toBeInTheDocument();
	});

	it("renders alert dialog content when open", () => {
		render(
			<AlertDialog open>
				<AlertDialogTrigger asChild>
					<Button>Open</Button>
				</AlertDialogTrigger>
				<AlertDialogContent title="Alert title" description="Alert description">
					Alert content
				</AlertDialogContent>
			</AlertDialog>,
		);
		expect(screen.getByText("Alert content")).toBeInTheDocument();
	});

	it("renders action and cancel buttons", () => {
		render(
			<AlertDialog open>
				<AlertDialogTrigger asChild>
					<Button>Open</Button>
				</AlertDialogTrigger>
				<AlertDialogContent title="Alert title" description="Alert description">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Confirm</AlertDialogAction>
				</AlertDialogContent>
			</AlertDialog>,
		);
		expect(screen.getByText("Cancel")).toBeInTheDocument();
		expect(screen.getByText("Confirm")).toBeInTheDocument();
	});
});
