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
    `/admin/establishments/${establishmentId}`,
  );
  return response.data;
};

export const approveEntityRegistration = async (establishmentId: string) => {
  const response = await axiosInstance.patch(
    `/admin/establishments/approve/${establishmentId}`,
  );
  return response.data;
};

export const addEstablishments = async (formData: any) => {
  // console.log("Payload being sent:", JSON.stringify(formData, null, 2));

  const response = await axiosInstance.post(
    "/admin/bulk-add-establishments",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const getEstablishmentAnalyticsData = async () => {
  const response = await axiosInstance.get(
    `/admin/establishments/analytics-data`,
  );
  return response.data;
};

export const updateEstablishment = async (
  updateData: Record<string, any>,
  establishmentId: string,
) => {
  const response = await axiosInstance.patch(
    `/admin/establishments/${establishmentId}`,
    updateData,
  );
  return response.data;
};
