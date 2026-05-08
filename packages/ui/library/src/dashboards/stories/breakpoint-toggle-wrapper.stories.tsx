"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import BreakpointToggleWrapper from "../grid/breakpoint-toggle-wrapper";

const meta: Meta<typeof BreakpointToggleWrapper> = {
	title: "Dashboard/BreakpointToggleWrapper",
	component: BreakpointToggleWrapper,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<div className="relative w-full h-screen bg-muted/10 flex flex-col">
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof BreakpointToggleWrapper>;

export const Default: Story = {
	render: () => {
		const containerRef = useRef<HTMLDivElement | null>(null);
		return (
			<div ref={containerRef} className="relative flex-1 size-full">
				<BreakpointToggleWrapper containerRef={containerRef}>
					<div className="flex items-center justify-center h-full text-muted-foreground text-sm">
						Grid content area
					</div>
				</BreakpointToggleWrapper>
			</div>
		);
	},
};

export const WithColoredContent: Story = {
	render: () => {
		const containerRef = useRef<HTMLDivElement | null>(null);
		return (
			<div ref={containerRef} className="relative flex-1 size-full">
				<BreakpointToggleWrapper containerRef={containerRef}>
					<div className="flex flex-col items-center justify-center h-full gap-4 pt-12">
						<div className="w-full px-6">
							<div className="mb-3 text-xs text-muted-foreground">
								Switch breakpoints using the top-right control. The card region width should
								expand/shrink.
							</div>
						</div>
						<div className="grid w-full gap-4 p-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
							{["Widget A", "Widget B", "Widget C", "Widget D", "Widget E", "Widget F"].map(
								(name) => (
									<div
										key={name}
										className="bg-background border rounded-xl shadow-sm p-4 text-sm font-medium h-24 flex items-center justify-center"
									>
										{name}
									</div>
								),
							)}
						</div>
					</div>
				</BreakpointToggleWrapper>
			</div>
		);
	},
};

export const WithOverlaysToggled: Story = {
	name: "With col/row overlays (toggle via UI)",
	render: () => {
		const containerRef = useRef<HTMLDivElement | null>(null);
		return (
			<div ref={containerRef} className="relative flex-1 size-full">
				<BreakpointToggleWrapper containerRef={containerRef}>
					<div className="h-full pt-12 px-6">
						<div className="mb-3 text-xs text-muted-foreground">
							Toggle overlays from the top-left controls. Blue shows columns, red shows rows.
						</div>
						<div className="grid w-full h-[70vh] gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
							{["A", "B", "C", "D", "E", "F", "G", "H"].map((tile) => (
								<div
									key={tile}
									className="rounded-xl border border-border/80 bg-background/80 shadow-sm p-4 flex items-center justify-center text-sm"
								>
									Tile {tile}
								</div>
							))}
						</div>
					</div>
				</BreakpointToggleWrapper>
			</div>
		);
	},
};
