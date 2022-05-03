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

export type FretboardData = Opts & {
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

export type DrawStringsArgs = Pick<FretboardData,
  'xMargin' | 'yMargin' | 'neckHeight' | 'stringCount' | 'stringMargin'>

export type DrawFretsArgs = Pick<FretboardData,
  'width' | 'xMargin' | 'yMargin' | 'fretCount' | 'fretHeight'>

export type DrawLabelArgs = Pick<FretboardData,
  'width' | 'yMargin' | 'label'>

export type FretCoordPointArgs = Pick<FretboardData,
  'xMargin' | 'yMargin' | 'stringCount' | 'stringMargin' | 'fretHeight'>

export type DrawFretNumsArgs = Pick<FretboardData,
  'startFret' | 'endFret' | 'stringCount' | 'xMargin' | 'yMargin' | 'stringMargin' | 'fretHeight' | 'fretNumOffset'>
