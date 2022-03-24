var User = require('../models/Users');
var Notifications = require('../models/Notifications');
var MobileDetect = require('mobile-detect');
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const Contract = require('../contract');
var PretContract = new web3.eth.Contract(Contract.Abi, Contract.address);
var TestContract = new web3.eth.Contract(Contract.AbiTest, Contract.addressTest);
var mySCIMFT = new web3.eth.Contract(Contract.AbiImft, Contract.addressImft);
const ethTx = require('ethereumjs-tx');

const IMFTowner = '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73';
function getTime() {
  return Date.now();
}
function getType(md) {
  if (md.mobile() == null) {
    return 'Web';
  } else return 'Mobile';
}
function getAmount(amount) {
  return amount;
}
const getSex = async (id) => {
  return new Promise(async (resolve) => {
    var data = '';

    await User.find({
      wallet: id,
    }).then((res) => {
      data = res[0].Sex;
    });

    resolve(data);
  });
};
const getProfession = async (id) => {
  return new Promise(async (resolve) => {
    var data = '';

    await User.find({
      wallet: id,
    }).then((res) => {
      data = res[0].Profession;
    });

    resolve(data);
  });
};
const getAge = async (id) => {
  return new Promise(async (resolve) => {
    var data = '';

    await User.find({
      wallet: id,
    }).then((res) => {
      data = res[0].Age;
    });

    resolve(data);
  });
};
const getAgence = async (id) => {
  return new Promise(async (resolve) => {
    var data = '';

    await User.find({
      wallet: id,
    }).then((res) => {
      data = res[0].Agence;
    });

    resolve(data);
  });
};
/////////////////////////////

function getAmountAgent(amount) {
  return amount;
}
const getSexAgent = async (id) => {
  return new Promise(async (resolve) => {
    var data = '';

    await Agent.find({
      wallet: id,
    }).then((res) => {
      data = res[0].Sex;
    });

    resolve(data);
  });
};
const getProfessionAgent = async (id) => {
  return new Promise(async (resolve) => {
    var data = '';

    await Agent.find({
      wallet: id,
    }).then((res) => {
      data = res[0].Profession;
    });

    resolve(data);
  });
};
const getAgeAgent = async (id) => {
  return new Promise(async (resolve) => {
    var data = '';

    await Agent.find({
      wallet: id,
    }).then((res) => {
      data = res[0].Age;
    });

    resolve(data);
  });
};
const getAgenceAgent = async (id) => {
  return new Promise(async (resolve) => {
    var data = '';

    await Agent.find({
      wallet: id,
    }).then((res) => {
      data = res[0].Agence;
    });

    resolve(data);
  });
};
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

addEcheance = async (borrower, privteKey, montant, DateLimite, DateLancement, date_Actuel) => {
  //  await timeout(6000);
  console.log(montant);
  web3.transactionConfirmationBlocks = 1;

  const addressFrom = borrower;
  //  var   = str.substring(1, 4);
  const privKey = Buffer.from(privteKey.substring(2, privteKey.length), 'hex');

  const res = PretContract.methods.addEcheance(
    montant,
    DateLimite,
    DateLancement,
    borrower,
    date_Actuel
  );

  web3.eth
    .getTransactionCount(addressFrom, 'pending')
    .then(async (txnCount) => {
      // Create the transaction object
      var txObject = {
        nonce: web3.utils.numberToHex(txnCount),
        gasPrice: web3.utils.numberToHex(10000),
        gasLimit: web3.utils.numberToHex(1261650),
        to: Contract.address,
        data: res.encodeABI(),
        //value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether'))
      };
      console.log({
        montant,
        DateLimite,
        DateLancement,
        borrower,
        date_Actuel,
      });
      // Sign the transaction with the private key
      var tx = new ethTx(txObject);
      tx.sign(privKey);

      //Convert to raw transaction string
      var serializedTx = tx.serialize();
      var rawTxHex = '0x' + serializedTx.toString('hex');

      // log raw transaction data to the console so you can send it manually
      console.log('Raw transaction data: ' + rawTxHex);
      web3.eth
        .sendSignedTransaction(rawTxHex)
        .on('receipt', (receipt) => {
          console.log('Receipt2: ', montant, receipt);
        })
        .catch((error) => {
          console.log('Error: ', error.message);
        });
      // but also ask you if you want to send this transaction directly using web3
    })
    .catch((error) => {
      console.log('Error: ', error.message);
    });
};

