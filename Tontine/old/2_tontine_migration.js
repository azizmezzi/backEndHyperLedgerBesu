const tontine_Cercle = artifacts.require("tontine_Cercle");
const IMFToken = artifacts.require("IMFToken");


module.exports = function(deployer) {
  deployer.deploy(tontine_Cercle);
	deployer.deploy(IMFToken);
};

