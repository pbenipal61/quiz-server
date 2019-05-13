const express = require('express');
const usersController = require('../controllers/user.controller');

const router = new express.Router();

router.get('/addUser', usersController.addUser);
router.post('/addUser', usersController.postAddUser);
router.post('/createUser', usersController.createUser);
router.get('/users', usersController.users);


module.exports = router;
