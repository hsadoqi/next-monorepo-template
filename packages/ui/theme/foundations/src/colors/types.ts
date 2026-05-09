export type ColorValue = string;

export type ColorScale = {
	50: ColorValue;
	100: ColorValue;
	200: ColorValue;
	300: ColorValue;
	400: ColorValue;
	500: ColorValue;
	600: ColorValue;
	700: ColorValue;
	800: ColorValue;
	900: ColorValue;
	950: ColorValue;
};

export type ColorPalette = {
	primary: ColorScale;
	secondary: ColorScale;
	accent: ColorScale;
	neutral: ColorScale;
	success: ColorScale;
	warning: ColorScale;
	error: ColorScale;
	info: ColorScale;
};

export type SemanticColors = {
	background: ColorValue;
	foreground: ColorValue;
	card: ColorValue;
	"card-foreground": ColorValue;
	popover: ColorValue;
	"popover-foreground": ColorValue;
	primary: ColorValue;
	"primary-foreground": ColorValue;
	secondary: ColorValue;
	"secondary-foreground": ColorValue;
	muted: ColorValue;
	"muted-foreground": ColorValue;
	accent: ColorValue;
	"accent-foreground": ColorValue;
	destructive: ColorValue;
	"destructive-foreground": ColorValue;
	border: ColorValue;
	input: ColorValue;
	ring: ColorValue;
};
