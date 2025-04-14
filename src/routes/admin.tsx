import { Link } from "react-router";
import { Outlet } from "react-router";

export function AdminRoute() {
  return (
    <section id="admin">
      <h3>Admin</h3>
      <ul className="tab-bar">
        <li>
          <Link to="users">
            <h4>Users</h4>
          </Link>
        </li>
        <li>
          <Link to="bars">
            <h4>Bars</h4>
          </Link>
        </li>
        <li>
          <Link to="routes">
            <h4>Routes</h4>
          </Link>
        </li>
        <li>
          <Link to="contestants">
            <h4>Contestants</h4>
          </Link>
        </li>
      </ul>
      <Outlet />
    </section>
  );
}
