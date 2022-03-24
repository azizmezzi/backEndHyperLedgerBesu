/* eslint-disable no-async-promise-executor */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
const Web3 = require('web3');
const Cryptr = require('cryptr');
// const MobileDetect = require('mobile-detect');
const EthTx = require('ethereumjs-tx');

const User = require('../models/Users');
const Notifications = require('../models/Notifications');

const Contract = require('../contract');
// const Echeance = require('../models/Echeance');

const cryptr = new Cryptr('myTotalySecretKey');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const PretContract = new web3.eth.Contract(Contract.Abi, Contract.address);
const mySCIMFT = new web3.eth.Contract(Contract.AbiImft, Contract.addressImft);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// const addEcheance = async (
//   borrower,
//   privteKey,
//   montant,
//   DateLimite,
//   DateLancement,
//   dateActuel
// ) => {
//   //  await timeout(6000);
//   console.log(montant);
//   web3.transactionConfirmationBlocks = 1;

//   const addressFrom = borrower;
//   //  var   = str.substring(1, 4);
//   const privKey = Buffer.from(privteKey.substring(2, privteKey.length), 'hex');

//   const res = PretContract.methods.addEcheance(
//     montant,
//     DateLimite,
//     DateLancement,
//     borrower,
//     dateActuel
//   );

//   web3.eth
//     .getTransactionCount(addressFrom, 'pending')
//     .then(async (txnCount) => {
//       // Create the transaction object
//       const txObject = {
//         nonce: web3.utils.numberToHex(txnCount),
//         gasPrice: web3.utils.numberToHex(10000),
//         gasLimit: web3.utils.numberToHex(1261650),
//         to: Contract.address,
//         data: res.encodeABI(),
//         // value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether'))
//       };
//       console.log({
//         montant,
//         DateLimite,
//         DateLancement,
//         borrower,
//         dateActuel,
//       });
//       // Sign the transaction with the private key
//       const tx = new ethTx(txObject);
//       tx.sign(privKey);

//       // Convert to raw transaction string
//       const serializedTx = tx.serialize();
//       const rawTxHex = `0x${serializedTx.toString('hex')}`;

//       // log raw transaction data to the console so you can send it manually
//       console.log(`Raw transaction data: ${rawTxHex}`);
//       web3.eth
//         .sendSignedTransaction(rawTxHex)
//         .on('receipt', (receipt) => {
//           console.log('Receipt2: ', montant, receipt);
//         })
//         .catch((error) => {
//           console.log('Error: ', error.message);
//         });
//       // but also ask you if you want to send this transaction directly using web3
//     })
//     .catch((error) => {
//       console.log('Error: ', error.message);
//     });
// };

