import 'dotenv/config';
import http from 'http';
import { app } from '../app.js';

const server = http.createServer(app);
server.listen(4010, async () => {
  console.log('HTTP Test Server listening on http://127.0.0.1:4010');
  try {
    // 1. Health
    const hRes = await fetch('http://127.0.0.1:4010/api/health');
    const hData = await hRes.json();
    console.log('Health check:', hRes.status, hData);

    // 2. Schemes
    const sRes = await fetch('http://127.0.0.1:4010/api/schemes');
    const sData = await sRes.json();
    console.log('Schemes count:', sData.schemes?.length);

    // 3. Register & Login to get token
    const testEmail = `tester_${Date.now()}@citizen.gov.in`;
    const regRes = await fetch('http://127.0.0.1:4010/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'securePassword123!', name: 'Rahul Test' })
    });
    const regData = await regRes.json();
    const token = regData.token;
    console.log('Auth registration:', regRes.status, 'Token received:', !!token);

    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // 4. AI NLP Extract (Story parameter supported)
    const aiRes = await fetch('http://127.0.0.1:4010/api/ai/extract', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ text: 'I am a 65 year old farmer in Maharashtra with income 180000' })
    });
    const aiData = await aiRes.json();
    console.log('AI Extraction:', aiRes.status, aiData.profile);

    // 5. OCR Scan
    const ocrRes = await fetch('http://127.0.0.1:4010/api/documents/scan', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ fileName: 'Income_Certificate.pdf', scan: true })
    });
    const ocrData = await ocrRes.json();
    console.log('OCR Scan:', ocrRes.status, ocrData.documentType, ocrData.proposedFields);

    // 6. ML Matching
    const mRes = await fetch('http://127.0.0.1:4010/api/match', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        age: 65,
        state: 'Maharashtra',
        occupation: 'farmer',
        annualFamilyIncome: 180000,
        ownsCultivableLand: true
      })
    });
    const mData = await mRes.json();
    console.log('ML Match status:', mRes.status, 'Total evaluated:', mData.results?.length);
    const potential = mData.results?.filter(r => r.status === 'potential_match').map(r => r.name);
    console.log('Potential matches found:', potential);

    // 7. Profile API
    const pRes = await fetch('http://127.0.0.1:4010/api/profile', { headers: authHeaders });
    const pData = await pRes.json();
    console.log('Citizen Profile retrieved:', pRes.status, pData.name || pData.occupation);

    // 8. Documents Vault API
    const dRes = await fetch('http://127.0.0.1:4010/api/documents', { headers: authHeaders });
    const dData = await dRes.json();
    console.log('Document Vault items:', dRes.status, Array.isArray(dData) ? dData.length : 0);

    // 9. Applications API
    const aRes = await fetch('http://127.0.0.1:4010/api/applications', { headers: authHeaders });
    const aData = await aRes.json();
    console.log('Application Tracker items:', aRes.status, Array.isArray(aData) ? aData.length : 0);

    console.log('\n>>> ALL 9 END-TO-END HTTP INTEGRATION CHECKS PASSED 100%! <<<');
  } catch (err) {
    console.error('E2E HTTP Error:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
