import { FormEvent, useEffect, useRef, useState } from "react";
import { usePreferences } from "../hooks/usePreferences";
import { useDatabase } from "../hooks/useDatabase";
import { useStorage } from "../hooks/useStorage";
import { useFunctions } from "../hooks/useFunctions";
import { Dialog } from "./dialog";

export function CurrentRoute() {
  const { get } = useDatabase();
  const { getNextBar, createSubmission, skipBar } = useFunctions();
  const { create, deleteFile } = useStorage();
  const [pref, _] = usePreferences();
  const routeId = pref("route");

  const [loading, setLoading] = useState(true);

  const [route, setRoute] = useState<Maybe<ConcreteRoute>>();
  const [nextBar, setNextBar] = useState<Maybe<Bar>>();

  useEffect(() => {
    if (!routeId) {
      return;
    }
    Promise.all([
      getNextBar()
        .then((bar) => setNextBar(bar))
        .catch(console.error),

      get<"routes", ConcreteRoute>("routes", routeId)
        .then((route) => setRoute(route))
        .catch(console.error),
    ])
      .then(() => setLoading(false))
      .catch(console.error);
  }, [routeId, get, getNextBar]);

  const submitDialog = useRef<HTMLDialogElement>(null);
  const skipDialog = useRef<HTMLDialogElement>(null);

  const [submission, setSubmission] = useState<Maybe<File | string>>();
  const [entranceSign, setEntranceSign] = useState<Maybe<File>>();
  const [beerPic, setBeerPic] = useState<Maybe<File>>();

  // TODO: prevent double submit
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nextBar || !routeId || !entranceSign || !beerPic) {
      return;
    }

    if (nextBar.needs_picture) {
      Promise.all([
        // TODO: This is a very bad hack...
        submission
          ? create("pictures", submission as File)
          : new Promise<undefined>((resolve) => resolve(undefined)),
        create("pictures", entranceSign),
        create("pictures", beerPic),
      ]).then(async ([submission, entranceSign, beerPic]) => {
        const sub: Submission = {
          routeId,
          barId: nextBar.$id,
          imageSubmission: submission?.$id,
          entranceSign: entranceSign.$id,
          beers: beerPic.$id,
        };

        createSubmission(sub)
          .then(() => location.reload())
          .catch((e) => {
            console.error(e);
            Promise.all([
              submission
                ? deleteFile("pictures", submission.$id)
                : new Promise<void>((res) => res()),
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
  function skip(e: FormEvent) {
    e.preventDefault();
    if (!nextBar) {
      return;
    }

    skipBar(nextBar.$id)
      .then(() => location.reload())
      .catch(console.error);
  }

  return loading ? (
    <section id="current-route">
      <h3>Loading...</h3>
    </section>
  ) : (
    <section id="current-route">
      <h3 className="team-name">{route?.name}</h3>

      {nextBar ? (
        <article className="next-bar">
          <h4>{nextBar?.name}</h4>
          <article>
            <div>Address: </div>
            {nextBar?.address}
          </article>

          {nextBar?.needs_submission ? (
            <>
              <article className="submission">
                <Dialog
                  header="Submit?"
                  ref={submitDialog}
                  onSubmit={onSubmit}
                  onClose={() => submitDialog.current?.close()}
                >
                  Are you sure you want to submit this bar?
                  <button>Submit</button>
                </Dialog>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitDialog.current?.showModal();
                  }}
                >
                  <label>
                    <h4>Task</h4>
                    {nextBar.task}
                    {nextBar.needs_picture ? (
                      <input
                        type="file"
                        name="submission"
                        accept="image/png, image/jpeg"
                        onChange={(e) => setSubmission(e.target.files![0])}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Answer"
                        name="submission"
                        onChange={(e) => setSubmission(e.target.value)}
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
                <Dialog
                  header="Skip bar?"
                  ref={skipDialog}
                  onSubmit={skip}
                  onClose={() => skipDialog.current?.close()}
                >
                  Are you sure you want to skip this bar?
                  <button>Skip</button>
                </Dialog>
                <h4>Closed?</h4>
                <span>
                  Is your current bar closed? In this case you can skip it but
                  you have to drink two beers in the next bar!
                </span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    skipDialog.current?.showModal();
                  }}
                >
                  <button>Skip</button>
                </form>
              </article>
            </>
          ) : (
            <></>
          )}
        </article>
      ) : (
        <p>No next bar found!</p>
      )}
    </section>
  );
}
