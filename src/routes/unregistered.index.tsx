import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useLabels } from "../hooks/useLabels";

export function UnregisteredIndexMain() {
  const l = useLabels();
  const { authMessage } = useAuth();
  return (
    <section id="unregistered-index">
      {authMessage && <span className="success">{authMessage}</span>}
      <Link to="/register">{l("register")}</Link>
      <Link to="/login">{l("login")}</Link>
    </section>
  );
}
