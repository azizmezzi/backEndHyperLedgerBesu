const IMFToken = artifacts.require("IMFToken");

contract("IMFToken", function(accounts) {
  it("should put 10000 MetaCoin in the first account", function ()  {
	return IMFToken.deployed().then(function(instance){
	return instance.balanceOf.call(accounts[1]);
}).then(function(balance){
console.log(balance.valueOf());
})
//     const contract = await IMFToken.deployed();
//  const contractT = await .deployed();
/*
 const MYSC = await new web3.eth.Contract(Contract.Abi,Contract.address).methods.addNewToken(Contract.addressIMFT)
 .send({ gas: '6500000', from:"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73" })

   const result = contract.balanceOf.call(accounts[0]).then(res=>{
console.log(res);
contract.transfers(accounts[0],accounts[1],100,{from:accounts[0]})
}).then(async ()=>{const result2 =contract.balanceOf.call(accounts[0]).then(re =>console.log(re))

//console.log(resa)

});
   // await contract.getNumber();
   // const result = await contract.getNumber.call();
   // assert.isTrue(result === 54);
//console.log(result)

/*
  let tontine;
return   IMFToken.deployed()
    .then(instance =>{
tontine = instance;
//let Balance;
Balance = tontine.balanceOf.call('0xfe3b557e8fb62b89f4916b721be55ceb828dbd73');
//return tontine.balanceOf.call('0xfe3b557e8fb62b89f4916b721be55ceb828dbd73')
//console.log(Balance)
})*/
/*
    .then(balance => {
      console.log(balance);
    })*/});


});

