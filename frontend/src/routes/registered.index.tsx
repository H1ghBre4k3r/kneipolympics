import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function RegisteredIndexRoute() {
  const auth = useAuth();
  const { name } = auth.user ?? {};
  return (
    <section>
      <h3>Hello {name}!</h3>
      <section id="tldr">
        <div>At some point you'll be able to find more information here.</div>

        <h4>TL;DR:</h4>
        <div>
          <b>Date:</b> 26. April
        </div>
        <div>
          <b>Where:</b> Kiel
        </div>
        <div>
          <b>What:</b> Kneipolympics
        </div>
      </section>

      <Link to="/logout">Logout</Link>
    </section>
  );
}
