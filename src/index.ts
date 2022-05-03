import {
  DefaultOpts,
  DrawFretsArgs,
  DrawLabelArgs,
  DrawStringsArgs,
  FretboardData,
  FretboardDataArgs,
  FretboardState,
  FretCoord,
  FretCoordPointArgs,
  Opts,
  Point,
  UserOpts
} from "./types";
import {makeLine, makeSvgElement, makeText} from "./svg";

/**
 * Options for a 6-string guitar in standard tuning.
 */
const DEFAULT_OPTS: DefaultOpts = {
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
  onClick: (_fretCoord, _svgElem) => null,
}

function fretboardData(args: Pick<Opts, FretboardDataArgs>): FretboardData {
  const {width, height, stringNames, label, startFret, endFret} = args;

  const xMargin = width / 6;
  const yMarginOffset = label === '' ? 1 : 1.5;
  const yMargin = (height / 8) * yMarginOffset;

  const neckWidth = width - (xMargin * 2);
  const neckHeight = height - (yMargin * 2);

  const stringCount = stringNames.length;
  const stringMargin = neckWidth / (stringCount - 1);

  const fretCountOffset = startFret === 0 ? 0 : 1;
  const fretCount = (endFret - startFret) + fretCountOffset;
  const fretHeight = neckHeight / fretCount;
  const fretNumOffset = neckWidth / 6;

  return {
    xMargin, yMargin, neckWidth, neckHeight, stringCount, stringMargin, fretCount, fretHeight, fretNumOffset,
  };
}

export function makeFretboardDiagram(userOpts: UserOpts) {
  const opts: Opts = {...DEFAULT_OPTS, ...userOpts};
  const svgElem = makeSvgElement(opts.width, opts.height);
  const state: FretboardState = {...opts, ...fretboardData(opts)};

  drawStrings(svgElem, state);
  drawFrets(svgElem, state);

  if (opts.label) drawLabel(svgElem, state);
  if (opts.showFretNums) drawFretNums(svgElem, state);

  return svgElem;
}

function drawStrings(svgElem: SVGElement, args: Pick<FretboardState, DrawStringsArgs>) {
  const {xMargin, yMargin, neckHeight, stringCount, stringMargin} = args;

  for (let i = 0; i < stringCount; i++) {
    const x = (i * stringMargin) + xMargin;
    const line = makeLine(x, yMargin, x, yMargin + neckHeight);
    svgElem.appendChild(line);
  }
}

function drawFrets(elem: SVGElement, args: Pick<FretboardState, DrawFretsArgs>) {
  const {width, xMargin, yMargin, fretCount, fretHeight} = args;

  for (let i = 0; i <= fretCount; i++) {
    const y = (i * fretHeight) + yMargin;
    const x1 = xMargin;
    const x2 = width - xMargin;
    const line = makeLine(x1, y, x2, y);
    elem.appendChild(line);
  }
}

function drawLabel(elem: SVGElement, args: Pick<FretboardState, DrawLabelArgs>) {
  const {width, yMargin, label} = args;
  const x = width / 2;
  const y = yMargin - (yMargin / 2);
  const textElem = makeText(x, y, label);
  elem.appendChild(textElem);
}

export type DrawFretNumsArgs =
  'startFret' | 'endFret' | 'stringCount' | 'xMargin' | 'yMargin' | 'stringMargin' | 'fretHeight' | 'fretNumOffset';

function drawFretNums(elem: SVGElement, args: Pick<FretboardState, DrawFretNumsArgs>) {
  const {
    stringCount, startFret, endFret, xMargin, yMargin, stringMargin, fretHeight, fretNumOffset
  } = args;

  const fontSize = 16; // TODO: adjust this for different diagram sizes
  const string = stringCount;

  for (let fret = startFret; fret <= endFret; fret++) {
    const {x, y} = fretCoordPoint({fret, string}, args);
    const textElem = makeText(x-fretNumOffset, y+fretHeight/4, fret.toString(), fontSize);
    elem.appendChild(textElem);
  }
}

/**
 * Takes a FretCoord and returns the Point relative to the top left of the parent svg container.
 */
function fretCoordPoint(fretCoord: FretCoord, args: Pick<FretboardState, FretCoordPointArgs>) {
  const {string, fret} = fretCoord;
  const {xMargin, yMargin, stringCount, stringMargin, fretHeight} = args;

  const stringNum = Math.abs(string - stringCount);
  const x = (stringNum * stringMargin) + xMargin;
  const yOffset = fret === 0 ? 0 : -fretHeight / 8;
  const y = (fret * fretHeight) - (fretHeight / 2) + yMargin + yOffset;

  return {x, y};
}

/**
 * Returns the svg coordinate (x,y) of the `event`, i.e., the coordinate that was clicked.
 */
function cursorPoint(elem: SVGSVGElement, event: MouseEvent): Point {
    const point = elem.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const screenCTM = elem.getScreenCTM();
    if (!screenCTM) throw new Error(`could not get the screen ctm of ${elem}`);

    const matrix = screenCTM.inverse();
    return point.matrixTransform(matrix);
}

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


// /**
//  * The distance from the left side of the svg container to the leftmost string.
//  */
// function getXMargin({width: number}): number {
//   return width / 6;
// }

// /**
//  * The distance from the top of the svg container to the top of the strings.
//  */
// function yMargin(height: number, label?: string): number {
//   const offset = label == null ? 1 : 1.5; // if there's a label, make the offset larger
//   return (height / 8) * offset;
// }

// function getNeckWidth(width: number, xMargin: number): number {
//   return width - (xMargin * 2);
// }
//
// function getNeckHeight(height: number, yMargin: number): number {
//   return height - (yMargin * 2);
// }
//
// function getFretCount(startFret: number, endFret: number): number {
//   const offset = startFret === 0 ? 0 : 1;
//   return (endFret - startFret) + offset;
// }
//
// function getFretHeight(neckHeight: number, fretCount: number): number {
//   return neckHeight / fretCount;
// }
//
// /**
//  * The horizontal distance between strings.
//  */
// function getStringMargin(neckWidth: number, stringCount: number): number {
//   return neckWidth / (stringCount - 1);
// }
//
// /**
//  * The size of the dots drawn over the frets
//  */
// function dotRadius(fretHeight: number): number {
//   return fretHeight / 6;
// }
//
// /**
//  * The distance between the fret number label and the left side of the neck.
//  */
// function fretNumOffset(neckWidth: number): number {
//   return neckWidth / 6;
// }

// function findElementOrThrow(elemId: string): HTMLElement {
//   const elem = document.getElementById(elemId);
//   if (!elem) throw new Error(`Could not find element with id: ${elemId}`);
//   return elem;
// }

