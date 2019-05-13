const express = require('express');
const router = new express.Router();

const v1Route = require('./v1');

router.use('/v1', v1Route);

module.exports = router;
