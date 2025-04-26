import { useFunctions } from "../hooks/useFunctions";
import { useEffect, useState } from "react";
import { useLabels } from "../hooks/useLabels";

export function Scoreboard() {
  const { getPoints } = useFunctions();
  const l = useLabels();

  const [entries, setEntries] = useState<ScoreboardEntry[]>([]);

  useEffect(() => {
    getPoints().then(setEntries).catch(console.error);
  }, [getPoints]);

  return (
    <section id="scoreboard">
      <h3>Scoreboard</h3>
      <table>
        <thead>
          <tr>
            <th className="name">{l("name")}</th>
            <th className="points">{l("points")}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            return (
              <tr key={entry.id}>
                <td className="name">{entry.name}</td>
                <td className="points">{entry.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
