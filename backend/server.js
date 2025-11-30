const express = require('express');
const cors = require('cors');
const votingSystem = require('./prover/prover.js');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 🏆 HOME PAGE
app.get('/', (req, res) => res.json({
  status: '🏆 INVISIBLE VOTING BOOTH v2.0 - ASIA HACKATHON',
  endpoints: [
    'POST /eligibility {age, voterId}',
    'POST /vote {vote: 0|1}',
    'POST /submit-vote {proof, publicSignals}',
    'GET /results',
    'GET /stats',
    'GET /zk-info'
  ]
}));

// 1️⃣ ELIGIBILITY CHECK (Compact ZK Circuit)
app.post('/eligibility', async (req, res) => {
  const { age, voterId } = req.body;
  const eligibility = await votingSystem.proveEligibility(age || 25, voterId || 123456789012);
  res.json(eligibility);
});

// 2️⃣ ANONYMOUS VOTE + ZK PROOF
app.post('/vote', async (req, res) => {
  const { eligible = true, vote = 1 } = req.body;
  const anonToken = votingSystem.generateAnonToken();
  
  const proof = await votingSystem.proveVote(eligible, vote, anonToken);
  res.json({ ...proof, anonToken });
});

// 3️⃣ SUBMIT VOTE (Record in stats.json)
app.post('/submit-vote', async (req, res) => {
  try {
    const { proof, publicSignals, voterId, age } = req.body;
    const ageGroup = age >= 36 ? '36+' : age >= 26 ? '26-35' : '18-25';
    const result = await votingSystem.submitVote(proof, publicSignals, voterId, ageGroup);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4️⃣ LIVE RESULTS
app.get('/results', (req, res) => {
  res.json(votingSystem.getResults());
});

// 5️⃣ 📊 DETAILED STATISTICS
app.get('/stats', (req, res) => {
  res.json(votingSystem.getDetailedStats());
});

// 6️⃣ 💾 RAW STATS DATABASE
app.get('/stats/raw', (req, res) => {
  res.json(votingSystem.stats);
});

// 7️⃣ 🔍 ZK PROOF LOCATIONS
app.get('/zk-info', (req, res) => {
  res.json({
    zk_location: 'prover/build/*.wasm + *.zkey',
    compact_circuits: 'circuits/eligibility.compact + vote.compact',
    groth16_proofs: 'snarkjs.fullProve() in prover.js',
    nullifier_storage: 'stats.json → votes[] array',
    stats_storage: 'backend/stats.json'
  });
});

// 8️⃣ 🧪 HACKATHON DEMO DATA
app.get('/demo', (req, res) => {
  res.json({
    sampleVoter: { age: 25, voterId: '123456789012' },
    anonToken: votingSystem.generateAnonToken(),
    currentStats: votingSystem.getDetailedStats()
  });
});

app.listen(3001, () => {
  console.log('🏆 INVISIBLE VOTING LIVE: http://localhost:3001');
  console.log('📊 Stats: http://localhost:3001/stats');
  console.log('🔍 ZK Info: http://localhost:3001/zk-info');
});
