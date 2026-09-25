import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, buildQueryParams, httpClient, parsePaginationHeaders, type PaginationMeta } from "@/shared/lib";
import { toast } from "@/shared/ui";
import type {
  BulkAddPayload,
  BulkAddResult,
  Establishment,
  EstablishmentListParams,
  EstablishmentUpdatePayload,
} from "../types";

export const getEstablishments = async (
  params: EstablishmentListParams,
): Promise<{ items: Establishment[]; pagination: PaginationMeta }> => {
  const response = await httpClient.get("/admin/establishments", {
    params: buildQueryParams(params),
  });
  return {
    items: (response.data.data ?? []) as Establishment[],
    pagination: parsePaginationHeaders(response, params.limit),
  };
};

export const getEstablishment = async (id: string): Promise<Establishment> => {
  const { data } = await httpClient.get(`/admin/establishments/${id}`);
  return data.data;
};

export const approveEstablishment = async (id: string): Promise<Establishment> => {
  const { data } = await httpClient.patch(`/admin/establishments/${id}/approve`);
  return data.data;
};

export const rejectEstablishment = async (id: string, rejectionReason: string): Promise<Establishment> => {
  const { data } = await httpClient.patch(`/admin/establishments/${id}/reject`, { rejectionReason });
  return data.data;
};

export const updateEstablishment = async (
  id: string,
  payload: EstablishmentUpdatePayload,
): Promise<Establishment> => {
  const { data } = await httpClient.patch(`/admin/establishments/${id}`, payload);
  return data.data;
};

export const bulkAddEstablishments = async (payload: BulkAddPayload): Promise<BulkAddResult> => {
  const { data } = await httpClient.post("/admin/bulk-add-establishments", payload);
  return data.data;
};

const errorMessage = (error: unknown, fallback: string): string =>
  error instanceof ApiError ? error.message : fallback;

export function useEstablishments(params: EstablishmentListParams) {
  return useQuery({
    queryKey: ["establishments", params],
    queryFn: () => getEstablishments(params),
    placeholderData: keepPreviousData,
  });
}

export function useEstablishment(id: string | undefined) {
  return useQuery({
    queryKey: ["establishments", "detail", id],
    queryFn: () => getEstablishment(id as string),
    enabled: Boolean(id),
  });
}

export function useApproveEstablishment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveEstablishment,
    onSuccess: (establishment) => {
      queryClient.invalidateQueries({ queryKey: ["establishments"] });
      toast.success(`${establishment.businessName ?? "Establishment"} approved.`);
    },
    onError: (error) => {
      toast.error(errorMessage(error, "Could not approve this establishment."));
    },
  });
}

export function useRejectEstablishment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rejectionReason }: { id: string; rejectionReason: string }) =>
      rejectEstablishment(id, rejectionReason),
    onSuccess: (establishment) => {
      queryClient.invalidateQueries({ queryKey: ["establishments"] });
      toast.success(`${establishment.businessName ?? "Establishment"} rejected.`);
    },
    onError: (error) => {
      toast.error(errorMessage(error, "Could not reject this establishment."));
    },
  });
}

export function useUpdateEstablishment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: EstablishmentUpdatePayload }) =>
      updateEstablishment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishments"] });
      toast.success("Changes saved.");
    },
    onError: (error) => {
      toast.error(errorMessage(error, "Could not save changes."));
    },
  });
}

export function useBulkAddEstablishments() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkAddEstablishments,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["establishments"] });
      if (result.failed > 0) {
        toast.error(
          `${result.successful} registered, ${result.failed} failed. Check the flagged rows below.`,
        );
      } else {
        toast.success(
          `${result.successful} establishment${result.successful === 1 ? "" : "s"} registered.`,
        );
      }
    },
    onError: (error) => {
      toast.error(errorMessage(error, "Could not submit registrations."));
    },
  });
}
