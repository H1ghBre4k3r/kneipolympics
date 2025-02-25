import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppwriteContextProvider } from "./contexts/appwrite.tsx";
import { AuthContextProvider } from "./contexts/auth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppwriteContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AppwriteContextProvider>
  </StrictMode>,
);
