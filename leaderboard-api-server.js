// leaderboard-api-server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Dummy leaderboard data
const leaderboard = [
  { name: 'BA', wagered: '$1,773,917', lbPrize: '$50', wagerReward: '$20' },
  { name: 'AN', wagered: '$1,078,970', lbPrize: '$30', wagerReward: '$10' },
  { name: 'FB', wagered: '$706,884', lbPrize: '$20', wagerReward: '$10' },
  { name: 'RS', wagered: '$562,231', lbPrize: '$15', wagerReward: '$5' },
  { name: 'HY', wagered: '$468,006', lbPrize: '$10', wagerReward: '$5' },
  { name: 'LU', wagered: '$443,054', lbPrize: '$10', wagerReward: '$5' },
  { name: 'PO', wagered: '$428,187', lbPrize: '$10', wagerReward: '$5' },
  { name: 'AX', wagered: '$397,000', lbPrize: '$10', wagerReward: '$5' },
  { name: 'KD', wagered: '$355,000', lbPrize: '$10', wagerReward: '$5' },
  { name: 'ZH', wagered: '$299,999', lbPrize: '$10', wagerReward: '$5' }
];

// API route
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

app.listen(port, () => {
  console.log(`\u2705 Leaderboard API running at http://localhost:${port}`);
});
