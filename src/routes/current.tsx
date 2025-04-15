import { CurrentRoute } from "../components/currentRoute";
import { useAuth } from "../hooks/useAuth";
import { useLabels } from "../hooks/useLabels";

export function CurrentGameRoute() {
  const l = useLabels();
  const { user } = useAuth();
  const { route } = user?.prefs ?? {};
  return (
    <section>
      <h3>{l("currentGame")}</h3>
      {!route || route === "---" ? (
        <section id="tldr">
          <p>{l("furtherInformation")}</p>
        </section>
      ) : (
        <CurrentRoute />
      )}
    </section>
  );
}
