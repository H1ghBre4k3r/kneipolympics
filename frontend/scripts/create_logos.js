import { writeFile } from 'fs';

const numJags = 21;
const jagDistance = 1;
const jagRadius = 0.16;
const innerRadius = 0.7;

const logoSmallSize = 6;

const ringDist = 1.35;
const xStep = (1 / Math.cos(Math.PI / 4)) * ringDist;
const yStep = Math.sin(Math.PI / 4) * ringDist;
const ringPositionsAndColors = [
  [[logoSmallSize / 2 - xStep, logoSmallSize / 2 - yStep / 2], "blue", [[135 / 180 * Math.PI, Math.PI]]],
  [[logoSmallSize / 2, logoSmallSize / 2 - yStep / 2], "black", [[90 / 180 * Math.PI, 135 / 180 * Math.PI], [180 / 180 * Math.PI, 225 / 180 * Math.PI]]],
  [[logoSmallSize / 2 + xStep, logoSmallSize / 2 - yStep / 2], "red", [[180 / 180 * Math.PI, 225 / 180 * Math.PI]]],
  [[logoSmallSize / 2 - xStep / 2, logoSmallSize / 2 + yStep / 2], "yellow", []],
  [[logoSmallSize / 2 + xStep / 2, logoSmallSize / 2 + yStep / 2], "green", []],
]

let maskId = 0;
let clipId = 0;
function bottleCap(x, y, xmlClass = "bottle-cap", mask = null) {
  let cutoutString = "";
  for (let i = 1; i <= numJags; i++) {
      cutoutString += `      <circle cx="${x + Math.sin((i-1) / numJags * 2 * Math.PI) * jagDistance}" cy="${y + Math.cos((i-1) / numJags * 2 * Math.PI) * jagDistance}" r="${jagRadius}" fill="black"/>\n`;
  }

  let bottleCapString = `  <g class="${xmlClass}">
    <circle class="rim" cx="${x}" cy="${y}" r="1" mask="url(#bottle-cap-shape-${maskId})" ${mask != null ? `clip-path="url(#ring-mask-${clipId})"` : ""} fill="var(--mainColor)"/>
    <mask id="bottle-cap-shape-${maskId}">
      <rect width="2" height="2" x="${x-1}" y="${y-1}" fill="white"/>
      <circle cx="${x}" cy="${y}" r="${innerRadius}" fill="black"/>
${cutoutString}    </mask>\n`;

    if (mask != null) {
      let [startAngle, endAngle] = mask;
      bottleCapString += `    <clipPath id="ring-mask-${clipId}">
      <path d="M ${x} ${y} L ${x + Math.sin(startAngle)} ${y - Math.cos(startAngle)} A 1 1 ${(endAngle-startAngle) / Math.PI * 180} 0 1 ${x + Math.sin(endAngle)} ${y - Math.cos(endAngle)} Z"/>
    </clipPath>\n`;
      clipId += 1;
    }
    bottleCapString += "  </g>\n";
    maskId += 1;
  return bottleCapString;
}

let bottleCapSvgString = `<svg viewBox="0 0 2 2">
  ${bottleCap(1,1)}</svg>
`

let logoSmallSvgString = `<svg viewBox="0 0 6 6">
  <style>
    @import url(../styles/logo_small.css);
  </style>
`;
for (let [[x, y], color, _] of ringPositionsAndColors) {
  logoSmallSvgString += bottleCap(x, y, `bottle-cap-${color}`);
}

for (let [[x, y], color, masks] of ringPositionsAndColors) {
  for (let mask of masks) {
    logoSmallSvgString += bottleCap(x, y, `bottle-cap-${color}`, mask)
  }
}
logoSmallSvgString += '</svg>';

writeFile('../frontend/public/images/bottle_cap.svg', bottleCapSvgString, (err) => {
  if (err) {
    console.error(err.message)
  }
})
writeFile('../frontend/public/images/logo_small.svg', logoSmallSvgString, (err) => {
  if (err) {
    console.error(err.message)
  }
})
