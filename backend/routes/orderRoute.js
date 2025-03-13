const express = require('express');
const { auth } = require('../middleware/Auth');
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/order');
const router = express.Router();

router.post('/order',auth,createOrder)
router.get('/', auth,getAllOrders)
router.patch('/status/:id',auth,updateOrderStatus)

module.exports = router;