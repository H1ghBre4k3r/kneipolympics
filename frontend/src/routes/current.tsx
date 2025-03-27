import { useLabels } from "../hooks/useLabels";

export function CurrentGameRoute() {
  const l = useLabels();
  return (
    <section>
      <h3>{l("currentGame")}</h3>
      <section id="tldr">
        <p>{l("furtherInformation")}</p>
      </section>
    </section>
  );
}
