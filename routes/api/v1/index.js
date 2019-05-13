const express = require('express');

const {createMatch, getMadMindId, getMatchData, updateMatch,
  addToMatchTypes, addToOriginPlatforms, getQuestions}
  = require('../../../controllers/api/v1.controller');

const router = new express.Router();

router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestions);
router.post('/matchTypes', addToMatchTypes);
router.post('/createMatch', createMatch);
router.get('/getMadMindId/:originPlatformId', getMadMindId);
router.get('/getMatchData/:id', getMatchData);
router.post('/updateMatch', updateMatch);

router.post('/originPlatforms', addToOriginPlatforms);
router.get('/', (req, res, next) => {
  res.status(200).json({
    'v': 1, 'route': 'api',
  });
});
module.exports = router;
