import { Link } from "react-router";
import { Nav } from "./nav";
import { LogoSmall } from "./logoSmall";

export function Header() {
  return (
    <>
      <header>
        <section className="heading">
          <h1>
            <Link to="/">Kneipolympics</Link>
          </h1>
        </section>
        <section className="profile">
          <LogoSmall />
        </section>
      </header>
      <Nav />
    </>
  );
}
