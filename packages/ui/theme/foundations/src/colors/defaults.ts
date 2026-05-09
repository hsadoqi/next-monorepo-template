import type { ColorPalette, ColorScale } from "./types";

// Default color scales in OKLch format for perceptually uniform colors
export const defaultPrimaryScale: ColorScale = {
	50: "oklch(0.97 0.01 264)",
	100: "oklch(0.94 0.03 264)",
	200: "oklch(0.89 0.06 264)",
	300: "oklch(0.81 0.11 264)",
	400: "oklch(0.71 0.17 264)",
	500: "oklch(0.62 0.22 264)",
	600: "oklch(0.53 0.25 264)",
	700: "oklch(0.44 0.27 264)",
	800: "oklch(0.35 0.26 264)",
	900: "oklch(0.26 0.23 264)",
	950: "oklch(0.19 0.19 264)",
};

export const defaultSecondaryScale: ColorScale = {
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
};

export const defaultNeutralScale: ColorScale = {
	50: "oklch(0.98 0.005 240)",
	100: "oklch(0.96 0.01 240)",
	200: "oklch(0.92 0.02 240)",
	300: "oklch(0.85 0.04 240)",
	400: "oklch(0.75 0.06 240)",
	500: "oklch(0.65 0.08 240)",
	600: "oklch(0.55 0.08 240)",
	700: "oklch(0.45 0.07 240)",
	800: "oklch(0.35 0.06 240)",
	900: "oklch(0.25 0.05 240)",
	950: "oklch(0.18 0.04 240)",
};

export const defaultSuccessScale: ColorScale = {
	50: "oklch(0.97 0.02 142)",
	100: "oklch(0.94 0.04 142)",
	200: "oklch(0.89 0.08 142)",
	300: "oklch(0.81 0.14 142)",
	400: "oklch(0.71 0.19 142)",
	500: "oklch(0.62 0.24 142)",
	600: "oklch(0.53 0.27 142)",
	700: "oklch(0.44 0.29 142)",
	800: "oklch(0.35 0.28 142)",
	900: "oklch(0.26 0.25 142)",
	950: "oklch(0.19 0.21 142)",
};

export const defaultWarningScale: ColorScale = {
	50: "oklch(0.97 0.02 85)",
	100: "oklch(0.94 0.04 85)",
	200: "oklch(0.89 0.08 85)",
	300: "oklch(0.81 0.14 85)",
	400: "oklch(0.71 0.19 85)",
	500: "oklch(0.62 0.24 85)",
	600: "oklch(0.53 0.27 85)",
	700: "oklch(0.44 0.29 85)",
	800: "oklch(0.35 0.28 85)",
	900: "oklch(0.26 0.25 85)",
	950: "oklch(0.19 0.21 85)",
};

export const defaultErrorScale: ColorScale = {
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
};

export const defaultInfoScale: ColorScale = {
	50: "oklch(0.97 0.02 240)",
	100: "oklch(0.94 0.04 240)",
	200: "oklch(0.89 0.08 240)",
	300: "oklch(0.81 0.14 240)",
	400: "oklch(0.71 0.19 240)",
	500: "oklch(0.62 0.24 240)",
	600: "oklch(0.53 0.27 240)",
	700: "oklch(0.44 0.29 240)",
	800: "oklch(0.35 0.28 240)",
	900: "oklch(0.26 0.25 240)",
	950: "oklch(0.19 0.21 240)",
};

export const defaultAccentScale: ColorScale = {
	50: "oklch(0.97 0.02 60)",
	100: "oklch(0.94 0.04 60)",
	200: "oklch(0.89 0.08 60)",
	300: "oklch(0.81 0.14 60)",
	400: "oklch(0.71 0.19 60)",
	500: "oklch(0.62 0.24 60)",
	600: "oklch(0.53 0.27 60)",
	700: "oklch(0.44 0.29 60)",
	800: "oklch(0.35 0.28 60)",
	900: "oklch(0.26 0.25 60)",
	950: "oklch(0.19 0.21 60)",
};

export const defaultColorPalette: ColorPalette = {
	primary: defaultPrimaryScale,
	secondary: defaultSecondaryScale,
	accent: defaultAccentScale,
	neutral: defaultNeutralScale,
	success: defaultSuccessScale,
	warning: defaultWarningScale,
	error: defaultErrorScale,
	info: defaultInfoScale,
};
