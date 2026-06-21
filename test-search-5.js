import fs from 'fs';
const css = fs.readFileSync('./src/index.css', 'utf-8');
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('input') && !line.includes('color-picker') && !line.includes('photo-upload')) {
    console.log(`${idx + 1}: ${line}`);
  }
});
