const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const sharp = require('sharp');

async function main() {
  const root = path.resolve(__dirname, '..');
  const output = path.join(root, 'dist');
  const stage = path.join(output, 'extension');
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(stage, { recursive: true });
  for (const entry of ['manifest.json', 'popup.html', 'popup.css']) fs.copyFileSync(path.join(root, entry), path.join(stage, entry));
  fs.cpSync(path.join(root, 'src'), path.join(stage, 'src'), { recursive: true });
  fs.cpSync(path.join(root, 'assets'), path.join(stage, 'assets'), { recursive: true });
  const source = fs.readFileSync(path.join(root, 'assets/navorika-logo.svg'), 'utf8');
  if (!source.includes('viewBox="0 0 850 190"')) throw new Error('Unexpected production logo dimensions: review icon crop');
  const cropped = source.replace('viewBox="0 0 850 190"', 'viewBox="0 0 225 190"');
  for (const size of [16, 32, 48, 128]) {
    await sharp(Buffer.from(cropped), { density: 300 }).resize(size, size, { fit: 'contain', background: '#ffffff00' }).png().toFile(path.join(stage, 'assets', `icon${size}.png`));
  }
  const zip = path.join(output, 'navorika-chrome-extension-v1.1.0.zip');
  execFileSync('zip', ['-q', '-r', zip, '.'], { cwd: stage });
  console.log(`Created ${path.relative(root, zip)} with production red N icons`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
