import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

describe("Tabs", () => {
	it("renders tabs component", () => {
		render(
			<Tabs defaultValue="tab1">
				<TabsList data-testid="tabs-list">
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1">Content 1</TabsContent>
				<TabsContent value="tab2">Content 2</TabsContent>
			</Tabs>,
		);
		expect(screen.getByTestId("tabs-list")).toBeInTheDocument();
	});

	it("renders tab triggers", () => {
		render(
			<Tabs defaultValue="tab1">
				<TabsList>
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					<TabsTrigger value="tab3">Tab 3</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1">Content 1</TabsContent>
				<TabsContent value="tab2">Content 2</TabsContent>
				<TabsContent value="tab3">Content 3</TabsContent>
			</Tabs>,
		);
		expect(screen.getByText("Tab 1")).toBeInTheDocument();
		expect(screen.getByText("Tab 2")).toBeInTheDocument();
		expect(screen.getByText("Tab 3")).toBeInTheDocument();
	});

	it("displays content for selected tab", () => {
		render(
			<Tabs defaultValue="tab1">
				<TabsList>
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1">Content 1</TabsContent>
				<TabsContent value="tab2">Content 2</TabsContent>
			</Tabs>,
		);
		expect(screen.getByText("Content 1")).toBeInTheDocument();
	});

	it("supports vertical orientation", () => {
		render(
			<Tabs defaultValue="tab1" orientation="vertical">
				<TabsList>
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1">Content 1</TabsContent>
				<TabsContent value="tab2">Content 2</TabsContent>
			</Tabs>,
		);
		expect(screen.getByText("Tab 1")).toBeInTheDocument();
	});

	it("supports disabled tabs", () => {
		render(
			<Tabs defaultValue="tab1">
				<TabsList>
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2" disabled>
						Tab 2
					</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1">Content 1</TabsContent>
				<TabsContent value="tab2">Content 2</TabsContent>
			</Tabs>,
		);
		const disabledTab = screen.getByText("Tab 2");
		expect(disabledTab).toHaveAttribute("data-disabled");
	});
});
