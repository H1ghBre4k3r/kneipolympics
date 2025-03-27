import { useLabels } from "../hooks/useLabels";

export function InfoRoute() {
  const l = useLabels();

  return (
    <section>
      <h3>{l("infoAndRegistration")}</h3>
      <form>
        <button className="large">I Want To Join!</button>
      </form>
      <p>
        <b>{l("note")}:</b> {l("finalRegistration")}
      </p>
      <section id="tldr">
        <h4>TL;DR:</h4>
        <div>
          <b>{l("when")}:</b> 26. April
        </div>
        <div>
          <b>{l("where")}:</b> Kiel, Lille Brauerei
        </div>
        <div>
          <b>{l("what")}:</b> Kneipolympics
        </div>
      </section>
    </section>
  );
}
