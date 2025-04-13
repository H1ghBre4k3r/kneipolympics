import { InfoPageDe } from "../components/infoPage.de";
import { InfoPageEn } from "../components/infoPage.en";
import { RulesPageDe } from "../components/rulesPage.de";
import { RulesPageEn } from "../components/rulesPage.en";
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

  const InfoPage = l("langId") == "en" ? InfoPageEn : InfoPageDe;

  const RulesPage = l("langId") == "en" ? RulesPageEn : RulesPageDe;
  
  return (
    <section>
      <h3>{l("infoAndRegistration")}</h3>
      <form>
        {joined ? (
          <>
            <button className="large" type="button" onClick={leave}>
              {l("wantToLeave")}
            </button>
            <p>{l("participating")}</p>
          </>
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
        <details>
          <summary>
            <h4>{l("generalInfo")}</h4>
          </summary>
          <InfoPage />
        </details>
      </section>
      <section>
        <details>
          <summary>
            <h4>{l("rules")}</h4>
          </summary>
          <RulesPage />
        </details>
      </section>
    </section>
  );
}
