import fs from 'fs';
const css = fs.readFileSync('./src/index.css', 'utf-8');
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('accordion-content')) {
    console.log(`--- Line ${idx + 1} ---`);
    for (let i = Math.max(0, idx - 2); i <= Math.min(lines.length - 1, idx + 5); i++) {
      console.log(`${i + 1}: ${lines[i]}`);
    }
  }
});
