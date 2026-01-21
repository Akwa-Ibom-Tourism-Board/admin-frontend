/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loginAdmin,
  getAllEstablishments,
  getSingleEstablishment,
  approveEntityRegistration,
  addEstablishments,
  getEstablishmentAnalyticsData,
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

export function useGetSingleEstablishment() {
  return useQuery({
    queryKey: ["getSingleEstablishments"],
    queryFn: () => getSingleEstablishment,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
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
      queryClient.invalidateQueries({
        queryKey: ["getAllEstablishments", "getEstablishmentsAnalyticsData"],
      });
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
