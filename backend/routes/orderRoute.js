const express = require('express');
const { auth } = require('../middleware/Auth');
const { createOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/order');
const router = express.Router();

router.post('/order',auth,createOrder)
router.get('/', auth,getAllOrders)
router.put('/order',auth,updateOrder)
router.delete('/order/:id',auth,deleteOrder)

module.exports = router;