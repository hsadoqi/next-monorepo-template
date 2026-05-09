# @repo/theme-foundations

Design tokens and foundation values for theming.

## Features

- **Colors**: OKLch-based color palettes with semantic mappings
- **Spacing**: Configurable spacing scales and tokens
- **Typography**: Font families, sizes, weights, and spacing
- **Shadows**: Shadow scales for depth and elevation
- **Tokens**: CSS variable generation utilities

## Usage

```typescript
import { colorPalettes, spacingScales, fontCollections } from '@repo/theme-foundations';

// Use a color palette
const primaryColor = colorPalettes.professional.primary[500];

// Use spacing
const padding = spacingScales.base[4];

// Use fonts
const headingFont = fontCollections.professional.serif;
```