const express = require('express');
const router = express.Router();
const {     createOrder, getOrder, getUserOrders } = require('./controllers/orderController');

router.post('/create', createOrder);
router.get('/get/:id', getOrder);
router.get('/getUserOrders/:userId', getUserOrders);

module.exports = router;
