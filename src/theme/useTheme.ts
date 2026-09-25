import { useTheme as useStyledTheme } from "styled-components";
import type { Theme } from "./theme";

export const useTheme = (): Theme => useStyledTheme() as Theme;
