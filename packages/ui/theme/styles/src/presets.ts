import { generateCompleteThemeCSS, themePresets } from "@repo/ui-theme-tokens";

/**
 * Generate CSS for a theme preset
 */
export function generatePresetCSS(presetName: keyof typeof themePresets): string {
	const preset = themePresets[presetName];
	return generateCompleteThemeCSS(preset.config);
}

/**
 * Get all available theme preset names
 */
export function getAvailablePresets(): Array<keyof typeof themePresets> {
	return Object.keys(themePresets) as Array<keyof typeof themePresets>;
}

/**
 * Generate CSS for all presets (useful for preloading)
 */
export function generateAllPresetCSS(): Record<string, string> {
	const presets: Record<string, string> = {};

	getAvailablePresets().forEach((presetName) => {
		presets[presetName] = generatePresetCSS(presetName);
	});

	return presets;
}

/**
 * Inject theme CSS into the document head
 */
export function injectThemeCSS(css: string, themeId?: string): void {
	// Remove existing theme styles
	if (themeId) {
		const existingStyle = document.getElementById(`theme-${themeId}`);
		if (existingStyle) {
			existingStyle.remove();
		}
	}

	// Create new style element
	const style = document.createElement("style");
	style.textContent = css;

	if (themeId) {
		style.id = `theme-${themeId}`;
	}

	document.head.appendChild(style);
}

/**
 * Switch to a theme preset
 */
export function switchToPreset(presetName: keyof typeof themePresets): void {
	const css = generatePresetCSS(presetName);
	injectThemeCSS(css, presetName);
}
