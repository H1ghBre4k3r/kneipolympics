import { useLabels } from "../hooks/useLabels";
import { usePreferences } from "../hooks/usePreferences";

export function InfoRoute() {
  const l = useLabels();

  const [getPref, setPref] = usePreferences();

  const joined = getPref("joined") === "true";

  function join() {
    setPref("joined", "true").then(() => location.reload());
  }

  function leave() {
    setPref("joined", "false").then(() => location.reload());
  }

  return (
    <section>
      <h3>{l("infoAndRegistration")}</h3>
      <form>
        {joined ? (
          <button className="large" type="button" onClick={leave}>
            {l("wantToLeave")}
          </button>
        ) : (
          <button className="large" type="button" onClick={join}>
            {l("wantToJoin")}
          </button>
        )}
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
