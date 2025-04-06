import { useEffect, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

type ConcreteRoute = Omit<Route, "bars"> & {
  bars: Bar[];
};

export function RouteList() {
  const { getAll } = useDatabase();

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

  return (
    <section id="routes">
      <div className="header">
        <h4>Routes</h4>
        <button className="small">New Route</button>
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
