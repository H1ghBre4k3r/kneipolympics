import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useAdmin } from "../hooks/useAdmin";
import { HendriksMegaButton } from "../components/hendriksMegaButton";

export function RegisteredIndexRoute() {
  const { isAdmin } = useAdmin();
  const auth = useAuth();
  const { name } = auth.user ?? {};
  return (
    <section>
      <h3>Hello {name}!</h3>

      {isAdmin && <HendriksMegaButton />}

      <Link to="/logout">Logout</Link>
    </section>
  );
}
