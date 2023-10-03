const express=require('express');
const router =express.Router();
const healthCheckController=require('../controller/healthCheckController');
router.get('/healthz', healthCheckController);

module.exports = router;
