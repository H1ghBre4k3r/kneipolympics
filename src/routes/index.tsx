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
import { InfoRoute } from "./info";
import { CurrentGameRoute } from "./current";
import { UserList } from "../components/userList";
import { BarList } from "../components/barList";
import { RouteList } from "../components/routeList";
import { ConcreteRoute } from "./concreteRoute";
import { ContestantList } from "../components/contestantList";
import { SubmissionsListRoute } from "./submissionList";
import { ConcreteSubmissionsRoute } from "./concreteSubmissions";

export function Router() {
  const { loggedIn } = useAuth();
  const { isAdmin } = useAdmin();

  return (
    <Routes>
      {loggedIn ? (
        <>
          <Route path="/" element={<RegisteredIndexRoute />}></Route>
          <Route path="/logout" element={<LogoutRoute />}></Route>
          <Route path="/info" element={<InfoRoute />}></Route>
          <Route path="/current" element={<CurrentGameRoute />}></Route>
          {isAdmin && (
            <>
              <Route path="/admin" element={<AdminRoute />}>
                <Route index element={<UserList />} />
                <Route path="users" element={<UserList />} />
                <Route path="bars" element={<BarList />} />
                <Route path="routes" element={<RouteList />} />
                <Route path="routes/:route" element={<ConcreteRoute />} />
                <Route path="contestants" element={<ContestantList />} />
              </Route>
              <Route path="/submissions" element={<SubmissionsListRoute />} />
              <Route
                path="/submissions/:route"
                element={<ConcreteSubmissionsRoute />}
              />
            </>
          )}
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
