# Sahayak AI frontend

Responsive React/Vite development prototype for browsing four government scheme examples and comparing self-reported answers against the separate Sahayak API. It does not submit applications or determine official eligibility.

## Run on Windows

1. Install Node.js 20.19+ or 22.12+ from https://nodejs.org/ and Git from https://git-scm.com/download/win, then open PowerShell.
2. Clone the separate frontend repository and install its locked dependencies:

```powershell
git clone https://github.com/Alok-codes21/sahayak-ai-frontend.git
cd sahayak-ai-frontend
npm ci
```

3. Open a second PowerShell window. Clone the separate backend repository or use its source ZIP, follow **its** README, and start it on `http://localhost:4000`. For local testing only, that backend supports in-memory demo mode; restart erases test accounts and profiles. Do not use real citizen data in a development prototype.
4. The frontend defaults to `http://localhost:4000`. To make this explicit, run `Copy-Item .env.example .env` in the frontend folder. Then run:

```powershell
npm run dev
```

Open the **Local** address Vite prints, normally http://localhost:5173. If the port differs, include that frontend origin in the backend's `CORS_ORIGINS` setting. Before testing matching, create a fictional account on the frontend: the backend requires authentication for matching and document checks. If the app remains on "Loading Sahayak...", check the PowerShell build output and browser console. A render error should instead show a readable reload screen. To check the production bundle locally, run `npm run build`.

## Scope and cautions

Home browsing uses a bundled copy of four public scheme examples until `/api/schemes` responds. The question flow calls `/api/match` after sign-in; scheme detail calls `/api/documents/check`. Profile saving uses the backend account and a browser-session pointer to the saved profile; bookmarks are device-local only. The documents section is an illustrative self-reported preparation list, **not verified official requirements**. Always check the official scheme page for current rules, documents, and the application route. The frontend has light/dark modes, responsive screens, small React Bits Micro interactions, restrained reduced-motion-aware text reveal, accessible text sizing, browser speech where supported, and copy/print actions. Full Hindi UI, OCR, application submission, account recovery, and production privacy/security review are not implemented.

The React Bits component files in `src/components/reactbits/` are adapted from https://reactbits.dev/c/micro; see `REACT-BITS-LICENSE.md`. This repository is private. The separate backend is not modified by this frontend build.

## ML screen integration (not connected)

The four preview screens are free-text profile, sample-document OCR, voice input, and action plan. Their disabled status is deliberate. No preview screen calls an ML endpoint, records the microphone, reads file bytes, or uploads a document. `src/mlAdapter.js` lists proposed request and response shapes without claiming that any server endpoint exists. Once the ML team agrees on authenticated routes, data retention, input limits, and error behavior, implement the adapter and add a review/confirmation screen before any extracted field enters `/api/match`. BPL status and land ownership require explicit user answers; OCR must never be treated as official verification. Keep the manual question path working when ML services are unavailable.
