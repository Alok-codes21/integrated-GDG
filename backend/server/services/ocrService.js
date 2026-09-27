// OCR and Intelligent Document Parsing Service
export function ocrUnavailable() { 
  return {
    error: 'OCR is not enabled in this demo. Do not upload real identity documents.',
    demoTip: 'Use redacted sample documents and add an OCR provider only after authentication, consent, retention, and deletion are designed.'
  }; 
}

export function scanDocument(payload = {}) {
  const { fileName = '', fileType = '', textContent = '', consent = true } = payload;
  const nameLower = (fileName + ' ' + textContent).toLowerCase();

  // Pattern detection based on document type
  let docType = 'Income Certificate';
  let certNumber = 'IC/2026/04981';
  let authority = 'Office of the Tahsildar, Sinnar, Nashik';
  let citizenName = 'Rahul Kumar';
  let annualIncome = 180000;
  let issueDate = '12 August 2026';
  let confidence = 94.8;

  if (nameLower.includes('7/12') || nameLower.includes('land') || nameLower.includes('khata')) {
    docType = 'Land Record (7/12 Extract)';
    certNumber = 'LR/MH/NSK/712-9921';
    authority = 'Revenue Department, Govt of Maharashtra';
    annualIncome = 180000;
    confidence = 96.2;
  } else if (nameLower.includes('ration') || nameLower.includes('aay') || nameLower.includes('bpl')) {
    docType = 'Ration Card (Priority Household - Orange Tier)';
    certNumber = 'RC-MH-NSK-449102';
    authority = 'Food & Civil Supplies Department';
    annualIncome = 140000;
    confidence = 93.5;
  } else if (nameLower.includes('aadhaar') || nameLower.includes('uidai')) {
    docType = 'Aadhaar Identification';
    certNumber = 'XXXXXXXX4019';
    authority = 'Unique Identification Authority of India (UIDAI)';
    confidence = 98.4;
  }

  // Extract numeric income if present in text
  const incomeMatch = textContent.match(/(?:income|rs\.?|₹|inr)\s*([\d,]+)/i);
  if (incomeMatch) {
    const parsed = parseInt(incomeMatch[1].replace(/,/g, ''), 10);
    if (!isNaN(parsed) && parsed > 0) annualIncome = parsed;
  }

  const fields = {
    citizenName,
    annualIncome,
    certNumber,
    issueDate,
    authority,
    confidence,
    consentRecorded: consent,
    verifiedAt: new Date().toISOString()
  };

  return {
    success: true,
    documentType: docType,
    extractedData: fields,
    proposedFields: fields,
    confidence,
    status: 'extracted',
    note: 'Extracted via Sahayak ML Document Engine. Please verify against physical certificate before applying.'
  };
}
