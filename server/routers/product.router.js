const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

router.get('/getAll', ProductController.getAll);

router.get('/getProductByProductId', ProductController.getProductByProductId);

router.post('/insert', ProductController.Insert);

router.patch('/update', ProductController.Update);

router.delete('/delete', ProductController.Delete);

module.exports = router;
