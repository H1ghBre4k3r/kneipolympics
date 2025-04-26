import { FormEvent, useEffect, useRef, useState } from "react";
import { usePreferences } from "../hooks/usePreferences";
import { useDatabase } from "../hooks/useDatabase";
import { useStorage } from "../hooks/useStorage";
import { useFunctions } from "../hooks/useFunctions";
import { Dialog } from "./dialog";
import { FaInfo } from "react-icons/fa";
import { useLabels } from "../hooks/useLabels";

export function CurrentRoute() {
  const { get, getAll } = useDatabase();
  const { getNextBar, createSubmission, skipBar } = useFunctions();
  const { create, deleteFile } = useStorage();
  const [pref, _] = usePreferences();
  const l = useLabels();
  const routeId = pref("route");

  const [loading, setLoading] = useState(true);

  const [inFlight, setInFlight] = useState(false);

  const [route, setRoute] = useState<Maybe<ConcreteRoute>>();
  const [nextBar, setNextBar] = useState<Maybe<Bar>>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (!routeId) {
      return;
    }
    Promise.all([
      getNextBar().then(setNextBar).catch(console.error),

      get<"routes", ConcreteRoute>("routes", routeId)
        .then(setRoute)
        .catch(console.error),

      getAll("submissions").then(setSubmissions).catch(console.error),
    ])
      .then(() => setLoading(false))
      .catch(console.error);
  }, [routeId, get, getAll, getNextBar]);

  const submitDialog = useRef<HTMLDialogElement>(null);
  const skipDialog = useRef<HTMLDialogElement>(null);

  const [submission, setSubmission] = useState<Maybe<File | string>>();
  const [entranceSign, setEntranceSign] = useState<Maybe<File>>();
  const [beerPic, setBeerPic] = useState<Maybe<File>>();

  // TODO: prevent double submit
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nextBar || !routeId || !entranceSign || !beerPic || inFlight) {
      return;
    }

    setInFlight(true);

    if (nextBar.needs_picture) {
      Promise.all([
        // TODO: This is a very bad hack...
        submission
          ? create("pictures", submission as File)
          : new Promise<undefined>((resolve) => resolve(undefined)),
        create("pictures", entranceSign),
        create("pictures", beerPic),
      ]).then(async ([submission, entranceSign, beerPic]) => {
        const sub: Partial<Submission> = {
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
          })
          .finally(() => setInFlight(false));
      });
    } else {
      Promise.all([
        create("pictures", entranceSign),
        create("pictures", beerPic),
      ]).then(async ([entranceSign, beerPic]) => {
        const sub: Partial<Submission> = {
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
          })
          .finally(() => setInFlight(false));
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
            <div>{l("address")}: </div>
            {nextBar?.address}
          </article>

          {nextBar?.needs_submission ? (
            <>
              <article className="submission">
                <Dialog
                  header={`${l("submit")}?`}
                  ref={submitDialog}
                  onSubmit={onSubmit}
                  onClose={() => submitDialog.current?.close()}
                >
                  {l("sureToSubmit")}{" "}
                  <button disabled={inFlight}>
                    {inFlight ? "Submitting..." : l("submit")}
                  </button>
                  <p>
                    <b>
                      <FaInfo />
                      Note:
                    </b>
                    {l("submissionsWillTakeAWhile")}
                  </p>
                </Dialog>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitDialog.current?.showModal();
                  }}
                >
                  <label>
                    <h4 className="slim">{l("task")}</h4>
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
                    {l("entranceSign")}
                    <input
                      type="file"
                      name="entry"
                      accept="image/png, image/jpeg"
                      onChange={(e) => setEntranceSign(e.target.files![0])}
                      required
                    />
                  </label>
                  <label>
                    {l("beers")}
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
                  header={l("skipBar")}
                  ref={skipDialog}
                  onSubmit={skip}
                  onClose={() => skipDialog.current?.close()}
                >
                  {l("skipBarShort")}
                  <button>{l("skip")}</button>
                </Dialog>
                <h4 className="slim">Closed?</h4>
                <span>{l("skipBarLong")}</span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    skipDialog.current?.showModal();
                  }}
                >
                  <button>{l("skip")}</button>
                </form>
              </article>
            </>
          ) : (
            <p>
              <b>Note: </b>
              {l("noSubmission")}
            </p>
          )}
        </article>
      ) : (
        <p>
          {l("noNextBar")}
          {submissions.reduce(
            (memo, current) => memo + (current.points ?? 0),
            0,
          )}
          {l("points")}
        </p>
      )}
    </section>
  );
}
