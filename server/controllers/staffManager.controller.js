const StaffManagerModel = require('../models/staffManager.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await StaffManagerModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let data = req.body;

        let result = await StaffManagerModel.Insert(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await StaffManagerModel.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let { staffManagerId } = req.query;

        let result = await StaffManagerModel.Delete(staffManagerId);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
