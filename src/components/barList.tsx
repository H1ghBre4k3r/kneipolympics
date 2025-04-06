import { useEffect, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { BarCard } from "../components/barCard";
import { AddBarDialog } from "../components/addBar";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

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
      <details>
        <summary className="header">
          <h4>
            <span className="closed">
              <FaCaretRight />
            </span>
            <span className="open">
              <FaCaretDown />
            </span>
            Bars
          </h4>
          <button className="small" onClick={() => setShowAddBarDialog(true)}>
            New Bar
          </button>
        </summary>
        <ul>
          {bars.map((bar) => {
            return (
              <li>
                <BarCard bar={bar} />
              </li>
            );
          })}
        </ul>
      </details>
    </section>
  );
}
