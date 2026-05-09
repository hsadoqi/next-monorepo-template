import { defaultColorPalette } from "./defaults";
import type { ColorPalette } from "./types";

// Professional theme - corporate blues and grays
export const professionalPalette: ColorPalette = {
	...defaultColorPalette,
	primary: {
		50: "oklch(0.97 0.01 240)",
		100: "oklch(0.94 0.03 240)",
		200: "oklch(0.89 0.06 240)",
		300: "oklch(0.81 0.11 240)",
		400: "oklch(0.71 0.17 240)",
		500: "oklch(0.62 0.22 240)",
		600: "oklch(0.53 0.25 240)",
		700: "oklch(0.44 0.27 240)",
		800: "oklch(0.35 0.26 240)",
		900: "oklch(0.26 0.23 240)",
		950: "oklch(0.19 0.19 240)",
	},
};

// Futuristic theme - neon accents and dark backgrounds
export const futuristicPalette: ColorPalette = {
	...defaultColorPalette,
	primary: {
		50: "oklch(0.95 0.05 300)",
		100: "oklch(0.90 0.10 300)",
		200: "oklch(0.80 0.20 300)",
		300: "oklch(0.70 0.30 300)",
		400: "oklch(0.60 0.40 300)",
		500: "oklch(0.50 0.50 300)",
		600: "oklch(0.40 0.55 300)",
		700: "oklch(0.30 0.60 300)",
		800: "oklch(0.20 0.65 300)",
		900: "oklch(0.10 0.70 300)",
		950: "oklch(0.05 0.75 300)",
	},
	accent: {
		50: "oklch(0.95 0.10 120)",
		100: "oklch(0.90 0.20 120)",
		200: "oklch(0.80 0.30 120)",
		300: "oklch(0.70 0.40 120)",
		400: "oklch(0.60 0.50 120)",
		500: "oklch(0.50 0.60 120)",
		600: "oklch(0.40 0.65 120)",
		700: "oklch(0.30 0.70 120)",
		800: "oklch(0.20 0.75 120)",
		900: "oklch(0.10 0.80 120)",
		950: "oklch(0.05 0.85 120)",
	},
};

// Fantasy theme - warm earth tones
export const fantasyPalette: ColorPalette = {
	...defaultColorPalette,
	primary: {
		50: "oklch(0.97 0.02 45)",
		100: "oklch(0.94 0.04 45)",
		200: "oklch(0.89 0.08 45)",
		300: "oklch(0.81 0.14 45)",
		400: "oklch(0.71 0.19 45)",
		500: "oklch(0.62 0.24 45)",
		600: "oklch(0.53 0.27 45)",
		700: "oklch(0.44 0.29 45)",
		800: "oklch(0.35 0.28 45)",
		900: "oklch(0.26 0.25 45)",
		950: "oklch(0.19 0.21 45)",
	},
	accent: {
		50: "oklch(0.97 0.02 25)",
		100: "oklch(0.94 0.04 25)",
		200: "oklch(0.89 0.08 25)",
		300: "oklch(0.81 0.14 25)",
		400: "oklch(0.71 0.19 25)",
		500: "oklch(0.62 0.24 25)",
		600: "oklch(0.53 0.27 25)",
		700: "oklch(0.44 0.29 25)",
		800: "oklch(0.35 0.28 25)",
		900: "oklch(0.26 0.25 25)",
		950: "oklch(0.19 0.21 25)",
	},
};

// Neon theme - bright, saturated colors
export const neonPalette: ColorPalette = {
	...defaultColorPalette,
	primary: {
		50: "oklch(0.95 0.15 300)",
		100: "oklch(0.90 0.25 300)",
		200: "oklch(0.80 0.35 300)",
		300: "oklch(0.70 0.45 300)",
		400: "oklch(0.60 0.55 300)",
		500: "oklch(0.50 0.65 300)",
		600: "oklch(0.40 0.70 300)",
		700: "oklch(0.30 0.75 300)",
		800: "oklch(0.20 0.80 300)",
		900: "oklch(0.10 0.85 300)",
		950: "oklch(0.05 0.90 300)",
	},
	accent: {
		50: "oklch(0.95 0.15 60)",
		100: "oklch(0.90 0.25 60)",
		200: "oklch(0.80 0.35 60)",
		300: "oklch(0.70 0.45 60)",
		400: "oklch(0.60 0.55 60)",
		500: "oklch(0.50 0.65 60)",
		600: "oklch(0.40 0.70 60)",
		700: "oklch(0.30 0.75 60)",
		800: "oklch(0.20 0.80 60)",
		900: "oklch(0.10 0.85 60)",
		950: "oklch(0.05 0.90 60)",
	},
};

export const colorPalettes = {
	default: defaultColorPalette,
	professional: professionalPalette,
	futuristic: futuristicPalette,
	fantasy: fantasyPalette,
	neon: neonPalette,
} as const;

export type ColorPaletteName = keyof typeof colorPalettes;
