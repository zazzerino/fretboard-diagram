import {distanceBetween, makeCircle, makeLine, makeSvgContainer, makeText} from './svg';
import {Dot, FretCoord, Opts, Point, UserOpts} from "./types";

/**
 * Default options for a 6-string guitar in standard tuning.
 */
const defaultOpts: Omit<Opts, 'id'> = {
  width: 200,
  height: 300,
  startFret: 1,
  endFret: 4,
  showFretNums: false,
  stringNames: ['E', 'B', 'G', 'D', 'A', 'E'],
  showStringNames: false,
  dots: [],
  dotColor: 'white',
  drawDotOnHover: false,
  hoverDotColor: 'white',
  label: '',
  onClick: (_coord: FretCoord, _diagram: SVGSVGElement) => null, // does nothing
}

function xMargin(opts: Opts) {
  return opts.width / 6;
}

export function makeFretboardDiagram(userOpts: UserOpts) {
  const opts = {...defaultOpts, ...userOpts};
  const {id, width, height, stringNames} = opts;

  const stringCount = stringNames.length;

  const rootElem = document.getElementById(id);
  if (!rootElem) throw new Error("Could not find element with id: ${id}");

  const svgElem = makeSvgContainer(width, height);

//   get xMargin(): number {
//     return this.width / 6;
//   }
//
//   // distance from the top of the svg container to the top of the strings
//   get yMargin(): number {
//     let margin = this.height / 8;
//
//     if (this.label) {
//       margin *= 1.5;
//     }
//
//     return margin;
//   }
//
//   // distance between the outer strings
//   get neckWidth(): number {
//     return this.width - (this.xMargin * 2);
//   }
//
//   // distance from the top to the bottom of the strings
//   get neckHeight(): number {
//     return this.height - (this.yMargin * 2);
//   }
//
//   // the number of strings
//   get stringCount(): number {
//     return this.stringNames.length;
//   }
//
//   // the number of frets
//   get fretCount(): number {
//     const count = this.endFret - this.startFret + 1;
//     return this.startFret === 0 ? count - 1 : count;
//   }
//
//   // vertical distance between frets
//   get fretHeight(): number {
//     return this.neckHeight / this.fretCount;
//   }
//
//   // horizontal distance between strings
//   get stringMargin(): number {
//     return this.neckWidth / (this.stringCount - 1);
//   }
//
//   // size of the drawn dots
//   get dotRadius(): number {
//     return this.fretHeight / 6;
//   }
//
//   // the distance from the fretNum to the left side of the neck
//   get fretNumOffset(): number {
//     return this.neckWidth / 6;
//   }

  rootElem.appendChild(svgElem);
}

function drawStrings(stringCount: number) {
  for (let i = 0; i < stringCount; i++) {
    // const x =
  }
}

//   drawStrings() {
//     for (let i = 0; i < this.stringCount; i++) {
//       const x = (i * this.stringMargin) + this.xMargin;
//       makeLine(this.svgElem, x, this.yMargin, x, this.yMargin + this.neckHeight);
//     }
//   }
//
//   drawFrets() {
//     for (let i = 0; i <= this.fretCount; i++) {
//       const y = (this.fretHeight * i) + this.yMargin;
//       makeLine(this.svgElem, this.xMargin, y, this.width - this.xMargin, y);
//     }
//   }

/**
 * Creating an instance of this class will draw a diagram in the element with `id`.
 * `id` must be provided, but the other keys have default values specified in `defaultOpts`.
 * `opts` has the following optional keys:
 *   - `width`: the width of the diagram
 *   - `height`: the height of the diagram
 *   - `showFretNumbers`: if true, draws the number beside each fret
 *   - `startFret`: the top fret on the diagram (lowest pitched note)
 *   - `endFret`: the bottom fret (highest pitched note)
 *   - `showStringNames`: if true, draws the string name underneath the string
 *   - `stringNames`: the string names to draw
 *   - `dots`: the dots to draw on the fretboard. Each `dot` is an object with keys: { string, fret }
 *   - `drawDotOnHover`: if true, draws a dot when the mouse hovers over the fret
 *   - `hoverDotColor`: the color of the dot drawn on hover
 *   - `label`: a label to draw above the diagram
 *   - `onClick`: a callback called when the diagram is clicked.
 */
// export class FretboardDiagram {
//   opts: Opts;
//
//   constructor(userOpts: UserOpts) {
//     this.
//   }
// }

