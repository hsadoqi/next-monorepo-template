# @repo/theme-core

Theme creation utilities, defaults, and validation.

## Features

- Create custom themes by extending presets
- Theme validation and error checking
- Pre-built default themes
- Type-safe theme configuration

## Usage

```typescript
import { createTheme, defaultThemes } from '@repo/theme-core';

// Create a custom theme
const customTheme = createTheme({
  base: 'professional',
  overrides: {
    colors: {
      primary: {
        500: 'oklch(0.6 0.3 120)', // Custom green primary
      },
    },
  },
});

// Use a default theme
const theme = defaultThemes.futuristic;
```