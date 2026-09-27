import {test} from 'node:test';
import assert from 'node:assert/strict';

process.env.JWT_SECRET='test-only-secret-value-at-least-thirty-two-chars';
process.env.DEMO_MODE='true';

const {app}=await import('../app.js');

test('full stack integration: auth, schemes, ai extract, ocr scan, documents, applications, and life events', async () => {
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;

  try {
    const call = async (path, method = 'GET', body, token) => {
      const r = await fetch(base + path, {
        method,
        headers: {
          'content-type': 'application/json',
          ...(token ? { authorization: `Bearer ${token}` } : {})
        },
        body: body === undefined ? undefined : JSON.stringify(body)
      });
      return [r.status, await r.json().catch(() => ({}))];
    };

    // 1. Health Check
    const [hStatus, health] = await call('/api/health');
    assert.equal(hStatus, 200);
    assert.equal(health.ok, true);
    assert.equal(health.ocr, 'enabled-ml-parser');

    // 2. Mobile Citizen Registration & Login
    const [regStatus, regData] = await call('/api/auth/register', 'POST', {
      name: 'Rahul Kumar',
      mobile: '9822449120',
      password: 'password123'
    });
    assert.equal(regStatus, 201);
    assert.ok(regData.token);
    assert.equal(regData.user.name, 'Rahul Kumar');
    const citizenToken = regData.token;

    const [loginStatus, loginData] = await call('/api/auth/login', 'POST', {
      mobile: '9822449120',
      password: 'password123'
    });
    assert.equal(loginStatus, 200);
    assert.ok(loginData.token);
    assert.equal(loginData.user.name, 'Rahul Kumar');

    // 3. Schemes Exploration and Filtering
    const [schemesStatus, schemesData] = await call('/api/schemes?category=Agriculture');
    assert.equal(schemesStatus, 200);
    assert.ok(schemesData.schemes.length >= 1);
    assert.equal(schemesData.schemes[0].category, 'Agriculture');

    // 4. ML AI Profile Extraction (multi-turn conversation text)
    const [aiStatus, aiData] = await call('/api/ai/extract', 'POST', {
      text: 'I am 65 years old. I live in Nashik, Maharashtra. I work as a farmer on 2.5 acres of land. My annual income is 1.8 lakh and my household has an orange ration card.'
    }, citizenToken);
    assert.equal(aiStatus, 200);
    assert.equal(aiData.profile.age, 65);
    assert.equal(aiData.profile.state, 'Maharashtra');
    assert.equal(aiData.profile.district, 'Nashik');
    assert.equal(aiData.profile.occupation, 'farmer');
    assert.equal(aiData.profile.ownsCultivableLand, true);
    assert.equal(aiData.profile.bpl, true);
    assert.equal(aiData.profile.annualFamilyIncome, 180000);
    assert.ok(aiData.confidence >= 80);

    // 5. ML Scheme Matching
    const [matchStatus, matchData] = await call('/api/match', 'POST', aiData.profile, citizenToken);
    assert.equal(matchStatus, 200);
    assert.ok(matchData.results.length > 0);
    const pmKisan = matchData.results.find(s => s.id === 'pm-kisan');
    assert.ok(pmKisan);
    assert.ok(['potential_match', 'needs_information'].includes(pmKisan.status));

    // 6. ML OCR Document Scanning
    const [ocrStatus, ocrData] = await call('/api/documents/scan', 'POST', {
      fileName: 'Income_Certificate_Tahsildar_Sinnar.pdf',
      fileType: 'application/pdf',
      textContent: 'Office of the Tahsildar, Sinnar. Certified annual income of Rahul Kumar is Rs. 180,000.',
      scan: true
    }, citizenToken);
    assert.equal(ocrStatus, 200);
    assert.equal(ocrData.success, true);
    assert.equal(ocrData.documentType, 'Income Certificate');
    assert.equal(ocrData.extractedData.annualIncome, 180000);
    assert.ok(ocrData.confidence > 90);

    // 7. Document Vault Management
    const [vaultStatus, vaultDocs] = await call('/api/documents', 'GET', undefined, citizenToken);
    assert.equal(vaultStatus, 200);
    assert.ok(Array.isArray(vaultDocs));
    assert.ok(vaultDocs.length >= 3);

    const [verifyStatus, verifyData] = await call('/api/documents/doc-income/verify', 'POST', {
      extractedData: ocrData.extractedData
    }, citizenToken);
    assert.equal(verifyStatus, 200);
    assert.equal(verifyData.success, true);

    // 8. Application Tracking
    const [appsStatus, apps] = await call('/api/applications', 'GET', undefined, citizenToken);
    assert.equal(appsStatus, 200);
    assert.ok(Array.isArray(apps));

    const [newAppStatus, newApp] = await call('/api/applications', 'POST', {
      schemeName: 'PM-KISAN Samman Nidhi',
      benefit: '₹6,000 / year'
    }, citizenToken);
    assert.equal(newAppStatus, 201);
    assert.equal(newApp.application.schemeName, 'PM-KISAN Samman Nidhi');

    // 9. Life Events and Eligibility Recheck
    const [lifeStatus, lifeEvents] = await call('/api/life-events', 'GET', undefined, citizenToken);
    assert.equal(lifeStatus, 200);
    assert.ok(Array.isArray(lifeEvents));

    const [recheckStatus, recheckData] = await call('/api/life-events/recheck', 'POST', {
      event: 'Drought Notification in Sinnar',
      income: 120000
    }, citizenToken);
    assert.equal(recheckStatus, 200);
    assert.equal(recheckData.success, true);
    assert.ok(recheckData.unlockedSchemesCount >= 2);

    // 10. Citizen Profile Get and Update
    const [profileGetStatus, profileData] = await call('/api/profile', 'GET', undefined, citizenToken);
    assert.equal(profileGetStatus, 200);
    assert.ok(profileData.name);

    const [profileUpdateStatus, updatedProfile] = await call('/api/profile', 'PUT', {
      ...profileData,
      age: 66,
      district: 'Nashik'
    }, citizenToken);
    assert.equal(profileUpdateStatus, 200);
    assert.equal(updatedProfile.age, 66);

  } finally {
    server.close();
  }
});
