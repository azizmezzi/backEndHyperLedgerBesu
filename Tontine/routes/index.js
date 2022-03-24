var express = require('express');
var router = express.Router();
const ControllerMethods = require('../Controler/Tontine');

//router.get("/a", ControllerMethods.aaaa);
router.get("/aa", ControllerMethods.aaa);
router.get("/aaa", ControllerMethods.aa);

/* GET */


router.get('/getTontinesByParticipant2', ControllerMethods.getTontinesByParticipant2);
router.get('/getUserDyRib', ControllerMethods.getUserDyRib);
router.get('/getNotificationTontine', ControllerMethods.getNotificationTontine);
router.get('/getNotificationTontinee', ControllerMethods.getNotificationTontine2);
router.get('/getTontineForNotification', ControllerMethods.getTontineForNotification);
router.get('/DetailTontine', ControllerMethods.DetailTontine);
router.get('/getAllAdherent', ControllerMethods.getAllAdherent);
router.get("/AvancementTontine", ControllerMethods.AvancementTontine);
router.get("/getNotification", ControllerMethods.getNotification);



/* POST  */

router.post('/createTontine', ControllerMethods.createTontine);
router.post('/addParticipant', ControllerMethods.addParticipant);
router.post('/cotisation', ControllerMethods.cotisation);
router.post('/RechargeGarantie', ControllerMethods.RechargeGarantie);


module.exports = router;
