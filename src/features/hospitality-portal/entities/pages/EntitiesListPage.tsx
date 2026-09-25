import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Building2, CheckCircle2, Eye, Plus, Search, XCircle } from "lucide-react";
import { PageHeader, EmptyState } from "@/shared/components";
import { Button, Card, Table, Pagination } from "@/shared/ui";
import type { Column } from "@/shared/ui";
import { usePagination } from "@/shared/hooks";
import { ENTITY_TYPE_LABELS } from "@/shared/content";
import { EntityFilters } from "../components/EntityFilters";
import { StatusBadge } from "../components/StatusBadge";
import { BranchIndicator } from "../components/BranchIndicator";
import { ApproveDialog } from "../components/ApproveDialog";
import { RejectDialog } from "../components/RejectDialog";
import { useEstablishments, useApproveEstablishment, useRejectEstablishment } from "../api";
import type { Establishment, EntityType, FilterableRegistrationStatus } from "../types";

const BusinessName = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const BusinessEmail = styled.p`
  margin: 0.125rem 0 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const RowActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const EntitiesListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(
    () => searchParams.get("registrationStatus") ?? "",
  );
  const [entityType, setEntityType] = useState("");

  const filterKey = `${search}|${registrationStatus}|${entityType}`;
  const { page, limit, setPage } = usePagination(filterKey);

  const { data, isLoading } = useEstablishments({
    search: search || undefined,
    registrationStatus: (registrationStatus || undefined) as FilterableRegistrationStatus | undefined,
    entityType: (entityType || undefined) as EntityType | undefined,
    page,
    limit,
  });

  const establishments = data?.items ?? [];
  const pagination = data?.pagination;
  const hasActiveFilters = Boolean(search || registrationStatus || entityType);

  const { mutateAsync: approve, isPending: isApproving } = useApproveEstablishment();
  const { mutateAsync: reject, isPending: isRejecting } = useRejectEstablishment();

  const [approveTarget, setApproveTarget] = useState<Establishment | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Establishment | null>(null);

  const columns: Column<Establishment>[] = [
    {
      key: "business",
      header: "Business",
      cell: (row) => (
        <div>
          <BusinessName>{row.businessName ?? "Unnamed business"}</BusinessName>
          <BusinessEmail>{row.businessEmail ?? "No email on file"}</BusinessEmail>
          {row.parent && <BranchIndicator parent={row.parent} />}
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (row) => ENTITY_TYPE_LABELS[row.entityType],
    },
    {
      key: "lga",
      header: "Local Government",
      cell: (row) => row.localGovernment ?? "—",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.registrationStatus} />,
    },
    {
      key: "submittedAt",
      header: "Submitted",
      cell: (row) => (row.submittedAt ? new Date(row.submittedAt).toLocaleDateString() : "—"),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (row) => (
        <RowActions onClick={(event) => event.stopPropagation()}>
          <Button size="sm" variant="ghost" onClick={() => navigate(`/hospitality-portal/entities/${row.id}`)}>
            <Eye size={14} /> View
          </Button>
          {row.registrationStatus === "Pending" && (
            <>
              <Button size="sm" variant="outline" onClick={() => setApproveTarget(row)}>
                <CheckCircle2 size={14} /> Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => setRejectTarget(row)}>
                <XCircle size={14} /> Reject
              </Button>
            </>
          )}
        </RowActions>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Entities"
        subtitle="Review, approve, and manage hospitality establishment registrations"
        action={
          <Button onClick={() => navigate("/hospitality-portal/entities/register")}>
            <Plus size={16} /> Register entity
          </Button>
        }
      />

      <EntityFilters
        search={search}
        onSearchChange={setSearch}
        registrationStatus={registrationStatus}
        onRegistrationStatusChange={setRegistrationStatus}
        entityType={entityType}
        onEntityTypeChange={setEntityType}
      />

      <Card>
        <Table
          columns={columns}
          rows={establishments}
          rowKey={(row) => row.id}
          loading={isLoading}
          skeletonRows={limit}
          onRowClick={(row) => navigate(`/hospitality-portal/entities/${row.id}`)}
          empty={
            hasActiveFilters ? (
              <EmptyState icon={Search} title="No results" message="Try adjusting your search or filters." />
            ) : (
              <EmptyState
                icon={Building2}
                title="No entities yet"
                message="Registered hospitality establishments will show up here."
              />
            )
          }
        />
        {pagination && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            totalCount={pagination.total}
            limit={pagination.limit}
            onPageChange={setPage}
          />
        )}
      </Card>

      {approveTarget && (
        <ApproveDialog
          open={Boolean(approveTarget)}
          onOpenChange={(open) => !open && setApproveTarget(null)}
          businessName={approveTarget.businessName ?? "this establishment"}
          loading={isApproving}
          onConfirm={async () => {
            try {
              await approve(approveTarget.id);
              setApproveTarget(null);
            } catch {
              // The mutation hook already surfaces an error toast.
            }
          }}
        />
      )}

      {rejectTarget && (
        <RejectDialog
          open={Boolean(rejectTarget)}
          onOpenChange={(open) => !open && setRejectTarget(null)}
          businessName={rejectTarget.businessName ?? "this establishment"}
          loading={isRejecting}
          onSubmit={async (rejectionReason) => {
            try {
              await reject({ id: rejectTarget.id, rejectionReason });
              setRejectTarget(null);
            } catch {
              // The mutation hook already surfaces an error toast.
            }
          }}
        />
      )}
    </div>
  );
};
