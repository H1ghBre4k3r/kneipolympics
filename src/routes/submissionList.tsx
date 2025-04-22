import { useEffect, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { Link } from "react-router";
import { TbCodeAsterisk } from "react-icons/tb";

export function SubmissionsListRoute() {
  const { getAll } = useDatabase();

  const [routes, setRoutes] = useState<ConcreteRoute[]>([]);

  const [submissions, setSubmissions] = useState<Map<string, Submission[]>>();

  useEffect(() => {
    Promise.all([
      getAll<"routes", ConcreteRoute>("routes"),
      getAll("submissions"),
    ])
      .then(([routes, submissions]) => {
        setRoutes(
          routes.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)),
        );

        setSubmissions(
          routes.reduce((memo, route) => {
            const id = route.$id;

            const routeSubmissions = submissions.filter(
              (sub) => sub.routeId === id,
            );
            memo.set(id, routeSubmissions);
            return memo;
          }, new Map<string, Submission[]>()),
        );
      })
      .catch(console.error);
  }, [getAll]);

  useEffect(() => {}, []);

  return (
    <section id="submission-list" className="content">
      <h3>Submissions</h3>
      <ul className="listing">
        {routes.map((route) => {
          const { $id, name } = route;
          const subs = submissions?.get($id) ?? [];
          const hasUnaccepted = subs.find(
            (sub) => !sub.accepted && !sub.declined,
          );

          return (
            <li key={$id}>
              <span className="route-name">
                <Link to={$id}>{name}</Link>
              </span>
              <span className="points">
                ({subs.length} / {route.bars.length})
                {hasUnaccepted && <TbCodeAsterisk />}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
