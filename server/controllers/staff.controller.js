const StaffModel = require('../models/staff.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await StaffModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let data = req.body;

        let result = await StaffModel.Insert(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await StaffModel.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let { staffId } = req.query;

        let result = await StaffModel.Delete(staffId);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
