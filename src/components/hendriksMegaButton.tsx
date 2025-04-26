import { FormEvent, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { Query } from "appwrite";

export function HendriksMegaButton() {
  const { getAll, create } = useDatabase();

  const [inFlight, setInFlight] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (inFlight) {
      return;
    }

    setInFlight(true);
    const timestamp = Date.now();

    const routes = await getAll("routes");
    const ps = routes.map(async (route) => {
      const submissions = await getAll("submissions", [
        Query.equal("routeId", route.$id),
      ]);

      if (submissions.length > 0) {
        return;
      }

      await create("submissions", {
        barId: route.order[0],
        routeId: route.$id,
        points: 0,
        accepted: true,
        declined: false,
        timestamp,
      }).catch(console.error);
    });

    await Promise.all(ps);

    setInFlight(false);
    location.reload();
  }

  return (
    <section id="hendriks-mega-button">
      <form onSubmit={onSubmit}>
        <button disabled={inFlight}>
          <h1>START!</h1>
        </button>
      </form>
    </section>
  );
}
