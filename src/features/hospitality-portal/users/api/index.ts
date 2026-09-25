import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { buildQueryParams, httpClient, parsePaginationHeaders, type PaginationMeta } from "@/shared/lib";
import type { EntityType, RegistrationStatus } from "@/shared/content";
import type { AdminUser, UserDetail } from "@/features/hospitality-portal/users/types";

// `role` is deliberately not a filter here — `GET /admin/users` is now fixed
// server-side to regular (non-admin) accounts; list admin accounts via the
// separate `features/admin-accounts` `/admin/admins` endpoint instead.
export interface GetUsersParams {
  search?: string;
  sortBy?: "fullName" | "firstName" | "lastName" | "email" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface GetUserEstablishmentsParams {
  search?: string;
  entityType?: EntityType;
  registrationStatus?: RegistrationStatus;
  sortBy?: "businessName" | "entityType" | "registrationStatus" | "submittedAt" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface GetUsersResult {
  items: AdminUser[];
  pagination: PaginationMeta;
}

/** List endpoint: pagination travels in response headers, body `data` is a
 * flat array. */
export const getUsers = async (params: GetUsersParams = {}): Promise<GetUsersResult> => {
  const response = await httpClient.get("/admin/users", {
    params: buildQueryParams(params as unknown as Record<string, unknown>),
  });
  return {
    items: response.data.data,
    pagination: parsePaginationHeaders(response),
  };
};

/** Detail endpoint: the `params` here filter/paginate the user's OWNED
 * establishments (not the user record). That pagination comes back nested
 * in the body (`data.establishmentsPagination`), not in response headers -
 * a different convention from the list endpoint since the primary resource
 * is the user, not the establishments array. */
export const getUser = async (id: string, params: GetUserEstablishmentsParams = {}): Promise<UserDetail> => {
  const { data } = await httpClient.get(`/admin/users/${id}`, {
    params: buildQueryParams(params as unknown as Record<string, unknown>),
  });
  return data.data;
};

export function useUsers(params: GetUsersParams = {}) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
}

export function useUser(id: string | undefined, params: GetUserEstablishmentsParams = {}) {
  return useQuery({
    queryKey: ["admin-user", id, params],
    queryFn: () => getUser(id as string, params),
    enabled: Boolean(id),
    placeholderData: keepPreviousData,
  });
}
