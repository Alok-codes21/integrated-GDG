import api from './api';

/**
 * Calculates a basic Levenshtein distance for fuzzy string matching
 */
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1,   // insertion
            matrix[i - 1][j] + 1    // deletion
          )
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Fuzzy equality check
 */
function fuzzyEquals(val1, val2, threshold = 0.2) {
  if (typeof val1 !== 'string' || typeof val2 !== 'string') {
    return val1 === val2;
  }
  const str1 = val1.toLowerCase().trim();
  const str2 = val2.toLowerCase().trim();
  if (str1 === str2) return true;
  
  const distance = levenshteinDistance(str1, str2);
  const maxLen = Math.max(str1.length, str2.length);
  return (distance / maxLen) <= threshold;
}

export async function fetchSchemesFromBackend() {
  try {
    const response = await api.get('/schemes');
    return response.data.schemes || [];
  } catch (error) {
    console.error("Failed to fetch schemes from backend:", error);
    return [];
  }
}

/**
 * Evaluates a single scheme against a user profile with ML heuristics
 */
export function evaluateSchemeRules(profile, scheme) {
  if (!scheme.rules || !Array.isArray(scheme.rules)) {
    return { status: 'unknown', score: 0, criteria: [] };
  }

  let totalWeight = 0;
  let earnedScore = 0;
  let missingCritical = false;

  const criteria = scheme.rules.map(rule => {
    const userValue = profile[rule.field];
    const weight = rule.weight || 10; // Default weight is 10
    totalWeight += weight;
    
    let result = 'unknown';
    let matchedValue = 0;

    if (userValue === undefined || userValue === null || userValue === "") {
      result = 'unknown';
      if (rule.critical) missingCritical = true;
    } else {
      switch (rule.op) {
        case 'equals':
          if (fuzzyEquals(userValue, rule.value)) {
            result = 'met';
            matchedValue = weight;
          } else {
            result = 'not_met';
            if (rule.critical) missingCritical = true;
          }
          break;
        case 'in':
          if (Array.isArray(rule.value) && rule.value.some(v => fuzzyEquals(userValue, v))) {
            result = 'met';
            matchedValue = weight;
          } else {
            result = 'not_met';
            if (rule.critical) missingCritical = true;
          }
          break;
        case 'min':
          if (parseFloat(userValue) >= parseFloat(rule.value)) {
            result = 'met';
            matchedValue = weight;
          } else {
            result = 'not_met';
            if (rule.critical) missingCritical = true;
          }
          break;
        case 'max':
          if (parseFloat(userValue) <= parseFloat(rule.value)) {
            result = 'met';
            matchedValue = weight;
          } else {
            result = 'not_met';
            if (rule.critical) missingCritical = true;
          }
          break;
        default:
          result = 'unknown';
      }
    }

    earnedScore += matchedValue;

    return {
      field: rule.field,
      label: rule.label,
      expected: rule.op === 'in' ? `One of [${rule.value.join(", ")}]` : (rule.op === 'equals' ? rule.value : `${rule.op} ${rule.value}`),
      provided: userValue,
      result: result,
      weight,
      critical: !!rule.critical
    };
  });

  // Calculate AI Match Score (0 to 100)
  let score = totalWeight > 0 ? Math.round((earnedScore / totalWeight) * 100) : 0;
  
  // Penalize score if a critical rule is explicitly not met
  if (missingCritical && score > 0) {
     score = Math.floor(score * 0.4); // Drop score heavily
  }

  // Determine status based on ML score thresholds
  let status = 'not_matched';
  if (score >= 85 && !missingCritical) {
    status = 'strong_match';
  } else if (score >= 50 && !missingCritical) {
    status = 'potential_match';
  } else if (criteria.some(c => c.result === 'unknown')) {
    status = 'needs_information';
  }

  return {
    schemeId: scheme.id,
    name: scheme.name,
    category: scheme.category,
    benefit: scheme.benefit,
    score: score,
    status,
    criteria
  };
}

export async function getBestMatchingSchemes(userProfile) {
  const schemes = await fetchSchemesFromBackend();
  const evaluatedSchemes = schemes.map(scheme => evaluateSchemeRules(userProfile, scheme));
  
  // Sort by AI Match Score (Descending)
  evaluatedSchemes.sort((a, b) => b.score - a.score);

  return evaluatedSchemes;
}

export default {
  fetchSchemesFromBackend,
  evaluateSchemeRules,
  getBestMatchingSchemes
};
