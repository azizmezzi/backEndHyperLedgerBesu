	const tontine_Cercle = artifacts.require("tontine_Cercle");
const IMFToken = artifacts.require("IMFToken");

/*
contract("tontine_Cercle",function(accounts) {
let tontine;

it("should create tontine", function() {
return tontine_Cercle.deployed().then(function(instance){
meta = instance;
 meta.addTontine("2", "2", 3,12, 3, "3", 3,{from:accounts[0]});

})

})

it ("should take 3 from account[0]", function() {
return 

})

})
*/
/*
contract("tontine_Cercle", function (accounts) {

it("should add new token",function() {
return tontine_Cercle.deployed().then(function(instance){
return instance.addNewToken(IMFToken.address,{from : accounts[0]})
})
})
/*
  it("should call a function that depends on a linked library", () => {
let tontine;
let balance
return tontine_Cercle.deployed()
 .then( instance =>{
tontine = instance;
//console.log(instance)
 const contract =  IMFToken.deployed().then(contrat=>{
const a = instance.addNewToken(IMFToken.address,{from : accounts[0]}).then(()=>{
console.log('done')
 function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function sleep() {
        await timeout(5000);
     //   return checker();
    }
sleep()
   const result = contrat.balanceOf.call(accounts[0]).then(res=>{
console.log(res);
balance = res
})
contrat.approve(tontine.address,10000,{from : accounts[0]})
.then( ()=>
{add =  tontine.addTontine("2", "2", 3,12, 3, "3", 3,{from:accounts[0]})
  const result = contrat.balanceOf.call(accounts[0]).then(res=>{
console.log('res',res);

sleep()
assert.equal(res, balance,'ok')
})})
})
//console.log(add)
//return tontine_Cercle.getTontine.call("1");
   /* .then(instanc => {
console.log(instanc)
      const tontine = tontine_Cercle.getTontine("1")
console.log(tontine)
 })
})})
})*/
/*  it("should put 10000 MetaCoin in the first account", () => {
    tontine_Cercle.addTontine("1", "1", 1, 1, 1, "1", 1)
    .then(() => {
      const tontine = tontine_Cercle.getTontine("1")
    })
  })*/
/*
//sleep()

});*/

contract("IMFToken", function (accounts) {
it("approve test", async() => {
    let token = await IMFToken.deployed();

    let approveResult = await token.approve.sendTransaction(accounts[1], 20, {from: accounts[0]});
//    assert.isTrue(approveResult);
  });
/*it("should approve tontine contract",function() {
return IMFToken.deployed().then(function(instance){
return result = instance.approve.sendTransaction(accounts[1],10000,{from : accounts[0]})
console.log(result)
})
})
*/

});

/*


contract("tontine_Cercle", function (accounts) {

it("should create tontine",function() {
let tontine;
return tontine_Cercle.deployed().then(function(instance){
tontine = instance;
 tontine.addTontine("test1", "aaaz", 1,2, 2, "Par mois", 1,{from:accounts[0]})
}).then(() => {
return tontine.getTontine.call("test1")

//console.log(tontine.getTontine.call("test1").valueOf())        
}).then(function (test){
console.log(test)
})
})
/*
it("should get tontine", function() {
return  tontine_Cercle.deployed().then(function (instance){
return instance.getTontine.call("test1")	
}).then(function (test){
console.log(test)
})
})*/
//});

