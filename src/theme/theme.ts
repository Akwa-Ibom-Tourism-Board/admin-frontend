import { colors, type ColorPalette } from "./colors";
import { withAlpha } from "./utils";

export const buildTheme = (palette: ColorPalette) =>
  ({
    colors: {
      background: palette.background,
      foreground: palette.foreground,
      card: palette.card,
      cardForeground: palette.cardForeground,
      popover: palette.popover,
      popoverForeground: palette.popoverForeground,
      primary: { DEFAULT: palette.primary, foreground: palette.primaryForeground },
      secondary: { DEFAULT: palette.secondary, foreground: palette.secondaryForeground },
      muted: { DEFAULT: palette.muted, foreground: palette.mutedForeground },
      accent: { DEFAULT: palette.accent, foreground: palette.accentForeground },
      destructive: { DEFAULT: palette.destructive, foreground: palette.destructiveForeground },
      success: { DEFAULT: palette.success, foreground: palette.successForeground },
      warning: { DEFAULT: palette.warning, foreground: palette.warningForeground },
      info: { DEFAULT: palette.info, foreground: palette.infoForeground },
      border: palette.border,
      input: palette.input,
      ring: palette.ring,
      white: palette.white,
      black: palette.black,
      navHover: palette.navHover,
      heroDeep: palette.heroDeep,
      gray700: palette.gray700,
      gray500: palette.gray500,
    },
    alpha: withAlpha,
    gradients: {
      // Deliberately NOT derived from `palette.primary`: that token is
      // brightened in dark mode for text/icon contrast, which makes it too
      // vivid as a background fill. The sidebar is a persistent dark
      // "chrome" rail — same look in both light and dark mode, like most
      // enterprise dashboards — so it always uses the light palette's deep
      // green regardless of which theme is active.
      sidebar: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.heroDeep} 100%)`,
      accent: `linear-gradient(135deg, ${palette.secondary}, ${palette.accent})`,
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    },
    radii: {
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      full: "9999px",
    },
    fonts: {
      sans: "'Montserrat', system-ui, sans-serif",
      display: "'Montserrat', system-ui, sans-serif",
    },
    breakpoints: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: { maxWidth: "1400px", padding: "1rem" },
    zIndex: { dropdown: 40, sticky: 45, topBar: 50, sidebar: 50, modal: 60, floatingAction: 55 },
    transitions: { fast: "150ms ease", base: "300ms ease", slow: "500ms ease" },
  }) as const;

export const theme = buildTheme(colors);
export type Theme = typeof theme;
