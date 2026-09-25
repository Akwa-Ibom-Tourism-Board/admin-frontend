import type { ColorPalette } from "./colors";

/**
 * Dark-mode palette — invented (mbopo defines no dark mode), derived the
 * same way a sibling app inverts its light palette: dark green surfaces,
 * a lighter primary for contrast against them, orange/status accents kept
 * consistent with light mode.
 */
export const darkColors: ColorPalette = {
  background: "#00120C",
  foreground: "#F3F7F5",

  card: "#062A1B",
  cardForeground: "#F3F7F5",

  popover: "#062A1B",
  popoverForeground: "#F3F7F5",

  primary: "#1F8F5E",
  primaryForeground: "#00120C",

  secondary: "#FE6201",
  secondaryForeground: "#FFFFFF",

  muted: "#0B1F16",
  mutedForeground: "#9FB8AC",

  accent: "#E07A2B",
  accentForeground: "#FFFFFF",

  destructive: "#F87171",
  destructiveForeground: "#2B0A0A",

  success: "#34D399",
  successForeground: "#052E1C",

  warning: "#FBBF24",
  warningForeground: "#3A2705",

  info: "#60A5FA",
  infoForeground: "#0B2545",

  border: "#1E3A2D",
  input: "#1E3A2D",
  ring: "#FE6201",

  white: "#FFFFFF",
  black: "#000000",

  navHover: "#0A3524",
  heroDeep: "#00120C",

  gray700: "#D1D5DB",
  gray500: "#9CA3AF",
} as const;
