import axios, { type AxiosError } from "axios";
import { config } from "./config";
import { tokenStorage } from "./storage";
import { ApiError } from "./apiError";

/** Messages the backend sends on a 401 that mean "the session itself is
 * dead" (bad/expired refresh token, no token at all) as opposed to a 401
 * that a silent token refresh could still recover from. */
const SESSION_ENDING_MESSAGES = [
  "please login again",
  "login required",
  "refresh token not found",
  "refresh token expired",
  "login again, invalid token",
  "user not authorized",
];

const isSessionEnding = (message: string): boolean => {
  const lower = message.toLowerCase();
  return SESSION_ENDING_MESSAGES.some((trigger) => lower.includes(trigger));
};

interface ErrorEnvelope {
  message?: string;
  errors?: string[];
}

const extractErrorMessage = (error: AxiosError): string => {
  const data = error.response?.data as ErrorEnvelope | string | undefined;
  if (typeof data === "string" && data.trim().length > 0) return data;
  if (data && typeof data === "object") {
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors[0];
    }
    if (typeof data.message === "string" && data.message.trim().length > 0) {
      return data.message;
    }
  }
  return error.message || "Something went wrong, please try again.";
};

/** Fired when a request comes back with a session-ending 401, so anything
 * that cares (currently just AuthContext) can react without the http layer
 * importing React/router/toast concerns directly. */
export const authEvents = new EventTarget();

export const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((request) => {
  const accessToken = tokenStorage.getAccessToken();
  const refreshToken = tokenStorage.getRefreshToken();

  if (accessToken) {
    request.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (refreshToken) {
    request.headers.set("x-refresh-token", refreshToken);
  }

  return request;
});

httpClient.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["x-access-token"];
    const newRefreshToken = response.headers["x-refresh-token"];

    if (newAccessToken) tokenStorage.setAccessToken(newAccessToken);
    if (newRefreshToken) tokenStorage.setRefreshToken(newRefreshToken);

    return response;
  },
  (error: AxiosError) => {
    const message = extractErrorMessage(error);

    if (error.response?.status === 401 && isSessionEnding(message)) {
      authEvents.dispatchEvent(new Event("unauthorized"));
    }

    return Promise.reject(new ApiError(message, error.response?.status, error.response?.data));
  },
);
