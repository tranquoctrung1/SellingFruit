const express = require('express');
const router = express.Router();

const ManageStaffController = require('../controllers/manageStaff.controller');

router.get('/getAll', ManageStaffController.getAll);

router.post('/update', ManageStaffController.Update);

module.exports = router;