const addEcheances = async (
  montant,
  DateLimite,
  DateLancement,
  borrower,
  date_Actuel,
  privteKey
) => {
  return new Promise((resolve) => {
    console.log(montant);
    web3.transactionConfirmationBlocks = 1;

    const addressFrom = borrower;
    //  var   = str.substring(1, 4);
    const privKey = Buffer.from(privteKey.substring(2, privteKey.length), 'hex');

    const res = PretContract.methods.addEcheance(
      montant,
      DateLimite,
      DateLancement,
      borrower,
      date_Actuel
    );

    web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(async (txnCount) => {
        // Create the transaction object
        var txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          gasPrice: web3.utils.numberToHex(10000),
          gasLimit: web3.utils.numberToHex(1261650),
          to: Contract.address,
          data: res.encodeABI(),
          //value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether'))
        };
        console.log({
          montant,
          DateLimite,
          DateLancement,
          borrower,
          date_Actuel,
        });
        // Sign the transaction with the private key
        var tx = new ethTx(txObject);
        tx.sign(privKey);

        //Convert to raw transaction string
        var serializedTx = tx.serialize();
        var rawTxHex = '0x' + serializedTx.toString('hex');

        // log raw transaction data to the console so you can send it manually
        console.log('Raw transaction data: ' + rawTxHex);
        web3.eth
          .sendSignedTransaction(rawTxHex)
          .on('receipt', (receipt) => {
            resolve({
              result: 'done',
            });
            console.log('Receipt2: ', montant, receipt);
          })
          .catch((error) => {
            console.log('Error: ', error.message);
          });
        // but also ask you if you want to send this transaction directly using web3
      })
      .catch((error) => {
        console.log('Error: ', error.message);
      });
  });
};

addPret = async (borrower, privteKey, echeance_length, date_Actuel, echeance) => {
  return new Promise(async (resolve) => {
    web3.transactionConfirmationBlocks = 1;

    const addressFrom = borrower;
    //var res = str.substring(1, 4);
    const privKey = Buffer.from(privteKey.substring(2, privteKey.length), 'hex');

    const res = PretContract.methods.addPret(borrower, echeance_length, date_Actuel);

    await web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then((txnCount) => {
        // Create the transaction object
        var txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          gasPrice: web3.utils.numberToHex(10000),
          gasLimit: web3.utils.numberToHex(1261650),
          to: Contract.address,
          data: res.encodeABI(),
          //value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether'))
        };
        console.log(txObject);
        // Sign the transaction with the private key
        var tx = new ethTx(txObject);
        tx.sign(privKey);

        //Convert to raw transaction string
        var serializedTx = tx.serialize();
        var rawTxHex = '0x' + serializedTx.toString('hex');

        // log raw transaction data to the console so you can send it manually
        console.log('Raw transaction data: ' + rawTxHex);
        web3.eth
          .sendSignedTransaction(rawTxHex)
          .on('receipt', async (receipt) => {
            console.log('Receipt: ', receipt);
          })
          .then(async () => {
            //await timeout(6000)
            for (let i = 0; i < echeance.length; i++) {
              await addEcheances(
                echeance[i].montant,
                echeance[i].DateLimite,
                echeance[i].DateLancement,
                borrower,
                date_Actuel,
                privteKey
              );
            }
            resolve('done');
          })
          .catch((error) => {
            console.log('Error: ', error.message);
          });
        // but also ask you if you want to send this transaction directly using web3
      })
      .catch((error) => {
        console.log('Error: ', error.message);
      });
  });
};
const Cryptr = require('cryptr');
const Echeance = require('../models/Echeance');
const cryptr = new Cryptr('myTotalySecretKey');

exports.BalanceOf = (req, res) => {
  mySCIMFT.methods
    .balanceOf(req.query.owner)
    .call(function (error, result) {
      res.send({ balance: result });
    })
    .catch((e) => console.log(e));
};

