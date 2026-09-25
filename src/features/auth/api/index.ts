import { httpClient } from "@/shared/lib";
import type { LoginPayload, LoginResponse } from "./types";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await httpClient.post("/admin/login", payload);
  return data.data;
};

/** Best-effort server-side session invalidation (clears the stored refresh
 * token). There's no dedicated `/admin/logout` route — the generic
 * `/auth/logout` works for any authenticated role since it just acts on
 * the JWT's own user id. */
export const logout = async (): Promise<void> => {
  await httpClient.post("/auth/logout");
};
