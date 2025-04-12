import { Link } from "react-router";

export function infoPageEn() {
  return <>
    <p>
      The <i>Kneipolympics 2025</i> will start on 26.4.2025 at 18:00 (CEST) We will meet in front of Rewe at Gutenbergstraße 77.
    </p>
    <p>
      The participant will then be randomly assigned into teams on site and receive their route. The Route consists of 4 bars, then a Flunkyballtournament in the Schrevenpark, then again  4 bars and the final station in the Lille Brewery.
    </p>
    <p>
      Aditionally to drinking a small beer, there will be a bonus tasks in every bar. In the end the points from the bonus tasks, the tournament and the speed will determine an overall rating.
    </p>
    <p>
      The next station and tasks will be shown to all participants under <Link to="/current">Current Game</Link>. The pictures and solutions will also be uploaded there.
    </p>
    <p>
      Participation at the <i>Kneipolympics</i> is free. Although we would be happy about donations either via cash on site or via <a href="https://www.paypal.com/pool/9dV4TLtnQY?sr=wccr">Paypal</a>.
    </p>
  </>
}