exports.AddPret = async (req, res) => {
  let echeances = [];
  const decryptedPK = cryptr.decrypt(req.body.privateKey);
  console.log(decryptedPK);
  web3.eth.accounts.wallet.add(decryptedPK);
  const date_Actuel = new Date();
  const echeance = req.body.echeance;
  console.log(date_Actuel.getTime());
  await addPret(req.body.borrower, decryptedPK, echeance.length, date_Actuel.getTime(), echeance);

  await timeout(10000);
  console.log('helloooooooooooooooo');
  await PretContract.methods
    .getPretLengthByBorrower(req.body.borrower)
    .call(async function (error, result) {
      for (let i = 0; i < result; i++) {
        let echeances1 = await getPretInfoByIndex(req.body.borrower, i, 2);
        for (let k = 0; k < echeances1.length; k++) {
          echeances.push(echeances1[k]);
        }
      }

      res.send(echeances);
      // res.send({ nombrePret: result, Pret });
    })
    .catch((e) => console.log(e));

  // PretContract.methods
  //   .addPret(req.body.borrower, echeance.length, date_Actuel.getTime())
  //   .send({ from: req.body.borrower, gas: 3000000 }, async function (error, result) {
  //     console.log("erey")
  //     console.log(error)
  //     if (error == null) {
  //       console.log("eget")

  //       console.log(echeance.length);
  /*  for (let i = 0; i < echeance.length; i++) {
          await addEcheance(
            req.body.borrower,
            decryptedPK,
            echeance[i].montant,
            echeance[i].DateLimite,
            echeance[i].DateLancement,
            date_Actuel.getTime()
          );
      
          //         await PretContract.methods
      
          //         console.log("outfunction")
          //       }
          //       console.log("outfor")
        }*/
  //     res.send(result)
  //   })
  //   .catch((e) => console.log(e));
};

exports.AddE = async (req, res) => {
  const decryptedPK = cryptr.decrypt(req.body.privateKey);

  web3.eth.accounts.wallet.add(decryptedPK);

  await PretContract.methods
    .addEcheance(
      req.body.montant,
      req.body.DateLimite,
      req.body.DateLancement,
      req.body.borrower,
      1
    )
    .send({ from: req.body.borrower, gas: 30000000 }, function (error, result2) {
      console.log({ result2 });
      console.log('hello');
    })
    .catch((e) => console.log(e));
};

exports.getNotificationEcheances = async (req, res) => {
  let echeances = [];

  await PretContract.methods
    .getPretLengthByBorrower(req.query.borrower)
    .call(async function (error, result) {
      for (let i = 0; i < result; i++) {
        let echeances1 = await getPretInfoByIndex(req.query.borrower, i, 2);
        for (let k = 0; k < echeances1.length; k++) {
          echeances.push(echeances1[k]);
        }
      }

      res.send(echeances);
      // res.send({ nombrePret: result, Pret });
    })
    .catch((e) => console.log(e));
};

const getEcheanceInfoByIndex2DB = async (idPret, j, borrower) => {
  return new Promise(async (resolve) => {
    await PretContract.methods
      .getEcheanceInfoByIndex(idPret, j, borrower)
      .call(async function (error, result4) {
        await Notifications.findOne({ idEcheance: result4['0'] }, function (err, Notification) {
          console.log({ Notification, borrower });
          const date = new Date().getTime();
          if (Notification === null) {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
            var Notif = new Notifications({
              idPret,
              idEcheance: result4['0'],
              TypeNotification: 'Echeance',
              DateNotif: date,
              montant: result4['1'],
              borrower: borrower,
              dateLimite: result4['2'],
              intermediate: result4['3'],
              DateLancement: result4['4'],
              status: result4['5'],
              elimine: false,
              vu: false,
            });

            Notif.save(function (err, NotifE) {
              if (err) {
                console.log('error');
                console.log(err);
                //                    res.status(804).end();
                return console.error(err);
              }
              console.log('saved to db');

              //                  console.log(NotifE);

              resolve({
                idPret,
                idEcheance: result4['0'],
                montant: result4['1'],
                borrower: borrower,
                dateLimite: result4['2'],
                intermediate: result4['3'],
                DateLancement: result4['4'],
                status: result4['5'],
                elimine: false,
                vu: false,
              });
            });
          } else {
            const notif = Notification;
            notif.status = result4['5'];
            resolve(notif); //deja creé:m
          }
        });
      });
  });
};

const getEcheanceInfoByIndex2 = async (length, idPret, borrower) => {
  return new Promise(async (resolve) => {
    let NotificationsEcheances = [];
    //console.log({length})
    for (let j = 0; j < length; j++) {
      NotificationsEcheances.push(await getEcheanceInfoByIndex2DB(idPret, j, borrower));
    }

    //    console.log({length, NotificationsEcheances,borrower})
    resolve(NotificationsEcheances);
    console.log('coucou');
    console.log(NotificationsEcheances);
  });
};

