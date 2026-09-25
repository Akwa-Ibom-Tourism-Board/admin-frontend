import { forwardRef, type SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledSelect = styled.select<{ $invalid?: boolean }>`
  width: 100%;
  height: 2.5rem;
  padding: 0 2.25rem 0 0.875rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.destructive.DEFAULT : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  appearance: none;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.alpha(theme.colors.ring, 0.15)};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 0.75rem;
  display: inline-flex;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ invalid, children, ...props }, ref) => (
    <Wrapper>
      <StyledSelect ref={ref} $invalid={invalid} {...props}>
        {children}
      </StyledSelect>
      <IconWrapper>
        <ChevronDown size={16} />
      </IconWrapper>
    </Wrapper>
  ),
);
Select.displayName = "Select";
