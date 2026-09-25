import type { LucideIcon } from "lucide-react";
import styled from "styled-components";
import { Button } from "@/shared/ui";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.08)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Message = styled.p`
  margin: 0 0 1.25rem;
  max-width: 26rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const EmptyState = ({ icon: Icon, title, message, action }: EmptyStateProps) => (
  <Wrapper>
    {Icon && (
      <IconWrapper>
        <Icon size={22} />
      </IconWrapper>
    )}
    <Title>{title}</Title>
    <Message>{message}</Message>
    {action && (
      <Button size="sm" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </Wrapper>
);
