const OrderModel = require('../models/order.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await OrderModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.getBigestNumberOrder = async (req, res) => {
    try {
        res.status(200).json(await OrderModel.getBigestNumberOrder());
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
module.exports.getOrderByStaffId = async (req, res) => {
    try {
        let { role, staffId } = req.query;

        res.status(200).json(await OrderModel.getOrderByStaffId(role, staffId));
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

module.exports.UpdatePrint = async (req, res) => {
    try {
        let data = req.body;

        let result = await OrderModel.UpdatePrint(data);

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
