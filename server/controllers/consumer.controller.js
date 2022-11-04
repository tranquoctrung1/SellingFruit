const ConsumerModel = require('../models/consumer.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await ConsumerModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.getConsumerByConsumerId = async (req, res) => {
    try {
        let consumerId = req.query.consumerId;

        res.status(200).json(
            await ConsumerModel.getConsumerByConsumerId(consumerId),
        );
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let data = req.body;

        let result = await ConsumerModel.Insert(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await ConsumerModel.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let consumerId = req.query.consumerId;

        let result = await ConsumerModel.Delete(consumerId);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
