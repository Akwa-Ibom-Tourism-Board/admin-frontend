import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  LayoutDashboard,
  Building2,
  FilePlus2,
  Users,
  BarChart3,
  Download,
  LogOut,
  X,
} from "lucide-react";
import { media } from "@/theme";

export interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", to: "/hospitality-portal", icon: LayoutDashboard, end: true },
  { label: "Entities", to: "/hospitality-portal/entities", icon: Building2 },
  { label: "Register Entity", to: "/hospitality-portal/entities/register", icon: FilePlus2 },
  { label: "Users", to: "/hospitality-portal/users", icon: Users },
  { label: "Analytics", to: "/hospitality-portal/analytics", icon: BarChart3 },
  { label: "Reports", to: "/hospitality-portal/reports", icon: Download },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.sidebar - 1};
  display: ${({ $open }) => ($open ? "block" : "none")};

  ${media.lg} {
    display: none;
  }
`;

const Aside = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 16rem;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.gradients.sidebar};
  z-index: ${({ theme }) => theme.zIndex.sidebar};
  transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
  transition: transform ${({ theme }) => theme.transitions.base};

  ${media.lg} {
    transform: none;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.25rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
`;

const BrandSubtitle = styled.span`
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.6);
`;

const CloseButton = styled.button`
  display: inline-flex;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;

  ${media.lg} {
    display: none;
  }
`;

const Nav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledNavLink = styled(NavLink)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255, 255, 255, 0.75)")};
  background: ${({ $active, theme }) => ($active ? theme.alpha(theme.colors.secondary.DEFAULT, 0.9) : "transparent")};
  border-left: 3px solid
    ${({ $active, theme }) => ($active ? theme.colors.secondary.DEFAULT : "transparent")};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.alpha(theme.colors.secondary.DEFAULT, 0.9) : "rgba(255, 255, 255, 0.08)"};
    color: #ffffff;
  }
`;

const Footer = styled.div`
  padding: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }
`;

export const Sidebar = ({ open, onClose, onLogout }: SidebarProps) => {
  const location = useLocation();

  // Only the single longest matching nav item is active — a plain
  // startsWith-per-item check would light up both "Entities" and
  // "Register Entity" at once, since the latter's path is nested under
  // the former's.
  const matchingItems = NAV_ITEMS.filter((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to),
  );
  const bestMatch = matchingItems.reduce<NavItem | null>(
    (best, item) => (!best || item.to.length > best.to.length ? item : best),
    null,
  );
  const isActive = (item: NavItem) => item === bestMatch;

  return (
    <>
      <Overlay $open={open} onClick={onClose} />
      <Aside $open={open}>
        <Brand>
          <BrandText>
            <BrandTitle>AKHTDC Admin</BrandTitle>
            <BrandSubtitle>Hospitality Portal</BrandSubtitle>
          </BrandText>
          <CloseButton onClick={onClose} aria-label="Close menu" type="button">
            <X size={20} />
          </CloseButton>
        </Brand>

        <Nav>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <StyledNavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                $active={isActive(item)}
              >
                <Icon size={18} />
                {item.label}
              </StyledNavLink>
            );
          })}
        </Nav>

        <Footer>
          <LogoutButton type="button" onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </LogoutButton>
        </Footer>
      </Aside>
    </>
  );
};
