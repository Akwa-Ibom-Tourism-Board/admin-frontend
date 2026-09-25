import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const ADMIN_KEY = "admin";

const cookieOptions = {
  expires: 30,
  secure: true,
  sameSite: "strict" as const,
};

export const tokenStorage = {
  getAccessToken: () => Cookies.get(ACCESS_TOKEN_KEY),
  getRefreshToken: () => Cookies.get(REFRESH_TOKEN_KEY),
  setAccessToken: (token: string) => Cookies.set(ACCESS_TOKEN_KEY, token, cookieOptions),
  setRefreshToken: (token: string) => Cookies.set(REFRESH_TOKEN_KEY, token, cookieOptions),
  clear: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    Cookies.remove(ADMIN_KEY);
  },
};

export const adminStorage = {
  get: <T,>(): T | null => {
    const raw = Cookies.get(ADMIN_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
  set: (admin: unknown) => Cookies.set(ADMIN_KEY, JSON.stringify(admin), cookieOptions),
  clear: () => Cookies.remove(ADMIN_KEY),
};
