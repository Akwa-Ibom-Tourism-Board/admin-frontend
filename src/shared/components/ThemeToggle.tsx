import styled from "styled-components";
import { Moon, Sun } from "lucide-react";
import { useThemeMode } from "@/theme";

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

export const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();
  return (
    <ToggleButton
      type="button"
      onClick={toggleMode}
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mode === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </ToggleButton>
  );
};
