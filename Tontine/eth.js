signTransaction = (addressTo) =>{
const Web3 = require('web3')
const Tx = require('ethereumjs-tx')
const args = process.argv.slice(2);

// web3 initialization - must point to the HTTP JSON-RPC endpoint
var provider = args[0] || 'http://localhost:8545';
console.log("******************************************");
console.log("Using provider : " + provider);
console.log("******************************************");
var web3 = new Web3(new Web3.providers.HttpProvider(provider))
web3.transactionConfirmationBlocks = 1;
// Sender address and private key
// Second acccount in dev.json genesis file
// Exclude 0x at the beginning of the private key
const addressFrom = '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73'
const privKey = Buffer.from('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63', 'hex')

// Receiver address and value to transfer
// Third account in dev.json genesis file
// const addressTo = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
const valueInEther = 10

//var mysc = new web3.eth.Contract(Abi,address);
//console.log(mysc);
//web3.eth.accounts.wallet.add('0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');;
//const res = mysc.methods.set(7);


// Get the address transaction count in order to specify the correct nonce
web3.eth.getTransactionCount(addressFrom, "pending").then((txnCount) => {
  // Create the transaction object
  var txObject = {
      nonce: web3.utils.numberToHex(txnCount),
      gasPrice: web3.utils.numberToHex(1000),
      gasLimit: web3.utils.numberToHex(126165),
    to: addressTo,
value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether'))
  };
 console.log(txObject);
  // Sign the transaction with the private key
  var tx = new Tx(txObject);
  tx.sign(privKey)

  //Convert to raw transaction string
  var serializedTx = tx.serialize();
  var rawTxHex = '0x' + serializedTx.toString('hex');

  // log raw transaction data to the console so you can send it manually
  console.log("Raw transaction data: " + rawTxHex);

  // but also ask you if you want to send this transaction directly using web3
  web3.eth.sendSignedTransaction(rawTxHex)
  .on('receipt', receipt => { console.log('Receipt: ', receipt); })
  .catch(error => { console.log('Error: ', error.message); });

})
//.catch(error => { console.log('Error: ', error.message); });
}


signTransaction("0x22ede4a2dc7f6021af77842f44332d125685603e")
