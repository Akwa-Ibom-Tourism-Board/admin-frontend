import styled from "styled-components";

export const Label = styled.label<{ $required?: boolean; $optional?: boolean }>`
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 0.375rem;

  ${({ $required, theme }) =>
    $required &&
    `
    &::after {
      content: " *";
      color: ${theme.colors.destructive.DEFAULT};
    }
  `}

  ${({ $optional, theme }) =>
    $optional &&
    `
    &::after {
      content: " (optional)";
      font-weight: 400;
      color: ${theme.colors.muted.foreground};
    }
  `}
`;
