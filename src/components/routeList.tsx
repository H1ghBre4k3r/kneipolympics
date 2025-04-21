import { FormEvent, useEffect, useRef, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { Link } from "react-router";
import { IoClose } from "react-icons/io5";
import { useFunctions } from "../hooks/useFunctions";

type ConcreteRoute = Omit<Route, "bars"> & {
  bars: Bar[];
};

export function RouteList() {
  const { getAll } = useDatabase();

  const { createRoute } = useFunctions();

  const dialog = useRef<HTMLDialogElement>(null);
  const [route, setRoute] = useState("");

  const [routes, setRoutes] = useState<ConcreteRoute[]>([]);

  useEffect(() => {
    getAll<"routes", ConcreteRoute>("routes")
      .then((routes) => {
        setRoutes(
          routes.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)),
        );
      })
      .catch(console.error);
  }, [getAll]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    createRoute(route)
      .then(() => {
        location.reload();
      })
      .catch(console.error);
  }

  return (
    <section id="routes" className="content">
      <dialog ref={dialog}>
        <form onSubmit={onSubmit}>
          <div className="header">
            <h3>New Route</h3>
            <button
              className="large borderless"
              type="button"
              onClick={() => {
                dialog.current?.close();
                setRoute("");
              }}
            >
              <IoClose />
            </button>
          </div>
          <input
            type="text"
            name="route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
          <button disabled={route.trim().length === 0}>Add</button>
        </form>
      </dialog>
      <div className="header">
        <h4>Routes</h4>
        <button className="small" onClick={() => dialog.current?.showModal()}>
          New Route
        </button>
      </div>
      <ul>
        {routes.map((route) => {
          const { $id, name, bars } = route;
          return (
            <li key={$id}>
              <details>
                <summary>
                  <span>
                    <span className="closed">
                      <FaCaretRight />
                    </span>
                    <span className="open">
                      <FaCaretDown />
                    </span>
                    {name}
                  </span>
                  <Link to={$id}>Edit</Link>
                </summary>
                <ul>
                  {bars.map(({ name }, i) => {
                    return (
                      <li>
                        {i + 1}. {name}
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
