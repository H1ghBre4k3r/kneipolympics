import { Link } from "react-router";

export function UnregisteredIndexMain() {
  return (
    <section id="unregistered-index">
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </section>
  );
}
