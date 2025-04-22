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
        {submissions.map((sub) => {
          const bar = route?.bars.find((bar) => bar.$id === sub.barId);
          if (!bar) {
            return <></>;
          }
          const name = bar.name;
          return (
            <li key={sub.$id}>
              <details>
                <summary>
                  <span className="name">
                    <span className="closed">
                      <FaCaretRight />
                    </span>
                    <span className="open">
                      <FaCaretDown />
                    </span>
                    {name}
                  </span>
                  <span>
                    {!sub.accepted && !sub.declined && <TbCodeAsterisk />}
                    {sub.accepted && (
                      <span className="accepted">
                        <TbCodePlus />
                      </span>
                    )}
                    {sub.declined && (
                      <span className="declined">
                        <TbCodeMinus />
                      </span>
                    )}
                  </span>
                </summary>
                <SubmissionCard submission={sub} bar={bar} />
              </details>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
