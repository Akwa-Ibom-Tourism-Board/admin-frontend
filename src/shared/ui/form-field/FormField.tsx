import type { ReactNode } from "react";
import styled from "styled-components";
import { Label } from "@/shared/ui/label";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const HintText = styled.p`
  margin: -0.125rem 0 0.375rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const ErrorText = styled.p`
  margin: 0.375rem 0 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
`;

export const FormField = ({ label, required, optional, error, hint, children }: FormFieldProps) => (
  <Field>
    <Label $required={required} $optional={optional}>
      {label}
    </Label>
    {hint && <HintText>{hint}</HintText>}
    {children}
    {error && <ErrorText>{error}</ErrorText>}
  </Field>
);
