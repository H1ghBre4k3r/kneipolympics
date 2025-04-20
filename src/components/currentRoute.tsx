import { FormEvent, useEffect, useState } from "react";
import { usePreferences } from "../hooks/usePreferences";
import { useDatabase } from "../hooks/useDatabase";
import { useStorage } from "../hooks/useStorage";
import { useFunctions } from "../hooks/useFunctions";

export function CurrentRoute() {
  const { get } = useDatabase();
  const { getNextBar, createSubmission } = useFunctions();
  const { create, deleteFile } = useStorage();
  const [pref, _] = usePreferences();
  const routeId = pref("route");

  const [route, setRoute] = useState<Maybe<ConcreteRoute>>();
  const [nextBar, setNextBar] = useState<Maybe<Bar>>();

  useEffect(() => {
    if (!routeId) {
      return;
    }
    getNextBar()
      .then((bar) => setNextBar(bar))
      .catch(console.error);

    get<"routes", ConcreteRoute>("routes", routeId)
      .then((route) => setRoute(route))
      .catch(console.error);
  }, [routeId, get, getNextBar]);

  const [submission, setSubmission] = useState<Maybe<File | string>>();
  const [entranceSign, setEntranceSign] = useState<Maybe<File>>();
  const [beerPic, setBeerPic] = useState<Maybe<File>>();

  // TODO: prevent double submit
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nextBar || !routeId || !submission || !entranceSign || !beerPic) {
      return;
    }

    if (nextBar.needs_picture) {
      Promise.all([
        create("pictures", submission as File),
        create("pictures", entranceSign),
        create("pictures", beerPic),
      ]).then(async ([submission, entranceSign, beerPic]) => {
        const sub: Submission = {
          routeId,
          barId: nextBar.$id,
          imageSubmission: submission.$id,
          entranceSign: entranceSign.$id,
          beers: beerPic.$id,
        };

        createSubmission(sub)
          .then(() => location.reload())
          .catch((e) => {
            console.error(e);
            Promise.all([
              deleteFile("pictures", submission.$id),
              deleteFile("pictures", entranceSign.$id),
              deleteFile("pictures", beerPic.$id),
            ]).catch(console.error);
          });
      });
    } else {
      Promise.all([
        create("pictures", entranceSign),
        create("pictures", beerPic),
      ]).then(async ([entranceSign, beerPic]) => {
        const sub: Submission = {
          routeId,
          barId: nextBar.$id,
          answer: submission as string,
          entranceSign: entranceSign.$id,
          beers: beerPic.$id,
        };

        createSubmission(sub)
          .then(() => location.reload())
          .catch((e) => {
            console.error(e);
            Promise.all([
              deleteFile("pictures", entranceSign.$id),
              deleteFile("pictures", beerPic.$id),
            ]).catch(console.error);
          });
      });
    }
  }

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
              <form onSubmit={onSubmit}>
                <label>
                  <h4>Task</h4>
                  {nextBar.task}
                  {nextBar.needs_picture ? (
                    <input
                      type="file"
                      name="submission"
                      accept="image/png, image/jpeg"
                      onChange={(e) => setSubmission(e.target.files![0])}
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Answer"
                      name="submission"
                      onChange={(e) => setSubmission(e.target.value)}
                      required
                    />
                  )}
                </label>
                <label>
                  Entrance Sign
                  <input
                    type="file"
                    name="entry"
                    accept="image/png, image/jpeg"
                    onChange={(e) => setEntranceSign(e.target.files![0])}
                    required
                  />
                </label>
                <label>
                  Beers
                  <input
                    type="file"
                    name="beers"
                    accept="image/png, image/jpeg"
                    onChange={(e) => setBeerPic(e.target.files![0])}
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
