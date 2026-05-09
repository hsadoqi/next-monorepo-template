import type { CSSValue, CSSVariable, ThemeTokens, TokenCollection } from "./types";

/**
 * Convert a token name to a CSS variable
 */
export function tokenToCSSVariable(tokenName: string, prefix: string = ""): CSSVariable {
	const prefixed = prefix ? `${prefix}-${tokenName}` : tokenName;
	return `--${prefixed}` as CSSVariable;
}

/**
 * Generate CSS variables from a token collection
 */
export function generateCSSVariables(
	tokens: TokenCollection,
	prefix: string = "",
): Record<CSSVariable, CSSValue> {
	const variables: Record<CSSVariable, CSSValue> = {};

	for (const [key, value] of Object.entries(tokens)) {
		variables[tokenToCSSVariable(key, prefix)] = value;
	}

	return variables;
}

/**
 * Generate CSS custom properties string
 */
export function generateCSSCustomProperties(variables: Record<CSSVariable, CSSValue>): string {
	const declarations = Object.entries(variables)
		.map(([variable, value]) => `  ${variable}: ${value};`)
		.join("\n");

	return `:root {\n${declarations}\n}`;
}

/**
 * Generate theme tokens from all foundation tokens
 */
export function generateThemeTokens(
	colorTokens: TokenCollection,
	spacingTokens: TokenCollection,
	typographyTokens: TokenCollection,
	shadowTokens: TokenCollection,
): ThemeTokens {
	return {
		colors: colorTokens,
		spacing: spacingTokens,
		typography: typographyTokens,
		shadows: shadowTokens,
	};
}
