const OrderModel = require('../models/order.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await OrderModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.getOrderByOderId = async (req, res) => {
    try {
        let orderId = req.query.orderId;

        res.status(200).json(await OrderModel.getOrderByOderId(orderId));
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let data = req.body;

        let result = await OrderModel.Insert(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await OrderModel.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let orderId = req.query.orderId;

        let result = await OrderModel.Delete(orderId);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
