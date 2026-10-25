# CARVAJAL web revision — 25 October 2026

Public preview: https://experiencia-3d.carvajal-agencia.pages.dev/
Production: https://carvajal-agencia.pages.dev/ remains previous design until final selection.

## Implemented
- Transparent logo from supplied official reference; fade out with hero scroll, no morph into workflow.
- Starter / Business / Pro interactive cards directly after hero. Only Starter benefits and prices.
- Approved base prices: Bolivia Bs 2,500 installation + Bs 750/month; international USD 250 + USD 75/month. No temporary promotion inferred.
- CSS 3D smartphone with explicitly simulated conversation; no messaging endpoint or customer data.
- Plain-language product copy, company/product distinction.
- Review versions of privacy, terms, acceptable use, cookies, deletion, technology providers and analytics notices; 404 page.

## Pending before final production publication
- User chooses final website design.
- Cloudflare Web Analytics activation: deployment OAuth lacks RUM permission (403); dashboard requires sign-in. No statistics beacon installed, no analytics collected. Preference page honestly states inactive.
- Once analytics is configured, integrate consent-gated beacon and update notices to the actual behavior. Avoid automatic Pages injection if it bypasses preference controls.
- Review legal notices against the final commercial contract and actual provider configuration before adopting them as final production policy.

## Meta follow-through requested by user
After final public website selection and publication, update the existing Meta app's privacy policy, terms and data deletion instructions to the stable production URLs; verify HTTP 200 without authentication. Do not use the preview deployment URLs. Preserve existing webhook and callback configuration unless a proven required change exists.
Target paths: /privacy, /terms, /data-deletion.
Do not mark this completed until actual Meta fields are updated and verified.
