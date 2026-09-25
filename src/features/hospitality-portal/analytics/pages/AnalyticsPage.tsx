import { useMemo } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import styled from "styled-components";
import { AlertCircle, PieChart as PieChartIcon } from "lucide-react";
import { PageHeader, EmptyState } from "@/shared/components";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Skeleton } from "@/shared/ui";
import { ApiError } from "@/shared/lib";
import { useTheme } from "@/theme";
import { useAnalyticsSummary } from "@/features/hospitality-portal/overview/api";
import { useEstablishments } from "@/features/hospitality-portal/entities/api";
import "../lib/chartSetup";

// No per-LGA aggregate endpoint exists, so the LGA bar chart derives an
// approximate breakdown from the most recent page of establishments
// (limit=100, the API's max page size) — a sample, not the full dataset.
const SAMPLE_LIMIT = 100;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 300px;
`;

const Caption = styled.p`
  margin: 0.75rem 0 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const AnalyticsPage = () => {
  const theme = useTheme();
  const summaryQuery = useAnalyticsSummary();
  const sampleQuery = useEstablishments({ limit: SAMPLE_LIMIT });
  const sample = sampleQuery.data?.items;

  const doughnutData = useMemo(() => {
    if (!summaryQuery.data) return null;
    const { totalEntities, totalHotels, totalRestaurants, totalBarsAndLounges } = summaryQuery.data;
    // "Other" lumps tour operators/travel agents/hospitality orgs/other —
    // the analytics-data endpoint doesn't break those out further.
    const other = Math.max(totalEntities - totalHotels - totalRestaurants - totalBarsAndLounges, 0);
    return {
      labels: ["Hotels", "Restaurants", "Bars & Lounges", "Other"],
      datasets: [
        {
          data: [totalHotels, totalRestaurants, totalBarsAndLounges, other],
          backgroundColor: [
            theme.colors.secondary.DEFAULT,
            theme.colors.info.DEFAULT,
            theme.colors.success.DEFAULT,
            theme.colors.warning.DEFAULT,
          ],
          borderColor: theme.colors.card,
          borderWidth: 2,
        },
      ],
    };
  }, [summaryQuery.data, theme]);

  const lgaBreakdown = useMemo(() => {
    if (!sample) return [];
    const counts = new Map<string, number>();
    for (const row of sample) {
      const key = row.localGovernment ?? "Unknown";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [sample]);

  const barData = useMemo(() => {
    if (lgaBreakdown.length === 0) return null;
    return {
      labels: lgaBreakdown.map(([lga]) => lga),
      datasets: [
        {
          label: "Registrations",
          data: lgaBreakdown.map(([, count]) => count),
          backgroundColor: theme.colors.secondary.DEFAULT,
          borderRadius: 4,
        },
      ],
    };
  }, [lgaBreakdown, theme]);

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: theme.colors.foreground, usePointStyle: true },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = typeof context.parsed === "number" ? context.parsed : 0;
            const dataset = (context.dataset.data as number[]) ?? [];
            const total = dataset.reduce((sum, entry) => sum + (entry ?? 0), 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  const barOptions: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.x} registration${context.parsed.x === 1 ? "" : "s"}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { precision: 0, color: theme.colors.muted.foreground },
        grid: { color: theme.colors.border },
      },
      y: {
        ticks: { color: theme.colors.foreground },
        grid: { display: false },
      },
    },
  };

  return (
    <div>
      <PageHeader title="Analytics" />

      <Grid>
        <Card>
          <CardHeader>
            <CardTitle>Entity Type Breakdown</CardTitle>
            <CardDescription>Exact counts from the establishments analytics summary.</CardDescription>
          </CardHeader>
          <CardContent>
            {summaryQuery.isLoading && (
              <ChartWrapper>
                <Skeleton $height="100%" />
              </ChartWrapper>
            )}

            {summaryQuery.isError && !summaryQuery.isLoading && (
              <EmptyState
                icon={AlertCircle}
                title="Couldn't load entity-type data"
                message={
                  summaryQuery.error instanceof ApiError
                    ? summaryQuery.error.message
                    : "Something went wrong while loading the analytics summary."
                }
              />
            )}

            {!summaryQuery.isLoading &&
              !summaryQuery.isError &&
              summaryQuery.data &&
              (summaryQuery.data.totalEntities === 0 ? (
                <EmptyState
                  icon={PieChartIcon}
                  title="No establishments yet"
                  message="Once entities are registered, their type breakdown will appear here."
                />
              ) : (
                doughnutData && (
                  <ChartWrapper>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                  </ChartWrapper>
                )
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registrations by Local Government</CardTitle>
            <CardDescription>
              Approximate — derived from a sample of the most recent registrations, not an exact total.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sampleQuery.isLoading && (
              <ChartWrapper>
                <Skeleton $height="100%" />
              </ChartWrapper>
            )}

            {sampleQuery.isError && !sampleQuery.isLoading && (
              <EmptyState
                icon={AlertCircle}
                title="Couldn't load local government data"
                message={
                  sampleQuery.error instanceof ApiError
                    ? sampleQuery.error.message
                    : "Something went wrong while sampling establishments."
                }
              />
            )}

            {!sampleQuery.isLoading &&
              !sampleQuery.isError &&
              (lgaBreakdown.length === 0 ? (
                <EmptyState
                  icon={AlertCircle}
                  title="No data available"
                  message="No establishments were found to sample."
                />
              ) : (
                <>
                  <ChartWrapper>
                    {barData && <Bar data={barData} options={barOptions} />}
                  </ChartWrapper>
                  <Caption>
                    Based on a sample of the most recent {sample?.length ?? 0} registration
                    {sample?.length === 1 ? "" : "s"} — not the full dataset.
                  </Caption>
                </>
              ))}
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
