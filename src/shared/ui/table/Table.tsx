import type { ReactNode } from "react";
import styled from "styled-components";
import { shimmer } from "@/theme";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  skeletonRows?: number;
  empty?: ReactNode;
  onRowClick?: (row: T) => void;
}

const Scroller = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

const Th = styled.th<{ $align?: string }>`
  padding: 0.75rem 1.25rem;
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.colors.muted.foreground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;

const Tr = styled.tr<{ $clickable?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme, $clickable }) => ($clickable ? theme.colors.muted.DEFAULT : "transparent")};
  }
`;

const Td = styled.td<{ $align?: string }>`
  padding: 0.875rem 1.25rem;
  text-align: ${({ $align }) => $align ?? "left"};
  color: ${({ theme }) => theme.colors.foreground};
  vertical-align: middle;
`;

const SkeletonBar = styled.div`
  height: 0.875rem;
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

const EmptyRow = styled.div`
  padding: 3rem 1.5rem;
`;

export function Table<T>({
  columns,
  rows,
  rowKey,
  loading,
  skeletonRows = 5,
  empty,
  onRowClick,
}: TableProps<T>) {
  return (
    <Scroller>
      <StyledTable>
        <Thead>
          <tr>
            {columns.map((column) => (
              <Th key={column.key} $align={column.align} style={{ width: column.width }}>
                {column.header}
              </Th>
            ))}
          </tr>
        </Thead>
        {!loading && rows.length > 0 && (
          <tbody>
            {rows.map((row) => (
              <Tr key={rowKey(row)} $clickable={Boolean(onRowClick)} onClick={() => onRowClick?.(row)}>
                {columns.map((column) => (
                  <Td key={column.key} $align={column.align}>
                    {column.cell(row)}
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        )}
        {loading && (
          <tbody>
            {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <Tr key={rowIndex}>
                {columns.map((column) => (
                  <Td key={column.key}>
                    <SkeletonBar />
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        )}
      </StyledTable>
      {!loading && rows.length === 0 && <EmptyRow>{empty}</EmptyRow>}
    </Scroller>
  );
}
