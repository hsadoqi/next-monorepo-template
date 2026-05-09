# @repo/theme-react

React integration for the theme system, providing providers and hooks for theme management.

## Installation

```bash
pnpm add @repo/theme-react
```

## Usage

### ThemeProvider

Wrap your app with the ThemeProvider to enable theme management:

```tsx
import { ThemeProvider } from '@repo/theme-react';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Hooks

Use the provided hooks to access and manage themes:

```tsx
import { useTheme, useThemeMode } from '@repo/theme-react';

function MyComponent() {
  const { theme, setTheme, themeName, setThemeName } = useTheme();
  const { isDark, toggle, setDark } = useThemeMode();

  return (
    <div>
      <p>Current theme: {themeName}</p>
      <button onClick={toggle}>
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
```

## API

### ThemeProvider

Props:
- `initialTheme?: ThemeConfig` - Initial theme configuration
- `initialThemeName?: string` - Initial theme name (default: 'default')

### useTheme

Returns:
- `theme: ThemeConfig` - Current theme configuration
- `setTheme: (theme: ThemeConfig) => void` - Set a new theme
- `themeName: string` - Current theme name
- `setThemeName: (name: string) => void` - Set theme name

### useThemeMode

Returns:
- `isDark: boolean` - Whether dark mode is active
- `toggle: () => void` - Toggle between dark and light mode
- `setDark: (dark: boolean) => void` - Set dark mode explicitly