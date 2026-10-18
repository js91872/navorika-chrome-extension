const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const tools = require('../src/tools.js');

test('uses a valid minimal Manifest V3 action package', () => {
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.name, 'Navorika Tools');
  assert.equal(manifest.action.default_popup, 'popup.html');
  assert.deepEqual(manifest.permissions, ['storage']);
  assert.equal(manifest.host_permissions, undefined);
  assert.equal(manifest.background, undefined);
  assert.equal(manifest.content_scripts, undefined);
});

test('includes the five selected tools and two quick-access destinations', () => {
  const expected = ['rgb-cmyk-checker', 'flexbox-generator', 'aspect-ratio-padding', 'pdf-bleed-trim', 'step-to-3d-pdf', 'coreldraw-tools'];
  for (const id of expected) assert.ok(tools.some(tool => tool.id === id), `missing ${id}`);
  assert.equal(tools.length, 7);
});

test('tool registry has unique ids, HTTPS Navorika URLs, and supported categories', () => {
  const ids = new Set();
  const categories = new Set(['image', 'design', 'pdf', 'cad', 'all']);
  for (const tool of tools) {
    assert.ok(!ids.has(tool.id), `duplicate id ${tool.id}`);
    ids.add(tool.id);
    assert.equal(new URL(tool.url).origin, 'https://navorika.com');
    assert.ok(categories.has(tool.category), `unsupported category ${tool.category}`);
    assert.ok(tool.title && tool.description && tool.tint && tool.icon);
  }
});

test('all declared icon assets exist and are PNG files', () => {
  for (const file of Object.values(manifest.icons).concat(Object.values(manifest.action.default_icon))) {
    const asset = path.join(root, file);
    assert.ok(fs.existsSync(asset), `missing ${file}`);
    assert.equal(fs.readFileSync(asset).subarray(1, 4).toString(), 'PNG');
  }
});

test('extension ships no remotely loaded code, fonts, or tracking', () => {
  const html = fs.readFileSync(path.join(root, 'popup.html'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'popup.css'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'src/popup.js'), 'utf8');
  assert.doesNotMatch(html, /https?:\/\/(?!navorika\.com)/i);
  assert.doesNotMatch(css, /@import|https?:\/\//i);
  assert.doesNotMatch(js, /fetch\s*\(|XMLHttpRequest|sendBeacon|google-analytics|gtag\s*\(/i);
});

test('Flexbox and aspect ratio utilities run in the popup while other shortcuts open Navorika', () => {
  assert.equal(tools.find(tool => tool.id === 'flexbox-generator').inline, 'flexbox');
  assert.equal(tools.find(tool => tool.id === 'aspect-ratio-padding').inline, 'aspect');
  for (const id of ['rgb-cmyk-checker', 'pdf-bleed-trim', 'step-to-3d-pdf', 'coreldraw-tools']) {
    const tool = tools.find(item => item.id === id);
    assert.ok(tool.url.startsWith('https://navorika.com/tools/'));
    assert.equal(tool.inline, undefined);
  }
  const popup = fs.readFileSync(path.join(root, 'popup.html'), 'utf8');
  for (const id of ['workspace', 'aspect-tool', 'flex-tool', 'ratio-width', 'flex-direction', 'workspace-back']) assert.ok(popup.includes(`id="${id}"`), `missing ${id}`);
});

test('popup script selectors resolve to declared interface elements', () => {
  const html = fs.readFileSync(path.join(root, 'popup.html'), 'utf8');
  const script = fs.readFileSync(path.join(root, 'src/popup.js'), 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  assert.equal(ids.size, [...html.matchAll(/\bid="([^"]+)"/g)].length, 'duplicate HTML id');
  for (const [, id] of script.matchAll(/getElementById\("([^"]+)"\)/g)) assert.ok(ids.has(id), `script references missing #${id}`);
});
