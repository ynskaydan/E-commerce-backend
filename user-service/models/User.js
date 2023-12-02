const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    cart: {
        type: Array,
        required: false
    },
    orders: {
        type: Array,
        required: false
    },
    role: {
        type: String,
        required: false
    },

    
});

const User = mongoose.model('User', userSchema);

module.exports = User;
