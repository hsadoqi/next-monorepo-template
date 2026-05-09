// Font family definitions for different themes

// Professional theme - serif fonts for headings, clean sans for body
export const professionalFonts = {
	sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	serif: '"Crimson Text", "Times New Roman", serif',
	mono: '"JetBrains Mono", "Fira Code", monospace',
};

// Futuristic theme - monospace and geometric fonts
export const futuristicFonts = {
	sans: '"JetBrains Mono", "Fira Code", "SF Mono", monospace',
	serif: '"Space Grotesk", "Orbitron", sans-serif',
	mono: '"JetBrains Mono", "Fira Code", "SF Mono", monospace',
};

// Fantasy theme - decorative serif fonts
export const fantasyFonts = {
	sans: '"Crimson Text", "Times New Roman", serif',
	serif: '"Cinzel", "Trajan Pro", "Times New Roman", serif',
	mono: '"Courier New", monospace',
};

// Neon theme - bold, modern fonts
export const neonFonts = {
	sans: '"Bebas Neue", "Impact", sans-serif',
	serif: '"Anton", "Oswald", sans-serif',
	mono: '"Share Tech Mono", monospace',
};

// Default theme - clean, modern fonts
export const defaultFonts = {
	sans: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	serif: '"Geist", "Times New Roman", serif',
	mono: '"Geist Mono", "JetBrains Mono", monospace',
};

export const fontCollections = {
	default: defaultFonts,
	professional: professionalFonts,
	futuristic: futuristicFonts,
	fantasy: fantasyFonts,
	neon: neonFonts,
} as const;

export type FontCollectionName = keyof typeof fontCollections;
