import { Link } from "react-router";

export function RulesPageDe() {
	return <ol className="rules-list">
		<li><em>Jeder</em> Teilnehmende muss in <em>jeder</em> Kneipe ein kleines Bier trinken. Die Teilnehmenden dürfen größere Biere oder mehrere trinken.</li>
		<li>Ein Bier zählt als Bier, wenn es mindestens 4,5% Alkoholgehalt hat. Ausgeschlossen sind also insbesondere Mischgetränke (Radler) oder alkoholfreies Bier. Ansonsten gibt es keine Einschränkung für die Sorte.</li>
		<li>Ein kleines Bier muss mindestens 300 ml enthalten.</li>
		<li>Eine Kneipe gilt als besucht, wenn die Teilnehmenden ein Bild vom Eingangsschild, sowie ein Bild von ihren ausgetrunkenen Gläsern oder Flaschen hochladen. Die Biere müssen in der Kneipe ausgetrunken werden. Die Bonusaufgaben müssen nicht abgeschlossen werden. Allerdings sind diese sehr wichtig für die Endwertung.</li>
		<li>Die Teilnehmenden dürfen nur zu Fuß gehen. Einzig zugelassenes Fortbewegungsmittel ist der Einkaufswagen. Es darf jedes zur Verfügung stehende Mittel zur Navigation genutzt werden.</li>
		<li>Für die erste Etappe (von Rewe bis zum Schrevi) gilt eine Mindest und Maximalzeit</li>
		<li>Sollte eine Kneipe wider erwarten geschlossen sein, trinken die Teilnehmenden in der nächsten ein zusätzliches Bier. Die Bonusaufgabe entfällt in diesem Fall.</li>
		<li>Wer ein ganzes oder Teil eines Bieres verschüttet muss  ein zusätzliches Bier trinken (hierbei gelten die Anforderungen aus II. und III.). Wer ein Bier mutwillig ausschüttet wird disqualifiziert.</li>
		<li>Der Wettkampf beginnt mit dem gemeinsamen Anstoßen vor Rewe und endet wenn alle Teilnehmer eines Teams ihr letztes Bier in der Lille Brauerei ausgetrunken haben.</li>
		<li>Die Teams werden zugelost. Die Losung findet unmittelbar vor dem Wettkampf auf dem Rewe Parkplatz statt. Jedes Team bekommt eine individuelle Route mit 8 Kneipen über die Webseite unter <Link to="/current">Aktuelles Spiel</Link>.</li>
	</ol>
}
