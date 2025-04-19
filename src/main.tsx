import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppwriteContextProvider } from "./contexts/appwrite.tsx";
import { AuthContextProvider } from "./contexts/auth.tsx";
import { FunctionsContextProvider } from "./contexts/functions.tsx";
import { BrowserRouter } from "react-router";
import { AdminContextProvider } from "./contexts/admin.tsx";

import "./services/i18n.ts";
import { DatabaseContextProvider } from "./contexts/database.tsx";
import { StorageContextProvider } from "./contexts/storage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppwriteContextProvider>
      <DatabaseContextProvider>
        <StorageContextProvider>
          <FunctionsContextProvider>
            <AuthContextProvider>
              <AdminContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </AdminContextProvider>
            </AuthContextProvider>
          </FunctionsContextProvider>
        </StorageContextProvider>
      </DatabaseContextProvider>
    </AppwriteContextProvider>
  </StrictMode>,
);
