// Welfare Schemes Database - Sahayak AI
// Central and State (Maharashtra) Schemes curated with eligibility criteria

export const schemesData = [
  {
    id: "pm-kisan",
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    shortName: "PM-KISAN",
    department: "MINISTRY OF AGRICULTURE & FARMERS WELFARE • CENTRAL SECTOR",
    category: "Agriculture",
    description: "Direct income support of ₹6,000 per year in 3 equal four-monthly installments directly into verified Aadhaar-seeded bank accounts for landholding farmer families.",
    benefit: "₹6,000 / year fiscal grant",
    benefitHighlight: "₹6,000 / year",
    benefitExtra: "Installment 17 Ready • Direct treasury transfer",
    status: "Relevant to your profile",
    statusType: "relevant",
    mySchemesTab: "Potential matches",
    isSaved: true,
    why: "Matches small/marginal farmer category and landholding profile (Survey 112/A, Nashik). Requires active Aadhaar-linked NPCI bank mapping.",
    rationale: [
      "Matches landholding < 5 acres in survey records (2.5 acres rainfed)",
      "Aadhaar-linked NPCI bank status verified (Bank of Maharashtra *4019)",
      "Age & small/marginal farmer category criteria met"
    ],
    tags: ["Agriculture", "Direct Benefit Transfer", "Central Sector", "Small/Marginal Farmers"],
    requiredDocuments: [
      "Aadhaar Card",
      "Land Record (7/12 extract)",
      "Bank Passbook / NPCI Mandate",
      "e-KYC Verification"
    ],
    documentsReadyCount: 4,
    documentsTotalCount: 4,
    documentsNote: "All 4 required documents verified in vault",
    lastChecked: "12 Oct 2026",
    actionText: "Open official portal checklist",
    officialPortalUrl: "https://pmkisan.gov.in",
    officialGazette: "Gazette Notification Ref: AGRI-PMK-2019/02",
    eligibilityRules: {
      minAge: 18,
      maxAge: null,
      state: "All India",
      occupation: "Farmer",
      maxLandholdingAcres: 5,
      maxIncome: null
    }
  },
  {
    id: "shravanbal-yojana",
    title: "Senior Citizen Support & Subsidy Scheme (Shravanbal Yojana)",
    shortName: "Shravanbal Yojana",
    department: "DEPARTMENT OF SOCIAL JUSTICE & SPECIAL ASSISTANCE • GOVT. OF MAHARASHTRA",
    category: "Senior Citizens",
    description: "Monthly financial assistance of ₹1,500 along with assistive health devices provisioning for indigent senior citizens aged 65 and above residing in Maharashtra.",
    benefit: "₹1,500 / month direct pension + assistive device allowance",
    benefitHighlight: "₹1,500 / month",
    benefitExtra: "Annual Cap: ₹18,000 + Devices",
    status: "Relevant to your profile",
    statusType: "relevant",
    mySchemesTab: "In progress",
    isSaved: true,
    why: "Matches your age (65), Maharashtra residency, and verified family income threshold (< ₹2L per annum).",
    rationale: [
      "Age requirement satisfied (65 years - Senior Citizen milestone)",
      "Maharashtra residency confirmed via UIDAI",
      "Annual income within statutory ceiling (< ₹2,00,000/year)"
    ],
    warning: "Income certificate verification pending / expiring soon",
    tags: ["Senior Citizens", "Financial Support", "State Pension", "Assistive Health"],
    requiredDocuments: [
      "Aadhaar Card",
      "Tahsildar Income Certificate (Valid FY26-27)",
      "Maharashtra Domicile / Residence Proof",
      "Bank Passbook (NPCI Seeded)"
    ],
    documentsReadyCount: 3,
    documentsTotalCount: 4,
    documentsNote: "2 documents remaining: Income Certificate renewal & bank seeding audit",
    lastChecked: "14 Oct 2026",
    actionText: "Continue application preparation",
    officialPortalUrl: "https://mahadbt.maharashtra.gov.in",
    officialGazette: "Official Gazette GR-402 / MH-SWD-2026",
    eligibilityRules: {
      minAge: 65,
      maxAge: null,
      state: "Maharashtra",
      maxIncome: 200000
    }
  },
  {
    id: "rashtriya-vayoshri",
    title: "Rashtriya Vayoshri Yojana (RVY)",
    shortName: "Rashtriya Vayoshri",
    department: "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT • CENTRAL",
    category: "Healthcare & Disability",
    description: "Free physical aids and assisted-living devices (hearing aids, wheelchairs, walking sticks, spectacles) for senior citizens belonging to BPL/EWS categories.",
    benefit: "Free physical aids and assisted-living devices for seniors",
    benefitHighlight: "Assistive Kit",
    benefitExtra: "Includes Hearing & Walking Aids • 100% Subsidized",
    status: "Relevant to your profile",
    statusType: "relevant",
    mySchemesTab: "Potential matches",
    isSaved: false,
    why: "Age eligible (Senior Citizen 60+), family income under ₹2,00,000 threshold. Clinical triage required at district medical camp.",
    rationale: [
      "Age eligible (65 years, meets 60+ threshold)",
      "Income declared under ₹2,00,000 statutory cap",
      "Nashik District Samaj Kalyan verification camp scheduled"
    ],
    tags: ["Healthcare", "Assistive Devices", "Senior Citizens 60+", "Camp Disbursement"],
    requiredDocuments: [
      "Aadhaar Card",
      "Income Certificate / BPL Card",
      "Medical Assessment Form (District Hospital)"
    ],
    documentsReadyCount: 2,
    documentsTotalCount: 3,
    documentsNote: "Clinical triage form pending at upcoming Tehsil Camp",
    lastChecked: "10 Oct 2026",
    actionText: "View Camp Details & Checklist",
    officialPortalUrl: "https://socialjustice.gov.in",
    officialGazette: "Central Notification: RVY-2024-MSJE",
    eligibilityRules: {
      minAge: 60,
      state: "All India",
      maxIncome: 200000
    }
  },
  {
    id: "saur-krushi-pump",
    title: "Chief Minister Agriculture Solar Pump Scheme (Mukhyamantri Saur Krushi Pump Yojana)",
    shortName: "Solar Pump Scheme",
    department: "ENERGY DEPARTMENT • GOVT. OF MAHARASHTRA",
    category: "Agriculture",
    description: "Subsidy up to 90–95% for installation of off-grid solar agricultural water pumps for small and marginal farmers whose conventional agricultural electricity connections are pending.",
    benefit: "Up to 95% Equipment Subsidy",
    benefitHighlight: "Up to 95% Subsidy",
    benefitExtra: "Off-Grid 3HP / 5HP Solar Pump System",
    status: "Potentially Relevant • Additional Info Needed",
    statusType: "potential",
    mySchemesTab: "Potential matches",
    isSaved: false,
    why: "Farmer status matched (Nashik district rural registry). Agricultural electricity connection status not yet recorded in profile.",
    rationale: [
      "Farmer status matched (Nashik district rural registry)",
      "Landholding < 5 acres satisfies small/marginal farmer tier",
      "Electricity connection waiting status needs confirmation"
    ],
    tags: ["Solar Energy", "Irrigation", "Farmer Subsidy", "Renewable Energy"],
    requiredDocuments: [
      "7/12 Land Extract",
      "Aadhaar Card",
      "MSEDCL Demand Note / No-Power NOC"
    ],
    documentsReadyCount: 2,
    documentsTotalCount: 3,
    documentsNote: "Requires MSEDCL electricity status confirmation",
    lastChecked: "11 Oct 2026",
    actionText: "Complete info to verify",
    officialPortalUrl: "https://www.mahadiscom.in/solar",
    officialGazette: "Maharashtra Energy Dept GR: MSKPY-2023-44",
    eligibilityRules: {
      occupation: "Farmer",
      state: "Maharashtra",
      maxLandholdingAcres: 5
    }
  },
  {
    id: "sanjay-gandhi-niradhar",
    title: "Sanjay Gandhi Niradhar Anudan Yojana",
    shortName: "Sanjay Gandhi Niradhar",
    department: "DEPARTMENT OF SOCIAL JUSTICE & SPECIAL ASSISTANCE • GOVT. OF MAHARASHTRA",
    category: "Senior Citizens",
    description: "Provides unconditional monthly financial assistance to destitute senior citizens, handicapped individuals, and elderly marginal farmers facing economic distress.",
    benefit: "₹1,500 / month direct pension via DBT transfer",
    benefitHighlight: "₹1,500 / month",
    benefitExtra: "Direct treasury credit • Taluk Office, Nashik",
    status: "Newly Eligible",
    statusType: "relevant",
    mySchemesTab: "Potential matches",
    isSaved: false,
    why: "Eligible under adjusted income threshold (< ₹1,40,000/year) and age 65+ senior citizen criteria.",
    rationale: [
      "Income verified under statutory rural floor (₹1,40,000/year)",
      "Age threshold (65) satisfied",
      "Resident of Sinnar Taluka, Nashik"
    ],
    tags: ["Senior Citizens", "Direct Treasury Transfer", "Social Security", "State Welfare"],
    requiredDocuments: [
      "Aadhaar Card",
      "Income Certificate from Tahsildar",
      "Age Certificate / School Leaving or Aadhaar DOB",
      "Bank Account Linked to NPCI"
    ],
    documentsReadyCount: 3,
    documentsTotalCount: 4,
    documentsNote: "Tahsildar verification scheduled",
    lastChecked: "14 Oct 2026",
    actionText: "View Scheme Details",
    officialPortalUrl: "https://mahadbt.maharashtra.gov.in",
    officialGazette: "G.R. No. SGNAY-2026/CR-104",
    eligibilityRules: {
      minAge: 65,
      state: "Maharashtra",
      maxIncome: 140000
    }
  },
  {
    id: "antyodaya-anna-yojana",
    title: "Antyodaya Anna Yojana (AAY) & Priority Household Ration Subsidy",
    shortName: "AAY Food Subsidy",
    department: "FOOD, CIVIL SUPPLIES & CONSUMER PROTECTION DEPARTMENT",
    category: "Housing & Rural",
    description: "National Food Security entitlement providing staple foodgrains at highly subsidized prices through designated Fair Price Shops (FPS) for rural households facing reduced farm yields.",
    benefit: "35 kg subsidized foodgrains / month (₹2/kg Wheat, ₹3/kg Rice)",
    benefitHighlight: "35 kg / month",
    benefitExtra: "Issued by District Supply Officer • FPS Portability Active",
    status: "Newly Eligible",
    statusType: "relevant",
    mySchemesTab: "Potential matches",
    isSaved: false,
    why: "Priority rural household criteria satisfied following seasonal farm yield reduction and family income re-assessment.",
    rationale: [
      "Priority household criteria satisfied under NFSA",
      "Rural marginal cultivator classification verified",
      "Ration Card portability active via One Nation One Ration"
    ],
    tags: ["Food Security", "Ration Subsidy", "NFSA", "Essential Commodities"],
    requiredDocuments: [
      "Aadhaar Cards of all 4 family members",
      "Existing Orange Ration Card",
      "Income Certificate",
      "Gram Panchayat Residence Certificate"
    ],
    documentsReadyCount: 3,
    documentsTotalCount: 4,
    documentsNote: "Ration card upgrade application pending",
    lastChecked: "14 Oct 2026",
    actionText: "View Scheme Details",
    officialPortalUrl: "https://mahafood.gov.in",
    officialGazette: "NFSA Statutory Gazette Ref: MH-FCS-2026/AAY",
    eligibilityRules: {
      state: "Maharashtra",
      maxIncome: 150000
    }
  },
  {
    id: "drought-crop-loss",
    title: "Maharashtra Drought & Crop Loss Relief Subsidy",
    shortName: "Drought & Crop Relief",
    department: "REVENUE & FOREST DEPARTMENT • GOVT. OF MAHARASHTRA",
    category: "Agriculture",
    description: "State disaster management relief package for smallholder cultivators suffering over 33% yield destruction due to seasonal monsoon failure and dry spells.",
    benefit: "Up to ₹13,600 / hectare crop damage compensation",
    benefitHighlight: "Up to ₹13,600 / Ha",
    benefitExtra: "Kharif Season Crop Loss • Talathi Panchnama Verification",
    status: "Potentially Relevant • Additional Info Needed",
    statusType: "potential",
    mySchemesTab: "Potential matches",
    isSaved: false,
    why: "Farmland in Nashik rural rainfall deficit zone. Needs Talathi panchnama loss verification statement.",
    rationale: [
      "Nashik district rainfed zone registered under crop distress advisory",
      "Farmer owns 2.5 acres rainfed land holding",
      "Field inspection report (Panchnama) required from Talathi"
    ],
    tags: ["Agriculture", "Disaster Relief", "Crop Loss", "Kharif Compensation"],
    requiredDocuments: [
      "7/12 Land Record",
      "8A Extract",
      "Talathi Panchnama Statement",
      "Aadhaar-Seeded Bank Passbook"
    ],
    documentsReadyCount: 2,
    documentsTotalCount: 4,
    documentsNote: "Requires Talathi field inspection report",
    lastChecked: "14 Oct 2026",
    actionText: "View Criteria & Guidelines",
    officialPortalUrl: "https://krishi.maharashtra.gov.in",
    officialGazette: "Relief & Rehabilitation GR: DGT-2026/REV-12",
    eligibilityRules: {
      occupation: "Farmer",
      state: "Maharashtra"
    }
  },
  {
    id: "pm-awas-gramin",
    title: "Pradhan Mantri Awas Yojana (Gramin Housing)",
    shortName: "PMAY-G",
    department: "MINISTRY OF RURAL DEVELOPMENT • CENTRAL",
    category: "Housing & Rural",
    description: "Provides direct financial grants for construction of secure, durable pucca houses with hygienic cooking spaces to homeless and rural families living in kutcha dwellings.",
    benefit: "₹1,20,000 financial assistance for housing construction",
    benefitHighlight: "₹1.2 Lakh",
    benefitExtra: "Direct DBT in 4 installments + 90 days MGNREGA wages",
    status: "Needs more information",
    statusType: "warning",
    mySchemesTab: "Potential matches",
    isSaved: false,
    why: "Kutcha house survey verification needed. Requires answering 2 socio-economic questions to confirm Gram Panchayat prioritization list.",
    rationale: [
      "Rural resident of Nashik district",
      "Needs housing type confirmation (kutcha vs semi-pucca)",
      "SECC 2011 deprivation score mapping required"
    ],
    tags: ["Housing", "Rural Development", "Pucca House", "Central Sector"],
    requiredDocuments: [
      "Aadhaar Card",
      "Bank Account Details",
      "Gram Panchayat Housing Survey Certificate",
      "Land Possession / Allotment Letter"
    ],
    documentsReadyCount: 2,
    documentsTotalCount: 4,
    documentsNote: "Kutcha house survey verification needed",
    lastChecked: "08 Oct 2026",
    actionText: "Complete profile questions",
    officialPortalUrl: "https://pmayg.nic.in",
    officialGazette: "MoRD Gazette: PMAY-G-2024-REG",
    eligibilityRules: {
      state: "All India",
      location: "Rural"
    }
  },
  {
    id: "pm-yuva-sambal",
    title: "Pradhan Mantri Yuva Sambal Yojana (PM-YSY)",
    shortName: "PM-YSY",
    department: "MINISTRY OF SKILL DEVELOPMENT AND ENTREPRENEURSHIP • CENTRAL",
    category: "Women & Children",
    description: "Youth entrepreneurship incubation and trade apprenticeship grant of ₹5,000/month for young adults aged 18 to 35 years launching their first venture.",
    benefit: "₹5,000 / month apprenticeship stipend + ₹50,000 seed grant",
    benefitHighlight: "₹5,000 / month",
    benefitExtra: "Aged 18-35 only • Trade Certification",
    status: "Does not match profile",
    statusType: "fail",
    mySchemesTab: "Potential matches",
    isSaved: false,
    why: "Applicant age (65) exceeds the maximum statutory age threshold of 35 years for this youth-specific program.",
    rationale: [
      "Applicant Age: 65 years (Statutory rule requires 18–35 years) ✗ Failed",
      "Residency: Maharashtra, India ✓ Meets requirement",
      "Minimum Education: Secondary Certificate ✓ Meets requirement",
      "Prior Enterprise: No commercial GST ✓ Meets requirement"
    ],
    tags: ["Skill Development", "Youth Empowerment", "Apprenticeship", "Seed Capital"],
    requiredDocuments: [
      "Aadhaar Card",
      "Secondary / ITI Certificate",
      "Age Proof",
      "Apprenticeship Registration"
    ],
    documentsReadyCount: 3,
    documentsTotalCount: 4,
    documentsNote: "Age criteria barrier for applicant (Applicable for dependent child Amit Kumar, age 23)",
    lastChecked: "14 Oct 2026",
    actionText: "View Full Evaluation Report",
    officialPortalUrl: "https://msde.gov.in/notifications/yuva-sambal-2024",
    officialGazette: "Official Gazette Notification No. SD-2024/09-MSDE",
    eligibilityRules: {
      minAge: 18,
      maxAge: 35,
      state: "All India"
    }
  },
  {
    id: "pm-svanidhi",
    title: "PM SVANidhi (Street Vendor Micro-Credit Scheme)",
    shortName: "PM SVANidhi",
    department: "MINISTRY OF HOUSING AND URBAN AFFAIRS • CENTRAL",
    category: "Housing & Rural",
    description: "Collateral-free working capital loan ranging from ₹10,000 to ₹50,000 with interest subsidy incentives for urban and peri-urban street vendors.",
    benefit: "Working capital loan up to ₹50,000 with 7% interest subsidy",
    benefitHighlight: "Loan up to ₹50,000",
    benefitExtra: "Collateral-free • Digital incentive cashback",
    status: "General Scheme • Not Matched to Current Profile",
    statusType: "general",
    mySchemesTab: "Potential matches",
    isSaved: false,
    why: "Requires registered urban vendor certificate / ULB recommendation. Current profile is a Rural Cultivator.",
    rationale: [
      "Requires registered urban street vendor certificate / ULB recommendation",
      "Current profile: Rural Cultivator / Small Farmer in Nashik Rural"
    ],
    tags: ["Working Capital", "Urban Livelihood", "Interest Subsidy", "Micro Credit"],
    requiredDocuments: [
      "Vending Certificate / Urban Local Body ID",
      "Aadhaar Card",
      "Bank Account"
    ],
    documentsReadyCount: 2,
    documentsTotalCount: 3,
    documentsNote: "Vending certificate not held",
    lastChecked: "05 Oct 2026",
    actionText: "View details",
    officialPortalUrl: "https://pmsvanidhi.mohua.gov.in",
    officialGazette: "MoHUA Scheme Gazette: SVN-2023-B",
    eligibilityRules: {
      occupation: "Urban Street Vendor",
      state: "All India"
    }
  }
];

export default schemesData;
