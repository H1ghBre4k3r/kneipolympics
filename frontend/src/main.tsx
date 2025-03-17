import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppwriteContextProvider } from "./contexts/appwrite.tsx";
import { AuthContextProvider } from "./contexts/auth.tsx";
import { FunctionsContextProvider } from "./contexts/functions.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppwriteContextProvider>
      <FunctionsContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </FunctionsContextProvider>
    </AppwriteContextProvider>
  </StrictMode>,
);
