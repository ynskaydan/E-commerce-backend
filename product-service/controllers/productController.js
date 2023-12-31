const Product = require("../models/product.js");
const redisClient = require('../config/redisConfig');

const addProduct = async (req, res) => {
    try {
        const { id, name, description, price } = req.body;
        // Check if product already exists
        const existingProduct = await Product.findOne({ id });
        if (existingProduct) {
            return res.status(400).send({ message: 'Product already exists' });
        }

        // Create a new product
        const product = new Product({ id, name, description, price });
        await product.save();

        return res.status(201).send({ message: 'Product added successfully', product });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ id });
        if (!product) {
            return res.status(400).send({ message: 'Product does not exist' });
        }
        console.log("product: ", product);
        return res.status(201).json(product)
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }

};

const getAllProducts = async (req, res) => {
    const cacheKey = 'allProducts';
    redisClient.get(cacheKey, async (err, products) => {
        if (err) throw err;

        if (products) {

            res.json(JSON.parse(products));

        } else {
            try {
                console.log("getAllProducts");
                const products = await Product.find();
                if (products.length == 0) {
                    return res.status(400).send({ message: 'Products are empty!' });
                }
                return res.status(201).json(products);
            } catch (error) {
                return res.status(500).send({ message: error.message });
            }
        }
    });

};




module.exports = {
    addProduct,
    getProduct,
    getAllProducts
};
