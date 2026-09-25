import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { login as loginApi, logout as logoutApi } from "../api";
import type { LoginPayload, SerializedAdmin } from "../api/types";
import { adminStorage, authEvents, tokenStorage } from "@/shared/lib";

interface AuthContextValue {
  user: SerializedAdmin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<SerializedAdmin>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SerializedAdmin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // There's no `GET /admin/me` endpoint, so the session is hydrated
  // directly from the `admin` profile cookie set at login rather than
  // re-fetched from the server. If the profile cookie is missing while an
  // access token is present, treat the session as invalid rather than
  // guessing at a user.
  useEffect(() => {
    const accessToken = tokenStorage.getAccessToken();
    const admin = adminStorage.get<SerializedAdmin>();

    if (accessToken && admin) {
      setUser(admin);
    } else {
      tokenStorage.clear();
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      tokenStorage.clear();
      setUser(null);
    };
    authEvents.addEventListener("unauthorized", handleUnauthorized);
    return () => authEvents.removeEventListener("unauthorized", handleUnauthorized);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const session = await loginApi(payload);
    tokenStorage.setAccessToken(session.token);
    tokenStorage.setRefreshToken(session.refreshToken);
    adminStorage.set(session.user);
    setUser(session.user);
    return session.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // clear the local session regardless of whether the server call succeeded
    }
    tokenStorage.clear();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, isAuthenticated: Boolean(user), login, logout }),
    [user, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
