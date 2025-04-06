import { useEffect, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { BarListEntry } from "./barListEntry";
import { AddBarDialog } from "../components/addBar";

export function BarList() {
  const { getAll, create } = useDatabase();

  const [bars, setBars] = useState<Bar[]>([]);
  const [showAddBardDialog, setShowAddBarDialog] = useState(false);

  useEffect(() => {
    getAll("bars")
      .then((bars) => {
        setBars(bars);
      })
      .catch(console.error);
  }, [getAll]);

  function addNewBar(bar: Omit<Bar, "$id">) {
    create("bars", bar)
      .then(() => location.reload())
      .catch(console.error);
  }
  return (
    <section id="bars">
      <AddBarDialog
        open={showAddBardDialog}
        submit={addNewBar}
        close={() => setShowAddBarDialog(false)}
      />
      <div className="header">
        <h4>Bars</h4>
        <button className="small" onClick={() => setShowAddBarDialog(true)}>
          New Bar
        </button>
      </div>
      <ul>
        {bars.map((bar) => {
          return (
            <li key={bar.$id}>
              <BarListEntry bar={bar} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
