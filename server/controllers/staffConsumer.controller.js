const StaffConsumerModel = require('../models/staffConsumer.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await StaffConsumerModel.getAll());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;
        res.status(200).json(await StaffConsumerModel.Update(data));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
