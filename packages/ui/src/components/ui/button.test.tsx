import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "./button";

describe("Button", () => {
	it("renders an accessible button with default styles", () => {
		render(<Button>Save changes</Button>);

		const button = screen.getByRole("button", { name: "Save changes" });
		expect(button).toBeDefined();
		expect(button).toHaveProperty("class", "bg-primary");
		expect(button).toHaveProperty("class", "text-primary-foreground");
	});

	it("calls click handlers for enabled buttons", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(<Button onClick={handleClick}>Submit</Button>);
		await user.click(screen.getByRole("button", { name: "Submit" }));

		expect(handleClick).toHaveBeenCalledOnce();
	});

	it("does not call click handlers when disabled", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<Button disabled onClick={handleClick}>
				Submit
			</Button>,
		);
		await user.click(screen.getByRole("button", { name: "Submit" }));

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("renders as the child element when asChild is set", () => {
		render(
			<Button asChild>
				<a href="/contact">Contact</a>
			</Button>,
		);

		const link = screen.getByRole("link", { name: "Contact" });
		expect(link).toHaveProperty("href", "/contact");
		expect(link).toHaveProperty("class", "inline-flex");
	});

	it("generates variant and size classes", () => {
		expect(buttonVariants({ variant: "destructive", size: "lg" })).toContain("bg-destructive");
		expect(buttonVariants({ variant: "destructive", size: "lg" })).toContain("h-10");
	});
});
