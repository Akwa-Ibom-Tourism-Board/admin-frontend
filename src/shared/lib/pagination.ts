import type { AxiosResponse } from "axios";

export const DEFAULT_PAGE_SIZE = 20;

export interface PaginationMeta {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

/** The backend returns list pagination via response headers (the response
 * body for these endpoints is a flat array), see
 * `hotel-management-backend/src/configurations/pagination.ts`. */
export const parsePaginationHeaders = (response: AxiosResponse, fallbackLimit = DEFAULT_PAGE_SIZE): PaginationMeta => {
  const headers = response.headers;
  const total = Number(headers["x-total-count"] ?? 0);
  const page = Number(headers["x-page"] ?? 1);
  const totalPages = Number(headers["x-total-pages"] ?? 1);
  const limit = Number(headers["x-limit"] ?? fallbackLimit);

  return {
    total: Number.isFinite(total) ? total : 0,
    page: Number.isFinite(page) ? page : 1,
    totalPages: Number.isFinite(totalPages) ? Math.max(totalPages, 1) : 1,
    limit: Number.isFinite(limit) ? limit : fallbackLimit,
  };
};

/** Drops undefined/null/empty-string values so axios doesn't serialize
 * "unset" filters as literal query params (e.g. `?search=`).
 *
 * Takes `object` rather than a generic `T extends Record<string, unknown>`
 * deliberately: a concrete interface without an index signature satisfies
 * `object` as an argument (normal structural assignability) but fails a
 * `Record<string, unknown>` *generic constraint* check, which would force
 * every call site to cast. This still returns a properly narrowed type via
 * a separate type parameter inferred from the argument, without imposing
 * that constraint on it. */
export const buildQueryParams = <T extends object>(params: T): Partial<T> => {
  const result: Partial<T> = {};
  for (const key of Object.keys(params) as (keyof T)[]) {
    const value = params[key];
    if (value === undefined || value === null || value === "") continue;
    result[key] = value;
  }
  return result;
};
