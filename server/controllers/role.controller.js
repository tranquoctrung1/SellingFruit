const RoleModel = require('../models/role.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await RoleModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let data = req.body;

        let result = await RoleModel.Insert(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await RoleModel.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let { role } = req.query;

        let result = await RoleModel.Delete(role);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
