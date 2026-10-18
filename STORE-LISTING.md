# Chrome Web Store listing content

Draft prepared for the Chrome Web Store dashboard. The copy below describes the current extension behavior and does not claim that the online Navorika tools run inside the extension.

## Listing fields

**Product name:** Navorika Tools

**Summary (under 132 characters):** Quickly open Navorika’s image, CSS, PDF and CAD tools from a searchable Chrome toolbar popup.

**Category:** Productivity

**Language:** English

**Detailed description:**

Keep Navorika’s practical browser tools close at hand. Navorika Tools is a compact Chrome toolbar launcher for image checks, CSS helpers, PDF print preparation and CAD conversion workflows.

Search the tool list, browse by category and save favorites in the popup. The CSS Flexbox Generator and Aspect Ratio Padding Calculator include quick in-popup helpers. Other shortcuts open their corresponding Navorika pages in a new tab.

Included shortcuts:

- RGB / CMYK Image Checker
- CSS Flexbox Generator
- Aspect Ratio Padding Calculator
- PDF Bleed & Trim Checker
- STEP-to-3D-PDF converter
- CorelDRAW converters
- Browse all Navorika tools

Favorites are saved locally in Chrome. This extension does not read the pages you visit, collect browsing history, or send favorite data to a server. When you open a Navorika tool, that page’s own processing and privacy practices apply.

**Homepage URL:** https://navorika.com/

**Support URL:** https://github.com/js91872/navorika-chrome-extension/issues

**Privacy policy URL:** https://github.com/js91872/navorika-chrome-extension/blob/main/PRIVACY.md

## Privacy practices dashboard draft

Use these values only after confirming they match the final uploaded package and the live privacy policy.

- **Single-purpose description:** A toolbar launcher that helps users find and open Navorika’s browser-based design, file-preparation and conversion tools.
- **Permission — `storage`:** Stores the IDs of tools a user favorites, so the favorites remain selected when the popup is reopened. No host permissions are requested.
- **Remote code:** No. The extension does not load or execute remotely hosted code.
- **Data handling disclosure:** Favorite tool IDs are stored locally in Chrome. The extension does not transmit them or collect browsing activity, page content, files, authentication details or personal information.
- **Data categories:** Do not declare browsing activity or other personal-data categories as collected by this extension. Review the dashboard’s current definitions and answer consistently with the final code and policy.
- **Limited Use certification:** Certify only after reviewing the dashboard wording and verifying that the submitted package and linked policy still match these statements.

## Store graphics and submission assets

Chrome requires a store icon and at least one screenshot. Capture genuine screenshots from the final extension in Chrome; do not use mockups or screenshots that imply unavailable behavior.

Suggested screenshots (Chrome Web Store screenshot dimensions: 1280 × 800 or 640 × 400):

1. **Find a tool quickly:** popup showing the search field and the complete tool list.
2. **Keep favorites handy:** popup with favorite tools selected.
3. **Build a Flexbox snippet:** the in-popup CSS Flexbox Generator with sample settings and generated CSS.
4. **Calculate aspect-ratio padding:** the in-popup calculator with a sample ratio and result.

Use `assets/icon128.png` for the store icon. Promotional artwork is optional unless the dashboard requests it. Do not submit the extension until the screenshots, privacy URL and support URL have been checked in the live dashboard.

## Final pre-submission checks

- Confirm the item name, summary and detailed description match the uploaded version.
- Confirm the public privacy policy and support links load without signing in.
- Check the data disclosure and permission justification against the current package.
- Capture and inspect at least one real Chrome screenshot at a supported size.
- Install the packaged extension in Chrome and test search, category filters, favorites, both in-popup utilities and every destination link.
- Review Chrome’s validation and policy results. Publishing remains a separate approval step.

## Reference

- [Chrome Web Store listing requirements](https://developer.chrome.com/docs/webstore/program-policies/listing-requirements)
- [Creating a great listing page](https://developer.chrome.com/docs/webstore/best-listing)
- [Privacy practices dashboard fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy/)
