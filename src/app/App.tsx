import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";

export const App = () => (
  <ErrorBoundary>
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  </ErrorBoundary>
);
