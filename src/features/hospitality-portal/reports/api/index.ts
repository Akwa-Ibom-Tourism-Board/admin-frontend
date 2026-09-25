import { getEstablishments } from "@/features/hospitality-portal/entities/api";
import type { Establishment, EstablishmentListParams } from "@/features/hospitality-portal/entities/types";

/** No admin-wide "export everything" endpoint exists (`/analytics/export` is
 * owner-scoped, not admin-wide), so a full export is built by looping the
 * paginated list endpoint (shared with the entities feature) at its max page
 * size until every page has been fetched, honoring whatever filters are
 * currently set. */
const EXPORT_PAGE_LIMIT = 100;

export type ExportFilters = Omit<EstablishmentListParams, "page" | "limit">;

export const fetchAllEstablishments = async (filters: ExportFilters = {}): Promise<Establishment[]> => {
  const rows: Establishment[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const { items, pagination } = await getEstablishments({ ...filters, page, limit: EXPORT_PAGE_LIMIT });
    rows.push(...items);
    totalPages = pagination.totalPages;
    page += 1;
  } while (page <= totalPages);

  return rows;
};
