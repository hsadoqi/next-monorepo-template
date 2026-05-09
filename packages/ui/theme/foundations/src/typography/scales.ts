import type { TypographyScale } from "./types";

// Base typography scale
export const baseTypographyScale: TypographyScale = {
	xs: "0.75rem",
	sm: "0.875rem",
	base: "1rem",
	lg: "1.125rem",
	xl: "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
	"5xl": "3rem",
	"6xl": "3.75rem",
	"7xl": "4.5rem",
	"8xl": "6rem",
	"9xl": "8rem",
};

// Compact typography scale (smaller)
export const compactTypographyScale: TypographyScale = {
	xs: "0.6875rem",
	sm: "0.8125rem",
	base: "0.9375rem",
	lg: "1.0625rem",
	xl: "1.1875rem",
	"2xl": "1.375rem",
	"3xl": "1.625rem",
	"4xl": "1.875rem",
	"5xl": "2.25rem",
	"6xl": "2.8125rem",
	"7xl": "3.375rem",
	"8xl": "4.125rem",
	"9xl": "5.625rem",
};

// Generous typography scale (larger)
export const generousTypographyScale: TypographyScale = {
	xs: "0.8125rem",
	sm: "0.9375rem",
	base: "1.0625rem",
	lg: "1.1875rem",
	xl: "1.3125rem",
	"2xl": "1.625rem",
	"3xl": "2.125rem",
	"4xl": "2.625rem",
	"5xl": "3.375rem",
	"6xl": "4.125rem",
	"7xl": "4.875rem",
	"8xl": "6.375rem",
	"9xl": "8.625rem",
};

export const typographyScales = {
	base: baseTypographyScale,
	compact: compactTypographyScale,
	generous: generousTypographyScale,
} as const;

export type TypographyScaleName = keyof typeof typographyScales;
