import { generateCSSCustomProperties, generateCSSVariables } from "./generator";
import type { ThemeTokens } from "./types";

/**
 * Generate CSS for a complete theme
 */
export function generateThemeCSS(themeTokens: ThemeTokens): string {
	const colorVars = generateCSSVariables(themeTokens.colors, "color");
	const spacingVars = generateCSSVariables(themeTokens.spacing, "spacing");
	const typographyVars = generateCSSVariables(themeTokens.typography, "typography");
	const shadowVars = generateCSSVariables(themeTokens.shadows, "shadow");

	const allVars = {
		...colorVars,
		...spacingVars,
		...typographyVars,
		...shadowVars,
	};

	return generateCSSCustomProperties(allVars);
}

/**
 * Generate CSS for dark mode overrides
 */
export function generateDarkModeCSS(themeTokens: ThemeTokens): string {
	// This would generate .dark class overrides
	// For now, return a placeholder
	return `.dark {\n  /* Dark mode overrides would go here */\n}`;
}
