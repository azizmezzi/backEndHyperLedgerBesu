const address = "0x1EA7432837C5e0e26209aa45aab6aA27913E51c0"
const Web3 = require('web3');
const Abi =[
	{
		"constant": true,
		"inputs": [],
		"name": "ERC20Interface",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ERC20BasicInterface",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_symbol",
				"type": "bytes32"
			},
			{
				"name": "_sender",
				"type": "address"
			},
			{
				"name": "_reciver",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferTest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "operationNum",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "tokens",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "Pause",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "Unpause",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	}
]

const ethTx = require('ethereumjs-tx')
var http = require('http');
//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"));
//var mysc = new web3.eth.Contract(Abi,address);
//console.log(mysc);
//web3.eth.accounts.wallet.add('0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');;
//mysc.methods.set(3)
//.send({ gas: '3000000', from: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"}).then(console.log)
//mysc.methods.get().call((error,result)=>{console.log({result,error})});



//const Web3 = require('web3')
//const ethTx = require('ethereumjs-tx')
const readline = require('readline');

async function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

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
//const addressTo = '0xa775Fd3eb96956b2284e96298Bd12624A9C952D2'
//const valueInEther = 2

var mysc = new web3.eth.Contract(Abi,address);
//console.log(mysc);
web3.eth.accounts.wallet.add('0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');;
const res =   mysc.methods.transferTest('0x494d4654',"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73","0x0237f50B08612A694A427B73b8598f77916b8EC8", 100);



//console.log('aaaaaa')
// Get the address transaction count in order to specify the correct nonce
web3.eth.getTransactionCount(addressFrom, "pending").then((txnCount) => {
  // Create the transaction object
  var txObject = {
      nonce: web3.utils.numberToHex(txnCount),
      gasPrice: web3.utils.numberToHex(1000),
      gasLimit: web3.utils.numberToHex(1261650),
    to: address,
data : res.encodeABI(),
//value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether'))
  };
console.log(txObject);
  // Sign the transaction with the private key
  var tx = new ethTx(txObject);
  tx.sign(privKey)

  //Convert to raw transaction string
  var serializedTx = tx.serialize();
  var rawTxHex = '0x' + serializedTx.toString('hex');

  // log raw transaction data to the console so you can send it manually
  console.log("Raw transaction data: " + rawTxHex);

  // but also ask you if you want to send this transaction directly using web3
  (async() => {
    const ans = await askQuestion("******************************************\n\
Do you want to send the signed value transaction now ? (Y/N):");
    if("y" == ans || "Y" == ans){
      // Send the signed transaction using web3
      web3.eth.sendSignedTransaction(rawTxHex)
        .on('receipt', receipt => { console.log('Receipt: ', receipt); })
        .catch(error => { console.log('Error: ', error.message); });
      console.log("******************************************");
      console.log("Value transaction sent, waiting for receipt.");
      console.log("******************************************");
    }else{
      console.log("******************************************");
      console.log("You can for instance send this transaction manually with the following command:");
      console.log("curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_sendRawTransaction\",\"params\":[\"" + rawTxHex + "\"],\"id\":1}'", provider);
    }
  })();

})
.catch(error => { console.log('Error: ', error.message); });

