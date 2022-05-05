# Fretboard Diagram

A simple tool for creating fretboard diagrams.
Look at example.html for an example.

## Install

```
git clone https://github.com/zazzerino/fretboard-diagram.git
cd fretboard-diagram/
npm install
npm run start
```

Then, open example.html in a browser window.

After updating the source (one of the files in src/), reload the page to see changes.

You should probably read the src files in this order: `types.ts` -> `svg.ts` -> `index.ts`.

`index.ts` exports `makeFretboardDiagram`, which is the main function.

Run `npm run build` to create an optimized version of the library in a single file in dist/.

[A minor diagram](https://github.com/zazzerino/fretboard-diagram/blob/main/fretboard-diagram.png)

## Example Usage

    <script type="text/javascript">
      const makeFretboardDiagram = exports.makeFretboardDiagram;
    
      /**
       * ZPiDER's answer from https://stackoverflow.com/questions/1484506/random-color-generator
       */
      const randomColor = () => '#' + ((1 << 24) * Math.random() | 0).toString(16);
    
      const dots = [
        {string: 5, fret: 3, color: randomColor()},
        {string: 3, fret: 2, color: randomColor()},
        {string: 1, fret: 0, color: randomColor()},
      ];
    
      const opts = {
        dots,
        showFretNums: true,
        label: 'Amin',
        onClick: coord => console.log(`clicked on string: ${coord.string}, fret: ${coord.fret}`)
      };
    
      const diagram = makeFretboardDiagram(opts);
      console.log(diagram);
    
      const div = document.getElementById('Am-diagram');
      div.appendChild(diagram);
    </script>
