const Web3 = require('web3');
const ethTx = require('ethereumjs-tx')
//const PaymentDeadLine = require('./compile/compile');
//const depot = require('/home/ec2-user/newdepot/dp/compile2');
//const CO = require('../Anas_k2lisss/compile');
var Contract = require('./contract');
//const config = require('config');
//let Smart_Contract_addressIMFT = config.get('Smart_Contract.Imftsmartcontract');
//let Smart_Contract_address = config.get('Smart_Contract.DEPOT');
//const IMFToken = require('/home/ec2-user/k2lis/compile/compileimft');
var http = require('http');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var mysc = new web3.eth.Contract(Contract.Abi,Contract.addressTontine)
const add = ()=> {
// const accounts = await web3.eth.getAccounts();

//web3.eth.personal.unlockAccount(accounts[0], "12345", 600);
//console.log(accounts)
web3.eth.accounts.wallet.add('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');
web3.eth.getTransactionCount("0xfe3b557e8fb62b89f4916b721be55ceb828dbd73", "pending").then((txnCount) => {

 const MYSC = mysc.methods.addNewToken(Contract.addressImft);
/* .send({ gas: '3000000', from: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73" }).then(()=>{
 console.log('token added');}).catch(e=>console.log(e));*/
  var txObject = {
nonce :txnCount,
	gasPrice: web3.utils.toHex(1000),
     gasLimit: web3.utils.toHex(126165),
data : MYSC.encodeABI(),
from : "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
to: Contract.addressTontine,
nonce : '0x0'
  };
const privKey = Buffer.from('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63', 'hex')

  var tx = new ethTx(txObject);
  tx.sign(privKey)

  //Convert to raw transaction string
  var serializedTx = tx.serialize();
  var rawTxHex = '0x' + serializedTx.toString('hex');
console.log(txObject)
web3.eth.sendSignedTransaction(rawTxHex)
        .on('receipt', receipt => { console.log('Receipt: ', receipt); })
        .catch(error => { console.log('Error: ', error.message); });
})};
add();
