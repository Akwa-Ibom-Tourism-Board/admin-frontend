import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Menu, ChevronDown, ShieldCheck, UserPlus, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { media } from "@/theme";

interface TopbarProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.topBar};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${media.lg} {
    padding: 0.875rem 2rem;
  }
`;

const MenuButton = styled.button`
  display: inline-flex;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;

  ${media.lg} {
    display: none;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const AccountWrapper = styled.div`
  position: relative;
`;

const AccountButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.375rem 0.625rem;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  background: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

const Avatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-size: 0.8125rem;
  font-weight: 700;
`;

const AccountText = styled.span`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;

  ${media.sm} {
    display: flex;
  }
`;

const AccountName = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const AccountRole = styled.span`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 12rem;
  background: ${({ theme }) => theme.colors.popover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: none;
  background: none;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.foreground};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "A";

export const Topbar = ({ onMenuClick, onLogout }: TopbarProps) => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const name = user?.fullName ?? "Admin";

  return (
    <Wrapper>
      <MenuButton onClick={onMenuClick} aria-label="Open menu" type="button">
        <Menu size={22} />
      </MenuButton>
      <Spacer />
      <ThemeToggle />
      <AccountWrapper>
        <AccountButton type="button" onClick={() => setMenuOpen((prev) => !prev)}>
          <Avatar>{getInitials(name)}</Avatar>
          <AccountText>
            <AccountName>{name}</AccountName>
            <AccountRole>Administrator</AccountRole>
          </AccountText>
          <ChevronDown size={14} />
        </AccountButton>
        {menuOpen && (
          <Dropdown onMouseLeave={() => setMenuOpen(false)}>
            <DropdownItem as={Link} to="/account/admins" onClick={() => setMenuOpen(false)}>
              <ShieldCheck size={16} />
              Admins
            </DropdownItem>
            <DropdownItem as={Link} to="/account/create-admin" onClick={() => setMenuOpen(false)}>
              <UserPlus size={16} />
              Create Admin
            </DropdownItem>
            <DropdownItem
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
            >
              <LogOut size={16} />
              Logout
            </DropdownItem>
          </Dropdown>
        )}
      </AccountWrapper>
    </Wrapper>
  );
};
