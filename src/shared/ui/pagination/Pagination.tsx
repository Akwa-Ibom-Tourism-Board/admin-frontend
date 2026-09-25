import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

type PageToken = number | "ellipsis";

const getPageTokens = (current: number, total: number): PageToken[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const tokens: PageToken[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) tokens.push("ellipsis");
  for (let page = start; page <= end; page += 1) tokens.push(page);
  if (end < total - 1) tokens.push("ellipsis");
  tokens.push(total);

  return tokens;
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Summary = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

const PageButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  min-width: 2rem;
  padding: 0 0.5rem;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : theme.colors.background)};
  color: ${({ theme, $active }) => ($active ? theme.colors.secondary.foreground : theme.colors.foreground)};
  font-size: 0.8125rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme, $active }) => (!$active ? theme.colors.muted.DEFAULT : undefined)};
  }
`;

const Ellipsis = styled.span`
  padding: 0 0.375rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const Pagination = ({ page, totalPages, totalCount, limit, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const rangeStart = (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, totalCount);

  return (
    <Wrapper>
      <Summary>
        Showing {rangeStart}–{rangeEnd} of {totalCount}
      </Summary>
      <Controls>
        <NavButton
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={16} />
        </NavButton>

        {getPageTokens(page, totalPages).map((token, index) =>
          token === "ellipsis" ? (
            <Ellipsis key={`ellipsis-${index}`}>&hellip;</Ellipsis>
          ) : (
            <PageButton
              key={token}
              type="button"
              $active={token === page}
              onClick={() => onPageChange(token)}
            >
              {token}
            </PageButton>
          ),
        )}

        <NavButton
          type="button"
          aria-label="Next page"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={16} />
        </NavButton>
      </Controls>
    </Wrapper>
  );
};
