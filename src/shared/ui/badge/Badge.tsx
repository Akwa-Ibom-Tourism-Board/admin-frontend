import type { ReactNode } from "react";
import styled, { css } from "styled-components";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantStyles = {
  success: css`
    background: ${({ theme }) => theme.alpha(theme.colors.success.DEFAULT, 0.12)};
    color: ${({ theme }) => theme.colors.success.DEFAULT};
  `,
  warning: css`
    background: ${({ theme }) => theme.alpha(theme.colors.warning.DEFAULT, 0.14)};
    color: ${({ theme }) => theme.colors.warning.DEFAULT};
  `,
  danger: css`
    background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.12)};
    color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  `,
  info: css`
    background: ${({ theme }) => theme.alpha(theme.colors.info.DEFAULT, 0.12)};
    color: ${({ theme }) => theme.colors.info.DEFAULT};
  `,
  neutral: css`
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
    color: ${({ theme }) => theme.colors.muted.foreground};
  `,
};

const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  white-space: nowrap;
  ${({ $variant }) => variantStyles[$variant]}
`;

export const Badge = ({ variant = "neutral", children }: BadgeProps) => (
  <StyledBadge $variant={variant}>{children}</StyledBadge>
);

/** Maps the backend's RegistrationStatus values to a Badge variant, so
 * every table/detail view renders status pills the same way. */
export const registrationStatusVariant: Record<string, BadgeVariant> = {
  Approved: "success",
  Pending: "warning",
  Rejected: "danger",
  Draft: "neutral",
};
