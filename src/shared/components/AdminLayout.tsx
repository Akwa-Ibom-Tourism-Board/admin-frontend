import { useState, type ReactNode } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ConfirmModal } from "./ConfirmModal";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { useAuth } from "@/features/auth/context/AuthContext";
import { media } from "@/theme";

const Layout = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};

  ${media.lg} {
    padding-left: 16rem;
  }
`;

const ContentBody = styled.main`
  padding: 1.25rem;

  ${media.lg} {
    padding: 1.75rem 2rem;
  }
`;

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const { state, ask, close } = useConfirm();

  const handleLogoutClick = () => {
    ask({
      title: "Confirm logout",
      message: "Are you sure you want to log out of the admin portal?",
      confirmLabel: "Logout",
      variant: "destructive",
      onConfirm: async () => {
        await logout();
      },
    });
  };

  return (
    <Layout>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogoutClick} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} onLogout={handleLogoutClick} />
      <ContentBody>{children}</ContentBody>
      <ConfirmModal state={state} onClose={close} />
    </Layout>
  );
};
