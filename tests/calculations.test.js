const test = require('node:test');
const assert = require('node:assert/strict');
const { computeAspectRatio, generateFlexCss } = require('../src/calculations.js');
test('aspect ratio calculator returns simplified ratio, padding, and CSS', () => {
  const result = computeAspectRatio(1920, 1080);
  assert.equal(result.ratioWidth, 16); assert.equal(result.ratioHeight, 9); assert.equal(result.padding, 56.25);
  assert.match(result.css, /aspect-ratio: 16 \/ 9/); assert.match(result.css, /padding-top: 56.25%/);
});
test('aspect ratio calculator rejects invalid dimensions', () => {
  for (const [width,height] of [[0,3],[-1,5],[4,0],[Infinity,5],["x",4]]) assert.equal(computeAspectRatio(width,height), null);
});
test('Flexbox generator clamps gaps and rejects unsupported values', () => {
  assert.match(generateFlexCss({direction:'column',justify:'center',align:'flex-end',gap:12}), /flex-direction: column;[\s\S]*gap: 12px/);
  assert.match(generateFlexCss({gap:100}), /gap: 64px/); assert.match(generateFlexCss({gap:-9}), /gap: 0px/);
  assert.throws(() => generateFlexCss({direction:'remote'}), /Unsupported/);
});
