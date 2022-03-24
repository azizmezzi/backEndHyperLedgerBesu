var express = require("express");
var router = express.Router();
const ctrl = require("../controllers/auth.controller.js");

/* Agent routes */
router.post("/agentsignup", ctrl.agentsignup);
router.get("/getAgent", ctrl.getAgent);
router.get("/VerifFAct2Adh", ctrl.VerifFAct2Adh);

/* Adherent routes */
router.post("/stateUpdate", ctrl.stateUpdate);
router.post("/adherentsignup", ctrl.adherentsignup);
router.post("/adherentlogin", ctrl.adherentlogin);
router.get("/getAdherentbyAdrr", ctrl.getAdherentbyadrr);
router.get("/getAdherentbyID", ctrl.getAdherentbyID);
router.get("/getAdherentbyrib", ctrl.getAdherentbyrib);

module.exports = router;
