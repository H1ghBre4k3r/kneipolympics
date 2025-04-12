import { Link } from "react-router";

export function RulesPageEn() {
  return <ol className="rules-list">
  <li><em>Every</em> participant has to drink a small beer in <em>every</em> bar. Participants may drink larger or more beers.</li>
  <li>A beer counts as a beer, if it has at least 4,5% alcohol content. Mixed drinks especially "Radler" or nonalcoholic beers are, therefore, excluded. There are no further restrictions on the type of beer.</li>
  <li>A small beer must be at least 300 ml.</li>
  <li>A bar is considered visited, when the participants uploaded a picture of the entrance sign and their empty glasses or bottles. The beers must be drunken inside the bar. The bonus tasks are not mandatory. However, they are crucial for the overall rating.</li>
  <li>The participants may only travel by foot. The only allowed mode of transportation is a shopping cart. The participants may use any available tool for navigation.</li>
  <li>There is a minimal and maximal time for the first stage (Rewe to Schrevi).</li>
  <li>If a bar is closed contrary to expectations, the participants have to drink an additional beer in the next bar. The bonus task is omitted in this case.</li>
  <li>If a participant spills a whole or part of a beer, they must drink a whole new beer (the requirements from II and III apply here). If a participant intenionally spills a beer, they are disqualified.</li>
  <li>The competition starts with the joint toast in front of Rewe and ends when all participant drank their last beer at the Lille Brewery</li>
  <li>The teams are randomly assigned. The assignment takes place immediately before the competition. Each team receives an unique route consisting of 8 bars via the website at <Link to="/current">Current Game</Link>.</li>
</ol>
}
