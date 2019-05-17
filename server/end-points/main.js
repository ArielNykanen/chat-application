const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/getUsers', usersCtrl.getUsers);

router.post('/sendMsg', usersCtrl.sendMsg);


module.exports = router;
