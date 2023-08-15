const ManageStaffModel = require('../models/manageStaff.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await ManageStaffModel.getAll());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;
        res.status(200).json(await ManageStaffModel.Update(data));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
