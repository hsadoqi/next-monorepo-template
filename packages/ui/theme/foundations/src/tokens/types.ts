export type CSSToken = string;
export type CSSVariable = `--${string}`;
export type CSSValue = string;

export type TokenCollection = Record<string, CSSToken>;

export type ThemeTokens = {
	colors: TokenCollection;
	spacing: TokenCollection;
	typography: TokenCollection;
	shadows: TokenCollection;
};
