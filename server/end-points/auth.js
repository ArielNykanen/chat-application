const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth')

router.post('/register', authCtrl.postRegister);

router.post('/login', authCtrl.postLogin);


module.exports = router;
