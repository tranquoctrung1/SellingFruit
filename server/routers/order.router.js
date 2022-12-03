const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order.controller');

router.get('/getAll', OrderController.getAll);

router.get('/getOrderByOderId', OrderController.getOrderByOderId);

router.get('/getBigestNumberOrder', OrderController.getBigestNumberOrder);

router.post('/insert', OrderController.Insert);

router.patch('/update', OrderController.Update);

router.delete('/delete', OrderController.Delete);

module.exports = router;
