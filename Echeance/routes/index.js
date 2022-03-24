const express = require('express');

const router = express.Router();
// const ControllerMethods = require('../controller/PaymentDeadline.Controller');
const ControllerMethods1 = require('../controller/echeance.Controller');

/* GET home page. */

router.get('/balanceOf', ControllerMethods1.BalanceOf);

/* GET home page. */
// router.post('/AddE', ControllerMethods1.AddE);
router.post('/payerEcheance', ControllerMethods1.PayerEcheance);
router.post('/PayerEcheanceIntermadiate',ControllerMethods1.PayerEcheanceIntermadiate);
// router.get('/getEcheance',ControllerMethods1.getEcheance);
router.post('/AddPret', ControllerMethods1.AddPret);
// router.get('/getPret',ControllerMethods1.getPret);
router.get('/getAllEcheances', ControllerMethods1.getAllEcheances);
router.get('/getNotificationEcheances', ControllerMethods1.getNotificationEcheances);
router.get('/getAllEcheancesForAgent', ControllerMethods1.getAllEcheancesForAgent);
router.post('/ElimineNotification', ControllerMethods1.elimineNotification);
module.exports = router;

