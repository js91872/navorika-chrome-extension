(function (root) {
  "use strict";
  const tools = [
    { id: "rgb-cmyk-checker", title: "RGB / CMYK Image Checker", description: "Check an image's color mode before print or export.", category: "image", url: "https://navorika.com/tools/rgb-cmyk-image-checker", icon: "◉", tint: "mint", featured: true },
    { id: "flexbox-generator", title: "CSS Flexbox Generator", description: "Build a flex layout and copy the CSS.", category: "design", url: "https://navorika.com/tools/css-flexbox-generator", inline: "flexbox", icon: "▦", tint: "blue", featured: true },
    { id: "aspect-ratio-padding", title: "Aspect Ratio Padding Calculator", description: "Get responsive CSS padding for any aspect ratio.", category: "design", url: "https://navorika.com/tools/aspect-ratio-padding-calculator", inline: "aspect", icon: "◩", tint: "violet", featured: true },
    { id: "pdf-bleed-trim", title: "PDF Bleed & Trim Checker", description: "Review page dimensions, bleed, and trim setup.", category: "pdf", url: "https://navorika.com/tools/pdf-bleed-trim-checker", icon: "▤", tint: "rose", featured: true },
    { id: "step-to-3d-pdf", title: "STEP to 3D PDF", description: "Turn a STEP / STP model into an interactive 3D PDF.", category: "cad", url: "https://navorika.com/tools/step-to-3d-pdf-converter", icon: "◇", tint: "amber", featured: false },
    { id: "coreldraw-tools", title: "CorelDRAW Converters", description: "Open the Navorika CorelDRAW conversion toolkit.", category: "cad", url: "https://navorika.com/tools/coreldraw-tools", icon: "⬡", tint: "teal", featured: false },
    { id: "all-tools", title: "Browse All Navorika Tools", description: "Find more converters, calculators, and utilities.", category: "all", url: "https://navorika.com/tools", icon: "＋", tint: "slate", featured: false }
  ];
  if (typeof module !== "undefined" && module.exports) module.exports = tools;
  if (root) root.NAVORIKA_TOOLS = tools;
})(typeof globalThis !== "undefined" ? globalThis : this);
