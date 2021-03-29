# Fretboard Diagram

A simple tool for creating fretboard diagrams.

## Install

    npm install --save fretboard-diagram

## Usage

    import { FretboardDiagram } from 'fretboard-diagram'

    const AmChord = [
      { string: 5, fret: 3 },
      { string: 3, fret: 2, color: "limegreen" },
      { string: 1, fret: 0, color: "salmon" }
    ];

    const div = document.createElement('div');
    div.setAttribute("id", "diagram-id");
    document.body.appendChild(div);

    const diagram = new FretboardDiagram({
      id: "diagram-id",
      dots: AmChord,
      label: "A min",
      showFretNums: true,
      showStringNames: true,
      onClick: (dot, fd) => {
        console.log(`you clicked string: ${dot.string}, fret: ${dot.fret}`);
      }
    });