import { CiBeerMugFull } from "react-icons/ci";

export function Header() {
  return (
    <header>
      <section className="heading">
        <h1>Kneipolympics</h1>
      </section>
      <section className="profile">
        <CiBeerMugFull />
      </section>
    </header>
  );
}
