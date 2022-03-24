const PretContract = artifacts.require("PretContract");

module.exports = function(deployer) {
  deployer.deploy(PretContract);
};

