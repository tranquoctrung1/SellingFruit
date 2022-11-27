const express = require('express');
const router = express.Router();

const RoleController = require('../controllers/role.controller');

router.get('/getAll', RoleController.getAll);

router.post('/insert', RoleController.Insert);

router.patch('/update', RoleController.Update);

router.delete('/delete', RoleController.Delete);

module.exports = router;
