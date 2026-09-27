// Document Vault Mock Data - Sahayak AI
// Citizen document records matching government specifications

export const documentsData = [
  {
    id: "doc-aadhaar",
    name: "Aadhaar Card (UIDAI)",
    category: "Identity & Demographic",
    status: "verified",
    badgeText: "✓ Verified via OTP",
    lastVerified: "02 Oct 2026",
    schemesCount: 8,
    format: "e-KYC PDF",
    fileSize: "1.4 MB",
    issuer: "Unique Identification Authority of India (UIDAI)",
    documentNumber: "XXXX-XXXX-4912",
    details: {
      fullName: "Rahul Kumar",
      dob: "14-08-1961",
      gender: "Male",
      address: "Sinnar Rural, Sinnar, Nashik, Maharashtra - 422103"
    },
    downloadUrl: "#",
    previewAvailable: true
  },
  {
    id: "doc-bank",
    name: "Bank Passbook / NPCI Mandate",
    category: "Financial & DBT Seeding",
    status: "verified",
    badgeText: "✓ Direct Benefit Transfer active",
    lastVerified: "28 Sep 2026",
    schemesCount: 4,
    format: "Scanned PDF / Passbook",
    fileSize: "2.1 MB",
    issuer: "Bank of Maharashtra (Sinnar Branch)",
    documentNumber: "A/C ending in 4019",
    details: {
      accountHolder: "Rahul Kumar",
      bankName: "Bank of Maharashtra",
      ifsc: "MAHB0000128",
      npciMapped: true,
      dbtStatus: "Active & Tested"
    },
    downloadUrl: "#",
    previewAvailable: true
  },
  {
    id: "doc-income",
    name: "Income Certificate (Tehsildar)",
    category: "Statutory Eligibility",
    status: "needs_attention",
    badgeText: "◷ Needs verification / Expiring soon",
    lastVerified: "Issued 18 months ago",
    schemesCount: 2,
    format: "e-Signed PDF",
    fileSize: "1.8 MB",
    issuer: "Office of the Tahsildar, Sinnar (Nashik)",
    documentNumber: "IC/2026/04981",
    validityNote: "Issued 18 months ago. Subsidies mandate renewal every 12 months.",
    requiredFor: "Senior Citizen Support & Subsidy Scheme, Sanjay Gandhi Niradhar Yojana",
    extractedData: {
      citizenName: "Rahul Kumar",
      nativeName: "राहुल कुमार",
      annualIncome: 180000,
      annualIncomeFormatted: "₹ 1,80,000",
      certificateNumber: "IC/2026/04981",
      issueDate: "12 August 2026",
      expiryDate: "11 August 2029",
      issuingAuthority: "Office of the Tahsildar, Sinnar, Nashik",
      designation: "Tahsildar & Executive Magistrate",
      officerName: "S. V. Patil",
      qrCodeVerified: true,
      cryptoRef: "DIGI-7729-2026",
      matchScore: "98% Extraction Match"
    },
    downloadUrl: "#",
    previewAvailable: true
  },
  {
    id: "doc-land",
    name: "Land Record (7/12 Extract / Satbara)",
    category: "Agrarian Landholding",
    status: "not_uploaded",
    badgeText: "◉ Missing",
    schemesCount: 3,
    format: "PDF, JPG max 5MB",
    fileSize: null,
    issuer: "Revenue Department, Govt of Maharashtra (Mahabhulekh)",
    documentNumber: "Survey 112/A, Sinnar Sub-Circle",
    validityNote: "Crucial verification proof required for PM-KISAN installment credits and the Agri Solar Pump subsidy.",
    requiredFor: "PM-KISAN Samman Nidhi, Solar Pump Scheme, Crop Insurance",
    downloadUrl: null,
    previewAvailable: false
  },
  {
    id: "doc-ration",
    name: "Ration Card (Orange / Yellow NFSA)",
    category: "Household & Food Security",
    status: "not_uploaded",
    badgeText: "Optional for subsidies",
    schemesCount: 2,
    format: "Smart RC / Physical scan",
    fileSize: null,
    issuer: "Food, Civil Supplies and Consumer Protection Dept",
    documentNumber: "MH-NSK-RC-881923",
    validityNote: "Determines state-level food grain allocations, PDS quota discounts, and auxiliary family welfare benefits.",
    requiredFor: "Antyodaya Anna Yojana, Ration Subsidies",
    downloadUrl: null,
    previewAvailable: false
  }
];

export default documentsData;
