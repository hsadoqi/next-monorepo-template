import type { ThemeConfig } from "@repo/ui-theme-tokens";
import { themePresets } from "@repo/ui-theme-tokens";

/**
 * Default theme configuration
 */
export const defaultTheme: ThemeConfig = themePresets.default.config;

/**
 * Professional theme configuration
 */
export const professionalTheme: ThemeConfig = themePresets.professional.config;

/**
 * Futuristic theme configuration
 */
export const futuristicTheme: ThemeConfig = themePresets.futuristic.config;

/**
 * Fantasy theme configuration
 */
export const fantasyTheme: ThemeConfig = themePresets.fantasy.config;

/**
 * Neon theme configuration
 */
export const neonTheme: ThemeConfig = themePresets.neon.config;

/**
 * All available default themes
 */
export const defaultThemes = {
	default: defaultTheme,
	professional: professionalTheme,
	futuristic: futuristicTheme,
	fantasy: fantasyTheme,
	neon: neonTheme,
} as const;

export type DefaultThemeName = keyof typeof defaultThemes;
