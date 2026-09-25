import type { ReactNode } from "react";
import styled from "styled-components";
import { media } from "@/theme";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Subtitle = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => (
  <Wrapper>
    <div>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </div>
    {action}
  </Wrapper>
);
