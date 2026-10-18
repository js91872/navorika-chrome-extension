# Release checklist

## Package checks

- [x] Manifest V3; popup action only, no background worker or content script.
- [x] Minimal permission set: `storage` only; no host permissions.
- [x] Tool shortcuts use HTTPS canonical Navorika paths.
- [x] Interface assets are bundled locally; no remote code or remote fonts.
- [x] Privacy disclosure, store listing draft, and install instructions included.
- [ ] Capture real Chrome Web Store screenshots and promotional artwork.
- [ ] Publish `PRIVACY.md` at a public extension-specific URL; do not rely on the current general Navorika site policy alone.
- [ ] Confirm the final support and privacy URLs are live and appropriate.
- [ ] Upload ZIP in Chrome Web Store Developer Dashboard and complete the current declarations.
- [ ] Review store validation results and approve publishing separately.

## Local validation

Run `npm test` and `npm run package` from the repository root. Install unpacked in Chrome and verify keyboard focus, category filters, search, favorites, and each destination before submission.
