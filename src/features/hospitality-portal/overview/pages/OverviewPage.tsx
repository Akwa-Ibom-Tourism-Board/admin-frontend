import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  AlertCircle,
  BarChart3,
  Building2,
  ClipboardList,
  FileSpreadsheet,
  GlassWater,
  Hotel,
  MapPin,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { PageHeader, EmptyState } from "@/shared/components";
import { StatCard, SkeletonCardGrid, Card, CardHeader, CardTitle, CardContent } from "@/shared/ui";
import { ApiError } from "@/shared/lib";
import { useAnalyticsSummary } from "../api";

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const ActionLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.125rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: border-color ${({ theme }) => theme.transitions.fast}, background ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.06)};
  }
`;

const ActionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.12)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

const QUICK_ACTIONS = [
  {
    to: "/hospitality-portal/entities?registrationStatus=Pending",
    label: "Review pending entities",
    icon: ClipboardList,
  },
  { to: "/hospitality-portal/users", label: "Manage users", icon: Users },
  { to: "/hospitality-portal/analytics", label: "View analytics", icon: BarChart3 },
  { to: "/hospitality-portal/reports", label: "Export reports", icon: FileSpreadsheet },
];

export const OverviewPage = () => {
  const { data, isLoading, isError, error } = useAnalyticsSummary();

  return (
    <div>
      <PageHeader title="Overview" subtitle="Welcome to the admin dashboard" />

      {isLoading && (
        <SkeletonCardGrid style={{ marginBottom: "2rem" }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <StatCard key={index} title="" value="" icon={Building2} loading />
          ))}
        </SkeletonCardGrid>
      )}

      {isError && !isLoading && (
        <Card style={{ marginBottom: "2rem" }}>
          <CardContent>
            <EmptyState
              icon={AlertCircle}
              title="Couldn't load dashboard stats"
              message={
                error instanceof ApiError
                  ? error.message
                  : "Something went wrong while loading the analytics summary."
              }
            />
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && data && (
        <StatGrid>
          <StatCard title="Total Entities" value={data.totalEntities} icon={Building2} />
          <StatCard title="Hotels" value={data.totalHotels} icon={Hotel} />
          <StatCard title="Restaurants" value={data.totalRestaurants} icon={UtensilsCrossed} />
          <StatCard title="Bars & Lounges" value={data.totalBarsAndLounges} icon={GlassWater} />
          <StatCard
            title="Registrations This Month"
            value={data.totalRegistrationsThisMonth}
            icon={ClipboardList}
          />
          <StatCard
            title="Top Local Government"
            value={data.topLocalGovernmentRegistered?.localGovernment ?? "—"}
            icon={MapPin}
            hint={
              data.topLocalGovernmentRegistered
                ? `${data.topLocalGovernmentRegistered.count} registrations`
                : undefined
            }
          />
        </StatGrid>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ActionsGrid>
            {QUICK_ACTIONS.map(({ to, label, icon: Icon }) => (
              <ActionLink key={to} to={to}>
                <ActionIcon>
                  <Icon size={18} />
                </ActionIcon>
                {label}
              </ActionLink>
            ))}
          </ActionsGrid>
        </CardContent>
      </Card>
    </div>
  );
};
