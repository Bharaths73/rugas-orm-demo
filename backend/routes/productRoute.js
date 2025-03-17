const express = require('express');
const { auth } = require('../middleware/Auth');
const { createProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/product');
const router = express.Router();

const multer = require('multer');
const upload=multer({dest:"uploads/products/"})

router.post('/product',auth, upload.single('image'),createProduct)
router.get('/',auth,getAllProducts)
router.put('/product',auth,upload.single('image'),updateProduct)
router.delete("/product/:id",auth,deleteProduct)
module.exports = router;