const express = require('express');

const miscController = require('../controllers/misc');

const router = express.Router();

router.get('/moveDataToMongo', miscController.moveDataToMongo);
router.get('/removeQuestions', miscController.removeQuestions);

module.exports = router;