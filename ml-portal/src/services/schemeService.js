import api from "./api";
import { schemesData } from "../data/schemes";

const SAVED_SCHEMES_KEY = "sahayak_saved_schemes";

export async function getSchemes(params = {}) {
  try {
    const response = await api.get("/schemes", { params });
    return response.data?.schemes || response.data;
  } catch {
    let list = [...schemesData];
    const savedIds = getSavedSchemeIds();
    list = list.map((s) => ({
      ...s,
      isSaved: savedIds.includes(s.id) || s.isSaved
    }));

    if (params.category && params.category !== "All") {
      list = list.filter((s) => s.category.toLowerCase().includes(params.category.toLowerCase()));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }
}

export async function getSchemeById(id) {
  try {
    const response = await api.get(`/schemes/${id}`);
    return response.data;
  } catch {
    return schemesData.find((s) => s.id === id) || schemesData[0];
  }
}

export async function evaluateScheme(profileData) {
  try {
    // Attempt backend match first (if it exists)
    const response = await api.post("/match", profileData);
    return response.data;
  } catch {
    // Fallback to local frontend matching engine
    const { getBestMatchingSchemes } = await import('./matchingEngine');
    const matchedSchemes = await getBestMatchingSchemes(profileData);
    
    // Format to match expected output structure
    return {
      eligible: matchedSchemes.length > 0 && matchedSchemes[0].status === 'potential_match',
      confidence: 85,
      matchedSchemes, // Include detailed matched logic
      matchedRules: matchedSchemes[0]?.criteria?.filter(c => c.result === 'met').map(c => c.label) || [],
      missingDocuments: ["Income Certificate renewal"]
    };
  }
}

export function getSavedSchemeIds() {
  try {
    const stored = localStorage.getItem(SAVED_SCHEMES_KEY);
    return stored ? JSON.parse(stored) : ["pm-kisan", "shravanbal-yojana"];
  } catch {
    return ["pm-kisan", "shravanbal-yojana"];
  }
}

export function toggleSaveScheme(schemeId) {
  const current = getSavedSchemeIds();
  let updated;
  if (current.includes(schemeId)) {
    updated = current.filter((id) => id !== schemeId);
  } else {
    updated = [...current, schemeId];
  }
  localStorage.setItem(SAVED_SCHEMES_KEY, JSON.stringify(updated));
  return updated;
}

export default {
  getSchemes,
  getSchemeById,
  evaluateScheme,
  getSavedSchemeIds,
  toggleSaveScheme
};
