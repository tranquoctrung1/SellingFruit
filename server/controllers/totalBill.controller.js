const TotalBillController = require('../models/totalBill.model');

module.exports.getTotalBill = async (req, res) => {
    try {
        res.status(200).json(await TotalBillController.getTotalBill());
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let data = req.body;

        let result = await TotalBillController.Update(data);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
