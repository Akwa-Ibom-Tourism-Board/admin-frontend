import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyle, ThemeModeProvider, darkTheme, theme, useThemeMode } from "@/theme";
import { queryClient } from "@/shared/lib";
import { Toaster } from "@/shared/ui";
import { AuthProvider } from "@/features/auth/context/AuthContext";

const StyledThemeBridge = ({ children }: { children: ReactNode }) => {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : theme}>
      <GlobalStyle />
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeModeProvider>
    <StyledThemeBridge>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </StyledThemeBridge>
  </ThemeModeProvider>
);
