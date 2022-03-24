const Web3 = require('web3');
var Contract = require('./contract');

var http = require('http');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const add = async () => {

web3.eth.accounts.wallet.add('0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');

 const MYSC = await new web3.eth.Contract(Contract.Abi,Contract.address).methods.addNewToken('0x494d465400000000000000000000000000000000000000000000000000000000',Contract.addressImft)
 .send({ gas: '6500000', from:"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73" })
 console.log('token added');
};
add();
/*const approve = async () => { console.log('Attempting to deploy from account');

 web3.eth.accounts.wallet.add('0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');

  const approve = await new web3.eth.Contract(Contract.AbiImft,Contract.addressImft).methods.approve(Contract.address,10000)
  .send({gas: '6500000', from:"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"});
  console.log('10000 approved for acount[0]');
};
approve();
*/



