import api from "./api";
import { recordedMilestones, lifeEventCategories } from "../data/lifeEvents";

const MILESTONES_KEY = "sahayak_recorded_milestones";

export async function getLifeEvents() {
  try {
    const response = await api.get("/life-events");
    return response.data;
  } catch {
    const stored = localStorage.getItem(MILESTONES_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return recordedMilestones;
      }
    }
    return recordedMilestones;
  }
}

export function getLifeEventCategories() {
  return lifeEventCategories;
}

export async function createLifeEvent(data) {
  try {
    const response = await api.post("/life-events", data);
    return response.data;
  } catch {
    const current = await getLifeEvents();
    const newMilestone = {
      id: `m-${Date.now()}`,
      tag: (data.event || "LIFE EVENT TRANSITION").toUpperCase(),
      date: "Logged Today",
      title: data.event || "Circumstance Update",
      description: data.description || "Self-declared life transition update by citizen.",
      resultTitle: "✓ Re-evaluation Complete",
      resultSummary: "Eligibility recalculated. New welfare schemes unlocked based on revised parameters.",
      verificationBadge: "◉ Self-Declared (Ready for Verification)",
      income: data.income,
      eventDate: data.eventDate,
      reason: data.reason
    };
    const updated = [newMilestone, ...current];
    localStorage.setItem(MILESTONES_KEY, JSON.stringify(updated));
    return { success: true, milestone: newMilestone };
  }
}

export async function recheckEligibility(eventData) {
  try {
    const response = await api.post("/life-events/recheck", eventData);
    return response.data;
  } catch {
    // Return structured re-assessment result for prototype
    return {
      success: true,
      evaluatedAt: new Date().toISOString(),
      unlockedSchemesCount: 3,
      newSchemes: [
        {
          id: "sanjay-gandhi-niradhar",
          name: "Sanjay Gandhi Niradhar Anudan Yojana",
          benefit: "₹1,500 / month",
          why: "Income adjusted under statutory limit (< ₹1,40,000/year)"
        },
        {
          id: "antyodaya-anna-yojana",
          name: "Antyodaya Anna Yojana (AAY) & Priority Household",
          benefit: "35 kg / month foodgrain",
          why: "Priority rural cultivator criteria met"
        },
        {
          id: "drought-crop-loss",
          name: "Maharashtra Drought & Crop Loss Relief Subsidy",
          benefit: "Up to ₹13,600 / Ha",
          why: "Nashik rainfed agricultural deficit declared"
        }
      ],
      unaffectedApplications: [
        { name: "PM-KISAN Samman Nidhi", status: "Active" },
        { name: "Shravanbal Seva State Pension", status: "Application in progress" }
      ]
    };
  }
}

export default {
  getLifeEvents,
  getLifeEventCategories,
  createLifeEvent,
  recheckEligibility
};
