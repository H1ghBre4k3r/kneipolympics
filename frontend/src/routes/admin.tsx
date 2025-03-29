import { useEffect, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { useDatabase } from "../hooks/useDatabase";
import { useLabels } from "../hooks/useLabels";

export function AdminRoute() {
  const { users } = useAdmin();
  const { getAll } = useDatabase();

  const [bars, setBars] = useState<Bar[]>([]);

  useEffect(() => {
    getAll<Bar>("bars")
      .then((bars) => {
        setBars(bars);
      })
      .catch(console.error);
  }, [getAll]);

  return (
    <>
      <h3>Admin</h3>
      <section id="users">
        <h4>Users</h4>
        <ul>
          {users.map((user) => {
            const { prefs, name } = user;
            const { firstName, lastName, joined } = prefs;

            return (
              <li>
                <details>
                  <summary>
                    <span className="name">
                      {firstName} {lastName}
                    </span>
                    <span className={`joined ${joined ?? "false"}`}>
                      {joined ? "In" : "Out"}
                    </span>
                  </summary>
                  <UserCard name={name} prefs={prefs as Prefs} />
                </details>
              </li>
            );
          })}
        </ul>
      </section>
      <section id="bars">
        <h4>Bars</h4>
        <ul>
          {bars.map((bar) => {
            const { name, address, task, needs_picture } = bar;

            return (
              <li>
                <details>
                  <summary>
                    <span>{name}</span>
                  </summary>
                  <div>
                    <b>Addresse: </b> {address}
                  </div>
                  <div>
                    <b>Task: </b> {task}
                  </div>
                  <div>
                    <b>Needs Picture: </b>
                    {needs_picture ? "Yes" : "No"}
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
type UserCardProps = {
  name: string;
  prefs: Prefs;
};

function UserCard({ name, prefs }: UserCardProps) {
  const l = useLabels();

  const { phone } = prefs;
  return (
    <div>
      <div>
        <b>{l("username")}</b> {name}
      </div>
      <div>
        <b>{l("phone")}</b> <a href={`tel:${phone}`}>{phone}</a>
      </div>
    </div>
  );
}
