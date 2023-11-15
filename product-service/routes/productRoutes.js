const express = require('express');
const router = express.Router();
const { addProduct, getProduct, getAllProducts } = require('./controllers/productController');

router.post('/add', addProduct);
router.post('/get/:productId', getProduct);
router.get('/getAll', getAllProducts);

module.exports = router;
