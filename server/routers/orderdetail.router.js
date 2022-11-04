const express = require('express');
const router = express.Router();

const OrderDetailController = require('../controllers/orderdetail.controller');

router.get('/getAll', OrderDetailController.getAll);

router.get(
    '/getOrderDetailByOderId',
    OrderDetailController.getOrderDetailByOderId,
);

router.post('/insert', OrderDetailController.Insert);

router.patch('/update', OrderDetailController.Update);

router.delete('/delete', OrderDetailController.Delete);

module.exports = router;
