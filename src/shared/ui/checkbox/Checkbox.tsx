import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import styled from "styled-components";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
`;

const StyledCheckbox = styled.input`
  width: 1.05rem;
  height: 1.05rem;
  accent-color: ${({ theme }) => theme.colors.primary.DEFAULT};
  cursor: pointer;
`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => (
    <Wrapper>
      <StyledCheckbox ref={ref} type="checkbox" {...props} />
      {label}
    </Wrapper>
  ),
);
Checkbox.displayName = "Checkbox";
