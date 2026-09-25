import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildQueryParams, httpClient, parsePaginationHeaders, type PaginationMeta } from "@/shared/lib";
import type { CreateAdminPayload, SerializedAdmin } from "@/features/auth/api/types";
import type { AdminAccount } from "../types";

export const createAdmin = async (payload: CreateAdminPayload): Promise<SerializedAdmin> => {
  const { data } = await httpClient.post("/admin/create-admin", payload);
  return data.data;
};

export function useCreateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-accounts"] });
    },
  });
}

export interface GetAdminsParams {
  search?: string;
  sortBy?: "fullName" | "firstName" | "lastName" | "email" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface GetAdminsResult {
  items: AdminAccount[];
  pagination: PaginationMeta;
}

export const getAdmins = async (params: GetAdminsParams = {}): Promise<GetAdminsResult> => {
  const response = await httpClient.get("/admin/admins", { params: buildQueryParams(params) });
  return {
    items: response.data.data,
    pagination: parsePaginationHeaders(response),
  };
};

export function useAdmins(params: GetAdminsParams = {}) {
  return useQuery({
    queryKey: ["admin-accounts", params],
    queryFn: () => getAdmins(params),
    placeholderData: keepPreviousData,
  });
}
