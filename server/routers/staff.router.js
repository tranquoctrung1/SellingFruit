const express = require('express');
const router = express.Router();

const StaffController = require('../controllers/staff.controller');

router.get('/getAll', StaffController.getAll);

router.post('/insert', StaffController.Insert);

router.patch('/update', StaffController.Update);

router.delete('/delete', StaffController.Delete);

module.exports = router;
