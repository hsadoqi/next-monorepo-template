export type FontFamily = string;
export type FontSize = string;
export type FontWeight = string | number;
export type LineHeight = string | number;
export type LetterSpacing = string;

export type TypographyScale = {
	xs: FontSize;
	sm: FontSize;
	base: FontSize;
	lg: FontSize;
	xl: FontSize;
	"2xl": FontSize;
	"3xl": FontSize;
	"4xl": FontSize;
	"5xl": FontSize;
	"6xl": FontSize;
	"7xl": FontSize;
	"8xl": FontSize;
	"9xl": FontSize;
};

export type FontTokens = {
	family: {
		sans: FontFamily;
		serif: FontFamily;
		mono: FontFamily;
	};
	weight: {
		thin: FontWeight;
		light: FontWeight;
		normal: FontWeight;
		medium: FontWeight;
		semibold: FontWeight;
		bold: FontWeight;
		extrabold: FontWeight;
		black: FontWeight;
	};
	size: TypographyScale;
	lineHeight: {
		none: LineHeight;
		tight: LineHeight;
		snug: LineHeight;
		normal: LineHeight;
		relaxed: LineHeight;
		loose: LineHeight;
	};
	letterSpacing: {
		tighter: LetterSpacing;
		tight: LetterSpacing;
		normal: LetterSpacing;
		wide: LetterSpacing;
		wider: LetterSpacing;
		widest: LetterSpacing;
	};
};
