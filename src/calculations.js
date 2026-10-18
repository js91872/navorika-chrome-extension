(function (root) {
  "use strict";
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function computeAspectRatio(width, height) {
    width = Number(width); height = Number(height);
    if (!(width > 0 && height > 0 && Number.isFinite(width) && Number.isFinite(height))) return null;
    const scale = 1000, scaledWidth = Math.round(width * scale), scaledHeight = Math.round(height * scale);
    const divisor = gcd(scaledWidth, scaledHeight), ratioWidth = scaledWidth / divisor, ratioHeight = scaledHeight / divisor;
    const padding = Number((height / width * 100).toFixed(4));
    return { width, height, ratioWidth, ratioHeight, padding, css: `aspect-ratio: ${ratioWidth} / ${ratioHeight};\npadding-top: ${padding}%` };
  }
  function generateFlexCss({ direction = "row", justify = "flex-start", align = "stretch", gap = 0 } = {}) {
    const directions = new Set(["row", "column", "row-reverse", "column-reverse"]);
    const justifications = new Set(["flex-start", "center", "flex-end", "space-between", "space-around"]);
    const alignments = new Set(["stretch", "center", "flex-start", "flex-end"]);
    if (!directions.has(direction) || !justifications.has(justify) || !alignments.has(align)) throw new TypeError("Unsupported Flexbox value");
    gap = Math.max(0, Math.min(64, Number(gap) || 0));
    return `.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  gap: ${gap}px;\n}`;
  }
  const api = { computeAspectRatio, generateFlexCss };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.NAVORIKA_CALCULATIONS = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