const addEcheances = async (montant, DateLimite, DateLancement, borrower, dateActuel, privteKey) =>
  new Promise((resolve) => {
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
      dateActuel
    );

    web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(async (txnCount) => {
        // Create the transaction object
        const txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          gasPrice: web3.utils.numberToHex(10000),
          gasLimit: web3.utils.numberToHex(1261650),
          to: Contract.address,
          data: res.encodeABI(),
          // value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether'))
        };
        console.log({
          montant,
          DateLimite,
          DateLancement,
          borrower,
          dateActuel,
        });
        // Sign the transaction with the private key
        const tx = new EthTx(txObject);
        tx.sign(privKey);

        // Convert to raw transaction string
        const serializedTx = tx.serialize();
        const rawTxHex = `0x${serializedTx.toString('hex')}`;

        // log raw transaction data to the console so you can send it manually
        console.log(`Raw transaction data: ${rawTxHex}`);
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

const addPret = async (borrower, privteKey, echeancelength, dateActuel, echeance) =>
  new Promise(async (resolve) => {
    web3.transactionConfirmationBlocks = 1;

    const addressFrom = borrower;
    // var res = str.substring(1, 4);
    const privKey = Buffer.from(privteKey.substring(2, privteKey.length), 'hex');

    const res = PretContract.methods.addPret(borrower, echeancelength, dateActuel);

    await web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then((txnCount) => {
        // Create the transaction object
        const txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          gasPrice: web3.utils.numberToHex(10000),
          gasLimit: web3.utils.numberToHex(1261650),
          to: Contract.address,
          data: res.encodeABI(),
          // value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether'))
        };
        console.log(txObject);
        // Sign the transaction with the private key
        const tx = new EthTx(txObject);
        tx.sign(privKey);

        // Convert to raw transaction string
        const serializedTx = tx.serialize();
        const rawTxHex = `0x${serializedTx.toString('hex')}`;

        // log raw transaction data to the console so you can send it manually
        console.log(`Raw transaction data: ${rawTxHex}`);
        web3.eth
          .sendSignedTransaction(rawTxHex)
          .on('receipt', async (receipt) => {
            console.log('Receipt: ', receipt);
          })
          .then(async () => {
            // await timeout(6000)
            for (let i = 0; i < echeance.length; i += 1) {
              // eslint-disable-next-line no-await-in-loop
              await addEcheances(
                echeance[i].montant,
                echeance[i].DateLimite,
                echeance[i].DateLancement,
                borrower,
                dateActuel,
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
// exports.AddE = async (req, res) => {
//   const decryptedPK = cryptr.decrypt(req.body.privateKey);

//   web3.eth.accounts.wallet.add(decryptedPK);

//   await PretContract.methods
//     .addEcheance(
//       req.body.montant,
//       req.body.DateLimite,
//       req.body.DateLancement,
//       req.body.borrower,
//       1
//     )
//     .send({ from: req.body.borrower, gas: 30000000 }, (error, result2) => {
//       console.log({ result2 });
//       console.log('hello');
//     })
//     .catch((e) => console.log(e));
// };

const getEcheanceInfoByIndex2DB = async (idPret, j, borrower) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    await PretContract.methods
      .getEcheanceInfoByIndex(idPret, j, borrower)
      .call(async (error, result4) => {
        await Notifications.findOne({ idEcheance: result4['0'] }, (err, Notification) => {
          console.log({ Notification, borrower });
          const date = new Date().getTime();
          if (Notification === null) {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
            const Notif = new Notifications({
              idPret,
              idEcheance: result4['0'],
              TypeNotification: 'Echeance',
              DateNotif: date,
              montant: result4['1'],
              borrower,
              dateLimite: result4['2'],
              intermediate: result4['3'],
              DateLancement: result4['4'],
              status: result4['5'],
              elimine: false,
              vu: false,
            });

            Notif.save((errN, NotifE) => {
              if (err) {
                console.log('error');
                console.log(errN);
                //                    res.status(804).end();
                return console.error(errN);
              }
              console.log('saved to db');
              return NotifE;

              //                  console.log(NotifE);
            });
            resolve({
              idPret,
              idEcheance: result4['0'],
              montant: result4['1'],
              borrower,
              dateLimite: result4['2'],
              intermediate: result4['3'],
              DateLancement: result4['4'],
              status: result4['5'],
              elimine: false,
              vu: false,
            });
          } else {
            const notif = Notification;
            notif.status = result4['5'];
            resolve(notif); // deja creé:m
          }
        });
      });
  });

const getEcheanceInfoByIndex2 = async (length, idPret, borrower) =>
  new Promise(async (resolve) => {
    const NotificationsEcheances = [];
    // console.log({length})
    for (let j = 0; j < length; j += 1) {
      NotificationsEcheances.push(getEcheanceInfoByIndex2DB(idPret, j, borrower));
    }

    //    console.log({length, NotificationsEcheances,borrower})
    const NotificationsEcheancesResolved = await Promise.all(NotificationsEcheances);
    resolve(NotificationsEcheancesResolved);
    console.log('coucou');
    console.log(NotificationsEcheancesResolved);
  });

const getEcheanceInfoByIndex = async (length, idPret, borrower) =>
  new Promise(async (resolve) => {
    const echeance = [];
    const EchResolve = [];
    for (let j = 0; j < length; j += 1) {
      EchResolve.push(
        PretContract.methods
          .getEcheanceInfoByIndex(idPret, j, borrower)
          .call(async (error, result4) => {
            echeance.push({
              idPret,
              idEcheance: result4['0'],
              montant: result4['1'],
              dateLimite: result4['2'],
              intermediere: result4['3'],
              DateLancement: result4['4'],
              status: result4['5'],
            });
          })
      );
      console.log('feeozjr');
      // console.log(result4)
      console.log(echeance);
    }
    await Promise.all(EchResolve);
    resolve(echeance);
  });
const getEcheanceLengthByPret = async (idPret, borrower, type) =>
  new Promise((resolve) => {
    PretContract.methods.getEcheanceLengthByPret(borrower, idPret).call(async (error, result3) => {
      if (type === 1) {
        resolve(await getEcheanceInfoByIndex(result3, idPret, borrower));
      } else resolve(await getEcheanceInfoByIndex2(result3, idPret, borrower));
      // res.send(echeance)

      //  res.send({ nombreEcheance: result, echeance });
    });
  });
const getPretInfoByIndex = (borrower, i, type) =>
  new Promise(async (resolve) => {
    await PretContract.methods
      .getPretInfoByIndex(i, borrower)
      .call(async (error, result2) => {
        // console.log({ idPret: result2["0"] })
        // console.log(result2)
        //  Pret.push(result2);
        // const a = await  getEcheanceLengthByPret(result2["0"], borrower)
        // console.log({a:a.echeance})
        const echeances = await getEcheanceLengthByPret(result2['0'], borrower, type);

        resolve(echeances);

        // echeances.push(a.echeance)
      })
      .catch((e) => console.log(e));
  });

const getPretLengthByBorrower = (borrower, intermediere) =>
  new Promise(async (resolve) => {
    const echeances = [];

    await PretContract.methods
      .getPretLengthByBorrower(borrower)
      .call(async (error, result) => {
        const results = [];
        for (let i = 0; i < result; i += 1) {
          results.push(getPretInfoByIndex(borrower, i, 2));
        }
        const resultecheances = await Promise.all(results);
        for (let j = 0; j < resultecheances.length; j += 1) {
          for (let k = 0; k < resultecheances[j].length; k += 1) {
            if (resultecheances[j][k].intermediere === intermediere) {
              echeances.push(resultecheances[j][k]);
            }
          }
        }
        resolve(echeances);
        // res.send({ nombrePret: result, Pret });
      })
      .catch((e) => console.log(e));
  });

exports.BalanceOf = (req, res) => {
  mySCIMFT.methods
    .balanceOf(req.query.owner)
    .call((error, result) => {
      res.send({ balance: result });
    })
    .catch((e) => console.log(e));
};

exports.getAllEcheances = async (req, res) => {
  const echeances = [];

  await PretContract.methods
    .getPretLengthByBorrower(req.query.borrower)
    .call(async (error, result) => {
      const results = [];
      for (let i = 0; i < result; i += 1) {
        results.push(getPretInfoByIndex(req.query.borrower, i, 1));
      }
      const resultecheances = await Promise.all(results);
      for (let j = 0; j < resultecheances.length; j += 1) {
        for (let k = 0; k < resultecheances[j].length; k += 1) {
          echeances.push(resultecheances[j][k]);
        }
      }
      res.send(echeances);
      // res.send({ nombrePret: result, Pret });
    })
    .catch((e) => console.log(e));
};

exports.getAllEcheancesForAgent = async (req, res) => {
  const echeances = [];
  User.find({}, async (err, users) => {
    for (let p = 0; p < users.length; p += 1) {
      // eslint-disable-next-line no-await-in-loop
      const a = await getPretLengthByBorrower(users[p].wallet, req.query.intermediere);
      if (a.length !== 0) {
        echeances.push({
          // eslint-disable-next-line no-await-in-loop
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

exports.AddPret = async (req, res) => {
  // const echeances = [];
  const decryptedPK = cryptr.decrypt(req.body.privateKey);
  console.log(decryptedPK);
  web3.eth.accounts.wallet.add(decryptedPK);
  const dateActuel = new Date();
  const { echeance } = req.body;
  console.log(dateActuel.getTime());
  await addPret(req.body.borrower, decryptedPK, echeance.length, dateActuel.getTime(), echeance);

  await timeout(10000);
  console.log('helloooooooooooooooo');
  await PretContract.methods
    .getPretLengthByBorrower(req.body.borrower)
    .call(async (error, result) => {
      const promises = [];
      for (let i = 0; i < result; i += 1) {
        promises.push(getPretInfoByIndex(req.body.borrower, i, 2));
        // for (let k = 0; k < echeances1.length; k += 1) {
        //   echeances.push(echeances1[k]);
        // }
      }

      res.send(await Promise.all(promises));
      // res.send({ nombrePret: result, Pret });
    })
    .catch((e) => console.log(e));
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
    .send({ from: req.body.borrower, gas: 3000000 }, async (error, result) => {
      Notifications.updateOne(
        { idEcheance: req.body.idEcheance },
        { elimine: true, status: true },
        (err, notification) => {
          if (err) {
            res.json('error');
          } else {
            console.log(notification);
          }
        }
      );

      res.send(result);
      // Send Data
    })
    .catch((e) => console.log(e));
};

exports.PayerEcheanceIntermadiate = async (req, res) => {
  const decryptedPK = cryptr.decrypt(req.body.privateKey);

  web3.eth.accounts.wallet.add(decryptedPK);

  await PretContract.methods
    .PayerEcheanceIntermadiate(req.body.idPret, req.body.borrower, req.body.idEcheance)
    .send({ from: req.body.agent, gas: 3000000 }, async (error, result) => {
      Notifications.updateOne(
        { idEcheance: req.body.idEcheance },
        { elimine: true, status: true, intermediate: req.body.agent },
        (err, notification) => {
          if (err) {
            res.json('error');
          } else {
            console.log(notification);
          }
        }
      );
      res.send(result);
      // Send Data
    })
    .catch((e) => console.log(e));
};

exports.elimineNotification = (req, res) => {
  Notifications.updateOne(
    { idEcheance: req.body.idEcheance },
    { elimine: true },
    (err, notification) => {
      if (err) {
        res.json('error');
      } else {
        res.send(notification);
        console.log(notification);
      }
    }
  );
};

exports.getNotificationEcheances = async (req, res) => {
  const echeances = [];

  await PretContract.methods
    .getPretLengthByBorrower(req.query.borrower)
    .call(async (error, result) => {
      const results = [];
      for (let i = 0; i < result; i += 1) {
        results.push(getPretInfoByIndex(req.query.borrower, i, 2));
      }
      const resultecheances = await Promise.all(results);
      for (let j = 0; j < resultecheances.length; j += 1) {
        for (let k = 0; k < resultecheances[j].length; k += 1) {
          echeances.push(resultecheances[j][k]);
        }
      }
      res.send(echeances);
      // res.send({ nombrePret: result, Pret });
    })
    .catch((e) => console.log(e));
};

