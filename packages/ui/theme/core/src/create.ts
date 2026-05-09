import type { ThemeConfig } from "@repo/ui-theme-tokens";
import { themePresets } from "@repo/ui-theme-tokens";
import type { CreateThemeOptions, ThemeOptions } from "./types";
import { validateTheme } from "./validate";

/**
 * Create a theme by extending a preset with overrides
 */
export function createTheme(options: CreateThemeOptions = {}): ThemeConfig {
	const { base = "default", overrides = {}, validate = true } = options;

	// Get base preset
	const basePreset = themePresets[base as keyof typeof themePresets];
	if (!basePreset) {
		throw new Error(`Unknown theme preset: ${base}`);
	}

	// Deep merge overrides
	const theme: ThemeConfig = {
		...basePreset.config,
		...overrides,
		colors: {
			...basePreset.config.colors,
			...overrides.colors,
		},
		semanticColors: {
			light: {
				...basePreset.config.semanticColors.light,
				...overrides.semanticColors?.light,
			},
			dark: {
				...basePreset.config.semanticColors.dark,
				...overrides.semanticColors?.dark,
			},
		},
		spacing: {
			...basePreset.config.spacing,
			...overrides.spacing,
		},
		typography: {
			...basePreset.config.typography,
			...overrides.typography,
		},
		shadows: {
			...basePreset.config.shadows,
			...overrides.shadows,
		},
	};

	// Validate if requested
	if (validate) {
		const validation = validateTheme(theme);
		if (!validation.isValid) {
			throw new Error(`Invalid theme: ${validation.errors.join(", ")}`);
		}
	}

	return theme;
}

/**
 * Create a custom theme from scratch
 */
export function createCustomTheme(options: ThemeOptions): ThemeConfig {
	return createTheme({ base: "default", overrides: options });
}

/**
 * Extend an existing theme
 */
export function extendTheme(baseTheme: ThemeConfig, overrides: ThemeOptions): ThemeConfig {
	const theme: ThemeConfig = {
		...baseTheme,
		...overrides,
		colors: {
			...baseTheme.colors,
			...overrides.colors,
		},
		semanticColors: {
			light: {
				...baseTheme.semanticColors.light,
				...overrides.semanticColors?.light,
			},
			dark: {
				...baseTheme.semanticColors.dark,
				...overrides.semanticColors?.dark,
			},
		},
		spacing: {
			...baseTheme.spacing,
			...overrides.spacing,
		},
		typography: {
			...baseTheme.typography,
			...overrides.typography,
		},
		shadows: {
			...baseTheme.shadows,
			...overrides.shadows,
		},
	};

	return theme;
}
