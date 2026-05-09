import type { SpacingTokens } from "./types";

// Base spacing tokens
export const baseSpacingTokens: SpacingTokens = {
	none: "0",
	xs: "0.5rem",
	sm: "0.75rem",
	md: "1rem",
	lg: "1.5rem",
	xl: "2rem",
	"2xl": "3rem",
	"3xl": "4rem",
	"4xl": "6rem",
	"5xl": "8rem",
	"6xl": "12rem",
};

// Compact spacing tokens
export const compactSpacingTokens: SpacingTokens = {
	none: "0",
	xs: "0.25rem",
	sm: "0.5rem",
	md: "0.75rem",
	lg: "1rem",
	xl: "1.5rem",
	"2xl": "2rem",
	"3xl": "3rem",
	"4xl": "4rem",
	"5xl": "6rem",
	"6xl": "8rem",
};

// Generous spacing tokens
export const generousSpacingTokens: SpacingTokens = {
	none: "0",
	xs: "0.75rem",
	sm: "1rem",
	md: "1.5rem",
	lg: "2rem",
	xl: "3rem",
	"2xl": "4rem",
	"3xl": "6rem",
	"4xl": "8rem",
	"5xl": "12rem",
	"6xl": "16rem",
};

export const spacingTokens = {
	base: baseSpacingTokens,
	compact: compactSpacingTokens,
	generous: generousSpacingTokens,
} as const;

export type SpacingTokensName = keyof typeof spacingTokens;
