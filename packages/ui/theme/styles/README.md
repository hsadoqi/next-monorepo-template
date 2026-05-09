# @repo/theme-styles

Global styles, theme presets, and style utilities.

## Features

- Global CSS with theme-aware custom properties
- Theme preset management and injection
- Dark mode utilities
- CSS custom property helpers

## Usage

```typescript
import { switchToPreset, toggleDarkMode } from '@repo/theme-styles';

// Switch to a theme preset
switchToPreset('professional');

// Toggle dark mode
toggleDarkMode();

// Import global styles
import '@repo/theme-styles/globals.css';
```

## CSS Custom Properties

The package provides CSS custom properties for:
- Colors (`--color-*`)
- Spacing (`--spacing-*`)
- Typography (`--font-*`, `--font-size-*`, etc.)
- Shadows (`--shadow-*`)

These can be used in your components and overridden by themes.