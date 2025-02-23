import { CgProfile } from "react-icons/cg";
export function Header() {
  return (
    <header>
      <section className="heading">
        <h1>Kneipolympics</h1>
      </section>
      <section className="profile">
        <CgProfile />
      </section>
    </header>
  );
}
