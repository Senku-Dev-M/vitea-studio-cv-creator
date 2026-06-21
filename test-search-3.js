import fs from 'fs';
const css = fs.readFileSync('./src/index.css', 'utf-8');
const lines = css.split('\n');
let print = false;
let count = 0;
lines.forEach((line, idx) => {
  if (line.includes('accordion')) {
    print = true;
    count = 0;
  }
  if (print) {
    console.log(`${idx + 1}: ${line}`);
    count++;
    if (line.includes('}') && count > 2) {
      print = false;
    }
  }
});
