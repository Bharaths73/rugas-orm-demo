const express = require('express');
const { auth } = require('../middleware/Auth');
const { dashboardDetails } = require('../controllers/dashboard');
const router = express.Router();

router.get('/details',auth,dashboardDetails)
module.exports = router;