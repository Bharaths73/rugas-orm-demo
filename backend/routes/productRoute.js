const express = require('express');
const { auth } = require('../middleware/Auth');
const { createProduct, getAllProducts } = require('../controllers/product');
const router = express.Router();

router.post('/product',auth,createProduct)
router.get('/',auth,getAllProducts)
module.exports = router;