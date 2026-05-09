import { generateThemeVariables } from "./generator";
import type { CSSVariables, ThemeConfig, ThemeMode } from "./types";

/**
 * Convert CSS variables object to CSS custom properties string
 */
export function variablesToCSS(variables: CSSVariables): string {
	const declarations = Object.entries(variables)
		.map(([property, value]) => `  ${property}: ${value};`)
		.join("\n");

	return `:root {\n${declarations}\n}`;
}

/**
 * Generate CSS for a theme configuration
 */
export function generateThemeCSS(config: ThemeConfig, mode: ThemeMode = "light"): string {
	const variables = generateThemeVariables(config, mode);
	return variablesToCSS(variables);
}

/**
 * Generate CSS for dark mode overrides
 */
export function generateDarkModeCSS(config: ThemeConfig): string {
	const darkVariables = generateThemeVariables(config, "dark");
	const lightVariables = generateThemeVariables(config, "light");

	// Only include variables that differ between light and dark
	const darkOverrides: CSSVariables = {};

	Object.entries(darkVariables).forEach(([key, value]) => {
		if (lightVariables[key] !== value) {
			darkOverrides[key] = value;
		}
	});

	if (Object.keys(darkOverrides).length === 0) {
		return "";
	}

	const declarations = Object.entries(darkOverrides)
		.map(([property, value]) => `  ${property}: ${value};`)
		.join("\n");

	return `.dark {\n${declarations}\n}`;
}

/**
 * Generate complete CSS for a theme (light + dark)
 */
export function generateCompleteThemeCSS(config: ThemeConfig): string {
	const lightCSS = generateThemeCSS(config, "light");
	const darkCSS = generateDarkModeCSS(config);

	return `${lightCSS}\n\n${darkCSS}`;
}
