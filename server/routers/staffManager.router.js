const express = require('express');
const router = express.Router();

const StaffManagerController = require('../controllers/staffManager.controller');

router.get('/getAll', StaffManagerController.getAll);

router.post('/insert', StaffManagerController.Insert);

router.patch('/update', StaffManagerController.Update);

router.delete('/delete', StaffManagerController.Delete);

module.exports = router;
