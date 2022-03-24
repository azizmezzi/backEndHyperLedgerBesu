const tontine_Cercle = artifacts.require("participant_contract");
//const IMFToken = artifacts.require("IMFToken");


module.exports = function(deployer) {
  deployer.deploy(tontine_Cercle);
//	deployer.deploy(IMFToken);
};

