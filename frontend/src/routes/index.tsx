import { Route, Routes } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { UnregisteredIndexMain } from "./unregistered.index";
import { LoginRoute } from "./login";
import { RegisterRoute } from "./register";
import { LogoutRoute } from "./logout";
import { RegisteredIndexRoute } from "./registered.index";
import { useAdmin } from "../hooks/useAdmin";
import { AdminRoute } from "./admin";
import { RecoveryRoute } from "./recovery";

export function Router() {
  const { loggedIn } = useAuth();
  const { isAdmin } = useAdmin();

  return (
    <Routes>
      {loggedIn ? (
        <>
          <Route path="/" element={<RegisteredIndexRoute />}></Route>
          <Route path="/logout" element={<LogoutRoute />}></Route>
          {isAdmin && <Route path="/admin" element={<AdminRoute />}></Route>}
        </>
      ) : (
        <>
          <Route path="/" element={<UnregisteredIndexMain />}></Route>
          <Route path="/login" element={<LoginRoute />}></Route>
          <Route path="/register" element={<RegisterRoute />}></Route>
          <Route path="/recovery" element={<RecoveryRoute />}></Route>
        </>
      )}
    </Routes>
  );
}
