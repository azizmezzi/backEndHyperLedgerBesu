var Contract={};
Contract.AbiImft = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
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
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
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
		"inputs": [],
		"name": "totalSupply",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
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
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply_",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseApproval",
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
		"inputs": [],
		"name": "totalSupplyy",
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
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
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
		"name": "owner",
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
		"constant": true,
		"inputs": [],
		"name": "symbol",
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
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
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
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseApproval",
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
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "from_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfers",
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
];

Contract.Abi =[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "trHash",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			}
		],
		"name": "setTransactionHashCotisation",
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
				"name": "",
				"type": "string"
			}
		],
		"name": "tontineCercle",
		"outputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Nom_Tontine",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Date",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Montant",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "Createur",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Nbr_participants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Nbr_cycles",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Iteration_enCours",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Cycle_enCours",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "Etat",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "Frequence",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "SommeParMois",
				"type": "uint256"
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			}
		],
		"name": "addTxDistribution",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Ordre",
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
		"inputs": [],
		"name": "getNumTontine",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "tontine_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "mondataire1_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "mondataire2_address",
				"type": "address"
			}
		],
		"name": "envoiMondataire",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "Contract_Address",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "Type",
				"type": "bool"
			}
		],
		"name": "addTxGarantie",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"name": "AddressAdhGar",
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
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "getNumIterationCycle",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"inputs": [],
		"name": "numDistribution",
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
				"internalType": "address",
				"name": "Address_Receiver",
				"type": "address"
			}
		],
		"name": "getLeng",
		"outputs": [
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
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Address_Receiver",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "Gar",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Cot",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Dis",
				"type": "bool"
			}
		],
		"name": "getLastGarCotDist",
		"outputs": [
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
		"inputs": [],
		"name": "numPart",
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
		"inputs": [],
		"name": "numGarantie",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Ordre",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "decline",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "addressTon",
				"type": "address"
			}
		],
		"name": "addParticipant",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"internalType": "bytes32",
				"name": "trHash",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			}
		],
		"name": "setTransactionHashGarantie",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numCotisation",
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
		"name": "AddressAdhCot",
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
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Participants",
		"outputs": [
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "ID_Participant",
				"type": "uint256"
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			}
		],
		"name": "addTxCotisation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
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
		"name": "Cotisations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ID_Cotisation",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ID_Cycle",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ID_Iteration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "date_cotisation",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Montant",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "Hash_Transaction",
				"type": "bytes32"
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Nom_Tontine",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Montant",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Nbr_participants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Nbr_cycles",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Frequence",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Ordre",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addressTon",
				"type": "address"
			}
		],
		"name": "addTontine",
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
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "getDateLancement",
		"outputs": [
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
				"internalType": "bool",
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
		"inputs": [
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
		"name": "Distributions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ID_Distribution",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "date_distribution",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ID_Cycle",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ID_Iteration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Montant",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "Hash_Transaction",
				"type": "bytes32"
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Address_Receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "indice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "Gar",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Cot",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Dis",
				"type": "bool"
			}
		],
		"name": "getCotisation",
		"outputs": [
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
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "getTontine",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Address_Receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Ordre",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addressTon",
				"type": "address"
			}
		],
		"name": "distribution",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ListToutParti",
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
				"internalType": "address",
				"name": "Address_Sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "Address_Receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Montant",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AddressAdhDist",
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
				"internalType": "address",
				"name": "Contract_Address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Montant",
				"type": "uint256"
			}
		],
		"name": "envoiGarantie",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Address_Receiver",
				"type": "address"
			}
		],
		"name": "verifGarantie",
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
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "getNumPartTontine",
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
				"internalType": "bytes32",
				"name": "trHash",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			}
		],
		"name": "setTransactionHashDistribution",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "addressTon",
				"type": "address"
			}
		],
		"name": "cotisation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
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
		"name": "Garanties",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ID_Garantie",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ID_Cycle",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "date_garantie",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ID_Iteration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Montant",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Type_Transaction",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Cumule",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "Hash_Transaction",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
];

Contract.Abi2 =[
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Address_Receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "indice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "Gar",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Cot",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Dis",
				"type": "bool"
			}
		],
		"name": "GetGarCotiDisByIndex",
		"outputs": [
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
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "addresPart",
				"type": "address"
			}
		],
		"name": "getPart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Nom_Tontine",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Date",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Montant",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "Createur",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Nbr_participants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Nbr_cycles",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Iteration_enCours",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Cycle_enCours",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "Etat",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "Frequence",
				"type": "string"
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			}
		],
		"name": "getDisnbr",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "tontine_Address",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "Type",
				"type": "bool"
			}
		],
		"name": "RechargeGarantie",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "tontine_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "mondataire1_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "mondataire2_address",
				"type": "address"
			}
		],
		"name": "envoiMondataire",
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
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "getNumIterationCycle",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Address_Receiver",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "Gar",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Cot",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "Dis",
				"type": "bool"
			}
		],
		"name": "getLastGarCotDist",
		"outputs": [
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Ordre",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "decline",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "addressTon",
				"type": "address"
			}
		],
		"name": "addParticipant",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "getDateLancement",
		"outputs": [
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
				"internalType": "bool",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "getNumberParticipantByTontine",
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
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "getTontine",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Address_Receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Ordre",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addressTon",
				"type": "address"
			}
		],
		"name": "distribution",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			}
		],
		"name": "getLeng",
		"outputs": [
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
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "getGarnbr",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Nom_Tontine",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Montant",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Nbr_participants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Nbr_cycles",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Frequence",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Ordre",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addressParticipant",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "addressTon",
				"type": "address"
			}
		],
		"name": "addTontine",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			}
		],
		"name": "getLastCotisation",
		"outputs": [
			{
				"internalType": "bool",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Adherent_Address",
				"type": "address"
			}
		],
		"name": "getCotnbr",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "interruption",
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
				"name": "ID_Tontine",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "addressTon",
				"type": "address"
			}
		],
		"name": "cotisation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "trHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "typeTransaction",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ID_Tontine",
				"type": "string"
			}
		],
		"name": "setTransactionHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract participant_contract",
				"name": "_a",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

Contract.address2 ="0x338F940F4231662Dd9a689DdC4691450de932Be5";
Contract.address ="0x2114De86c8Ea1FD8144C2f1e1e94C74E498afB1b";
Contract.addressIMFT="0x834aDe89F14B5A724cD4beE5c5B5883c65ae46ba";
module.exports = Contract;