exports.getAllEcheances = async (req, res) => {
  let echeances = [];

  await PretContract.methods
    .getPretLengthByBorrower(req.query.borrower)
    .call(async function (error, result) {
      for (let i = 0; i < result; i++) {
        let echeances1 = await getPretInfoByIndex(req.query.borrower, i, 1);
        for (let k = 0; k < echeances1.length; k++) {
          echeances.push(echeances1[k]);
        }
      }

      res.send(echeances);
      // res.send({ nombrePret: result, Pret });
    })
    .catch((e) => console.log(e));
};

const getEcheanceInfoByIndex = async (length, idPret, borrower) => {
  return new Promise(async (resolve) => {
    let echeance = [];
    for (let j = 0; j < length; j++) {
      await PretContract.methods
        .getEcheanceInfoByIndex(idPret, j, borrower)
        .call(async function (error, result4) {
          echeance.push({
            idPret,
            idEcheance: result4['0'],
            montant: result4['1'],
            dateLimite: result4['2'],
            intermediere: result4['3'],
            DateLancement: result4['4'],
            status: result4['5'],
          });
        });
      console.log('feeozjr');
      //console.log(result4)
      console.log(echeance);
    }

    resolve(echeance);
  });
};
const getEcheanceLengthByPret = async (idPret, borrower, type) => {
  return new Promise((resolve) => {
    PretContract.methods
      .getEcheanceLengthByPret(borrower, idPret)
      .call(async function (error, result3) {
        if (type === 1) {
          resolve(await getEcheanceInfoByIndex(result3, idPret, borrower));
        } else resolve(await getEcheanceInfoByIndex2(result3, idPret, borrower));
        //res.send(echeance)

        //  res.send({ nombreEcheance: result, echeance });
      });
  });
};
const getPretInfoByIndex = (borrower, i, type) => {
  return new Promise(async (resolve) => {
    await PretContract.methods
      .getPretInfoByIndex(i, borrower)
      .call(async function (error, result2) {
        // console.log({ idPret: result2["0"] })
        //console.log(result2)
        //  Pret.push(result2);
        //const a = await  getEcheanceLengthByPret(result2["0"], borrower)
        //console.log({a:a.echeance})
        let echeances = await getEcheanceLengthByPret(result2['0'], borrower, type);

        resolve(echeances);

        //echeances.push(a.echeance)
      })
      .catch((e) => console.log(e));
  });
};

const getPretLengthByBorrower = (borrower, intermediere) => {
  return new Promise(async (resolve) => {
    let echeances = [];

    await PretContract.methods
      .getPretLengthByBorrower(borrower)
      .call(async function (error, result) {
        for (let i = 0; i < result; i++) {
          let echeances1 = await getPretInfoByIndex(borrower, i, 1);
          for (let k = 0; k < echeances1.length; k++) {
            if (echeances1[k].intermediere === intermediere) {
              echeances.push(echeances1[k]);
            }
          }
        }
        //  console.log(echeances);
        resolve(echeances);
        // res.send({ nombrePret: result, Pret });
      })
      .catch((e) => console.log(e));
  });
};

exports.getAllEcheancesForAgent = async (req, res) => {
  let echeances = [];
  User.find({}, async function (err, users) {
    for (let p = 0; p < users.length; p += 1) {
      const a = await getPretLengthByBorrower(users[p].wallet, req.query.intermediere);
      if (a.length !== 0) {
        echeances.push({
          echeanceData: await getPretLengthByBorrower(users[p].wallet, req.query.intermediere),
          user: users[p],
        });
      }
      console.log('echeancesAdherent');
      console.log(echeances);
    }
    console.log('echeances');
    console.log(echeances);
    res.send(echeances);
  });
};

exports.setValue = (req, res) => {
  const decryptedPK = cryptr.decrypt(req.body.privateKey);

  web3.eth.accounts.wallet.add(decryptedPK);
  TestContract.methods
    .set(req.body.value)
    .send({ from: req.body.borrower, gas: 3000000 }, async function (error, result) {
      res.send(result);
    });
};

exports.getValue = (req, res) => {
  TestContract.methods.get().call(async function (error, result) {
    res.send(result);
  });
};

