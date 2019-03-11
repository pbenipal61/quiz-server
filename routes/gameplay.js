const express = require('express');

const gameplayController = require('../controllers/gameplay');

const router = express.Router();

router.get('/getAllQuestions', gameplayController.allQuestions);
// router.post('/addQuestion', questionsController.postAddQuestion);
// router.get('/updateQuestion/:id', questionsController.updateQuestion);
// router.post('/updateQuestion/:id', questionsController.postUpdateQuestion);
// router.get('/questions', questionsController.questions);
router.get('/getCategoriesAndQuestions/:numberOfCategories/:numberOfQuestions', gameplayController.getCategoriesAndQuestions);




module.exports = router;