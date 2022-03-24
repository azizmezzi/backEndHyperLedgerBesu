var express = require("express");
var router = express.Router();
const ctrl = require("../controllers/credit.js");
 
/* Adherent routes */
router.post("/DemandeCredit", ctrl.DemandeCredit);
router.post("/Confirmationsalarie", ctrl.Confirmationsalarie);
router.get("/getNBRCredit", ctrl.getNBRCredit);
router.get("/getSalairebyadherent", ctrl.getSalairebyadherent);
router.post("/VersementSalaireAdh", ctrl.VersementSalaireAdhh);
router.post("/updateSalaireUser", ctrl.updateSalaireUser);


module.exports = router;

