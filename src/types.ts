export interface Point {
  x: number,
  y: number
}

/**
 * A string/fret coordinate on the fretboard.
 */
export interface FretCoord {
  string: number,
  fret: number
}

/**
 * A FretCoord with an optional color.
 */
export interface Dot extends FretCoord {
  color?: string,
}

/**
 * The settings used by a fretboard diagram.
 */
export interface Opts {
  id: string,
  width: number,
  height: number,
  startFret: number,
  endFret: number,
  showFretNums: boolean,
  stringNames: string[]
  showStringNames: boolean,
  dots: Dot[],
  dotColor: string,
  drawDotOnHover: boolean,
  hoverDotColor: string,
  label: string,
  onClick: (coord: FretCoord, diagram: SVGSVGElement) => any
}

/**
 * The options given by the user. Only `id` is required.
 */
export type UserOpts = Pick<Opts, 'id'> & Partial<Opts>;
