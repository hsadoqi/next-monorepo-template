import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";

describe("DropdownMenu", () => {
	it("renders dropdown menu trigger", () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button data-testid="menu-trigger">Menu</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Option 1</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>,
		);
		expect(screen.getByTestId("menu-trigger")).toBeInTheDocument();
	});

	it("renders menu items", () => {
		render(
			<DropdownMenu open>
				<DropdownMenuTrigger asChild>
					<Button>Menu</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Edit</DropdownMenuItem>
					<DropdownMenuItem>Copy</DropdownMenuItem>
					<DropdownMenuItem>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>,
		);
		expect(screen.getByText("Edit")).toBeInTheDocument();
		expect(screen.getByText("Copy")).toBeInTheDocument();
		expect(screen.getByText("Delete")).toBeInTheDocument();
	});

	it("supports disabled menu items", () => {
		render(
			<DropdownMenu open>
				<DropdownMenuTrigger asChild>
					<Button>Menu</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Enabled</DropdownMenuItem>
					<DropdownMenuItem disabled>Disabled</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>,
		);
		const disabledItem = screen.getByText("Disabled");
		expect(disabledItem).toHaveAttribute("data-disabled");
	});
});
