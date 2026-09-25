import type { ReactNode } from "react";
import styled from "styled-components";
import { Table, type Column } from "@/shared/ui";
import type { AdminAccount } from "../types";

export interface AdminsTableProps {
  admins: AdminAccount[];
  loading?: boolean;
  skeletonRows?: number;
  empty?: ReactNode;
}

const NameCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const Name = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Email = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export const AdminsTable = ({ admins, loading, skeletonRows, empty }: AdminsTableProps) => {
  const columns: Column<AdminAccount>[] = [
    {
      key: "name",
      header: "Name",
      cell: (admin) => (
        <NameCell>
          <Name>{admin.fullName}</Name>
          <Email>{admin.email}</Email>
        </NameCell>
      ),
    },
    {
      key: "phoneNumber",
      header: "Phone",
      cell: (admin) => admin.phoneNumber ?? "—",
    },
    {
      key: "createdAt",
      header: "Created",
      cell: (admin) => formatDate(admin.createdAt),
    },
  ];

  return <Table columns={columns} rows={admins} rowKey={(admin) => admin.id} loading={loading} skeletonRows={skeletonRows} empty={empty} />;
};
