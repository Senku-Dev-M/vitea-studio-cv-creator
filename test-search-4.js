import fs from 'fs';
const css = fs.readFileSync('./src/index.css', 'utf-8');
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('height: 0') || line.includes('opacity: 0') || line.includes('visibility:') || line.includes('overflow: hidden')) {
    console.log(`${idx + 1}: ${line}`);
  }
});
