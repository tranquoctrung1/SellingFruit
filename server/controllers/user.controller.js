const UserModel = require('../models/user.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await UserModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let data = req.body;

        let result = await UserModel.Insert(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await UserModel.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let { username } = req.query;

        let result = await UserModel.Delete(username);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
