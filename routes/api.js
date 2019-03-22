const express = require('express');

const apiController = require('../controllers/api');

const router = express.Router();

router.get('/getAllQuestions', apiController.allQuestions);
// router.post('/addQuestion', questionsController.postAddQuestion);
// router.get('/updateQuestion/:id', questionsController.updateQuestion);
// router.post('/updateQuestion/:id', questionsController.postUpdateQuestion);
// router.get('/questions', questionsController.questions);
router.get('/getCategoriesAndQuestions/:numberOfCategories/:numberOfQuestions', apiController.getCategoriesAndQuestions);

router.get('/createMatch/:id', apiController.createMatch);
router.post('newMatchCreated/', apiController.newMatchAddedToFirebase);

module.exports = router;