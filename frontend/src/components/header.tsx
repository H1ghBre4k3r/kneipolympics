import { CiBeerMugFull } from "react-icons/ci";
import { Link } from "react-router";

export function Header() {
  return (
    <header>
      <section className="heading">
        <h1>
          <Link to="/">Kneipolympics</Link>
        </h1>
      </section>
      <section className="profile">
        <CiBeerMugFull />
      </section>
    </header>
  );
}
