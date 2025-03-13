const express = require('express');
const { auth } = require('../middleware/Auth');
const { createCustomer, getAllCustomers } = require('../controllers/customer');
const router = express.Router();

router.post('/customer',auth,createCustomer)
router.get('/',auth,getAllCustomers)
module.exports = router;