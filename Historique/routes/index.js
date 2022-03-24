
	var express = require('express');
var router = express.Router();
//  const ControllerMethods = require('../Controler/DEPOTCONTROLER');

  const ControllerMethodsHistorique = require('../Controler/Historique');

// router.get('/getEcheanceAgent',ControllerMethodsHistorique.getAllEcheancesByAgent );

 router.get('/getAllHistoriqueAdherent',ControllerMethodsHistorique.getHistoriqueAdherent );

  router.get('/getAllNotifications',ControllerMethodsHistorique.getAllNotifications );


module.exports = router;
