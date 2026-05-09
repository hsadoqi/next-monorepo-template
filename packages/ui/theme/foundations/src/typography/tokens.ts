import { defaultFonts } from "./fonts";
import { baseTypographyScale } from "./scales";
import type { FontTokens } from "./types";

// Base typography tokens
export const baseFontTokens: FontTokens = {
	family: defaultFonts,
	weight: {
		thin: 100,
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
	},
	size: baseTypographyScale,
	lineHeight: {
		none: 1,
		tight: 1.25,
		snug: 1.375,
		normal: 1.5,
		relaxed: 1.625,
		loose: 2,
	},
	letterSpacing: {
		tighter: "-0.05em",
		tight: "-0.025em",
		normal: "0em",
		wide: "0.025em",
		wider: "0.05em",
		widest: "0.1em",
	},
};

export const fontTokens = {
	base: baseFontTokens,
} as const;
