import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./pagination";

describe("Pagination", () => {
	it("renders pagination component", () => {
		render(
			<Pagination data-testid="pagination">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>,
		);

		const pagination = screen.getByTestId("pagination");
		expect(pagination).toBeInTheDocument();
	});

	it("renders previous and next buttons", () => {
		render(
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#prev" data-testid="prev" />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#next" data-testid="next" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>,
		);

		const prevButton = screen.getByTestId("prev");
		const nextButton = screen.getByTestId("next");

		expect(prevButton).toBeInTheDocument();
		expect(nextButton).toBeInTheDocument();
	});

	it("renders page numbers as links", () => {
		render(
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationLink href="#page-1">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#page-2">2</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#page-3">3</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>,
		);

		const page1 = screen.getByRole("link", { name: "1" });
		const page2 = screen.getByRole("link", { name: "2" });
		const page3 = screen.getByRole("link", { name: "3" });

		expect(page1).toHaveAttribute("href", "#page-1");
		expect(page2).toHaveAttribute("href", "#page-2");
		expect(page3).toHaveAttribute("href", "#page-3");
	});

	it("marks active page correctly", () => {
		render(
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#" isActive data-testid="active-page">
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">3</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>,
		);

		const activePage = screen.getByTestId("active-page");
		expect(activePage).toHaveAttribute("aria-current", "page");
	});

	it("renders with multiple pages", () => {
		render(
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#prev" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#" isActive>
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">3</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#next" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>,
		);

		expect(screen.getAllByRole("link")).toHaveLength(5);
	});
});
