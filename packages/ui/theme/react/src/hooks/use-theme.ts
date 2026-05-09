import type { ThemeConfig } from "@repo/ui-theme-tokens";
import { useContext } from "react";
import { ThemeContext } from "../providers/theme-provider";

/**
 * Hook to access the current theme and theme setter
 */
export function useTheme(): {
	theme: ThemeConfig;
	setTheme: (theme: ThemeConfig) => void;
	themeName: string;
	setThemeName: (name: string) => void;
} {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
}
