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
 * Represents a dot drawn on the fretboard diagram.
 */
export interface Dot extends FretCoord {
  color?: string,
}

/**
 * The settings used by a fretboard diagram.
 */
export interface Opts {
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
export type UserOpts = Partial<Opts>;

/**
 * The default options that will be used if none are given.
 */
export type DefaultOpts = Omit<Opts, 'rootId'>;

/**
 * Fretboard information that will be calculated from the given Opts.
 */
export interface FretboardData {
  xMargin: number;
  yMargin: number;
  neckWidth: number;
  neckHeight: number;
  stringCount: number;
  stringMargin: number;
  fretCount: number;
  fretHeight: number;
  fretNumOffset: number;
}

export type FretboardState = Opts & FretboardData;

export type DrawStringsArgs = 'xMargin' | 'yMargin' | 'neckHeight' | 'stringCount' | 'stringMargin';
export type DrawFretsArgs = 'width' | 'xMargin' | 'yMargin' | 'fretCount' | 'fretHeight';
export type DrawLabelArgs = 'width' | 'yMargin' | 'label';
export type FretCoordPointArgs = 'xMargin' | 'yMargin' | 'stringCount' | 'stringMargin' | 'fretHeight';
export type FretboardDataArgs = 'width' | 'height' | 'stringNames' | 'label' | 'startFret' | 'endFret';
