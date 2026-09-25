import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { Download, Info } from "lucide-react";
import { PageHeader } from "@/shared/components";
import { Button, Card, CardContent, FormField, Select, toast } from "@/shared/ui";
import { ApiError, downloadCsv } from "@/shared/lib";
import { ENTITY_TYPES, ENTITY_TYPE_LABELS, REGISTRATION_STATUSES } from "@/shared/content";
import type { EntityType } from "@/shared/content";
import type { Establishment, FilterableRegistrationStatus } from "@/features/hospitality-portal/entities/types";
import { fetchAllEstablishments } from "../api";

// Admin views never include Drafts (they aren't real submissions yet).
const EXPORTABLE_STATUSES = REGISTRATION_STATUSES.filter((status) => status !== "Draft");

const Notice = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.875rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.info.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.info.DEFAULT};
  font-size: 0.8125rem;
  line-height: 1.5;
`;

const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const formatDate = (value: string | null): string => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
};

const CSV_COLUMNS: { key: keyof Establishment; header: string }[] = [
  { key: "businessName", header: "Business Name" },
  { key: "uniqueBusinessId", header: "Unique Business ID" },
  { key: "entityType", header: "Entity Type" },
  { key: "registrationStatus", header: "Status" },
  { key: "localGovernment", header: "Local Government" },
  { key: "businessPhoneNumber", header: "Business Phone" },
  { key: "businessEmail", header: "Business Email" },
  { key: "contactName", header: "Contact Name" },
  { key: "submittedAt", header: "Submitted Date" },
  { key: "approvedAt", header: "Approved Date" },
];

export const ReportsPage = () => {
  const [registrationStatus, setRegistrationStatus] = useState<FilterableRegistrationStatus | "">("");
  const [entityType, setEntityType] = useState<EntityType | "">("");

  const exportMutation = useMutation({
    mutationFn: fetchAllEstablishments,
  });

  const handleExport = async () => {
    try {
      const rows = await exportMutation.mutateAsync({
        registrationStatus: registrationStatus || undefined,
        entityType: entityType || undefined,
      });

      const formattedRows = rows.map((row) => ({
        ...row,
        entityType: ENTITY_TYPE_LABELS[row.entityType] ?? row.entityType,
        submittedAt: formatDate(row.submittedAt),
        approvedAt: formatDate(row.approvedAt),
      }));

      downloadCsv("establishments-export.csv", CSV_COLUMNS, formattedRows);
      toast.success(`Exported ${rows.length} establishment${rows.length === 1 ? "" : "s"} to CSV.`);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Could not export establishments.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Exports a live snapshot of current establishment data — not a scheduled or saved report"
      />

      <Notice>
        <Info size={18} />
        <span>
          There is no server-side reporting engine — this pulls every establishment matching the filters
          below, right now, and builds a CSV in your browser. Run it again any time to get an up-to-date
          export; nothing here is saved or scheduled.
        </span>
      </Notice>

      <Card>
        <CardContent>
          <FiltersRow>
            <FormField label="Registration status" optional>
              <Select
                value={registrationStatus}
                onChange={(event) =>
                  setRegistrationStatus(event.target.value as FilterableRegistrationStatus | "")
                }
              >
                <option value="">All statuses</option>
                {EXPORTABLE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Entity type" optional>
              <Select
                value={entityType}
                onChange={(event) => setEntityType(event.target.value as EntityType | "")}
              >
                <option value="">All types</option>
                {ENTITY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {ENTITY_TYPE_LABELS[type]}
                  </option>
                ))}
              </Select>
            </FormField>
          </FiltersRow>

          <Actions>
            <Button onClick={handleExport} loading={exportMutation.isPending} disabled={exportMutation.isPending}>
              <Download size={16} />
              {exportMutation.isPending ? "Exporting…" : "Export to CSV"}
            </Button>
          </Actions>
        </CardContent>
      </Card>
    </div>
  );
};
