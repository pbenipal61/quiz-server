const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/addUser', usersController.addUser);
router.post('/addUser', usersController.postAddUser);
router.post('/createUser', usersController.createUser);
router.get('/users', usersController.users);

module.exports = router;