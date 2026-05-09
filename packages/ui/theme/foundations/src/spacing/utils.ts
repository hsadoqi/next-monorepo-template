import type { SpacingScale, SpacingTokens, SpacingValue } from "./types";

/**
 * Get a spacing value from a scale
 */
export function getSpacingFromScale(scale: SpacingScale, step: keyof SpacingScale): SpacingValue {
	return scale[step];
}

/**
 * Get a spacing token value
 */
export function getSpacingToken(tokens: SpacingTokens, token: keyof SpacingTokens): SpacingValue {
	return tokens[token];
}

/**
 * Convert rem to px (assuming 16px base)
 */
export function remToPx(rem: string): number {
	const remValue = parseFloat(rem.replace("rem", ""));
	return remValue * 16;
}

/**
 * Convert px to rem (assuming 16px base)
 */
export function pxToRem(px: number): string {
	return `${px / 16}rem`;
}

/**
 * Check if a spacing value is valid
 */
export function isValidSpacing(spacing: string): boolean {
	// Basic validation for rem or px values
	return /^\d*\.?\d+(rem|px)$/.test(spacing) || spacing === "0";
}
