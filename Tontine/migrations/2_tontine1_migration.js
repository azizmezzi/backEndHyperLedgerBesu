const tontine_Cercle = artifacts.require("tontine_Cercle1");
//const IMFToken = artifacts.require("IMFToken");


module.exports = function(deployer) {
  deployer.deploy(tontine_Cercle,"0x3Ace09BBA3b8507681146252d3Dd33cD4E2d4F63");
//	deployer.deploy(IMFToken);
};

