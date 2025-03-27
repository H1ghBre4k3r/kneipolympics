import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function RegisteredIndexRoute() {
  const auth = useAuth();
  const { name } = auth.user ?? {};
  return (
    <section>
      <h3>Hello {name}!</h3>

      <Link to="/logout">Logout</Link>
    </section>
  );
}
