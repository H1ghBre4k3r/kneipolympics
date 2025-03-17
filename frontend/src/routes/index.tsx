import { BrowserRouter, Route, Routes } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { UnregisteredIndexMain } from "./unregistered.index";
import { LoginRoute } from "./login";
import { RegisterRoute } from "./register";
import { LogoutRoute } from "./logout";
import { RegisteredIndexRoute } from "./registered.index";

export function Router() {
  const { loggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/" element={<RegisteredIndexRoute />}></Route>
            <Route path="/logout" element={<LogoutRoute />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<UnregisteredIndexMain />}></Route>
            <Route path="/login" element={<LoginRoute />}></Route>
            <Route path="/register" element={<RegisterRoute />}></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
