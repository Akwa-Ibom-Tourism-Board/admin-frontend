import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ShieldCheck, UserPlus } from "lucide-react";
import { PageHeader, EmptyState } from "@/shared/components";
import { Button, Card, Input, Pagination, Select } from "@/shared/ui";
import { useDebounce, usePagination } from "@/shared/hooks";
import { useAdmins, type GetAdminsParams } from "../api";
import { AdminsTable } from "../components/AdminsTable";

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

export const AdminsListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("createdAt:desc");

  const debouncedSearch = useDebounce(search, 300);
  const [sortBy, sortOrder] = sort.split(":") as [GetAdminsParams["sortBy"], GetAdminsParams["sortOrder"]];

  const filtersKey = useMemo(() => JSON.stringify({ debouncedSearch, sort }), [debouncedSearch, sort]);
  const { page, limit, setPage } = usePagination(filtersKey);

  const { data, isPending } = useAdmins({
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
      icon={ShieldCheck}
      title="No matching admins"
      message="No admin accounts match your search. Try a different term."
      action={{ label: "Clear search", onClick: () => setSearch("") }}
    />
  ) : (
    <EmptyState icon={ShieldCheck} title="No admins yet" message="Admin accounts you create will show up here." />
  );

  return (
    <div>
      <PageHeader
        title="Admins"
        subtitle="Staff with access to this portal"
        action={
          <Button onClick={() => navigate("/account/create-admin")}>
            <UserPlus size={16} /> Create admin
          </Button>
        }
      />

      <FilterBar>
        <SearchField>
          <Input
            placeholder="Search by name or email..."
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
        <AdminsTable admins={items} loading={isPending} skeletonRows={limit} empty={emptyState} />
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
