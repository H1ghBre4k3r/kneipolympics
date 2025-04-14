import { useEffect, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { useDatabase } from "../hooks/useDatabase";
import { useFunctions } from "../hooks/useFunctions";

export function ContestantList() {
  const { assignToTeam } = useFunctions();
  const { contestants } = useAdmin();
  const { getAll } = useDatabase();

  const [routes, setRoutes] = useState<ConcreteRoute[]>([]);

  useEffect(() => {
    getAll<"routes", ConcreteRoute>("routes")
      .then((routes) => setRoutes(routes))
      .catch(console.error);
  });

  function onChange(user: string, team: string) {
    assignToTeam(user, team).catch(console.error);
  }

  return (
    <section id="contestants">
      <ul>
        {contestants.map((c) => {
          const { firstName, lastName } = c.prefs;
          return (
            <li key={c.$id}>
              {firstName} {lastName}
              <div>
                <label>
                  Team:
                  <select onChange={(e) => onChange(c.$id, e.target.value)}>
                    <option value={"---"}>---</option>
                    {routes.map((route) => {
                      return (
                        <option key={route.$id} value={route.$id}>
                          {route.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
