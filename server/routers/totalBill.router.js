const express = require('express');
const router = express.Router();

const TotalBillController = require('../controllers/totalBill.controller');

router.get('/getTotalBill', TotalBillController.getTotalBill);

router.patch('/update', TotalBillController.Update);

module.exports = router;
