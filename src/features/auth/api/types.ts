export interface SerializedAdmin {
  id: string;
  fullName: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  nin: string | null;
  dateOfBirth: string | null;
  role: "admin" | "user";
  emailVerified: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: SerializedAdmin;
}

export interface CreateAdminPayload {
  fullName: string;
  email: string;
  password: string;
}
