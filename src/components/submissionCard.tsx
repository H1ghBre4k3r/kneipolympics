import { useEffect, useState } from "react";
import { useStorage } from "../hooks/useStorage";
import { useDatabase } from "../hooks/useDatabase";

type SubmissionCardProps = {
  submission?: Submission;
  bar: Bar;
  route: Route;
};
export function SubmissionCard({
  submission,
  bar,
  route,
}: SubmissionCardProps) {
  const { getView } = useStorage();
  const { update, create } = useDatabase();

  const { needs_picture, individual_points, needs_submission } = bar;
  const { skipped, entranceSign, beers, imageSubmission, answer, timestamp } =
    submission ?? {};

  const [entranceSignPic, setEntranceSignPic] = useState<string>();
  const [beerPic, setBeerPic] = useState<string>();
  const [submissionPic, setSubmissionPic] = useState<string>();

  useEffect(() => {
    if (!entranceSign) {
      return;
    }
    getView("pictures", entranceSign)
      .then((view) => setEntranceSignPic(view))
      .catch(console.error);
  }, [entranceSign, getView]);

  useEffect(() => {
    if (!beers) {
      return;
    }
    getView("pictures", beers)
      .then((view) => setBeerPic(view))
      .catch(console.error);
  }, [beers, getView]);

  useEffect(() => {
    if (!needs_picture || !imageSubmission) {
      return;
    }

    getView("pictures", imageSubmission)
      .then((view) => setSubmissionPic(view))
      .catch(console.error);
  }, [getView, imageSubmission, needs_picture]);

  const [points, setPoints] = useState(submission?.points ?? 0);

  function accept() {
    if (submission) {
      update("submissions", submission.$id, {
        points: individual_points ? points : 1,
        accepted: true,
        declined: false,
      })
        .then(() => location.reload())
        .catch(console.error);
    } else {
      create("submissions", {
        barId: bar.$id,
        routeId: route.$id,
        points: individual_points ? points : 1,
        accepted: true,
        declined: false,
        timestamp: Date.now(),
      })
        .then(() => location.reload())
        .catch(console.error);
    }
  }

  function decline() {
    if (submission) {
      update("submissions", submission.$id, {
        points: individual_points ? points : 0,
        accepted: false,
        declined: true,
      })
        .then(() => location.reload())
        .catch(console.error);
    }
  }

  return (
    <article className="submission-card">
      {skipped ? (
        <h4>Skipped</h4>
      ) : (
        needs_submission && (
          <>
            {timestamp && <h5>{new Date(timestamp).toLocaleString()}</h5>}
            <article>
              <h5>Entrance</h5>
              {entranceSignPic ? <img src={entranceSignPic} /> : <b>-</b>}
            </article>
            <article>
              <h5>Beers</h5>
              {beerPic ? <img src={beerPic} /> : <b>-</b>}
            </article>

            <article>
              <h5>Task</h5>
              {needs_picture ? (
                submissionPic ? (
                  <img src={submissionPic} />
                ) : (
                  <b>-</b>
                )
              ) : (
                <i>{answer}</i>
              )}
            </article>
          </>
        )
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <h5>Rating</h5>
        {individual_points && (
          <label>
            Points (only relevant if accepted)
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value))}
            />
          </label>
        )}
        <button className="success" type="button" onClick={accept}>
          Accept
        </button>
        {!skipped && needs_submission && (
          <button className="error" type="button" onClick={decline}>
            Decline
          </button>
        )}
      </form>
    </article>
  );
}
