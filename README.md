# Integrated Sahayak AI (GDG Project)

## Live demo

[Open Sahayak AI](https://sahayak-j6ik.onrender.com/)

This is an independent scheme guide. It offers preliminary comparisons, not official eligibility decisions or application status.

> **Citizen Welfare Discovery & Entitlement Matching Platform**  
> Integrated solution combining **Frontend UI**, **Express + MongoDB Backend**, and **Machine Learning Intelligence Engines** (NLP Profile Extraction, Document OCR Scanner, Voice Assistant, and Rule-based Eligibility Matching).

---

## 📁 Repository Structure

```
integrated GDG/
├── backend/                  # Node.js Express REST API & ML Services
│   ├── server/
│   │   ├── models/           # Mongoose Data Models (User, Profile)
│   │   ├── services/         # ML & Business Logic (aiService, ocrService, matchingService)
│   │   ├── test/             # Test Suites (api.test.js, integration.test.js, e2e-live.mjs)
│   │   ├── app.js            # Express application & route definitions
│   │   └── server.js         # Entry point (port 4000)
│   └── package.json
│
├── frontend/                 # Interactive Scheme Discovery Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # High-performance UI components
│   │   ├── App.jsx           # Main application flow & integrated ML views
│   │   ├── mlAdapter.js      # Direct ML client adapter (AI extract, OCR, Speech)
│   │   ├── schemes.json      # Curated scheme definitions
│   │   └── style.css
│   └── package.json
│
├── ml-portal/                # 15-Screen Civic Welfare Portal (React + Vite)
│   ├── src/
│   │   ├── pages/            # AIConversation, Documents, Applications, LifeEvents, etc.
│   │   ├── services/         # api.js, matchingEngine.js, schemeService.js
│   │   └── data/             # Reference datasets
│   └── package.json
│
├── package.json              # Unified root scripts
└── README.md                 # Complete documentation
```

---

## ⚡ Quick Start

### 1. Install Dependencies
Run the install command from this root directory:
```bash
npm run install:all
```
*(Or install in each directory individually: `cd backend && npm install`, etc.)*

### 2. Start the Backend API
```bash
npm run dev:backend
# Starts Express server on http://localhost:4000
# Connected to MongoDB Atlas
```

### 3. Start the Frontend App
```bash
npm run dev:frontend
# Starts on http://localhost:5173
```

### 4. (Optional) Start the Multi-Screen Welfare Portal
```bash
npm run dev:ml-portal
# Starts on http://localhost:5174
```

---

## 🤖 Integrated Machine Learning Capabilities

| ML Feature | Endpoint | Description |
| :--- | :--- | :--- |
| **NLP Profile Extraction** | `POST /api/ai/extract` | Multi-lingual entity extractor (English, Hindi, Hinglish) parsing age, state, occupation, income, BPL status, and landholding. |
| **Document OCR Engine** | `POST /api/documents/scan` | Intelligent certificate parser identifying document types (Income, 7/12 Land Record, Aadhaar, Ration Card) and extracting verified figures. |
| **Voice Assistant** | In-Browser Speech API | Bi-directional voice assistant with continuous Speech-to-Text (`webkitSpeechRecognition`) and Text-to-Speech (`speechSynthesis`). |
| **Eligibility Matching Engine** | `POST /api/match` | Deterministic statutory rule engine evaluating eligibility criteria into `potential_match`, `needs_information`, or `not_matched`. |

---

## 🧪 Testing

Run all backend unit and integration test suites:
```bash
npm test
```

Run the live HTTP end-to-end check:
```bash
cd backend
node server/test/e2e-live.mjs
```

Build frontends for production:
```bash
npm run build
```
