import styled from "styled-components";
import { shimmer } from "@/theme";

export const Skeleton = styled.div<{ $height?: string; $width?: string }>`
  height: ${({ $height }) => $height ?? "1rem"};
  width: ${({ $width }) => $width ?? "100%"};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.muted.DEFAULT} 25%,
    ${({ theme }) => theme.colors.border} 37%,
    ${({ theme }) => theme.colors.muted.DEFAULT} 63%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

export const SkeletonCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
`;
