import type { SemanticColors } from "./types";

// Light mode semantic colors
export const lightSemanticColors: SemanticColors = {
	background: "oklch(0.99 0.005 240)",
	foreground: "oklch(0.15 0.02 240)",
	card: "oklch(1 0 0)",
	"card-foreground": "oklch(0.15 0.02 240)",
	popover: "oklch(1 0 0)",
	"popover-foreground": "oklch(0.15 0.02 240)",
	primary: "oklch(0.62 0.22 264)",
	"primary-foreground": "oklch(0.98 0.01 264)",
	secondary: "oklch(0.94 0.01 240)",
	"secondary-foreground": "oklch(0.25 0.05 240)",
	muted: "oklch(0.96 0.005 240)",
	"muted-foreground": "oklch(0.45 0.01 240)",
	accent: "oklch(0.94 0.01 240)",
	"accent-foreground": "oklch(0.25 0.05 240)",
	destructive: "oklch(0.62 0.24 25)",
	"destructive-foreground": "oklch(0.98 0.01 25)",
	border: "oklch(0.92 0.005 240)",
	input: "oklch(0.92 0.005 240)",
	ring: "oklch(0.62 0.22 264)",
};

// Dark mode semantic colors
export const darkSemanticColors: SemanticColors = {
	background: "oklch(0.08 0.01 240)",
	foreground: "oklch(0.95 0.005 240)",
	card: "oklch(0.12 0.01 240)",
	"card-foreground": "oklch(0.95 0.005 240)",
	popover: "oklch(0.12 0.01 240)",
	"popover-foreground": "oklch(0.95 0.005 240)",
	primary: "oklch(0.71 0.17 264)",
	"primary-foreground": "oklch(0.15 0.02 264)",
	secondary: "oklch(0.25 0.05 240)",
	"secondary-foreground": "oklch(0.95 0.005 240)",
	muted: "oklch(0.18 0.02 240)",
	"muted-foreground": "oklch(0.65 0.005 240)",
	accent: "oklch(0.25 0.05 240)",
	"accent-foreground": "oklch(0.95 0.005 240)",
	destructive: "oklch(0.71 0.19 25)",
	"destructive-foreground": "oklch(0.15 0.02 25)",
	border: "oklch(0.25 0.02 240)",
	input: "oklch(0.25 0.02 240)",
	ring: "oklch(0.71 0.17 264)",
};

export const semanticColors = {
	light: lightSemanticColors,
	dark: darkSemanticColors,
} as const;

export type SemanticColorMode = keyof typeof semanticColors;
