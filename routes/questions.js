const express = require('express');

const questionsController = require('../controllers/questions');

const router = express.Router();

router.get('/addQuestion', questionsController.addQuestion);
router.post('/addQuestion', questionsController.postAddQuestion);
router.get('/updateQuestion/:id', questionsController.updateQuestion);
router.post('/updateQuestion/:id', questionsController.postUpdateQuestion);
router.get('/questions', questionsController.questions);
router.get('/getQuestionsFromCategory/:categoryId/:numberOfQuestions', questionsController.getQuestionsFromCategory);




module.exports = router;