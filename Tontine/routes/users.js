var express = require('express');
var router = express.Router();
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
const Contract = require('../contract');

var mySCIMFT = new web3.eth.Contract(Contract.AbiImft,Contract.addressIMFT)

router.get('/balance', function(req, res, next) {
/*var V3KeyStore = web3.eth.accounts.encrypt("acc1", "1234");
console.log(JSON.stringify(V3KeyStore));*/
        mySCIMFT.methods.balanceOf(req.body.owner).call(function(error,result){
           res.send({balance: result})
  })
  //res.send('respond with a resource');
});

module.exports = router;
