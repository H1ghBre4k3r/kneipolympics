import { writeFile } from 'fs';

const numJags = 21;
const jagDistance = 1;
const jagRadius = 0.16;
const innerRadius = 0.7;

const logoSmallSize = 6;

const ringDist = 1.35;
const xStep = (1 / Math.cos(Math.PI / 4)) * ringDist;
const yStep = Math.sin(Math.PI / 4) * ringDist;
const ringPositionsAndColors: [[number, number], string, [number, number][]][] = [
  [[logoSmallSize / 2 - xStep, logoSmallSize / 2 - yStep / 2], "blue", [[90 / 180 * Math.PI, 135 / 180 * Math.PI]]],
  [[logoSmallSize / 2, logoSmallSize / 2 - yStep / 2], "black", [[90 / 180 * Math.PI, 135 / 180 * Math.PI], [180 / 180 * Math.PI, 225 / 180 * Math.PI]]],
  [[logoSmallSize / 2 + xStep, logoSmallSize / 2 - yStep / 2], "red", [[180 / 180 * Math.PI, 225 / 180 * Math.PI]]],
  [[logoSmallSize / 2 - xStep / 2, logoSmallSize / 2 + yStep / 2], "yellow", []],
  [[logoSmallSize / 2 + xStep / 2, logoSmallSize / 2 + yStep / 2], "green", []],
]

const logoLargeSize = 50;
const largeRingDist = 11.2;
const largeRingRadius = 7;
const largeRingNumCaps = 20;
const largeXStep = (1 / Math.cos(Math.PI / 4)) * largeRingDist;
const largeYStep = Math.sin(Math.PI / 4) * largeRingDist;
const commonOffset = 0.47
const largeRingPositionsAndColors: [[number, number], string, number, number[]][] = [
  [[logoLargeSize / 2 - largeXStep, logoLargeSize / 2 - largeYStep / 2], "blue", commonOffset, [0]],
  [[logoLargeSize / 2, logoLargeSize / 2 - largeYStep / 2], "black", commonOffset, [0, 15]],
  [[logoLargeSize / 2 + largeXStep, logoLargeSize / 2 - largeYStep / 2], "red", commonOffset, [15]],
  [[logoLargeSize / 2 - largeXStep / 2, logoLargeSize / 2 + largeYStep / 2], "yellow", commonOffset, [10, 5]],
  [[logoLargeSize / 2 + largeXStep / 2, logoLargeSize / 2 + largeYStep / 2], "green", commonOffset, [5, 10]],
]

let maskId = 0;
let clipId = 0;
function bottleCap(x: number, y: number, xmlClass: string = "bottle-cap", mask: [number, number] | null = null) {
  let cutoutString = "";
  for (let i = 1; i <= numJags; i++) {
      cutoutString += `      <circle cx="${x + Math.sin((i-1) / numJags * 2 * Math.PI) * jagDistance}" cy="${y + Math.cos((i-1) / numJags * 2 * Math.PI) * jagDistance}" r="${jagRadius}" fill="black"/>\n`;
  }

  let bottleCapString = `  <g class="${xmlClass}">
    <circle class="rim" cx="${x}" cy="${y}" r="1" mask="url(#bottle-cap-shape-${maskId})" ${mask != null ? `clip-path="url(#ring-mask-${clipId})"` : ""} fill="var(--iconColor)"/>
    <mask id="bottle-cap-shape-${maskId}">
      <rect width="2" height="2" x="${x-1}" y="${y-1}" fill="white"/>
      <circle cx="${x}" cy="${y}" r="${innerRadius}" fill="black"/>
${cutoutString}    </mask>\n`;

    if (mask != null) {
      const [startAngle, endAngle] = mask;
      bottleCapString += `    <clipPath id="ring-mask-${clipId}">
      <path d="M ${x} ${y} L ${x + Math.sin(startAngle)} ${y - Math.cos(startAngle)} A 1 1 ${(endAngle-startAngle) / Math.PI * 180} 0 1 ${x + Math.sin(endAngle)} ${y - Math.cos(endAngle)} Z"/>
    </clipPath>\n`;
      clipId += 1;
    }
    bottleCapString += `    <circle cx="${x}" cy="${y}" r="${innerRadius}" fill="var(--iconColor)" fill-opacity="var(--innerOpacity)"/>\n`
    bottleCapString += "  </g>\n";
    maskId += 1;
  return bottleCapString;
}

const bottleCapSvgString = `<svg viewBox="0 0 2 2">
  ${bottleCap(1,1)}</svg>
`

let logoSmallSvgString = `<svg viewBox="0 0 6 6">
  <style>
    @import url(../styles/logo_small.css);
  </style>
`;
for (const [[x, y], color, _] of ringPositionsAndColors) {
  logoSmallSvgString += bottleCap(x, y, `bottle-cap-${color}`);
}

for (const [[x, y], color, masks] of ringPositionsAndColors) {
  for (const mask of masks) {
    logoSmallSvgString += bottleCap(x, y, `bottle-cap-${color}`, mask)
  }
}
logoSmallSvgString += '</svg>';

let logoLargeSvgString = `<svg viewBox="0 0 ${logoLargeSize} ${logoLargeSize}">
  <style>
    @import url(../styles/logo_large.css);
  </style>
`;
for (const [[x, y], color, startStep, remove] of largeRingPositionsAndColors) {
  for (let i = 0; i < largeRingNumCaps; i++) {
    if (!remove.includes(i)) {
      logoLargeSvgString += bottleCap(
        x + Math.sin(Math.PI * 2 / largeRingNumCaps * (i + startStep)) * largeRingRadius,
        y + Math.cos(Math.PI * 2 / largeRingNumCaps * (i + startStep)) * largeRingRadius,
        `bottle-cap-${color}`
      );
    }
  }
}
logoLargeSvgString += "</svg>"

for (const [svgString, fileName] of [
  [bottleCapSvgString, 'public/images/bottle_cap.svg'],
  [logoSmallSvgString, 'public/images/logo_small.svg'],
  [logoLargeSvgString, 'public/images/logo_large.svg']
]) {
  writeFile(fileName, svgString, (err) => {
    if (err) {
      console.error(err.message)
    }  else {
      console.info(`Succesfully created ${fileName}`)
    }
  })
}
