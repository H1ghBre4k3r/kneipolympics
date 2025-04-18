import { useEffect, useState } from "react";
import { usePreferences } from "../hooks/usePreferences";
import { useDatabase } from "../hooks/useDatabase";

export function CurrentRoute() {
  const { get } = useDatabase();
  const [pref, _] = usePreferences();
  const routeId = pref("route");

  const [route, setRoute] = useState<Maybe<ConcreteRoute>>();
  const [nextBar, setNextBar] = useState<Maybe<Bar>>();

  useEffect(() => {
    if (!routeId) {
      return;
    }

    get<"routes", ConcreteRoute>("routes", routeId)
      .then((route) => setRoute(route))
      .catch(console.error);
  }, [routeId, get]);

  useEffect(() => {
    if (!route) {
      return;
    }
    const first = route.order[0];
    setNextBar(route.bars.find((bar) => bar.$id === first)!);
  }, [route]);

  return (
    <section id="current-route">
      <h3 className="team-name">{route?.name}</h3>

      <article className="next-bar">
        <h4>{nextBar?.name}</h4>
        <article>
          <div>Address: </div>
          {nextBar?.address}
        </article>

        {nextBar?.needs_submission ? (
          <>
            <article className="submission">
              <form>
                <label>
                  <h4>Task</h4>
                  {nextBar.task}
                  {nextBar.needs_picture ? (
                    <input
                      type="file"
                      name="submission"
                      accept="image/png, image/jpeg"
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Submission"
                      name="submission"
                    />
                  )}
                </label>
                <label>
                  Entrance Sign
                  <input
                    type="file"
                    name="entry"
                    accept="image/png, image/jpeg"
                    required
                  />
                </label>
                <label>
                  Beers
                  <input
                    type="file"
                    name="beers"
                    accept="image/png, image/jpeg"
                    required
                  />
                </label>
                <button>Submit</button>
              </form>
            </article>
            <article className="is-closed">
              <h4>Closed?</h4>
              <span>
                Is your current bar closed? In this case you can skip it but you
                have to drink two beers in the next bar!
              </span>
              <form>
                <button>Skip</button>
              </form>
            </article>
          </>
        ) : (
          <></>
        )}
      </article>
    </section>
  );
}
