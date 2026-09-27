// Applications Tracker Mock Data - Sahayak AI
// Direct-Benefit Lifecycle and application tracker

export const applicationsData = [
  {
    id: "app-shravanbal",
    schemeId: "shravanbal-yojana",
    schemeName: "Senior Citizen Support & Pension (Shravanbal Yojana)",
    department: "SOCIAL JUSTICE & SPECIAL ASSISTANCE DEPT • GOVT. OF MAHARASHTRA",
    referenceNumber: "MH-SWD-2026-88412",
    office: "Nashik District Collectorate",
    initiatedDate: "06 Oct 2026",
    sanctionBenefit: "₹1,500",
    benefitUnit: "/ month",
    currentStatus: "Waiting for you",
    statusType: "action_required",
    currentStepIndex: 3, // 0-indexed: Step 4 is active
    steps: [
      {
        number: 1,
        title: "Step 1: Profile Reviewed",
        date: "Completed 08 Oct 2026",
        status: "completed",
        description: "All baseline demographic, age threshold, and family income criteria verified."
      },
      {
        number: 2,
        title: "Step 2: Documents Prepared",
        date: "Completed 10 Oct 2026",
        status: "completed",
        description: "Aadhaar card, age certificate (Form VIII), and residential proof attached via DigiLocker."
      },
      {
        number: 3,
        title: "Step 3: Official Portal Opened",
        date: "Completed 12 Oct 2026",
        status: "completed",
        description: "Payload successfully redirected to MahaDBT administrative staging environment."
      },
      {
        number: 4,
        title: "Step 4: Physical Biometric & Tehsil Verification",
        deadline: "24 Oct 2026 (in 5 days)",
        status: "current",
        actionRequired: true,
        description: "Scheduled in-person verification with Naib Tehsildar Desk. Scheduled at Nashik Tehsil Office, Counter 4 on 24 Oct 2026, 11:30 AM.",
        venue: "Old Agra Rd, Nashik",
        verificationOfficer: "Desk 04 (Shri S. Patil)",
        mandatoryDocs: "3 Original Forms (Aadhaar, Ration Card, Income Proof)"
      },
      {
        number: 5,
        title: "Step 5: Statutory Sanction & Treasury Disbursement",
        date: "Upcoming Stage",
        status: "upcoming",
        description: "Pending official Tehsil clearance and signature from District Social Welfare Officer."
      }
    ],
    checklist: [
      { id: "c1", label: "Aadhaar Card (Original + 2 self-attested photocopies)", completed: true },
      { id: "c2", label: "Age Proof / School Certificate or Aadhaar DOB verification", completed: true },
      { id: "c3", label: "Income Certificate from Tahsildar (Under ₹2,00,000)", completed: false, urgent: true },
      { id: "c4", label: "Ration Card (Orange/Yellow)", completed: true },
      { id: "c5", label: "Bank Passbook with IFSC and NPCI seeding verification", completed: true },
      { id: "c6", label: "Two recent passport size color photographs", completed: true }
    ],
    portalUrl: "https://mahadbt.maharashtra.gov.in"
  },
  {
    id: "app-pmkisan",
    schemeId: "pm-kisan",
    schemeName: "PM-KISAN Samman Nidhi",
    department: "MINISTRY OF AGRICULTURE",
    referenceNumber: "PMK-MH-2024-99120",
    status: "Active",
    statusType: "active",
    sanctionBenefit: "₹6,000",
    benefitUnit: "/ year",
    notes: "17th Installment credited on 15 Sep 2026",
    bankAccount: "Bank of Maharashtra • 501****4019",
    paymentHistory: [
      { tranche: "Installment 17", amount: "₹2,000", date: "15 Sep 2026", status: "Credited", utr: "UTIB000291048" },
      { tranche: "Installment 16", amount: "₹2,000", date: "18 May 2026", status: "Credited", utr: "UTIB000194821" },
      { tranche: "Installment 15", amount: "₹2,000", date: "28 Feb 2026", status: "Credited", utr: "UTIB000084729" }
    ]
  },
  {
    id: "app-mjpksy",
    schemeId: "mjpksy",
    schemeName: "Mahatma Jyotirao Phule Shetkari Karj Mukti",
    department: "DEPT OF COOPERATION & MARKETING • MAHARASHTRA",
    referenceNumber: "DRAFT-MH-COOP-4491",
    status: "Draft saved",
    statusType: "draft",
    notes: "Draft saved on device • Land registry 7/12 pending",
    expiryNotice: "Expires in 18 days"
  }
];

export default applicationsData;
