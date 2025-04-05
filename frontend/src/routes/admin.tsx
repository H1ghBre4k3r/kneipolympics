import { useEffect, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { useDatabase } from "../hooks/useDatabase";
import { UserCard } from "../components/userCard";
import { BarCard } from "../components/barCard";
import { AddBarDialog } from "../components/addBar";

export function AdminRoute() {
  const { users } = useAdmin();
  const { getAll, create } = useDatabase();

  const [bars, setBars] = useState<Bar[]>([]);
  const [showAddBardDialog, setShowAddBarDialog] = useState(false);

  useEffect(() => {
    getAll("bars")
      .then((bars) => {
        setBars(bars);
      })
      .catch(console.error);

    getAll("routes").then(console.log).catch(console.error);
  }, [getAll]);

  function addNewBar(bar: Omit<Bar, "$id">) {
    create("bars", bar)
      .then(() => location.reload())
      .catch(console.error);
  }

  return (
    <>
      <h3>Admin</h3>
      <section id="users">
        <h4>Users</h4>
        <ul>
          {users.map((user) => {
            const { prefs, name, email } = user;
            const { firstName, lastName, joined } = prefs;

            return (
              <li>
                <details>
                  <summary>
                    <span className="name">
                      {firstName} {lastName}
                    </span>
                    <span className={`joined ${joined ?? "false"}`}>
                      {joined === "true" ? "In" : "Out"}
                    </span>
                  </summary>
                  <UserCard name={name} email={email} prefs={prefs as Prefs} />
                </details>
              </li>
            );
          })}
        </ul>
      </section>
      <section id="bars">
        <div className="header">
          <h4>Bars</h4>
          <button className="small" onClick={() => setShowAddBarDialog(true)}>
            New Bar
          </button>
        </div>
        <AddBarDialog
          open={showAddBardDialog}
          submit={addNewBar}
          close={() => setShowAddBarDialog(false)}
        />
        <ul>
          {bars.map((bar) => {
            return (
              <li>
                <BarCard bar={bar} />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
