const express = require('express');
const router = express.Router();

const StaffConsumerController = require('../controllers/staffConsumer.controller');

router.get('/getAll', StaffConsumerController.getAll);

router.post('/update', StaffConsumerController.Update);

module.exports = router;
