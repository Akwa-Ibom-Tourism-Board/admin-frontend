/**
 * Brand tokens sourced from the Akwa Ibom "Mbopo" design system
 * (mbopo_akwa_ibom_design), adapted for a professional/enterprise admin UI:
 * less rounded, with dedicated success/warning/info tokens the public-site
 * palette doesn't define.
 */
export const colors = {
  background: "#FFFFFF",
  foreground: "#111928",

  card: "#FFFFFF",
  cardForeground: "#111928",

  popover: "#FFFFFF",
  popoverForeground: "#111928",

  primary: "#003922",
  primaryForeground: "#FFFFFF",

  secondary: "#FE6201",
  secondaryForeground: "#FFFFFF",

  muted: "#F9FAFB",
  mutedForeground: "#6B7280",

  accent: "#CB4E01",
  accentForeground: "#FFFFFF",

  destructive: "#EF4444",
  destructiveForeground: "#FFFFFF",

  success: "#16A34A",
  successForeground: "#FFFFFF",

  warning: "#D97706",
  warningForeground: "#FFFFFF",

  info: "#2563EB",
  infoForeground: "#FFFFFF",

  border: "#E5E7EB",
  input: "#E5E7EB",
  ring: "#FE6201",

  white: "#FFFFFF",
  black: "#000000",

  navHover: "#002F20",
  heroDeep: "#00120C",

  gray700: "#374151",
  gray500: "#6B7280",
} as const;

export type ColorPalette = { [K in keyof typeof colors]: string };
