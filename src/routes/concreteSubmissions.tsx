import { useParams } from "react-router";
import { useDatabase } from "../hooks/useDatabase";
import { useEffect, useState } from "react";
import { Query } from "appwrite";
import { TbCodeAsterisk, TbCodeMinus, TbCodePlus } from "react-icons/tb";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { SubmissionCard } from "../components/submissionCard";

export function ConcreteSubmissionsRoute() {
  const params = useParams();
  const { route: routeId } = params;

  const { get, getAll } = useDatabase();

  const [route, setRoute] = useState<ConcreteRoute>();

  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (!routeId) {
      return;
    }

    (async () => {
      try {
        const [route, submissions] = await Promise.all([
          get<"routes", ConcreteRoute>("routes", routeId),
          getAll("submissions", [Query.equal("routeId", [routeId])]),
        ]);

        setRoute(route);
        setSubmissions(submissions);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [routeId, get, getAll]);

  return (
    <section id="concrete-submission" className="content">
      <h3>Submissions</h3>
      <h4>{route?.name}</h4>
      <ul className="listing">
        {route?.order
          .map((id) => route!.bars.find((bar) => bar.$id === id)!)
          .map((bar) => {
            const sub = submissions.find((sub) => sub.barId === bar.$id);

            const { needs_submission } = bar;

            if (!sub && needs_submission) {
              return <li key={bar.$id}>{bar.name}</li>;
            } else {
              const accepted = !!sub?.accepted;
              const declined = !!sub?.declined;
              return (
                <li key={bar.$id}>
                  <details>
                    <summary>
                      <span className="name">
                        <span className="closed">
                          <FaCaretRight />
                        </span>
                        <span className="open">
                          <FaCaretDown />
                        </span>
                        {bar.name}
                      </span>
                      <span>
                        {!accepted && !declined && <TbCodeAsterisk />}
                        {accepted && (
                          <span className="accepted">
                            <TbCodePlus />
                          </span>
                        )}
                        {declined && (
                          <span className="declined">
                            <TbCodeMinus />
                          </span>
                        )}
                      </span>
                    </summary>
                    <SubmissionCard submission={sub} bar={bar} route={route} />
                  </details>
                </li>
              );
            }
          })}
      </ul>
    </section>
  );
}
