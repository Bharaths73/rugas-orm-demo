const express = require('express');
const { auth } = require('../middleware/Auth');
const { createCustomer, getAllCustomers, deleteCustomer, updateCustomer } = require('../controllers/customer');
const router = express.Router();

router.post('/customer',auth,createCustomer)
router.get('/',auth,getAllCustomers)
router.delete('/customer/:id',auth,deleteCustomer)
router.put('/customer',auth,updateCustomer)
module.exports = router;