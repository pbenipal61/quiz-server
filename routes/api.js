const express = require('express');

const apiController = require('../controllers/api');

const router = express.Router();

router.get('/getAllQuestions', apiController.allQuestions);
// router.post('/addQuestion', questionsController.postAddQuestion);
// router.get('/updateQuestion/:id', questionsController.updateQuestion);
// router.post('/updateQuestion/:id', questionsController.postUpdateQuestion);
// router.get('/questions', questionsController.questions);
router.get('/getCategories/:numberOfCategories', apiController.getCategories);

router.get('/getQuestions/:numberOfQuestions', apiController.getQuestions);

router.post('/createMatch', apiController.createMatch);
router.get('/getMadMindId/:originPlatformId', apiController.getMadMindId);

module.exports = router;