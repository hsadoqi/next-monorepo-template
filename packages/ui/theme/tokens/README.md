# @repo/theme-tokens

CSS variable generation and theme presets.

## Features

- Generate CSS custom properties from theme configurations
- Pre-built theme presets (Professional, Futuristic, Fantasy, Neon, etc.)
- Light/dark mode support
- Integration with @repo/theme-foundations

## Usage

```typescript
import { generateThemeCSS, themePresets } from '@repo/theme-tokens';

// Generate CSS for a preset theme
const css = generateThemeCSS(themePresets.professional.config);

// Use in your styles
const styleTag = document.createElement('style');
styleTag.textContent = css;
document.head.appendChild(styleTag);
```