# Navorika Tools for Chrome

A Manifest V3 toolbar launcher for seven Navorika destinations, including five selected tools and quick access to STEP-to-3D-PDF and the CorelDRAW converters. It keeps the extension small and sends users to the canonical Navorika tool pages for the actual workflows.

## Included destinations

- RGB / CMYK Image Checker
- CSS Flexbox Generator
- Aspect Ratio Padding Calculator
- PDF Bleed & Trim Checker
- STEP to 3D PDF
- CorelDRAW Converters
- Browse All Navorika Tools

## Install locally

1. Download or clone this repository.
2. Open `chrome://extensions` in Chrome and turn on **Developer mode**.
3. Choose **Load unpacked** and select this repository directory.
4. Pin **Navorika Tools** from the Extensions menu.

## Test

Requires Node.js 18 or newer. Run `npm test` to validate the Manifest V3 package, tool registry, destinations, assets, and local-only extension assets. No build step or dependency installation is required.

## Privacy and permissions

The extension stores only favorite tool IDs in `chrome.storage.local`. It has no host permissions, analytics, content scripts, background process, remote code, or access to page content. Opening a tool navigates to its Navorika page; each site's own processing and privacy details apply there. See [PRIVACY.md](PRIVACY.md).

## Release

The installable folder is the repository root. To prepare a store upload ZIP, run `npm run package`; it creates `dist/navorika-chrome-extension.zip`. The ZIP excludes repository metadata, tests, and documentation not needed at runtime. See [STORE-LISTING.md](STORE-LISTING.md) for proposed listing copy and [RELEASE-CHECKLIST.md](RELEASE-CHECKLIST.md) for the submission checklist.

## License

Copyright © Navorika. All rights reserved. Navorika and Navorika Tools are project branding. Third-party product names are used only to identify compatible workflows.
