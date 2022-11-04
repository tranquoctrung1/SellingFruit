const express = require('express');
const router = express.Router();

const ConsumerController = require('../controllers/consumer.controller');

router.get('/getAll', ConsumerController.getAll);

router.get(
    '/getConsumerByConsumerId',
    ConsumerController.getConsumerByConsumerId,
);

router.post('/insert', ConsumerController.Insert);

router.patch('/update', ConsumerController.Update);

router.delete('/delete', ConsumerController.Delete);

module.exports = router;
