const express = require('express');

const questionsController = require('../controllers/questions');

const router = express.Router();

router.get('/addQuestion', questionsController.addQuestion);
router.post('/addQuestion', questionsController.postAddQuestion);



module.exports = router;