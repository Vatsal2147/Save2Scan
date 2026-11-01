# Scan2Save

Campus emergency-card prototype: registration, D1-backed profile storage, QR download, mobile emergency profile, tap-to-call, and server-side Sarvam Hindi narration.

## Run

Install dependencies, run `npm run db:generate`, and build with `npm run build`.
Apply pending SQL migrations locally using the starter README instructions, then run `npm run dev`.

Sarvam requests only run when the Hindi audio button is pressed and a server-side `SARVAM_API_KEY` is configured. Keep local values in an ignored `.dev.vars` file for the Cloudflare runtime. Hosted secrets must be configured through Sites, never in source or the browser. No key is included in this repository.

## Prototype limits

- Sites starts private; anonymous QR access requires an explicit audience change.
- Anyone with an accessible profile link can read all submitted fields. Registration requires sharing consent.
- Profiles are self-reported, not medical records. No diagnosis, treatment advice, or automatic emergency notifications.
- Hindi narration uses fixed Hindi labels and preserves user-entered terms. Medical pronunciation must be reviewed before real use.
- Editing/deletion, abuse protection, audio caching, and production hardening are not yet implemented. Use fictional profiles for demos.
