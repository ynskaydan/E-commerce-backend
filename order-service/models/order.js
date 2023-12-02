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
    quantity: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },

    
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
