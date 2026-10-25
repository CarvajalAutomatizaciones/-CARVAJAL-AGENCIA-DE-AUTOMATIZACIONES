# CARVAJAL — Cloudflare production

Published 2026-10-25 to https://carvajal-agencia.pages.dev via Wrangler Direct Upload.
Project: carvajal-agencia. Production branch: main (Cloudflare deployment label).
First deployment: a0829a69.carvajal-agencia.pages.dev. Source commit: d225dc7.

The full storefront source remains on Git branch `codex/cloudflare-preparation-20261020`. GitHub branch `main` now contains legacy URL redirects; do NOT deploy its redirect HTML to Cloudflare.

Deploy only index.html, privacy.html, data-deletion.html, cookies.html, subprocessors.html and _headers from this source branch. Do not upload .git or private documents. No build step is required.

Deployment command: `npx wrangler pages deploy <asset-directory> --project-name carvajal-agencia --branch main`.

Verified HTTPS and HTTP 200: /, /privacy, /data-deletion, /cookies, /subprocessors, and the linked production App login https://carvajal-app-production.up.railway.app/login.

Cloudflare normalizes .html URLs to extensionless routes using 308 redirects. publicBaseUrl adopts the current host. Logo is embedded in index.html.

GitHub Pages old URLs redirect to Cloudflare to preserve existing App return links and legal URLs. App remains on Railway. No DNS, Meta or Auth settings were changed in this hosting migration.

Local prepared copy: C:\Users\Hp\CARVAJAL\carvajal-web-cloudflare-20261025\deploy
