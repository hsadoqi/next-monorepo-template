import type { CSSVariables, ThemeConfig, ThemeMode } from "./types";

/**
 * Generate CSS variables for colors
 */
export function generateColorVariables(config: ThemeConfig, mode: ThemeMode): CSSVariables {
	const variables: CSSVariables = {};

	// Primary color scale
	Object.entries(config.colors.primary).forEach(([step, value]) => {
		variables[`--color-primary-${step}`] = value;
	});

	// Secondary color scale
	Object.entries(config.colors.secondary).forEach(([step, value]) => {
		variables[`--color-secondary-${step}`] = value;
	});

	// Accent color scale
	Object.entries(config.colors.accent).forEach(([step, value]) => {
		variables[`--color-accent-${step}`] = value;
	});

	// Neutral color scale
	Object.entries(config.colors.neutral).forEach(([step, value]) => {
		variables[`--color-neutral-${step}`] = value;
	});

	// Semantic colors for the current mode
	const semanticColors = config.semanticColors[mode];
	Object.entries(semanticColors).forEach(([key, value]) => {
		variables[`--color-${key}`] = value;
	});

	return variables;
}

/**
 * Generate CSS variables for spacing
 */
export function generateSpacingVariables(config: ThemeConfig): CSSVariables {
	const variables: CSSVariables = {};

	Object.entries(config.spacing).forEach(([token, value]) => {
		variables[`--spacing-${token}`] = value;
	});

	return variables;
}

/**
 * Generate CSS variables for typography
 */
export function generateTypographyVariables(config: ThemeConfig): CSSVariables {
	const variables: CSSVariables = {};
	const { typography } = config;

	// Font families
	variables["--font-family-sans"] = typography.family.sans;
	variables["--font-family-serif"] = typography.family.serif;
	variables["--font-family-mono"] = typography.family.mono;

	// Font weights
	Object.entries(typography.weight).forEach(([weight, value]) => {
		variables[`--font-weight-${weight}`] = value.toString();
	});

	// Font sizes
	Object.entries(typography.size).forEach(([size, value]) => {
		variables[`--font-size-${size}`] = value;
	});

	// Line heights
	Object.entries(typography.lineHeight).forEach(([height, value]) => {
		variables[`--line-height-${height}`] = value.toString();
	});

	// Letter spacing
	Object.entries(typography.letterSpacing).forEach(([spacing, value]) => {
		variables[`--letter-spacing-${spacing}`] = value;
	});

	return variables;
}

/**
 * Generate CSS variables for shadows
 */
export function generateShadowVariables(config: ThemeConfig): CSSVariables {
	const variables: CSSVariables = {};

	Object.entries(config.shadows).forEach(([level, value]) => {
		variables[`--shadow-${level}`] = value;
	});

	return variables;
}

/**
 * Generate all CSS variables for a theme
 */
export function generateThemeVariables(
	config: ThemeConfig,
	mode: ThemeMode = "light",
): CSSVariables {
	return {
		...generateColorVariables(config, mode),
		...generateSpacingVariables(config),
		...generateTypographyVariables(config),
		...generateShadowVariables(config),
	};
}
