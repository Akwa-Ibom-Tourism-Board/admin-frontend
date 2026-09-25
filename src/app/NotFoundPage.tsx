import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
  padding: 1.5rem;
`;

const Code = styled.p`
  margin: 0;
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

const Message = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const NotFoundPage = () => (
  <Wrapper>
    <Code>404</Code>
    <Message>This page doesn&apos;t exist.</Message>
    <Link to="/">
      <Button variant="outline">Back to login</Button>
    </Link>
  </Wrapper>
);