// export class FretboardDiagram {
//   id: string;
//   rootElem: HTMLElement;
//   svgElem: SVGSVGElement;
//   width: number;
//   height: number;
//   stringNames: string[];
//   showStringNames: boolean;
//   startFret: number;
//   endFret: number;
//   showFretNums: boolean;
//   dots: Dot[];
//   dotColor: string;
//   drawDotOnHover: boolean;
//   hoverDotColor: string;
//   label: string;
//   onClick: (coord: FretCoord, fd: FretboardDiagram) => any;
//   points: Point[]; // the (x, y) location of each FretCoord
//
//   constructor(userOpts: UserOpts) {
//     // merge defaultOpts with the ones provided by the caller
//     const opts: Opts = { ...defaultOpts, ...userOpts };
//
//     this.id = opts.id;
//     const rootElem = document.getElementById(this.id);
//
//     if (!rootElem) {
//       throw new Error(`Could not find element with id: ${this.id}.`);
//     }
//
//     this.width = opts.width;
//     this.height = opts.height;
//
//     this.rootElem = rootElem;
//     this.svgElem = makeSvgContainer(this.rootElem, opts.width, opts.height);
//
//     this.stringNames = opts.stringNames;
//     this.showStringNames = opts.showStringNames;
//
//     this.startFret = opts.startFret;
//     this.endFret = opts.endFret;
//     this.showFretNums = opts.showFretNums;
//
//     this.dots = opts.dots;
//     this.dotColor = opts.dotColor;
//     this.drawDotOnHover = opts.drawDotOnHover;
//     this.hoverDotColor = opts.hoverDotColor;
//
//     this.label = opts.label;
//     this.onClick = opts.onClick.bind(this);
//
//     this.points = [];
//
//     this.draw();
//     this.populateCoords();
//     this.addEventListeners();
//   }
//
//   draw() {
//     this.drawStrings();
//     this.drawFrets();
//     this.drawDots();
//
//     if (this.showStringNames) {
//       this.drawStringNames();
//     }
//
//     if (this.showFretNums) {
//       this.drawFretNums();
//     }
//
//     if (this.label) {
//       this.drawLabel();
//     }
//   }
//
//   drawStrings() {
//     for (let i = 0; i < this.stringCount; i++) {
//       const x = (i * this.stringMargin) + this.xMargin;
//       makeLine(this.svgElem, x, this.yMargin, x, this.yMargin + this.neckHeight);
//     }
//   }
//
//   drawFrets() {
//     for (let i = 0; i <= this.fretCount; i++) {
//       const y = (this.fretHeight * i) + this.yMargin;
//       makeLine(this.svgElem, this.xMargin, y, this.width - this.xMargin, y);
//     }
//   }
//
//   /**
//    * Takes a { string, fret } and returns the { x, y } coordinate relative to the top left of the parent svg container.
//    */
//   getPoint({ string, fret }: FretCoord): Point {
//     const stringNum = Math.abs(string - this.stringCount);
//
//     const x = (stringNum * this.stringMargin) + this.xMargin;
//     let y = ((fret * this.fretHeight) - (this.fretHeight / 2)) + this.yMargin;
//
//     // adjust for the starting fret
//     y -= (this.startFret - 1) * this.fretHeight;
//
//     // Place open string dots closer to the top of the fretboard
//     if (fret === 0) {
//       y += this.fretHeight / 8;
//     }
//
//     return { x, y };
//   }
//
//   drawFretNums() {
//     const fontSize = 16;
//
//     for (let fret = this.startFret; fret <= this.endFret; fret++) {
//       let { x, y } = this.getPoint({ string: this.stringCount, fret });
//       x -= this.fretNumOffset;
//
//       makeText(this.svgElem, x, y, fret.toString(), fontSize);
//     }
//   }
//
//   drawDot(dot: Dot) {
//     const { x, y } = this.getPoint(dot);
//     const color = dot.color ? dot.color : this.dotColor;
//
//     let r = this.dotRadius;
//
//     // make open string dots a little smaller
//     if (dot.fret === 0) {
//       r -= r * 0.25;
//     }
//
//     return makeCircle(this.svgElem, x, y, r, color);
//   }
//
//   drawDots() {
//     this.dots.forEach(dot => this.drawDot(dot));
//   }
//
//   drawStringNames() {
//     for (let i = 0; i < this.stringCount; i++) {
//       let { x, y } = this.getPoint({ string: i + 1, fret: this.endFret + 1 });
//       makeText(this.svgElem, x, y, this.stringNames[i]);
//     }
//   }
//
//   drawLabel() {
//     const y = this.yMargin - (this.yMargin * 0.5);
//     makeText(this.svgElem, this.width / 2, y, this.label);
//   }
//
//   /**
//    * Returns the svg coordinate { x, y } of the `event`, i.e., the coordinate that was clicked.
//    */
//   cursorPoint(event: any) {
//     const point = this.svgElem.createSVGPoint();
//     point.x = event.clientX;
//     point.y = event.clientY;
//
//     const screenCTM = this.svgElem.getScreenCTM();
//
//     if (!screenCTM) {
//       throw new Error(`could not get the screen ctm of svgElem`);
//     }
//
//     const matrix = screenCTM.inverse();
//
//     const cursorPoint = point.matrixTransform(matrix);
//     return cursorPoint;
//   }
//
//   /**
//    * A utility method so that `findClosestFret` doesn't have to recalculate the fret coords
//    */
//   populateCoords() {
//     this.dots = [];
//     for (let string = 1; string < this.stringNames.length + 1; string++) {
//       for (let fret = this.startFret; fret <= this.endFret; fret++) {
//         // if we're in first position, add open string notes at fret 0
//         if (this.startFret === 1) {
//           this.points.push(this.getPoint({ string, fret: 0 }));
//           this.dots.push({ string, fret: 0 });
//         }
//
//         this.points.push(this.getPoint({ string, fret }));
//         this.dots.push({ string, fret });
//       }
//     }
//   }
//
//   /**
//    * Find the closest fret to the clicked point. Naive implementation, brute force algorithm.
//    */
//   findClosestFret(point: Point): Dot {
//     let closestDistance = distanceBetween(point, this.points[0]);
//     let closestDot = this.dots[0];
//
//     for (let i = 0; i < this.points.length; i++) {
//       const distance = distanceBetween(point, this.points[i]);
//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestDot = this.dots[i];
//       }
//     }
//
//     return closestDot;
//   }
//
//   addEventListeners() {
//     let hoverDot: SVGCircleElement | null = null;
//
//     // call the onClick callback when clicked
//     this.svgElem.addEventListener('click', event => {
//       const point = this.cursorPoint(event);
//       this.onClick(this.findClosestFret(point), this);
//     });
//
//     // draw a dot over the closest string/fret to the cursor
//     if (this.drawDotOnHover) {
//       this.svgElem.addEventListener('mousemove', event => {
//         const point = this.cursorPoint(event);
//         const dot = this.findClosestFret(point);
//
//         // remove the previous dot, if it exists
//         if (hoverDot) {
//           hoverDot.remove();
//         }
//
//         hoverDot = this.drawDot({ ...dot, color: this.hoverDotColor });
//         hoverDot.setAttribute('pointer-events', 'none');
//       });
//
//       // remove the dot when the mouse leaves the svg container
//       this.svgElem.addEventListener('mouseout', _ => {
//         if (hoverDot) {
//           hoverDot.remove();
//         }
//       });
//     }
//   }
//
//   // distance from the left side of the svg container to the leftmost string
//   get xMargin(): number {
//     return this.width / 6;
//   }
//
//   // distance from the top of the svg container to the top of the strings
//   get yMargin(): number {
//     let margin = this.height / 8;
//
//     if (this.label) {
//       margin *= 1.5;
//     }
//
//     return margin;
//   }
//
//   // distance between the outer strings
//   get neckWidth(): number {
//     return this.width - (this.xMargin * 2);
//   }
//
//   // distance from the top to the bottom of the strings
//   get neckHeight(): number {
//     return this.height - (this.yMargin * 2);
//   }
//
//   // the number of strings
//   get stringCount(): number {
//     return this.stringNames.length;
//   }
//
//   // the number of frets
//   get fretCount(): number {
//     const count = this.endFret - this.startFret + 1;
//     return this.startFret === 0 ? count - 1 : count;
//   }
//
//   // vertical distance between frets
//   get fretHeight(): number {
//     return this.neckHeight / this.fretCount;
//   }
//
//   // horizontal distance between strings
//   get stringMargin(): number {
//     return this.neckWidth / (this.stringCount - 1);
//   }
//
//   // size of the drawn dots
//   get dotRadius(): number {
//     return this.fretHeight / 6;
//   }
//
//   // the distance from the fretNum to the left side of the neck
//   get fretNumOffset(): number {
//     return this.neckWidth / 6;
//   }
// }
