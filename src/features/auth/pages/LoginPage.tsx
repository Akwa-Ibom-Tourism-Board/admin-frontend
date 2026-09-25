import styled from "styled-components";
import { LoginForm } from "../components/LoginForm";
import { ThemeToggle } from "@/shared/components";
import { media } from "@/theme";

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.gradients.sidebar};
`;

const ToggleWrapper = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 26rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: 2.25rem 2rem;

  ${media.sm} {
    padding: 2.75rem;
  }
`;

const Logos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
`;

const Logo = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  object-fit: contain;
`;

const Title = styled.h1`
  margin: 0 0 0.375rem;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Subtitle = styled.p`
  margin: 0 0 2rem;
  font-size: 0.8125rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const LoginPage = () => (
  <Wrapper>
    <ToggleWrapper>
      <ThemeToggle />
    </ToggleWrapper>
    <Card>
      <Logos>
        <Logo src="/akwa-ibom-logo-main.png" alt="Government of Akwa Ibom State" />
        <Logo src="/arise-logo-main.png" alt="ARISE Akwa Ibom" />
      </Logos>
      <Title>AKHTDC Admin Portal</Title>
      <Subtitle>Sign in to manage hospitality registrations</Subtitle>
      <LoginForm />
    </Card>
  </Wrapper>
);
