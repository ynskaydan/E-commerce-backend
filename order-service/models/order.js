const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    },
    
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
