import type { ThemeConfig } from "@repo/ui-theme-tokens";

export type ThemeOptions = Partial<ThemeConfig>;

export type ThemeValidationResult = {
	isValid: boolean;
	errors: string[];
	warnings: string[];
};

export type CreateThemeOptions = {
	base?: string; // preset name to extend
	overrides?: ThemeOptions;
	validate?: boolean;
};
