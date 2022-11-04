const express = require('express');
const router = express.Router();

const ProviderController = require('../controllers/provider.controller');

router.get('/getAll', ProviderController.getAll);

router.get(
    '/getProviderByProviderId',
    ProviderController.getProviderByProviderId,
);

router.post('/insert', ProviderController.Insert);

router.patch('/update', ProviderController.Update);

router.delete('/delete', ProviderController.Delete);

module.exports = router;
