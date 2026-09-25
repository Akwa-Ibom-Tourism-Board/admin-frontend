import type { LucideIcon } from "lucide-react";
import styled from "styled-components";
import { Skeleton } from "@/shared/ui/skeleton";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  loading?: boolean;
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 1.25rem 1.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

const Value = styled.p`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Hint = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const StatCard = ({ title, value, icon: Icon, hint, loading }: StatCardProps) => {
  if (loading) {
    return (
      <Wrapper>
        <Row>
          <Skeleton $width="50%" $height="0.75rem" />
          <Skeleton $width="2.25rem" $height="2.25rem" />
        </Row>
        <Skeleton $width="60%" $height="1.75rem" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Row>
        <Title>{title}</Title>
        <IconWrapper>
          <Icon size={18} />
        </IconWrapper>
      </Row>
      <Value>{typeof value === "number" ? value.toLocaleString() : value}</Value>
      {hint && <Hint>{hint}</Hint>}
    </Wrapper>
  );
};
