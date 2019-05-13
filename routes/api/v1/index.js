const express = require('express');

const {createMatch, getMadMindId, getMatchData, updateMatch,
  addToMatchTypes, addToOriginPlatforms}
  = require('../../../controllers/api/v1.controller');

const router = new express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    'v': 1, 'route': 'api',
  });
});

router.post('/matchTypes', addToMatchTypes);
router.post('/createMatch', createMatch);
router.get('/getMadMindId/:originPlatformId', getMadMindId);
router.get('/getMatchData/:id', getMatchData);
router.post('/updateMatch', updateMatch);

router.post('/originPlatforms', addToOriginPlatforms);
module.exports = router;
