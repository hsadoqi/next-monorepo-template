import type { ColorPalette, ColorScale, ColorValue } from "./types";

/**
 * Get a color value from a scale at a specific step
 */
export function getColorFromScale(scale: ColorScale, step: keyof ColorScale): ColorValue {
	return scale[step];
}

/**
 * Get the primary color from a palette at a specific step
 */
export function getPrimaryColor(palette: ColorPalette, step: keyof ColorScale = 500): ColorValue {
	return getColorFromScale(palette.primary, step);
}

/**
 * Get the neutral color from a palette at a specific step
 */
export function getNeutralColor(palette: ColorPalette, step: keyof ColorScale = 500): ColorValue {
	return getColorFromScale(palette.neutral, step);
}

/**
 * Generate a color scale with variations
 */
export function generateColorScale(baseColor: ColorValue, steps: number = 11): ColorScale {
	// This is a simplified implementation
	// In a real implementation, you'd use a color manipulation library
	// to generate proper light/dark variations
	const scale: Partial<ColorScale> = {};

	// For now, return a basic scale - this would be enhanced with proper color math
	for (let i = 0; i < steps; i++) {
		const step = (i * 100 + 50) as keyof ColorScale;
		scale[step] = baseColor; // Placeholder
	}

	return scale as ColorScale;
}

/**
 * Check if a color value is valid
 */
export function isValidColor(color: string): boolean {
	// Basic validation - could be enhanced
	return typeof color === "string" && color.length > 0;
}
