import { forwardRef, type ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { Loader2 } from "lucide-react";
import { spin } from "@/theme";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.secondary.DEFAULT};
    color: ${({ theme }) => theme.colors.secondary.foreground};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.accent.DEFAULT};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.primary.DEFAULT};
    color: ${({ theme }) => theme.colors.primary.foreground};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.navHover};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.foreground};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.muted.DEFAULT};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.foreground};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.muted.DEFAULT};
    }
  `,
  destructive: css`
    background: ${({ theme }) => theme.colors.destructive.DEFAULT};
    color: ${({ theme }) => theme.colors.destructive.foreground};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      filter: brightness(0.92);
    }
  `,
};

const sizeStyles = {
  sm: css`
    height: 2.125rem;
    padding: 0 0.75rem;
    font-size: 0.8125rem;
  `,
  md: css`
    height: 2.5rem;
    padding: 0 1.25rem;
    font-size: 0.875rem;
  `,
  lg: css`
    height: 2.875rem;
    padding: 0 1.5rem;
    font-size: 0.9375rem;
  `,
  icon: css`
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
  `,
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.alpha(theme.colors.ring, 0.3)};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
`;

const Spinner = styled(Loader2)`
  animation: ${spin} 0.8s linear infinite;
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", loading = false, fullWidth, disabled, children, ...props },
    ref,
  ) => (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size={16} />}
      {children}
    </StyledButton>
  ),
);
Button.displayName = "Button";
