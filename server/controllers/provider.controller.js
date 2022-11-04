const ProviderModel = require('../models/provider.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await ProviderModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.getProviderByProviderId = async (req, res) => {
    try {
        let providerId = req.query.providerId;

        res.status(200).json(
            await ProviderModel.getProviderByProviderId(providerId),
        );
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let data = req.body;

        let result = await ProviderModel.Insert(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await ProviderModel.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let providerId = req.query.providerId;

        let result = await ProviderModel.Delete(providerId);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
