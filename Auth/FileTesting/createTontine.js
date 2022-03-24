const address = "0x7cA5543f9B2C35F0E972f1B45b61A2FE53fF1ed9"
const add2 ="0x338F940F4231662Dd9a689DdC4691450de932Be5"
const Web3 = require('web3');

const Abi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "tontineCercle",
		"outputs": [
			{
				"internalType": "string",
				"name": "ID_T",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Date_Creation",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "montant",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "createur",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "totalParticipant",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
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
		"name": "ERC20Interface",
		"outputs": [
			{
				"internalType": "contract ERC20",
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
				"internalType": "string",
				"name": "tontineKey",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ordre",
				"type": "uint256"
			}
		],
		"name": "addUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "tontineKey",
				"type": "string"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
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
				"internalType": "string",
				"name": "tontineKey",
				"type": "string"
			}
		],
		"name": "getUsersNumber",
		"outputs": [
			{
				"internalType": "uint256",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tontineList",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
				"internalType": "string",
				"name": "tontineKey",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "reciver",
				"type": "address"
			}
		],
		"name": "virement",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "address_",
				"type": "address"
			}
		],
		"name": "addNewToken",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "tontineKey",
				"type": "string"
			}
		],
		"name": "get_tontine",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
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
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "tokens",
		"outputs": [
			{
				"internalType": "address",
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
				"internalType": "string",
				"name": "tontineKey",
				"type": "string"
			}
		],
		"name": "validTontine",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "reciver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "montant",
				"type": "uint256"
			}
		],
		"name": "transaction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "convertttt",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "result",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_T",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "totalParticipant",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "montant",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tontineKey",
				"type": "string"
			}
		],
		"name": "creation_tontine",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "tontineKey",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "retrait",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
const ethTx = require('ethereumjs-tx')
var http = require('http');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var mysc = new web3.eth.Contract(Abi,address);
//var mysc2 = new web3.eth.Contract(Abi2,add2);
//console.log(mysc)
web3.eth.accounts.wallet.add('0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');;
/*
mysc.methods.creation_tontine("1",3,20,"test")
.send({ gas: '3000000', from: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"}).then(console.log)
*/

//mysc.methods.get_tontine("test").send({ gas: '3000000', from: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"}).then(console.log)

var V3KeyStore = web3.eth.accounts.encrypt("8f2a55949038a9610f50fb23b5883c692be63", "2222");
//console.log(V3KeyStore);
var acc = web3.eth.accounts.create();
const acc3 ="0xdd11cB265c3Ff9E98A935D82b8721f9e2626233e"
var eth = web3.eth.getBalance(acc3).then(console.log)

//console.log(eth)
//var acccc =  web3.eth.getAccounts().then(console.log);
//console.log(acccc[0]);
