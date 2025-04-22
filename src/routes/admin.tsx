import { Link } from "react-router";
import { Outlet } from "react-router";

export function AdminRoute() {
  return (
    <section id="admin">
      <h3>Admin</h3>
      <ul className="tab-bar">
        <li>
          <Link to="users">
            <h4 className="slim">Users</h4>
          </Link>
        </li>
        <li>
          <Link to="bars">
            <h4 className="slim">Bars</h4>
          </Link>
        </li>
        <li>
          <Link to="routes">
            <h4 className="slim">Routes</h4>
          </Link>
        </li>
        <li>
          <Link to="contestants">
            <h4 className="slim">Contestants</h4>
          </Link>
        </li>
      </ul>
      <Outlet />
    </section>
  );
}
