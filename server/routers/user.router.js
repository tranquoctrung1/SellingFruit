const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.get('/getAll', UserController.getAll);

router.post('/insert', UserController.Insert);

router.patch('/update', UserController.Update);

router.delete('/delete', UserController.Delete);

module.exports = router;
