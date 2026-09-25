import { useMemo, useState } from "react";
import styled from "styled-components";
import { Users as UsersIcon } from "lucide-react";
import { PageHeader, EmptyState } from "@/shared/components";
import { Card, Input, Pagination, Select } from "@/shared/ui";
import { useDebounce, usePagination } from "@/shared/hooks";
import { useUsers, type GetUsersParams } from "@/features/hospitality-portal/users/api";
import { UsersTable } from "@/features/hospitality-portal/users/components/UsersTable";

type SortOption = "createdAt:desc" | "createdAt:asc" | "fullName:asc" | "fullName:desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "createdAt:desc", label: "Newest first" },
  { value: "createdAt:asc", label: "Oldest first" },
  { value: "fullName:asc", label: "Name (A-Z)" },
  { value: "fullName:desc", label: "Name (Z-A)" },
];

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const SearchField = styled.div`
  flex: 1 1 16rem;
  min-width: 12rem;
`;

const FilterField = styled.div`
  flex: 0 0 auto;
  width: 10rem;
`;

export const UsersListPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("createdAt:desc");

  const debouncedSearch = useDebounce(search, 300);
  const [sortBy, sortOrder] = sort.split(":") as [GetUsersParams["sortBy"], GetUsersParams["sortOrder"]];

  const filtersKey = useMemo(() => JSON.stringify({ debouncedSearch, sort }), [debouncedSearch, sort]);
  const { page, limit, setPage } = usePagination(filtersKey);

  const { data, isPending } = useUsers({
    search: debouncedSearch || undefined,
    sortBy,
    sortOrder,
    page,
    limit,
  });

  const hasActiveFilters = debouncedSearch.trim().length > 0;
  const items = data?.items ?? [];

  const emptyState = hasActiveFilters ? (
    <EmptyState
      icon={UsersIcon}
      title="No matching users"
      message="No users match your current search. Try a different term."
      action={{ label: "Clear search", onClick: () => setSearch("") }}
    />
  ) : (
    <EmptyState icon={UsersIcon} title="No users yet" message="No one has registered on the platform yet." />
  );

  return (
    <div>
      <PageHeader title="Users" subtitle="Everyone registered on the platform" />

      <FilterBar>
        <SearchField>
          <Input
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </SearchField>
        <FilterField>
          <Select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterField>
      </FilterBar>

      <Card>
        <UsersTable users={items} loading={isPending} skeletonRows={limit} empty={emptyState} />
        {data && (
          <Pagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            totalCount={data.pagination.total}
            limit={data.pagination.limit}
            onPageChange={setPage}
          />
        )}
      </Card>
    </div>
  );
};
