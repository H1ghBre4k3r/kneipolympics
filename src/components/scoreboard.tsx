import { useFunctions } from "../hooks/useFunctions";
import { useEffect, useState } from "react";

export function Scoreboard() {
  const { getPoints } = useFunctions();

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
            <th className="name">Name</th>
            <th className="points">Points</th>
          </tr>
        </thead>
        <tbody>
          {entries
            .sort((a, b) => b.points - a.points)
            .map((entry) => {
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
