import type { ReactNode } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Table, type Column } from "@/shared/ui";
import type { AdminUser } from "@/features/hospitality-portal/users/types";

export interface UsersTableProps {
  users: AdminUser[];
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

export const UsersTable = ({ users, loading, skeletonRows, empty }: UsersTableProps) => {
  const navigate = useNavigate();

  const columns: Column<AdminUser>[] = [
    {
      key: "name",
      header: "Name",
      cell: (user) => (
        <NameCell>
          <Name>{user.fullName}</Name>
          <Email>{user.email}</Email>
        </NameCell>
      ),
    },
    {
      key: "establishmentCount",
      header: "Establishments",
      align: "right",
      cell: (user) => user.establishmentCount,
    },
    {
      key: "createdAt",
      header: "Joined",
      cell: (user) => formatDate(user.createdAt),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={users}
      rowKey={(user) => user.id}
      loading={loading}
      skeletonRows={skeletonRows}
      empty={empty}
      onRowClick={(user) => navigate(`/hospitality-portal/users/${user.id}`)}
    />
  );
};
