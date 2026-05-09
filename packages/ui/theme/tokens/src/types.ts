import type {
	ColorPalette,
	FontTokens,
	SemanticColors,
	ShadowTokens,
	SpacingTokens,
} from "@repo/ui-theme-foundations";

export type ThemeMode = "light" | "dark";

export type ThemeConfig = {
	name: string;
	colors: ColorPalette;
	semanticColors: Record<ThemeMode, SemanticColors>;
	spacing: SpacingTokens;
	typography: FontTokens;
	shadows: ShadowTokens;
};

export type ThemePreset = {
	name: string;
	config: ThemeConfig;
};

export type CSSVariables = Record<string, string>;
