import { useNavigate, useParams } from "react-router";
import { useDatabase } from "../hooks/useDatabase";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp, FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export function ConcreteRoute() {
  const { get, getAll, update, deleteEntry } = useDatabase();

  const nav = useNavigate();

  const params = useParams();
  const { route: routeId } = params;

  const addBarsDialog = useRef<HTMLDialogElement>(null);
  const renameDialog = useRef<HTMLDialogElement>(null);

  const [newName, setNewName] = useState("");
  const [route, setRoute] = useState<Maybe<ConcreteRoute>>();
  const [bars, setBars] = useState<Bar[]>([]);

  useEffect(() => {
    if (!routeId) {
      return;
    }
    get<"routes", ConcreteRoute>("routes", routeId)
      .then((route) => setRoute(route))
      .catch(console.error);
  }, [get, routeId]);

  const [allBars, setAllBars] = useState<Bar[]>([]);

  useEffect(() => {
    getAll("bars")
      .then((bars) => setAllBars(bars))
      .catch(console.error);
  }, [getAll, setAllBars]);

  const { name } = route ?? {};

  useEffect(() => {
    setBars(route?.bars ?? []);
  }, [route, setBars]);

  function up(i: number) {
    if (i === 0) {
      return;
    }

    setBars((b) => {
      const bars = [...b];
      const memo = bars[i - 1];
      bars[i - 1] = bars[i];
      bars[i] = memo;
      return bars;
    });
  }

  function down(i: number) {
    if (i === bars.length - 1) {
      return;
    }

    setBars((b) => {
      const bars = [...b];
      const memo = bars[i + 1];
      bars[i + 1] = bars[i];
      bars[i] = memo;
      return bars;
    });
  }

  function remove(i: number) {
    setBars((b) => {
      const bars = [...b];
      bars.splice(i, 1);
      return bars;
    });
  }

  function cancel() {
    setBars(route?.bars ?? []);
  }

  function save() {
    update("routes", routeId ?? "", {
      name,
      bars,
    })
      .then(() => {
        if (!route) {
          return;
        }
        setRoute({
          ...route,
          bars,
        });
      })
      .catch(console.error);
  }

  function deleteRoute() {
    deleteEntry("routes", routeId!)
      .then(() => {
        nav("/admin/routes");
      })
      .catch(console.error);
  }

  const leftoverBars = allBars.filter(
    (bar) => !bars.some(({ $id }) => bar.$id === $id),
  );

  function addBarsToRoute(e: FormEvent) {
    e.preventDefault();
    addBarsDialog.current?.close();

    const checkboxes =
      addBarsDialog.current?.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]',
      );

    const newBars: Bar[] = [];

    checkboxes?.forEach((box, index) => {
      if (box.checked) {
        newBars.push(leftoverBars[index]);
      }
    });

    setBars((b) => {
      const bars = [...b];
      bars.push(...newBars);
      return bars;
    });
  }

  function rename(e: FormEvent) {
    e.preventDefault();

    update("routes", routeId!, {
      name: newName,
      bars,
    })
      .then(() => {
        location.reload();
      })
      .catch(console.error);
  }

  return (
    <section id="concrete-route">
      <dialog id="add-bars-dialog" ref={addBarsDialog}>
        <form onSubmit={addBarsToRoute}>
          <div className="header">
            <h3>Add Bars</h3>
            <button
              className="large borderless"
              type="button"
              onClick={() => {
                addBarsDialog.current?.close();
              }}
            >
              <IoClose />
            </button>
          </div>
          <ul>
            {leftoverBars.map(({ $id, name }) => {
              return (
                <li key={$id}>
                  <label>
                    <input type="checkbox" />
                    {name}
                  </label>
                </li>
              );
            })}
          </ul>
          <button>Add</button>
        </form>
      </dialog>

      <dialog id="rename-dialog" ref={renameDialog}>
        <form onSubmit={rename}>
          <div className="header">
            <h3>Rename</h3>
            <button
              className="large borderless"
              type="button"
              onClick={() => {
                renameDialog.current?.close();
                setNewName("");
              }}
            >
              <IoClose />
            </button>
          </div>
          <input
            type="text"
            name="new-name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button disabled={newName.trim().length === 0}>Rename</button>
        </form>
      </dialog>

      <div className="header">
        <h3>{name}</h3>
        <button
          className="small"
          onClick={() => addBarsDialog.current?.showModal()}
        >
          <FaPlus />
        </button>
      </div>
      <ul>
        {bars?.map(({ name, $id }, i) => {
          return (
            <li key={$id}>
              {i + 1}. {name}
              <div>
                <button className="small" onClick={() => down(i)}>
                  <FaCaretDown />
                </button>
                <button className="small" onClick={() => up(i)}>
                  <FaCaretUp />
                </button>
                <button className="delete" onClick={() => remove(i)}>
                  X
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="button-list">
        <button className="cancel" onClick={cancel}>
          Cancel
        </button>
        <button className="save" onClick={save}>
          Save
        </button>
      </div>
      <div className="danger-zone">
        <h5>Danger Zone</h5>
        <div className="button-list">
          <button className="delete" onClick={deleteRoute}>
            Delete
          </button>
          <button
            className="rename"
            onClick={() => renameDialog.current?.showModal()}
          >
            Rename
          </button>
        </div>
      </div>
    </section>
  );
}
