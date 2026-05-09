import type { ThemeConfig } from "@repo/ui-theme-tokens";
import type { ReactNode } from "react";

export interface ThemeContextValue {
	theme: ThemeConfig;
	setTheme: (theme: ThemeConfig) => void;
	themeName: string;
	setThemeName: (name: string) => void;
}

export interface ThemeProviderProps {
	children: ReactNode;
	initialTheme?: ThemeConfig;
	initialThemeName?: string;
}
