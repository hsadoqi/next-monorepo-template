"use client";

import { defaultTheme } from "@repo/ui-theme-core";
import { getCurrentTheme, injectThemeCSS, setCurrentTheme } from "@repo/ui-theme-styles";
import type { ThemeConfig } from "@repo/ui-theme-tokens";
import { generateCompleteThemeCSS } from "@repo/ui-theme-tokens";
import { createContext, useCallback, useEffect, useState } from "react";
import type { ThemeContextValue, ThemeProviderProps } from "../types";

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
	children,
	initialTheme = defaultTheme,
	initialThemeName = "default",
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<ThemeConfig>(initialTheme);
	const [themeName, setThemeNameState] = useState<string>(initialThemeName);

	// Apply theme CSS when theme changes
	const applyTheme = useCallback((newTheme: ThemeConfig, name: string) => {
		const css = generateCompleteThemeCSS(newTheme);
		injectThemeCSS(css, name);
	}, []);

	// Set theme and apply it
	const setTheme = useCallback(
		(newTheme: ThemeConfig) => {
			setThemeState(newTheme);
			applyTheme(newTheme, themeName);
		},
		[applyTheme, themeName],
	);

	// Set theme name and persist it
	const setThemeName = useCallback((name: string) => {
		setThemeNameState(name);
		setCurrentTheme(name);
	}, []);

	// Initialize theme on mount
	useEffect(() => {
		const savedThemeName = getCurrentTheme();
		if (savedThemeName && savedThemeName !== themeName) {
			setThemeName(savedThemeName);
		}

		// Apply initial theme
		applyTheme(theme, themeName);
	}, [applyTheme, theme, themeName, setThemeName]);

	const value: ThemeContextValue = {
		theme,
		setTheme,
		themeName,
		setThemeName,
	};

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
