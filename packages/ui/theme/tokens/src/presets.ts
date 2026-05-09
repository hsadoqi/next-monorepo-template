import {
	baseFontTokens,
	colorPalettes,
	fontCollections,
	semanticColors,
	shadowTokens,
	spacingTokens,
} from "@repo/ui-theme-foundations";
import type { ThemeConfig, ThemePreset } from "./types";

// Professional theme preset
export const professionalTheme: ThemeConfig = {
	name: "Professional",
	colors: colorPalettes.professional,
	semanticColors,
	spacing: spacingTokens.base,
	typography: {
		...baseFontTokens,
		family: fontCollections.professional,
	},
	shadows: shadowTokens,
};

// Futuristic theme preset
export const futuristicTheme: ThemeConfig = {
	name: "Futuristic",
	colors: colorPalettes.futuristic,
	semanticColors,
	spacing: spacingTokens.compact,
	typography: {
		...baseFontTokens,
		family: fontCollections.futuristic,
	},
	shadows: shadowTokens,
};

// Fantasy theme preset
export const fantasyTheme: ThemeConfig = {
	name: "Fantasy",
	colors: colorPalettes.fantasy,
	semanticColors,
	spacing: spacingTokens.generous,
	typography: {
		...baseFontTokens,
		family: fontCollections.fantasy,
	},
	shadows: shadowTokens,
};

// Neon theme preset
export const neonTheme: ThemeConfig = {
	name: "Neon",
	colors: colorPalettes.neon,
	semanticColors,
	spacing: spacingTokens.base,
	typography: {
		...baseFontTokens,
		family: fontCollections.neon,
	},
	shadows: shadowTokens,
};

// Default theme preset
export const defaultTheme: ThemeConfig = {
	name: "Default",
	colors: colorPalettes.default,
	semanticColors,
	spacing: spacingTokens.base,
	typography: {
		...baseFontTokens,
		family: fontCollections.default,
	},
	shadows: shadowTokens,
};

export const themePresets: Record<string, ThemePreset> = {
	default: { name: "Default", config: defaultTheme },
	professional: { name: "Professional", config: professionalTheme },
	futuristic: { name: "Futuristic", config: futuristicTheme },
	fantasy: { name: "Fantasy", config: fantasyTheme },
	neon: { name: "Neon", config: neonTheme },
};

export type ThemePresetName = keyof typeof themePresets;
