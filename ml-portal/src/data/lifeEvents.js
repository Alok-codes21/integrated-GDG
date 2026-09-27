// Life Events Mock Data - Sahayak AI
// Milestones and Life Event engine categories

export const recordedMilestones = [
  {
    id: "m-age-65",
    tag: "SENIOR CITIZEN THRESHOLD",
    date: "Logged 14 Oct 2026",
    title: "Turned 65 (Senior Citizen Milestone)",
    description: "Statutory age transition reclassified Rahul Kumar under central and Maharashtra state senior welfare mandates.",
    resultTitle: "✓ Re-evaluation Complete",
    resultSummary: "3 New Schemes Unlocked: Shravanbal Yojana, Rashtriya Vayoshri, and Indira Gandhi National Old Age Pension.",
    verificationBadge: "◉ Aadhaar DOB verified",
    unlockedSchemes: ["shravanbal-yojana", "rashtriya-vayoshri", "sanjay-gandhi-niradhar"]
  },
  {
    id: "m-land-record",
    tag: "AGRARIAN LAND REGISTRY",
    date: "Logged 12 Aug 2026",
    title: "Land Record Updated (2.5 Acres Rainfed)",
    description: "Partition mutation finalized in Nashik District revenue sub-circle, confirming marginal smallholder categorization.",
    resultTitle: "✓ Verified with Survey 112",
    resultSummary: "Direct PM-KISAN database sync. Certified for agricultural solar pump and micro-irrigation equipment assistance.",
    verificationBadge: "◉ 7/12 Mahabhulekh Synced",
    unlockedSchemes: ["pm-kisan", "saur-krushi-pump"]
  }
];

export const lifeEventCategories = [
  {
    id: "turned-60-65",
    icon: "♙",
    title: "Turned 60 or 65",
    category: "Age & Senior Citizen",
    description: "Milestone age thresholds for state pensions, public transit concessions, Ayushman Bharat expansions, and assistive healthcare grants."
  },
  {
    id: "income-livelihood-changed",
    icon: "▣",
    title: "Income or Livelihood Changed",
    category: "Economic & Employment",
    description: "Crop yield variations, informal daily wage shifts, or job transitions affecting BPL, Antyodaya, or EWS welfare eligibility tiers."
  },
  {
    id: "health-medical-transition",
    icon: "♢",
    title: "Health or Medical Transition",
    category: "Healthcare & Caregiving",
    description: "Chronic illness diagnosis, planned surgical need, critical treatment support, or assistive senior care equipment grants."
  },
  {
    id: "family-household-changes",
    icon: "♧",
    title: "Family & Household Changes",
    category: "Demographic & Family",
    description: "Marriage, newborn addition, or bereavement in the immediate family impacting NFSA ration quotas and family welfare ceilings."
  },
  {
    id: "farmland-agriculture",
    icon: "🌾",
    title: "Farmland & Agriculture",
    category: "Land & Agriculture",
    description: "New agricultural lease agreement, land succession, drip irrigation adoption, or unseasonal crop loss assessment reports."
  },
  {
    id: "education-skill-training",
    icon: "🎓",
    title: "Education & Skill Training",
    category: "Education & Skills",
    description: "Child or dependent enrolling in college, polytechnic entry, vocational ITI certification, or central merit-cum-means scholarship eligibility."
  },
  {
    id: "residential-relocation",
    icon: "🏠",
    title: "Residential Relocation",
    category: "Location & Portability",
    description: "Relocation between Gram Panchayat villages, movement to municipal corporations, or interstate portability via One Nation One Ration."
  },
  {
    id: "disability-certificate-issued",
    icon: "♿",
    title: "Disability Certificate Issued",
    category: "Special Needs & Divyangjan",
    description: "Official UDID generation or civil surgeon certification of special needs (40%+ threshold) triggering Divyangjan entitlements."
  },
  {
    id: "other-life-transition",
    icon: "▤",
    title: "Other Life Transition",
    category: "General Transition",
    description: "Custom circumstance, local natural calamity declaration, or newly declared central gazette notification for specialized cohorts."
  }
];

export default {
  recordedMilestones,
  lifeEventCategories
};
