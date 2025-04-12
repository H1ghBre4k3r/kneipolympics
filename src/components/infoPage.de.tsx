import { Link } from "react-router";

export function infoPageDe() {
  return <>
    <p>
      Die <i>Kneipolympics 2025</i> starten am 26.4.2025 um 18:00 (MESZ) Treffpunkt ist vor dem Rewe in der Gutenbergstraße 77.
    </p>
    <p>
      Die Teilnehmer werden vor Ort in Gruppen gelost und erhalten dann ihre Route. Die Route besteht aus 4 Kneipen, dann einem Flunkyballturnier im Schrevenpark, dann wieder 4 Kneipen und der Endstation in der Lille Brauerei.
    </p>
    <p>
      Zusätzlich zu den kleinen Bieren gibt es in jeder Kneipe eine Zusatzaufgabe, die gelöst werden muss. Am Ende ergeben die Punkte aus den Zusatzaufgaben, des Turniers und der Schnelligkeit der Etappen eine Gesamtwertung.
    </p>
    <p>
      Die nächsten Stationen und Aufgaben werden allen Teilnehmern auf der Webseite unter <Link to="/current">Aktuelles Spiel</Link> angezeigt. Das hochladen der Bilder und Lösungen erfolgt ebenfalls hier.
    </p>
    <p>
      Teilnahme an den <i>Kneipolympics</i> ist kostenfrei. Wir freuen uns allerdings über Spenden entweder vor Ort oder per <a href="https://www.paypal.com/pool/9dV4TLtnQY?sr=wccr">Paypal</a>.
    </p>
  </>
}
