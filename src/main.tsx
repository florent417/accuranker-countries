import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/apolloClient.ts";
import { EuiProvider } from "@elastic/eui";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EuiProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </EuiProvider>
  </StrictMode>
);
