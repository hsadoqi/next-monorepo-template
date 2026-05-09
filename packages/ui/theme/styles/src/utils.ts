/**
 * Utility functions for theme styles
 */

/**
 * Check if the document supports CSS custom properties
 */
export function supportsCSSCustomProperties(): boolean {
	return typeof CSS !== "undefined" && CSS.supports && CSS.supports("color", "var(--test)");
}

/**
 * Get the value of a CSS custom property
 */
export function getCSSCustomProperty(
	property: string,
	element: Element = document.documentElement,
): string {
	return getComputedStyle(element).getPropertyValue(property).trim();
}

/**
 * Set the value of a CSS custom property
 */
export function setCSSCustomProperty(
	property: string,
	value: string,
	element: Element = document.documentElement,
): void {
	(element as HTMLElement).style.setProperty(property, value);
}

/**
 * Check if dark mode is active
 */
export function isDarkMode(): boolean {
	return document.documentElement.classList.contains("dark");
}

/**
 * Toggle dark mode
 */
export function toggleDarkMode(): void {
	document.documentElement.classList.toggle("dark");
}

/**
 * Set dark mode
 */
export function setDarkMode(enabled: boolean): void {
	if (enabled) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
}

/**
 * Get the current theme from localStorage or URL params
 */
export function getCurrentTheme(): string | null {
	// Check URL params first (for Storybook)
	const urlParams = new URLSearchParams(window.location.search);
	const themeParam = urlParams.get("theme");
	if (themeParam) {
		return themeParam;
	}

	// Check localStorage
	try {
		return localStorage.getItem("theme");
	} catch {
		return null;
	}
}

/**
 * Set the current theme in localStorage
 */
export function setCurrentTheme(theme: string): void {
	try {
		localStorage.setItem("theme", theme);
	} catch {
		// localStorage not available
	}
}
