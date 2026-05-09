import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar", () => {
	it("renders avatar with image and fallback", () => {
		render(
			<Avatar data-testid="avatar">
				<AvatarImage src="https://example.com/avatar.png" alt="user" />
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>,
		);

		const avatar = screen.getByTestId("avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("displays fallback when image doesn't load", () => {
		render(
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
				<AvatarFallback>SC</AvatarFallback>
			</Avatar>,
		);

		// In jsdom, images don't load, so fallback is shown
		const fallback = screen.getByText("SC");
		expect(fallback).toBeInTheDocument();
	});

	it("renders fallback without image", () => {
		render(
			<Avatar>
				<AvatarFallback data-testid="fallback">JD</AvatarFallback>
			</Avatar>,
		);

		const fallback = screen.getByTestId("fallback");
		expect(fallback).toBeInTheDocument();
		expect(fallback).toHaveTextContent("JD");
	});

	it("applies custom className", () => {
		render(
			<Avatar data-testid="avatar" className="size-16">
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>,
		);

		const avatar = screen.getByTestId("avatar");
		expect(avatar).toHaveClass("size-16");
	});

	it("applies custom className to fallback", () => {
		render(
			<Avatar>
				<AvatarFallback data-testid="fallback" className="text-lg font-bold">
					JD
				</AvatarFallback>
			</Avatar>,
		);

		const fallback = screen.getByTestId("fallback");
		expect(fallback).toHaveClass("text-lg");
		expect(fallback).toHaveClass("font-bold");
	});
});
