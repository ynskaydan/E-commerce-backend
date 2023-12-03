const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },  
    rating: {
        type: Number,
        required: false
    },
    reviews: {
        type: Number,
        required: false
    },
    seller: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
