const Order = require("../models/order.js")

const createOrder = async (req, res) => {
    const { id, name, productId, userId } = req.body;
    try {
        const order = await Order.findOne({ id });
        if (order) {
            return res.status(400).send({ message: 'Order already exists' });
        }
        const newOrder = new Order({ id, name, productId, userId });
        await newOrder.save;
        res.status(201).send({ message: 'Order created successfully' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }


};

const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findOne({ id });
        if (!order) {
            return res.status(400).send({ message: 'order does not exist' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });
        if (!orders || orders.length === 0) {
            return res.status(404).send({ message: 'No orders found for this user' });
        }
        return res.status.json(orders);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

};


const getAllOrders = async (req, res) => {
    const cacheKey = 'allOrders';
    redisClient.get(cacheKey, async (err, orders) => {
        if (err) throw err;

        if (products) {

            res.json(JSON.parse(orders));

        } else {
            try {
                const orders = await Order.find();
                if (orders.length == 0) {
                    return res.status(400).send({ message: 'Orders are empty!' });
                }
                return res.status(201).json(orders);
            } catch (error) {
                return res.status(500).send({ message: error.message });
            }
        }
    });


};


module.exports = {
    createOrder,
    getOrder,
    getUserOrders,
    getAllOrders
};
