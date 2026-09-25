import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/shared/lib";
import type { AnalyticsSummary } from "../types";

/**
 * The one real admin-wide aggregate endpoint. No params, no pagination —
 * used by both the Overview stat grid and the Analytics entity-type
 * doughnut (its figures are exact, unlike the LGA sample chart).
 */
export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const { data } = await httpClient.get("/admin/establishments/analytics-data");
  return data.data;
};

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: ["admin-establishments-analytics-summary"],
    queryFn: getAnalyticsSummary,
  });
}
