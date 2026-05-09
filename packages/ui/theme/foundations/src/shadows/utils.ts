import type { ShadowScale, ShadowTokens, ShadowValue } from "./types";

/**
 * Get a shadow value from a scale
 */
export function getShadowFromScale(scale: ShadowScale, level: keyof ShadowScale): ShadowValue {
	return scale[level];
}

/**
 * Get a shadow token value
 */
export function getShadowToken(tokens: ShadowTokens, token: keyof ShadowTokens): ShadowValue {
	return tokens[token];
}

/**
 * Check if a shadow value is valid
 */
export function isValidShadow(shadow: string): boolean {
	// Basic validation - could be enhanced
	return typeof shadow === "string" && shadow.length > 0;
}