/*
exports.getPret = async (req, res) => {
    const Pret = [];
    await PretContract.methods
      .getPretLengthByBorrower(req.query.borrower)
      .call(async function (error, result) {
        for (let i = 0; i < result; i++) {
          await PretContract.methods
            .getPretInfoByIndex(i, req.query.borrower)
            .call(function (error, result2) {
              Pret.push(result2);
            })
            .catch((e) => console.log(e));
        }
       // res.send({ nombrePret: result, Pret });
      })
      .catch((e) => console.log(e));
  };
  
  exports.getEcheance = async (req, res) => {
    const echeance = [];
    await PretContract.methods
      .getEcheanceLengthByPret(req.query.borrower, req.query.idPret)
      .call(async function (error, result) {
        console.log(result);
        console.log(result["0"]);
        for (let i = 0; i < result; i++) {
          console.log("fhklm");
          await       PretContract.methods
                    .getEcheanceInfoByIndex(req.query.idPret,i, req.query.borrower)
                    .call(async function (error, result2) {
                console.log(error)
                      console.log(result2)
                      echeance.push(result2);
                    })
                    .catch((e) => console.log(e));
                }
          //res.send(echeance)
       
        res.send({ nombreEcheance: result, echeance });
      })
      .catch((e) => console.log(e));
  };
*/

exports.PayerEcheance = async (req, res) => {
  const decryptedPK = cryptr.decrypt(req.body.privateKey);

  web3.eth.accounts.wallet.add(decryptedPK);

  await PretContract.methods
    .payerEcheance(req.body.idPret, req.body.borrower, req.body.idEcheance)
    .send({ from: req.body.borrower, gas: 3000000 }, async function (error, result) {
      Notifications.updateOne(
        { idEcheance: req.body.idEcheance },
        { elimine: true, status: true },
        function (err, notification) {
          if (err) {
            res.json('error');
          } else {
            console.log(notification);
          }
        }
      );

      res.send(result);
      //Send Data

      const Sex = await getSex(req.body.borrower);
      const Profession = await getProfession(req.body.borrower);
      const Age = await getAge(req.body.borrower);
      const Agence = await getAgence(req.body.borrower);
      const Amount = req.body.amount;

      var transferData = {
        Time: getTime(),
        Type: getType(new MobileDetect(req.headers['user-agent'])),
        Amount: Amount,
        Sex: Sex,
        Age: Age,
        Profession: Profession,
        Agence: Agence,
      };
      console.log({ transferData, am: req.body.amount });
      var echeance = new Echeance(transferData);
      echeance.save((err, res) => {
        console.log({ res, err });
      });
    })
    .catch((e) => console.log(e));
};

exports.PayerEcheanceIntermadiate = async (req, res) => {
  const decryptedPK = cryptr.decrypt(req.body.privateKey);

  web3.eth.accounts.wallet.add(decryptedPK);

  await PretContract.methods
    .PayerEcheanceIntermadiate(req.body.idPret, req.body.borrower, req.body.idEcheance)
    .send({ from: req.body.agent, gas: 3000000 }, async function (error, result) {
      Notifications.updateOne(
        { idEcheance: req.body.idEcheance },
        { elimine: true, status: true, intermediate: req.body.agent },
        function (err, notification) {
          if (err) {
            res.json('error');
          } else {
            console.log(notification);
          }
        }
      );
      res.send(result);
      //Send Data

      const Sex = await getSexAgent(req.body.borrower);
      const Profession = await getProfessionAgent(req.body.borrower);
      const Age = await getAgeAgent(req.body.borrower);
      const Agence = await getAgenceAgent(req.body.borrower);
      const Amount = req.body.amount;

      var transferData = {
        Time: getTime(),
        Type: getType(new MobileDetect(req.headers['user-agent'])),
        Amount: Amount,
        Sex: Sex,
        Age: Age,
        Profession: Profession,
        Agence: Agence,
      };
      var echeance = new Echeance(transferData);
      echeance.save((err, res) => {
        console.log(res);
      });
    })
    .catch((e) => console.log(e));
};

exports.elimineNotification = function (req, res) {
  Notifications.updateOne({ idEcheance: req.body.idEcheance }, { elimine: true }, function (
    err,
    notification
  ) {
    if (err) {
      res.json('error');
    } else {
      res.send(notification);
      console.log(notification);
    }
  });
};
