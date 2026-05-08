import type React from "react";

export type ShowcaseMaturity = "stable" | "incubating" | "experimental";

/**
 * Generic registry entry that properly types component and its props together
 * Usage:
 * const entry: ShowcaseComponentMeta<typeof MyComponent> = {
 *   component: MyComponent,
 *   props: { required: true, optional: "value" }, // TypeScript validates props!
 * }
 */
export interface ShowcaseComponentMeta<
	C extends React.ComponentType<unknown> = React.ComponentType<unknown>,
> {
	name: string;
	description: string;
	component: C;
	maturity: ShowcaseMaturity;
	category: "widgets";
	/** Props to pass to component when rendering */
	props?: React.ComponentProps<C>;
	/** Tags for filtering/organization */
	tags?: string[];
	/** Usage constraints and requirements */
	constraints?: string[];
	/** Link to documentation/story */
	docs?: string;
}

export interface ShowcaseRegistry {
	[id: string]: ShowcaseComponentMeta[];
}
