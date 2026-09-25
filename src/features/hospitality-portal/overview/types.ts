/**
 * Response shape of `GET /admin/establishments/analytics-data` — the only
 * real admin-wide aggregate endpoint the backend exposes today. There is no
 * server-side status-breakdown or per-LGA-breakdown endpoint; anything the
 * UI derives beyond these fields must come from a sampled `/admin/establishments`
 * fetch and be labeled as approximate (see the `analytics` feature).
 */
export interface AnalyticsSummary {
  totalEntities: number;
  totalHotels: number;
  totalRestaurants: number;
  totalBarsAndLounges: number;
  totalRegistrationsThisMonth: number;
  topLocalGovernmentRegistered: { localGovernment: string; count: number } | null;
}
