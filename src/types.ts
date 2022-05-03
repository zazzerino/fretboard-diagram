export interface Point {
  x: number,
  y: number
}

/**
 * A string and fret on the fretboard.
 */
export interface FretCoord {
  string: number,
  fret: number
}

/**
 * A FretCoord with an optional color.
 * Represents a dot drawn on the fretboard.
 */
export interface Dot extends FretCoord {
  color?: string,
}

/**
 * The settings used by a fretboard diagram.
 */
export interface Opts {
  rootId: string,
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
  onClick: (fretCoord: FretCoord, svgElem: SVGSVGElement) => any
}

/**
 * The options given by the user. Only `id` is required.
 */
export type UserOpts = Pick<Opts, 'rootId'> & Partial<Opts>;

/**
 * The default options that will be used if none are given.
 */
export type DefaultOpts = Omit<Opts, 'rootId'>;
