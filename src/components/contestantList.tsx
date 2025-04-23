import { useEffect, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { useDatabase } from "../hooks/useDatabase";
import { useFunctions } from "../hooks/useFunctions";
import { User } from "../contexts/admin";

export function ContestantList() {
  const { assignToTeam } = useFunctions();
  const { contestants, nonContestants } = useAdmin();
  const { getAll } = useDatabase();

  const [routes, setRoutes] = useState<ConcreteRoute[]>([]);

  useEffect(() => {
    getAll<"routes", ConcreteRoute>("routes")
      .then((routes) => setRoutes(routes))
      .catch(console.error);
  }, [getAll]);

  function onChange(user: string, team: string) {
    assignToTeam(user, team).catch(console.error);
  }

  return (
    <section id="contestants" className="content">
      <details open>
        <summary>Competitive</summary>
        <ul>
          {contestants.map((c) => {
            return (
              <ContestantCard
                key={c.$id}
                user={c}
                routes={routes}
                onChange={onChange}
              />
            );
          })}
        </ul>
      </details>
      <details>
        <summary>Non Competitive</summary>
        <ul>
          {nonContestants.map((c) => {
            return (
              <ContestantCard
                key={c.$id}
                user={c}
                routes={routes}
                onChange={onChange}
              />
            );
          })}
        </ul>
      </details>
    </section>
  );
}

type ContestantCardProps = {
  user: User;
  routes: ConcreteRoute[];
  onChange: (user: string, team: string) => void;
};

function ContestantCard({ user, routes, onChange }: ContestantCardProps) {
  const { firstName, lastName, route } = user.prefs;
  return (
    <li key={user.$id}>
      {firstName} {lastName}
      <div>
        <label>
          Team:
          <select onChange={(e) => onChange(user.$id, e.target.value)}>
            <option value={"---"}>---</option>
            {routes.map((r) => {
              return (
                <option key={r.$id} value={r.$id} selected={r.$id === route}>
                  {r.name}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    </li>
  );
}
