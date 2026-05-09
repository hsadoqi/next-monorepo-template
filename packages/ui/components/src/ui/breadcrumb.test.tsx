import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./breadcrumb";

describe("Breadcrumb", () => {
	it("renders breadcrumb list correctly", () => {
		render(
			<Breadcrumb data-testid="breadcrumb">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);

		const breadcrumb = screen.getByTestId("breadcrumb");
		expect(breadcrumb).toBeInTheDocument();
	});

	it("renders breadcrumb links as navigation", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);

		const homeLink = screen.getByRole("link", { name: "Home" });
		const docsLink = screen.getByRole("link", { name: "Docs" });

		expect(homeLink).toHaveAttribute("href", "/");
		expect(docsLink).toHaveAttribute("href", "/docs");
	});

	it("renders current page as text, not link", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage data-testid="current-page">Current</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);

		const currentPage = screen.getByTestId("current-page");
		expect(currentPage).toBeInTheDocument();
		expect(currentPage).toHaveAttribute("aria-current", "page");
	});

	it("renders separators between items", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator data-testid="separator" />
					<BreadcrumbItem>
						<BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);

		const separator = screen.getByTestId("separator");
		expect(separator).toBeInTheDocument();
	});

	it("maintains correct navigation hierarchy", () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/products">Products</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Electronics</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>,
		);

		const homeLink = screen.getByRole("link", { name: "Home" });
		const productsLink = screen.getByRole("link", { name: "Products" });
		const currentPage = screen.getByText("Electronics");

		expect(homeLink).toHaveAttribute("href", "/");
		expect(productsLink).toHaveAttribute("href", "/products");
		expect(currentPage).toHaveAttribute("aria-current", "page");
	});
});
