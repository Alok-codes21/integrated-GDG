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
    assert.equal(health.ocr, 'text-pattern-only-no-file-ocr');

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
    assert.equal(aiData.profile.ownsCultivableLand, undefined);
    assert.equal(aiData.profile.bpl, undefined);
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
    assert.equal(ocrData.documentType, 'Unknown - review original');
    assert.equal(ocrData.extractedData.annualIncome, 180000);
    assert.equal(ocrData.verified, false);
    assert.equal(ocrData.confidence, null);

    // 7. The API must not show fabricated documents or approved applications.
    const [vaultStatus, vaultDocs] = await call('/api/documents', 'GET', undefined, citizenToken);
    assert.equal(vaultStatus, 200);
    assert.deepEqual(vaultDocs, []);
    const [verifyStatus] = await call('/api/documents/doc-income/verify', 'POST', {extractedData:ocrData.extractedData}, citizenToken);
    assert.equal(verifyStatus, 501);
    const [appsStatus, apps] = await call('/api/applications', 'GET', undefined, citizenToken);
    assert.equal(appsStatus, 200);
    assert.deepEqual(apps, []);
    const [newAppStatus] = await call('/api/applications', 'POST', {schemeName:'PM-KISAN Samman Nidhi'}, citizenToken);
    assert.equal(newAppStatus, 501);
    const [savedStatus, savedData] = await call('/api/saved-schemes','PUT',{ids:['pm-kisan']},citizenToken);
    assert.equal(savedStatus,200);
    assert.deepEqual(savedData.ids,['pm-kisan']);
    const [savedReadStatus, savedRead] = await call('/api/saved-schemes','GET',undefined,citizenToken);
    assert.equal(savedReadStatus,200);
    assert.deepEqual(savedRead.ids,['pm-kisan']);
    const [invalidSavedStatus] = await call('/api/saved-schemes','PUT',{ids:['not-curated']},citizenToken);
    assert.equal(invalidSavedStatus,400);
    const [lifeStatus, lifeEvents] = await call('/api/life-events','GET',undefined,citizenToken);
    assert.equal(lifeStatus,200);
    assert.deepEqual(lifeEvents,[]);
    const [recheckStatus, recheckData] = await call('/api/life-events/recheck','POST',{profile:{age:65}},citizenToken);
    assert.equal(recheckStatus,200);
    assert.equal(recheckData.results.length,4);

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
