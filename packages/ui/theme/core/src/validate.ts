import type { ThemeConfig } from "@repo/ui-theme-tokens";
import type { ThemeValidationResult } from "./types";

/**
 * Validate a theme configuration
 */
export function validateTheme(theme: ThemeConfig): ThemeValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	// Validate name
	if (!theme.name || typeof theme.name !== "string") {
		errors.push("Theme name is required and must be a string");
	}

	// Validate colors
	if (!theme.colors) {
		errors.push("Theme colors are required");
	} else {
		// Check for required color scales
		const requiredScales = ["primary", "secondary", "neutral"];
		for (const scale of requiredScales) {
			if (!theme.colors[scale as keyof typeof theme.colors]) {
				errors.push(`Color scale '${scale}' is required`);
			}
		}
	}

	// Validate semantic colors
	if (!theme.semanticColors) {
		errors.push("Semantic colors are required");
	} else {
		const requiredModes = ["light", "dark"];
		for (const mode of requiredModes) {
			if (!theme.semanticColors[mode as keyof typeof theme.semanticColors]) {
				errors.push(`Semantic colors for '${mode}' mode are required`);
			}
		}
	}

	// Validate spacing
	if (!theme.spacing) {
		errors.push("Theme spacing is required");
	}

	// Validate typography
	if (!theme.typography) {
		errors.push("Theme typography is required");
	} else {
		if (!theme.typography.family) {
			errors.push("Typography font families are required");
		}
		if (!theme.typography.size) {
			errors.push("Typography font sizes are required");
		}
	}

	// Validate shadows
	if (!theme.shadows) {
		errors.push("Theme shadows are required");
	}

	// Check for accessibility issues (warnings)
	if (theme.semanticColors) {
		// This would include more sophisticated contrast checking
		warnings.push("Consider validating color contrast ratios for accessibility");
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

/**
 * Validate theme and throw if invalid
 */
export function assertValidTheme(theme: ThemeConfig): void {
	const validation = validateTheme(theme);
	if (!validation.isValid) {
		throw new Error(`Invalid theme: ${validation.errors.join(", ")}`);
	}
}
