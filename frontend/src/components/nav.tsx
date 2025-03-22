import { Link } from "react-router";
import { useAdmin } from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";

export function Nav() {
  const { isAdmin } = useAdmin();
  const { loggedIn } = useAuth();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <h3>Home</h3>
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/admin">
              <h3>Admin</h3>
            </Link>
          </li>
        )}
        {loggedIn ? (
          <li>
            <Link to="/logout">
              <h3>Logout</h3>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <h3>Login</h3>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <h3>Register</h3>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
