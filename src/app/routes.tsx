import { lazy, Suspense, type ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFoundPage } from "./NotFoundPage";
import { PageLoader } from "@/shared/components";
import { LoginPage } from "@/features/auth/pages/LoginPage";

const CreateAdminPage = lazy(() =>
  import("@/features/admin-accounts/pages/CreateAdminPage").then((m) => ({ default: m.CreateAdminPage })),
);
const AdminsListPage = lazy(() =>
  import("@/features/admin-accounts/pages/AdminsListPage").then((m) => ({ default: m.AdminsListPage })),
);
const OverviewPage = lazy(() =>
  import("@/features/hospitality-portal/overview/pages/OverviewPage").then((m) => ({ default: m.OverviewPage })),
);
const EntitiesListPage = lazy(() =>
  import("@/features/hospitality-portal/entities/pages/EntitiesListPage").then((m) => ({
    default: m.EntitiesListPage,
  })),
);
const EntityDetailPage = lazy(() =>
  import("@/features/hospitality-portal/entities/pages/EntityDetailPage").then((m) => ({
    default: m.EntityDetailPage,
  })),
);
const RegisterEntityPage = lazy(() =>
  import("@/features/hospitality-portal/entities/pages/RegisterEntityPage").then((m) => ({
    default: m.RegisterEntityPage,
  })),
);
const UsersListPage = lazy(() =>
  import("@/features/hospitality-portal/users/pages/UsersListPage").then((m) => ({ default: m.UsersListPage })),
);
const UserDetailPage = lazy(() =>
  import("@/features/hospitality-portal/users/pages/UserDetailPage").then((m) => ({ default: m.UserDetailPage })),
);
// The heaviest chunk (chart.js) — worth its own lazy boundary so it never
// loads until an admin actually opens Analytics.
const AnalyticsPage = lazy(() =>
  import("@/features/hospitality-portal/analytics/pages/AnalyticsPage").then((m) => ({
    default: m.AnalyticsPage,
  })),
);
const ReportsPage = lazy(() =>
  import("@/features/hospitality-portal/reports/pages/ReportsPage").then((m) => ({ default: m.ReportsPage })),
);

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<PageLoader title="Loading…" />}>{element}</Suspense>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />

    <Route
      path="/hospitality-portal"
      element={<ProtectedRoute>{withSuspense(<OverviewPage />)}</ProtectedRoute>}
    />
    <Route
      path="/hospitality-portal/entities"
      element={<ProtectedRoute>{withSuspense(<EntitiesListPage />)}</ProtectedRoute>}
    />
    <Route
      path="/hospitality-portal/entities/register"
      element={<ProtectedRoute>{withSuspense(<RegisterEntityPage />)}</ProtectedRoute>}
    />
    <Route
      path="/hospitality-portal/entities/:id"
      element={<ProtectedRoute>{withSuspense(<EntityDetailPage />)}</ProtectedRoute>}
    />
    <Route
      path="/hospitality-portal/users"
      element={<ProtectedRoute>{withSuspense(<UsersListPage />)}</ProtectedRoute>}
    />
    <Route
      path="/hospitality-portal/users/:id"
      element={<ProtectedRoute>{withSuspense(<UserDetailPage />)}</ProtectedRoute>}
    />
    <Route
      path="/hospitality-portal/analytics"
      element={<ProtectedRoute>{withSuspense(<AnalyticsPage />)}</ProtectedRoute>}
    />
    <Route
      path="/hospitality-portal/reports"
      element={<ProtectedRoute>{withSuspense(<ReportsPage />)}</ProtectedRoute>}
    />

    <Route
      path="/account/admins"
      element={<ProtectedRoute>{withSuspense(<AdminsListPage />)}</ProtectedRoute>}
    />
    <Route
      path="/account/create-admin"
      element={<ProtectedRoute>{withSuspense(<CreateAdminPage />)}</ProtectedRoute>}
    />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
