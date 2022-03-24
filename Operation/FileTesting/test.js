const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const encryptedPK = cryptr.encrypt("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
console.log(encryptedPK);

//  web3.eth.accounts.wallet.add(decryptedPK);
