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
    quantity: {
        type: Number,
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

    // You can add more fields as per your requirement
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
