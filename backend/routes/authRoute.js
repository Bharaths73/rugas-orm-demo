const express = require('express');
const { signUp, login, logout } = require('../controllers/Auth');
const { auth } = require('../middleware/Auth');
const router = express.Router();

router.post('/signup',signUp)
router.post('/login',login)
router.post('/logout',auth, logout)
module.exports = router;