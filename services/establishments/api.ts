/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../axiosInstance";

export const loginAdmin = async (formData: Record<string, any>) => {
  const response = await axiosInstance.post("/admin/login", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getAllEstablishments = async () => {
  const response = await axiosInstance.get("/admin/establishments");
  return response.data;
};

export const getSingleEstablishment = async (establishmentId: string) => {
  const response = await axiosInstance.get(
    `/establishments/${establishmentId}`
  );
  return response.data;
};

export const approveEntityRegistration = async (establishmentId: string) => {
  const response = await axiosInstance.patch(
    `/admin/establishments/approve/${establishmentId}`
  );
  return response.data;
};
