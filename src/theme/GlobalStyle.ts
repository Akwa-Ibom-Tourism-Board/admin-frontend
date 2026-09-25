import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.foreground};
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition:
      background-color ${({ theme }) => theme.transitions.base},
      color ${({ theme }) => theme.transitions.base};
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  input,
  select,
  textarea {
    font-family: inherit;
  }
`;
