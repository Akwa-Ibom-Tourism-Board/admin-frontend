/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loginAdmin,
  getAllEstablishments,
  getSingleEstablishment,
  approveEntityRegistration,
  addEstablishments,
  getEstablishmentAnalyticsData,
  updateEstablishment,
} from "./api";

export function useLoginAdmin() {
  return useMutation({
    mutationFn: loginAdmin,
    onSuccess: async () => {},
    onError: (error: any) => {
      console.error("Error Registering Establishment:", error);
    },
  });
}

export function useGetEstablishments() {
  return useQuery({
    queryKey: ["getAllEstablishments"],
    queryFn: () => getAllEstablishments(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useGetSingleEstablishment(establishmentId: any) {
  return useQuery({
    queryKey: ["getSingleEstablishment", establishmentId],
    queryFn: () => getSingleEstablishment(establishmentId),
    enabled: !!establishmentId,
    retry: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useApproveEstablishmentRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveEntityRegistration,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllEstablishments"],
      });
    },
    onError: (error: any) => {
      console.error("Error approving entity:", error);
    },
  });
}

export function useAdminAddEstablishment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEstablishments,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getAllEstablishments"] });
      queryClient.invalidateQueries({ queryKey: ["getEstablishmentsAnalyticsData"] });
    },
    onError: (error: any) => {
      console.error("Error adding entity:", error.message);
    },
  });
}

export function useGetEstablishmentsAnalyticsData() {
  return useQuery({
    queryKey: ["getEstablishmentsAnalyticsData"],
    queryFn: () => getEstablishmentAnalyticsData(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export const useUpdateEstablishment = (establishmentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateData: Record<string, any>) =>
      updateEstablishment(updateData, establishmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishments"] });
      queryClient.invalidateQueries({
        queryKey: ["establishment", establishmentId],
      });
    },
  });
};
