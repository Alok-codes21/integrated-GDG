# Sahayak AI backend (hackathon MVP)

A Node/Express API for React with bearer authentication, per-user profile access, input checks, rate limits, and optional MongoDB persistence. It shows **possible** Indian welfare-scheme matches with each rule, source link, missing answers and next steps. It never says a person is officially eligible. The four sample schemes are intentionally fewer than the original 8–12 target: each encoded rule has an official source, and unknown rules are not guessed.

## Start

Install Node 20+.

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:4000/api/health . Edit `.env` and replace `JWT_SECRET` with a randomly generated secret (for example `openssl rand -hex 32`). The default `DEMO_MODE=true` stores accounts and profiles **only in RAM**, lost on restart. For a persistent deployment, set `MONGODB_URI`, set `NODE_ENV=production`, disable `DEMO_MODE`, and use HTTPS. An AI key is not required. Do not put real welfare or identity details into this unreviewed application. `npm test` runs endpoint and account-isolation tests.

## How the pieces fit

- `server/app.js`: REST endpoints, input checks, optional profile storage and errors. The React frontend talks to this file through HTTP.
- `server/server.js`: requires an explicit MongoDB or local demo setting and starts the app; refuses to launch without a strong-enough JWT secret.
- `server/data/schemes.json`: curated schemes; every machine-tested criterion links to an official page.
- `server/services/matchingService.js`: deterministic three-state rule check: met, not met, unknown. Unknown never becomes eligible.
- `server/services/aiService.js`: deliberately limited offline Hindi/English phrase extraction; user must confirm all values.
- `server/services/ragService.js`: simple keyword retrieval of sourced scheme summaries, **not** vector RAG or an LLM.
- `server/services/ocrService.js`: explicit OCR-disabled response, rather than claiming that documents were scanned.
- `server/models/User.js` and `Profile.js`: MongoDB schemas; saved profiles belong to the authenticated account. Passwords use salted scrypt hashes.

The original concept includes OCR, speech, multilingual AI, vector RAG and a React interface. **Those are not implemented here.** Basic email/password authentication is implemented, but has no verification or password-reset flow. The browser's speech-to-text can be explored later, but its transcript must still be confirmed by the user. The backend supports life-event **re-evaluation by updating profile fields**; it does not watch for life events or send notifications. Use sample/redacted data only.

## Try the API

```bash
# First register an account. Save the returned token locally, never commit or share it.
curl -X POST http://localhost:4000/api/auth/register -H 'Content-Type: application/json' -d '{"email":"demo@example.org","password":"a-long-demo-passphrase"}'
# Set TOKEN to the response's token before the following examples.
TOKEN=PASTE_TOKEN_FROM_RESPONSE
curl http://localhost:4000/api/schemes
curl -X POST http://localhost:4000/api/ai/extract -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"text":"I am a 65-year-old farmer from Maharashtra"}'
curl -X POST http://localhost:4000/api/match -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"age":65,"state":"Maharashtra","occupation":"farmer","annualFamilyIncome":180000}'
curl -X POST http://localhost:4000/api/profiles -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"age":59,"bpl":true}'
curl -X PATCH http://localhost:4000/api/profiles/PASTE_ID -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"age":60,"lifeEvents":["turned 60"]}'
curl -X POST http://localhost:4000/api/documents/check -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"schemeId":"ignoaps","profile":{"documents":[]}}'
curl -H "Authorization: Bearer $TOKEN" 'http://localhost:4000/api/search?q=old%20age'
```

`PATCH` returns recomputed matches. `potential_match` means only the encoded self-reported rules were met, **not** final approval. `needs_information` means at least one key criterion was not given. `not_matched` means a supplied answer failed an encoded rule. For the example farmer, annual income ₹1.8 lakh **does not prove BPL** and farming **does not prove land ownership**; both remain unknown. `documents/check` explicitly marks required-document rules *uncurated*. `documents/scan` returns HTTP 501; do not submit actual IDs.

For React, the default CORS origin is `http://localhost:5173`; change `CORS_ORIGINS` in `.env` if needed. Authentication, per-user isolation, basic rate limits, security headers and JSON size limits are implemented. **Production readiness is not established**: add verified email and account recovery, CSRF/session strategy if using cookies, audit logging without sensitive data, consent and deletion/export, monitoring, security testing, backups, TLS, abuse protection, secret rotation and deployment hardening before real users. The demo memory store must never be enabled in production. Validate source rules again before public use because policies change. Avoid claiming official government endorsement.

## Official sources and scope

- PM-KISAN official overview and exclusions: https://pmkisan.gov.in/homenew.aspx . The actual government check includes land records, exclusions and other details; this API only asks two self-reported screening questions.
- NSAP FAQ (old-age age 60+ and BPL): https://nsap.nic.in/circular.do?method=faq . A family income number does not establish BPL inclusion.
- NSAP official scheme descriptions (widow age 40–59/BPL, disability age 18–59/BPL/severe or multiple disability): https://nsap.nic.in/ . State-specific implementation and pension top-ups differ.

No document requirements are encoded as facts because they were not independently verified in the cited pages. Visit the official source and local authority for the current application process and documents.


The React frontend is a separate project and ZIP. Set its VITE_API_URL to this backend origin, and set CORS_ORIGINS here to the frontend origin.
