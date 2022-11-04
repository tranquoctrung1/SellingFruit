const OrderDetailModel = require('../models/provider.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await OrderDetailModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.getOrderDetailByOrderId = async (req, res) => {
    try {
        let orderId = req.query.orderId;

        res.status(200).json(
            await OrderDetailModel.getOrderDetailByOrderId(orderId),
        );
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let data = req.body;

        let result = await OrderDetailModel.Insert(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await OrderDetailModel.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let orderId = req.query.orderId;

        let result = await OrderDetailModel.Delete(orderId);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
