import styled from "styled-components";
import { Loader2 } from "lucide-react";
import { spin } from "@/theme";

export interface PageLoaderProps {
  title?: string;
  subtitle?: string;
  fullScreen?: boolean;
}

const Wrapper = styled.div<{ $fullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1.5rem;
  ${({ $fullScreen }) => $fullScreen && `height: 100vh;`}
`;

const Spinner = styled(Loader2)`
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  animation: ${spin} 0.8s linear infinite;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const PageLoader = ({ title = "Loading…", subtitle, fullScreen }: PageLoaderProps) => (
  <Wrapper $fullScreen={fullScreen}>
    <Spinner size={28} />
    <Title>{title}</Title>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </Wrapper>
);
