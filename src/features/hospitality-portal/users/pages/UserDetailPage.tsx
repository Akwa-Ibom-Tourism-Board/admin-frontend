import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Building2, UserRound } from "lucide-react";
import { PageHeader, EmptyState } from "@/shared/components";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Pagination,
  registrationStatusVariant,
  Select,
  Table,
  type Column,
} from "@/shared/ui";
import { ApiError, DEFAULT_PAGE_SIZE } from "@/shared/lib";
import { useDebounce, usePagination } from "@/shared/hooks";
import { ENTITY_TYPE_LABELS, ENTITY_TYPES, REGISTRATION_STATUSES, type EntityType, type RegistrationStatus } from "@/shared/content";
import { useUser } from "@/features/hospitality-portal/users/api";
import type { OwnedEstablishment } from "@/features/hospitality-portal/users/types";

const ProfileGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1.25rem;
  margin: 0;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FieldLabel = styled.dt`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const FieldValue = styled.dd`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const SectionHeading = styled.h2`
  margin: 2rem 0 1rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

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
  width: 11rem;
`;

const formatDate = (value: string | null): string =>
  value
    ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

export const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [entityType, setEntityType] = useState<EntityType | "">("");
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus | "">("");

  const debouncedSearch = useDebounce(search, 300);

  const filtersKey = useMemo(
    () => JSON.stringify({ debouncedSearch, entityType, registrationStatus }),
    [debouncedSearch, entityType, registrationStatus],
  );
  const { page, limit, setPage } = usePagination(filtersKey);

  const { data, isPending, isError, error } = useUser(id, {
    search: debouncedSearch || undefined,
    entityType: entityType || undefined,
    registrationStatus: registrationStatus || undefined,
    page,
    limit,
  });

  if (isError) {
    const notFound = error instanceof ApiError && error.statusCode === 404;
    return (
      <EmptyState
        icon={UserRound}
        title={notFound ? "User not found" : "Something went wrong"}
        message={
          notFound
            ? "This user doesn't exist or may have been removed."
            : error instanceof ApiError
              ? error.message
              : "Could not load this user. Please try again."
        }
        action={{ label: "Back to users", onClick: () => navigate("/hospitality-portal/users") }}
      />
    );
  }

  const hasActiveFilters =
    debouncedSearch.trim().length > 0 || entityType !== "" || registrationStatus !== "";

  const columns: Column<OwnedEstablishment>[] = [
    {
      key: "businessName",
      header: "Business",
      cell: (row) => row.businessName,
    },
    {
      key: "entityType",
      header: "Type",
      cell: (row) => ENTITY_TYPE_LABELS[row.entityType] ?? row.entityType,
    },
    {
      key: "registrationStatus",
      header: "Status",
      cell: (row) => (
        <Badge variant={registrationStatusVariant[row.registrationStatus]}>{row.registrationStatus}</Badge>
      ),
    },
    {
      key: "localGovernment",
      header: "LGA",
      cell: (row) => row.localGovernment ?? "—",
    },
    {
      key: "submittedAt",
      header: "Submitted",
      cell: (row) => formatDate(row.submittedAt),
    },
  ];

  const establishments = data?.establishments ?? [];
  const establishmentsPagination = data?.establishmentsPagination;

  const emptyState = hasActiveFilters ? (
    <EmptyState
      icon={Building2}
      title="No matching establishments"
      message="No establishments match the current search or filters."
      action={{
        label: "Clear filters",
        onClick: () => {
          setSearch("");
          setEntityType("");
          setRegistrationStatus("");
        },
      }}
    />
  ) : (
    <EmptyState
      icon={Building2}
      title="No establishments"
      message="This user doesn't own any establishments yet."
    />
  );

  return (
    <div>
      <PageHeader title={data?.fullName ?? "User"} subtitle={data?.email} />

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileGrid>
            <Field>
              <FieldLabel>Full name</FieldLabel>
              <FieldValue>{data?.fullName ?? (isPending ? "Loading..." : "—")}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldValue>{data?.email ?? "—"}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Phone number</FieldLabel>
              <FieldValue>{data?.phoneNumber ?? "—"}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Role</FieldLabel>
              <FieldValue>
                {data ? (
                  <Badge variant={data.role === "admin" ? "info" : "neutral"}>{data.role}</Badge>
                ) : (
                  "—"
                )}
              </FieldValue>
            </Field>
            {data?.nin && (
              <Field>
                <FieldLabel>NIN</FieldLabel>
                <FieldValue>{data.nin}</FieldValue>
              </Field>
            )}
            <Field>
              <FieldLabel>Joined</FieldLabel>
              <FieldValue>{data ? formatDate(data.createdAt) : "—"}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Establishments</FieldLabel>
              <FieldValue>{data?.establishmentCount ?? "—"}</FieldValue>
            </Field>
          </ProfileGrid>
        </CardContent>
      </Card>

      <SectionHeading>Owned establishments</SectionHeading>

      <FilterBar>
        <SearchField>
          <Input
            placeholder="Search by business name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </SearchField>
        <FilterField>
          <Select value={entityType} onChange={(event) => setEntityType(event.target.value as EntityType | "")}>
            <option value="">All types</option>
            {ENTITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {ENTITY_TYPE_LABELS[type]}
              </option>
            ))}
          </Select>
        </FilterField>
        <FilterField>
          <Select
            value={registrationStatus}
            onChange={(event) => setRegistrationStatus(event.target.value as RegistrationStatus | "")}
          >
            <option value="">All statuses</option>
            {REGISTRATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </FilterField>
      </FilterBar>

      <Card>
        <Table
          columns={columns}
          rows={establishments}
          rowKey={(row) => row.id}
          loading={isPending}
          skeletonRows={limit}
          empty={emptyState}
          onRowClick={(row) => navigate(`/hospitality-portal/entities/${row.id}`)}
        />
        {establishmentsPagination && (
          <Pagination
            page={establishmentsPagination.page}
            totalPages={establishmentsPagination.totalPages}
            totalCount={establishmentsPagination.total}
            limit={establishmentsPagination.limit || DEFAULT_PAGE_SIZE}
            onPageChange={setPage}
          />
        )}
      </Card>
    </div>
  );
};
