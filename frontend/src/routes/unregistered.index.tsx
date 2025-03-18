import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function UnregisteredIndexMain() {
  const { authMessage } = useAuth();
  return (
    <section id="unregistered-index">
      {authMessage && <span className="success">{authMessage}</span>}
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </section>
  );
}
