// Citizen Profile Data - Sahayak AI
// Consistent citizen information matching the design specification

export const initialCitizenProfile = {
  id: "CIT-MH-4912",
  aadhaarLastFour: "4912",
  aadhaarStatus: "Connected & Level-2 Verified",
  name: "Rahul Kumar",
  marathiName: "राहुल कुमार",
  age: 65,
  gender: "Male",
  category: "Senior Citizen / Small & Marginal Farmer",
  state: "Maharashtra",
  district: "Nashik (Rural)",
  taluka: "Sinnar",
  village: "Sinnar Rural",
  occupation: "Farmer / Cultivator",
  subOccupation: "Small & Marginal Farmer (< 5 acres)",
  landholding: "2.5 Acres (Rainfed Cultivation)",
  landSurveyNo: "Survey 112/A, Sinnar, Nashik",
  annualIncome: 180000,
  incomeFormatted: "₹1,80,000 / year",
  incomeBracket: "₹1.5L - ₹2.5L",
  householdSize: 4,
  familyMembers: [
    { name: "Rahul Kumar", relation: "Self", age: 65, occupation: "Farmer", dependent: false },
    { name: "Sunita Kumar", relation: "Spouse", age: 60, occupation: "Homemaker", dependent: true },
    { name: "Amit Kumar", relation: "Son", age: 23, occupation: "Diploma Holder / Unemployed", dependent: true },
    { name: "Pooja Kumar", relation: "Daughter", age: 20, occupation: "Apprentice / Student", dependent: true }
  ],
  socialConditions: {
    seniorCitizen: true,
    farmer: true,
    disability: false,
    bplAayHolder: false,
    widowSingleParent: false
  },
  rationCardStatus: "Orange Tier Ration Card (APL)",
  rationCardNumber: "MH-NSK-RC-881923",
  bankAccount: {
    bankName: "Bank of Maharashtra",
    accountEnding: "4019",
    ifsc: "MAHB0000128",
    npciSeeded: true,
    dbtEnabled: true
  },
  completeness: 80,
  confidenceScore: 85
};

export default initialCitizenProfile;
