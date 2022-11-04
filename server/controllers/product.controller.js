const ProductModel = require('../models/product.model');

module.exports.getAll = async (req, res) => {
    try {
        res.status(200).json(await ProductModel.getAll());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.getProductByProductId = async (req, res) => {
    try {
        let productId = req.query.productId;

        res.status(200).json(
            await ProductModel.getProductByProductId(productId),
        );
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let data = req.body;

        let result = await ProductModel.Insert(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await ProductModel.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let productId = req.query.productId;

        let result = await ProductModel.Delete(productId);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
