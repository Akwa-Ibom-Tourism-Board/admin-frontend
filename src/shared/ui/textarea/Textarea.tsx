import { forwardRef, type TextareaHTMLAttributes } from "react";
import styled from "styled-components";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const StyledTextarea = styled.textarea<{ $invalid?: boolean }>`
  width: 100%;
  min-height: 6rem;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.destructive.DEFAULT : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted.foreground};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.alpha(theme.colors.ring, 0.15)};
  }
`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ invalid, ...props }, ref) => <StyledTextarea ref={ref} $invalid={invalid} {...props} />,
);
Textarea.displayName = "Textarea";
