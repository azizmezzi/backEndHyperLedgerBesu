const express = require('express');

const router = express.Router();
const ControllerMethods = require('../Controler/DEPOTCONTROLER');

/* GET home page. */
router.post('/TransfertOperation', ControllerMethods.TransfertOperation);

router.get('/getNotificationTransfert', ControllerMethods.getNotificationTransfert);

router.post('/updateSold', ControllerMethods.updateSold);

router.get('/getSoldDigital', ControllerMethods.getSoldDigital);

module.exports = router;
