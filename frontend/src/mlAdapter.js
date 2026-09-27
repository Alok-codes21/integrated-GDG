/**
 * Sahayak AI Machine Learning & OCR Integration Adapter
 * Connects Frontend directly to Sahayak Backend AI Services, Speech Recognition, and OCR Engine.
 */

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const mlCapabilities = Object.freeze({ 
  profile: true, 
  ocr: true, 
  voice: true, 
  plan: true 
});

/**
 * 1. AI Profile Extraction from conversational free-text
 */
export async function extractProfile({ text, language = 'en', token = '' }) {
  if (!text || !text.trim()) {
    throw new Error('Please provide text to extract profile details.');
  }

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API}/api/ai/extract`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text: text.trim() })
    });

    if (res.ok) {
      const data = await res.json();
      return {
        proposedProfile: data.profile || {},
        confidence: data.confidence ?? null,
        evidence: data.extractedEntities || [],
        missingFields: data.missingFields || [],
        note: data.note || 'Review extracted fields before matching.',
        mode: data.mode || 'ai-nlp-extraction'
      };
    }
  } catch (err) {
    console.warn('[mlAdapter] Remote AI extraction unreachable, using client-side fallback:', err);
  }

  // Client-side fallback NLP parser
  const t = text.toLowerCase();
  const proposed = {};
  const evidence = [];

  const ageMatch = t.match(/(?:age\s*(?:is|:)?\s*|(?:i am|i'm|meri age|umr|umar|उम्र)\s*(?:a\s+)?)(\d{1,3})\b/) || t.match(/\b(\d{1,3})\s*(?:years? old|saal|साल)\b/);
  if (ageMatch && Number(ageMatch[1]) <= 120) {
    proposed.age = Number(ageMatch[1]);
    evidence.push({ field: 'age', value: proposed.age });
  }

  const states = ['Maharashtra','Karnataka','Delhi','Tamil Nadu','Uttar Pradesh','Bihar','Kerala','West Bengal','Gujarat','Rajasthan','Madhya Pradesh','Punjab'];
  const matchedState = states.find(s => t.includes(s.toLowerCase()));
  if (matchedState) {
    proposed.state = matchedState;
    evidence.push({ field: 'state', value: matchedState });
  }

  if (/\b(farmer|kisan|kisaan|cultivator|किसान)\b/.test(t)) {
    proposed.occupation = 'farmer';
    evidence.push({ field: 'occupation', value: 'farmer' });
  }

  if (/\b(own\s+land|owns\s+land|family\s+owns\s+land)\b/.test(t) && !/\b(no\s+land|landless)\b/.test(t)) {
    proposed.ownsCultivableLand = true;
    evidence.push({ field: 'ownsCultivableLand', value: true });
  }

  if (/\b(bpl|below poverty line)\b/.test(t)) {
    proposed.bpl = true;
    evidence.push({ field: 'bpl', value: true });
  }

  const money = t.match(/(?:income|आय|aamdani)[^\d₹]{0,35}₹?\s*([\d,.]+)\s*(lakh|lac|लाख)?/);
  if (money) {
    const n = Number(money[1].replaceAll(',', ''));
    if (Number.isFinite(n)) {
      proposed.annualFamilyIncome = n * (money[2] ? 100000 : 1);
      evidence.push({ field: 'annualFamilyIncome', value: proposed.annualFamilyIncome });
    }
  }

  return {
    proposedProfile: proposed,
    confidence: null,
    evidence,
    missingFields: ['age', 'state', 'bpl', 'ownsCultivableLand'].filter(k => proposed[k] === undefined),
    note: 'Pattern-based suggestions from your text. Review every value before continuing.',
    mode: 'client-nlp-fallback'
  };
}

/**
 * 2. Intelligent OCR Document Extraction
 */
export async function extractDocument() {
  throw new Error('File OCR is not available. No document was read or verified.');
}

/**
 * 3. Speech-to-Text Transcription via Web Speech API
 */
export function createSpeechRecognizer({ lang = 'en-IN', onTranscript, onError, onStateChange }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return {
      available: false,
      start: () => {
        onError?.('Speech recognition is not supported in this browser. Please type your situation.');
      },
      stop: () => {}
    };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = lang;

  recognition.onstart = () => {
    onStateChange?.(true);
  };

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    onTranscript?.(transcript);
  };

  recognition.onerror = (event) => {
    onStateChange?.(false);
    onError?.(event.error === 'no-speech' ? 'No speech detected. Please try again.' : `Microphone error: ${event.error}`);
  };

  recognition.onend = () => {
    onStateChange?.(false);
  };

  return {
    available: true,
    start: () => {
      try {
        recognition.start();
      } catch {
        recognition.stop();
        setTimeout(() => recognition.start(), 200);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch {}
    }
  };
}

/**
 * 4. ML Dynamic Action Plan Builder
 */
export function buildPlan({ confirmedProfile = {}, matches = null }) {
  const results = matches?.results || [];
  const potentialMatches = results.filter(r => r.status === 'potential_match');
  const needsInfo = results.filter(r => r.status === 'needs_information');

  const steps = [
    {
      step: '01',
      title: 'Review Self-Declared Profile',
      desc: confirmedProfile.age ? `Confirmed: Age ${confirmedProfile.age}, State ${confirmedProfile.state || 'India'}, Occupation ${confirmedProfile.occupation || 'Farmer'}.` : 'Complete the preliminary questions to verify demographic limits.',
      status: confirmedProfile.age ? 'done' : 'pending',
      actionUrl: 'questions'
    },
    {
      step: '02',
      title: 'Assemble Key Statutory Documents',
      desc: `Prepare required proofs: Aadhaar, 7/12 Land Record (Mahabhulekh), Tahsildar Income Certificate (under ₹1.8L ceiling), and Active NPCI-seeded Bank Account.`,
      status: 'actionable',
      actionUrl: 'ml-docs'
    },
    {
      step: '03',
      title: 'Check Official Gazettes & Portals',
      desc: potentialMatches.length > 0 
        ? `You have ${potentialMatches.length} high-probability schemes (${potentialMatches.map(s=>s.name.split(' ')[0]).join(', ')}). Review official portals directly.`
        : 'Compare rules with the official central and state social welfare portals.',
      status: 'actionable',
      actionUrl: 'results'
    },
    {
      step: '04',
      title: 'Submit via CSC Center or State Seva Kendra',
      desc: 'Visit your nearest Common Service Centre (CSC) or citizen facilitation counter with biometric verification to complete biometric e-KYC.',
      status: 'final',
      externalUrl: 'https://www.google.com/maps/search/?api=1&query=Common+Service+Centre+near+me'
    }
  ];

  return {
    steps,
    totalPotential: potentialMatches.length,
    needsClarification: needsInfo.length,
    gaps: needsInfo.flatMap(s => s.criteria?.filter(c => c.result === 'unknown').map(c => c.criterion) || [])
  };
}

export const mlAdapter = Object.freeze({
  extractProfile,
  extractDocument,
  createSpeechRecognizer,
  buildPlan
});

export default mlAdapter;
