/* eslint-disable implicit-arrow-linebreak */
const MobileDetect = require('mobile-detect');
const schedule = require('node-schedule');
// eslint-disable-next-line import/no-extraneous-dependencies
const Web3 = require('web3');
const Cryptr = require('cryptr');
const EthTx = require('ethereumjs-tx');

const User = require('../models/Users');
const Notifications = require('../models/Notifications');
const tontineModel = require('../models/tontine');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const Contract = require('../contract');

const tontine = new web3.eth.Contract(Contract.Abi2, Contract.address2);

const cryptr = new Cryptr('myTotalySecretKey');

function getTime() {
  return Date.now();
}
function getType(md) {
  if (md.mobile() == null) {
    return 'Web';
  }
  return 'Mobile';
}

// const getSex = async (id) =>
//   new Promise(async (resolve) => {
//     let data = '';

//     await User.find({
//       wallet: id,
//     }).then((res) => {
//       data = res[0].Sex;
//     });

//     resolve(data);
//   });
// const getProfession = async (id) =>
//   new Promise(async (resolve) => {
//     let data = '';

//     await User.find({
//       wallet: id,
//     }).then((res) => {
//       data = res[0].Profession;
//     });

//     resolve(data);
//   });
// const getAge = async (id) =>
//   new Promise(async (resolve) => {
//     let data = '';

//     await User.find({
//       wallet: id,
//     }).then((res) => {
//       data = res[0].Age;
//     });

//     resolve(data);
//   });
// const getAgence = async (id) =>
//   new Promise(async (resolve) => {
//     let data = '';

//     await User.find({
//       wallet: id,
//     }).then((res) => {
//       data = res[0].Agence;
//     });

//     resolve(data);
//   });

/* ****************POST Function ********************************** */

const signTransaction = (addressTo1) => {
  web3.transactionConfirmationBlocks = 1;
  // Sender address and private key
  // Second acccount in dev.json genesis file
  // Exclude 0x at the beginning of the private key
  const addressFrom = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
  const privKey = Buffer.from(
    'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3',
    'hex'
  );

  // Receiver address and value to transfer
  // Third account in dev.json genesis file
  const addressTo = addressTo1;
  const valueInEther = 100;

  // Get the address transaction count in order to specify the correct nonce
  web3.eth
    .getTransactionCount(addressFrom, 'pending')
    .then((txnCount) => {
      // Create the transaction object
      const txObject = {
        nonce: web3.utils.numberToHex(txnCount),
        gasPrice: web3.utils.numberToHex(1000),
        gasLimit: web3.utils.numberToHex(21000),
        to: addressTo,
        value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether')),
      };

      // Sign the transaction with the private key
      const tx = new EthTx(txObject);
      tx.sign(privKey);

      // Convert to raw transaction string
      const serializedTx = tx.serialize();
      const rawTxHex = `0x${serializedTx.toString('hex')}`;

      // log raw transaction data to the console so you can send it manually
      // console.log("Raw transaction data: " + rawTxHex);

      // but also ask you if you want to send this transaction directly using web3
      web3.eth
        .sendSignedTransaction(rawTxHex)
        .on('receipt', (receipt) => {
          console.log('Receipt: ', receipt);
        })
        .catch((error) => {
          console.log('Error: ', error.message);
        });
    })
    .catch((error) => {
      console.log('Error: ', error.message);
    });
};

/** ***************** Fonction pour Tontine ********************************** */

const getTontineData = async (addressUser, IDTontine) =>
  new Promise((resolve) => {
    // console.log({ addressUser, ID_Tontine });
    tontine.methods.getLeng(IDTontine, addressUser).call(async (err, result) => {
      //  console.log(result);
      const GarantieLength = result['0'];
      const CotisationLength = result['1'];
      const DistributionLength = result['2'];
      const tontinesDataGarantie = [];
      const tontinesDataCotisation = [];
      const tontinesDataDistribution = [];

      for (let i = 0; i < parseInt(GarantieLength, 10); i++) {
        tontinesDataGarantie.push({
          Garantie: await getTontineDetails(addressUser, IDTontine, i, 1),
        });
      }
      for (let j = 0; j < parseInt(CotisationLength, 10); j++) {
        {
          tontinesDataCotisation.push({
            Cotisation: await getTontineDetails(addressUser, IDTontine, j, 2),
          });
        }
      }
      for (let k = 0; k < parseInt(DistributionLength, 10); k++) {
        {
          tontinesDataDistribution.push({
            Distribution: await getTontineDetails(addressUser, IDTontine, k, 3),
          });
        }
      }

      resolve({
        tontinesDataGarantie,
        tontinesDataCotisation,
        tontinesDataDistribution,
      });
    });
  });

const getTontineDetails = async (addressUser, ID_Tontine, indice, type) =>
  new Promise((resolve) => {
    switch (type) {
      case 1:
        tontine.methods
          .GetGarCotiDisByIndex(ID_Tontine, addressUser, indice, true, false, false)
          .call((err, result) => {
            resolve({
              ID_Tontine,
              result,
            });
          });
        break;
      case 2:
        tontine.methods
          .GetGarCotiDisByIndex(ID_Tontine, addressUser, indice, false, true, false)
          .call((err, result) => {
            resolve({
              ID_Tontine,
              result,
            });
          });
        break;

      default:
        tontine.methods
          .GetGarCotiDisByIndex(ID_Tontine, addressUser, indice, false, false, true)
          .call((err, result) => {
            resolve({
              ID_Tontine,
              result,
            });
          });
        break;
    }
  });

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scheduleTasks(
  req,
  cycle,
  IterParCycle,
  nbPar,
  ordre,
  account,
  encryptedPK,
  mondataires_address,
  ID_Tontine,
  nomTontine,
  montant
) {
  let lancement = true;

  while (lancement) {
    await timeout(60000);

    lancement1 = await lancementTontine(
      req,
      cycle,
      IterParCycle,
      nbPar,
      ordre,
      account,
      encryptedPK,
      mondataires_address,
      ID_Tontine,
      nomTontine,
      montant
    );
    console.log(
      '*************************************************************************************'
    );
    console.log('             ********************************************************');
    console.log('scheduleTasks Lancement ', ID_Tontine);
    console.log('lancement', lancement1.lancement);

    console.log(req.body);

    console.log('             ********************************************************');
    console.log(
      '*************************************************************************************'
    );

    lancement = lancement1.lancement;
  }
  return 'done';
}

const lancementTontine = async (
  req,
  cycle,
  IterParCycle,
  nbPar,
  ordre,
  account,
  encryptedPK,
  mondataires_address,
  ID_Tontine,
  nomTontine,
  montant
) =>
  new Promise((resolve) => {
    tontine.methods.getDateLancement(ID_Tontine).call(async (err, result) => {
      if (result['4'] == true) {
        const dateLancemet = new Date(result['0'] * 1000);
        let frequence = 60;
        let frequence2 = 30;
        if (result['2'] == 'Par semaine') {
          frequence = 6;
          frequence2 = 3;
        }
        notifRecharge(
          IterParCycle,
          result['0'],
          req.body.address,
          ID_Tontine,
          nomTontine,
          frequence,
          montant
        );

        scheduleVerifGar(
          nbPar,
          cycle,
          frequence2,
          IterParCycle,
          frequence,
          result['0'],
          ordre,
          req.body.address,
          account,
          ID_Tontine,
          req.body.privateKey,
          nomTontine,
          montant
        );
        notifCotisation(
          IterParCycle,
          result['0'],
          req.body.address,
          ID_Tontine,
          nomTontine,
          frequence,
          frequence2,
          montant
        );
        /*          scheduleVerif(
            //  result["3"],
            IterParCycle,
            frequence,
            result["0"],
            req.body.address,
            ID_Tontine,
            req.body.privateKey
          ); */
        scheduleDist(
          nbPar,
          cycle,
          IterParCycle,
          frequence,
          result['0'],
          ordre,
          req.body.address,
          ID_Tontine,
          account,
          encryptedPK,
          mondataires_address,
          nomTontine,
          montant
        );

        resolve({ lancement: false });
      } else {
        resolve({ lancement: true });
      }
    });
  });

function scheduleVerif(IterParCycle, frequence, date, address, ID_Tontine, privateKey) {
  for (let i = 1; i <= IterParCycle; i++) {
    const dateLancemet = new Date(date * 1000 + 60000 * i * frequence - 60000);
    console.log(
      '*************************************************************************************'
    );
    console.log('             ********************************************************');
    console.log('scheduleTasks Verification 1', ID_Tontine);
    console.log('verif', dateLancemet);
    console.log({
      hour: dateLancemet.getHours(),
      minute: dateLancemet.getMinutes(),
    });
    console.log('address', address);

    console.log('             ********************************************************');
    console.log(
      '*************************************************************************************'
    );

    const j = schedule.scheduleJob(
      //      { hour: dateLancemet.getHours(), minute: dateLancemet.getMinutes(), second: dateLancemet.getSeconds() },
      dateLancemet,
      () => {
        const decryptedPK = cryptr.decrypt(privateKey);
        web3.eth.accounts.wallet.add(decryptedPK);
        tontine.methods
          .verifGarantie(ID_Tontine, address)
          .send({ from: address, gas: 30000000 }, async (error, result) => {
            console.log(
              '*************************************************************************************'
            );
            console.log('             ********************************************************');
            console.log('verification2 ', ID_Tontine);

            console.log({
              second: dateLancemet.getSeconds(),
              hour: dateLancemet.getHours(),
              minute: dateLancemet.getMinutes(),
            });
            console.log('address', address);

            console.log(
              '*************************************************************************************'
            );
            console.log(
              '*************************************************************************************'
            );
          })
          .catch((e) => console.log('scheduleVerifError', e));
      }
    );
  }
}

function notifCotisation(
  IterParCycle,
  date,
  address,
  ID_Tontine,
  nomTontine,
  frequence,
  frequence2,
  montant
) {
  for (let k = 1; k < IterParCycle; k++) {
    // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    // console.log(k)
    const dateLancemet = new Date(date * 1000 + 60000 * (frequence * (k - 1) + frequence2) + 3000);
    console.log(dateLancemet);
    const j = schedule.scheduleJob(
      //      { hour: dateLancemet.getHours(), minute: dateLancemet.getMinutes() },
      dateLancemet,
      async () => {
        tontine.methods
          .getDateLancement(ID_Tontine)
          .call(async (err, result) => {
            console.log('hhhheeeeeeeeeeeeeeeeeeeeeeeere');
            console.log(result['4']);
            if (result['4']) {
              const Notif = new Notifications({
                IdTontine: ID_Tontine,
                NomTontine: nomTontine,
                TypeNotification: 'Cotisation',
                borrower: address,
                Iteration: k,
                Montant: montant,
                DateNotif: dateLancemet,
              });
              console.log('notifCotisation date lancement');

              console.log({ Notif, date, dateLancemet });

              Notif.save((err, NotifE) => {
                if (err) {
                  console.log('error');
                  console.log(err);

                  return console.error(err);
                }
                console.log('cotisation saved to db');
              });
            }
          })
          .catch((e) => console.log(e));
      }
    );
  }
}

function notifRecharge(IterParCycle, date, address, ID_Tontine, nomTontine, frequence, montant) {
  for (let k = 1; k <= IterParCycle; k++) {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(IterParCycle);
    const dateLancemet = new Date(date * 1000 + 60000 * (frequence * (k - 1)) + 4000);
    console.log(dateLancemet);
    const j = schedule.scheduleJob(
      //      { hour: dateLancemet.getHours(), minute: dateLancemet.getMinutes() },
      dateLancemet,
      async () => {
        tontine.methods
          .getLastGarCotDist(ID_Tontine, address, true, false, false)
          .call(async (err, result) => {
            tontine.methods.getDateLancement(ID_Tontine).call(async (err, resultt) => {
              if (
                parseInt(result['6'], 10) === 0 &&
                resultt['4'] &&
                IterParCycle >= resultt['3'] * resultt['1']
              ) {
                const Notif = new Notifications({
                  IdTontine: ID_Tontine,
                  NomTontine: nomTontine,
                  TypeNotification: 'Recharge garantie',
                  borrower: address,
                  Iteration: k,
                  Montant: montant,
                  DateNotif: dateLancemet,
                });
                console.log('notifRecharge date lancement');

                console.log({ Notif, date, dateLancemet });

                Notif.save((err, NotifE) => {
                  if (err) {
                    console.log('error');
                    console.log(err);

                    return console.error(err);
                  }
                  console.log('recharge saved to db');
                });
              }
            });
          })
          .catch((e) => console.log(e));
      }
    );
  }
}

function scheduleVerifGar(
  nbPar,
  cycle,
  frequence2,
  IterParCycle,
  frequence,
  date,
  ordre,
  address,
  account,
  ID_Tontine,
  privateKey,
  nomTontine,
  montant
) {
  const F2 = frequence2;
  for (let i = ordre; i <= IterParCycle; i += parseInt(nbPar)) {
    // F2 += frequence;
    // const dateLancemet = new Date(date * 1000 + 60000 * i * frequence);
    const dateLancemet = new Date(date * 1000 + 60000 * ((i - 1) * frequence + frequence2));
    console.log('scheduleverif date lancement');

    console.log({ dateLancemet });

    console.log(
      '*************************************************************************************'
    );
    console.log('             ********************************************************');
    console.log('verificationGar 1 ', ID_Tontine);
    console.log('verificationGar 1 ', address);
    console.log('verificationGar order ', i);
    console.log('verification', F2, dateLancemet, (i - 1) * frequence + frequence2);
    console.log({
      hour: dateLancemet.getHours(),
      minute: dateLancemet.getMinutes(),
    });

    console.log(
      '*************************************************************************************'
    );
    console.log(
      '*************************************************************************************'
    );

    const j = schedule.scheduleJob(
      //      { hour: dateLancemet.getHours(), minute: dateLancemet.getMinutes() },
      dateLancemet,
      async () => {
        console.log('VerifGarOn');

        const decryptedPK = cryptr.decrypt(privateKey);
        web3.eth.accounts.wallet.add(decryptedPK);
        tontine.methods
          .interruption(ID_Tontine)
          .send({ from: account, gas: 30000000 }, async () => {
            console.log(
              '*************************************************************************************'
            );
            console.log('             ********************************************************');
            console.log('verificationGarrr 2', ID_Tontine);
            console.log(address);

            console.log(
              '*************************************************************************************'
            );
            console.log(
              '*************************************************************************************'
            );
          })
          .catch((e) => console.log(e));
      }
    );
  }
}

async function scheduleDist(
  nbPar,
  cycle,
  IterParCycle,
  frequence,
  date,
  ordre,
  address,
  ID_Tontine,
  account,
  encryptedPK,
  mondataires_address,
  nomTontine,
  montant
) {
  // const Cycle = cycle

  // if (IterParCycle == 2) {
  //   const dateLancemet = new Date(date * 1000 + 60000 * ordre * frequence);
  //   console.log(
  //     "*************************************************************************************"
  //   );
  //   console.log(
  //     "             ********************************************************"
  //   );
  //   console.log("dist", dateLancemet);
  //   console.log("dist", ID_Tontine);
  //   console.log({
  //     hour: dateLancemet.getHours(),
  //     minute: dateLancemet.getMinutes(),
  //   });
  //   console.log("address", address);

  //   console.log(
  //     "             ********************************************************"
  //   );
  //   console.log(
  //     "*************************************************************************************"
  //   );

  //   var j = schedule.scheduleJob(
  //     //      { hour: dateLancemet.getHours(), minute: dateLancemet.getMinutes() },
  //     dateLancemet,
  //     async function () {
  //       const decryptedPK = cryptr.decrypt(encryptedPK);
  //       web3.eth.accounts.wallet.add(decryptedPK);
  //       tontine.methods
  //         .getDateLancement(ID_Tontine)
  //         .call(async function (err, resultt) {
  //           if (resultt["0"] != 0 && resultt["4"] == false) {
  //             console.log(
  //               "*************************************************************************************"
  //             );
  //             console.log(
  //               "             ********************************************************"
  //             );
  //             console.log("Interruption", dateLancemet);
  //             console.log("dist", ID_Tontine);
  //             console.log("consollllll");
  //             console.log(resultt["0"]);
  //             console.log(resultt["4"]);
  //             console.log(resultt["0"] != 0 && resultt["4"] == false);
  //             console.log(mondataires_address);

  //             console.log(
  //               "             ********************************************************"
  //             );
  //             console.log(
  //               "*************************************************************************************"
  //             );
  //             const decryptedPK = cryptr.decrypt(encryptedPK);
  //             web3.eth.accounts.wallet.add(decryptedPK);
  //             tontine.methods
  //               .envoiMondataire(
  //                 ID_Tontine,
  //                 account,
  //                 mondataires_address[0],
  //                 mondataires_address[1]
  //               )
  //               .send({ from: account, gas: 30000000 }, async function (
  //                 error,
  //                 result
  //               ) {})
  //               .catch((e) => console.log(e));
  //           } else {
  //             tontine.methods
  //               .distribution(ID_Tontine, address, ordre, account)
  //               .send({ from: account, gas: 30000000 }, async function (
  //                 error,
  //                 result
  //               ) {
  //                 console.log(
  //                   "*************************************************************************************"
  //                 );
  //                 console.log(
  //                   "             ********************************************************"
  //                 );
  //                 console.log("distribution 2 ", dateLancemet);
  //                 console.log("distribution 2 ", ID_Tontine);
  //                 console.log("consollllll");
  //                 console.log(resultt["0"]);
  //                 console.log(resultt["4"]);
  //                 console.log(resultt["0"] != 0 && resultt["4"] == false);
  //                 console.log(mondataires_address);

  //                 console.log(
  //                   "             ********************************************************"
  //                 );
  //                 console.log(
  //                   "*************************************************************************************"
  //                 );
  //                 const d = new Date();

  //                 var Notif = new Notifications({
  //                   IdTontine: ID_Tontine,
  //                   //  NomTontine: req.body.Nom_Tontine,
  //                   TypeNotification: "distribution",
  //                   borrower: address,
  //                   DateTontine: d.getTime(),
  //                   Ordre: ordre,
  //                   //  Cumule: 0,
  //                   //  Iteration: 0,
  //                   //  Montant: parseInt(req.body.Montant, 10),
  //                 });

  //                 Notif.save(function (err, NotifE) {
  //                   if (err) {
  //                     console.log("error");
  //                     console.log(err);
  //                     //                    res.status(804).end();
  //                     return console.error(err);
  //                   }
  //                   console.log("saved to db");
  //                 });

  //                 // tontine.methods
  //                 //   .setTransactionHash(result, 2, ID_Tontine)
  //                 //   .send({ from: account, gas: 30000000 }, function (
  //                 //     errorHash,
  //                 //     resultHash
  //                 //   ) {
  //                 //     console.log({ resultHash, errorHash });
  //                 //   });
  //               })
  //               .catch((e) => console.log("scheduleDistError", e));
  //           }
  //         });
  //       // await timeout(60000);
  //     }
  //   );
  // } else {
  for (let i = ordre; i <= IterParCycle; i += parseInt(nbPar)) {
    const dateLancemet = new Date(date * 1000 + 60000 * i * frequence);
    console.log('dist', dateLancemet);
    console.log('dist', ID_Tontine);
    console.log(ordre);
    console.log(i);
    // Math.trunc(IterParCycle/ )

    const j = schedule.scheduleJob(
      //        { hour: dateLancemet.getHours(), minute: dateLancemet.getMinutes() },
      dateLancemet,
      async () => {
        const decryptedPK = cryptr.decrypt(encryptedPK);
        web3.eth.accounts.wallet.add(decryptedPK);
        tontine.methods.getDateLancement(ID_Tontine).call(async (err, resultt) => {
          if (resultt['0'] != 0 && resultt['4'] == false) {
            const decryptedPK = cryptr.decrypt(encryptedPK);
            web3.eth.accounts.wallet.add(decryptedPK);
            tontine.methods
              .envoiMondataire(ID_Tontine, account, mondataires_address[0], mondataires_address[1])
              .send({ from: account, gas: 30000000 }, async (error, result) => {});
          } else {
            tontine.methods
              .distribution(ID_Tontine, address, ordre, account)
              .send({ from: account, gas: 30000000 }, (error, result) => {
                console.log('distribution', i);
                console.log('dist', ID_Tontine);

                tontine.methods
                  .setTransactionHash(result, 2, ID_Tontine)
                  .send({ from: account, gas: 30000000 }, (errorHash, resultHash) => {
                    console.log({ resultHash, errorHash });
                  });

                if (error == null) {
                  const Notif = new Notifications({
                    IdTontine: ID_Tontine,
                    NomTontine: nomTontine,
                    TypeNotification: 'Distribution',
                    borrower: address,
                    Ordre: ordre,
                    Iteration: resultt['1'],
                    Montant: montant * nbPar,
                    DateNotif: dateLancemet,
                  });

                  Notif.save((err, NotifE) => {
                    if (err) {
                      console.log('error');
                      console.log(err);

                      return console.error(err);
                    }
                    console.log('saved to db');
                  });
                }
              })
              .catch((e) => console.log('scheduleDistError', e));
          }
        });
        //   await timeout(60000);
      }
    );
  }
}
// }

const getperiodeLancement = async (ID_Tontine, nbPar) =>
  new Promise((resolve) => {
    tontine.methods.getDateLancement(ID_Tontine).call((err, result) => {
      const dateLancement = new Date(result['0'] * 1000);
      let Nombre_Iteration = parseInt(result['1']);
      let Frequence = 0;
      let decalage = 3;

      if (result['2'] == 'Par mois') {
        Frequence = 60;
        decalage = 30;
      } else if (result['2'] == 'Par semaine') {
        Frequence = 6;
        decalage = 3;
      }
      const dateTimestamp = parseInt(result['0']);
      const Nombre_Cycle = parseInt(result['3']);
      // const date_Actuel = new Date();
      const date_Actuel = new Date().getTime();
      const dateLancementTime =
        Frequence * (Nombre_Cycle * nbPar - (nbPar - Nombre_Iteration)) * 60000 +
        dateTimestamp * 1000 -
        decalage * 60000;
      //  console.log("dateLancementTime", new Date(dateLancementTime));
      // console.log("idT", ID_Tontine);
      // console.log(Nombre_Cycle * nbPar - (nbPar - Nombre_Iteration));
      // console.log("date", Frequence * Nombre_Cycle * Nombre_Iteration +
      //   dateLancement.getMinutes())
      // console.log("datelancement", dateLancement)
      // console.log("datetimstamp", result["0"])
      // console.log("date", date_Actuel.getMinutes())
      // console.log("beforechangement")
      // console.log(Nombre_Iteration )
      if (Nombre_Iteration == 0) {
        Nombre_Iteration = 1;
      }
      //  console.log("afterchangement")
      //    console.log( Nombre_Iteration)

      if (
        dateLancementTime > date_Actuel
        //  Frequence * Nombre_Cycle * Nombre_Iteration +
        //  dateLancement.getMinutes() -
        // 3 >
        //       dateLancement.getMinutes()+ Frequence - 2 >

        // date_Actuel.getMinutes()
      ) {
        //  console.log("trueeeeeeeeeeeeeeeeeeeeeeeee");
        resolve({
          ID_Tontine,
          dateLancementTimeStamp: result['0'],
          dateLancement,
          Nombre_Iteration,
          Frequence,
          Nombre_Cycle,
          date_Actuel,
          recharge: true,
        });
      } else {
        //  console.log("falseeeeeeeeeeeeeeeeeeeeee");

        resolve({
          ID_Tontine,
          dateLancementTimeStamp: result['0'],
          dateLancement,
          Nombre_Iteration,
          Frequence,
          Nombre_Cycle,
          date_Actuel,
          recharge: false,
        });
      }
    });
  });

const getTontineFunc = async (ID_Tontine, inscrit, dateInvitation, ListParticipants) =>
  new Promise((resolve) => {
    tontine.methods.getTontine(ID_Tontine).call((err, results) => {
      //  console.log("etat", results["6"]);
      //   console.log("idto", ID_Tontine);

      resolve({
        ID_Tontine,
        Nom_Tontine: results['0'],
        montant: results['2'],
        nbr_part: results['1'],
        etat: results['6'],
        nbr_cycle: results['3'],
        frequence: results['4'],
        inscrit,
        dateInvitation,
        ListParticipants,
      });
    });
  });

const getDetailTontine = async (ID_Tontine, address) =>
  new Promise((resolve) => {
    tontine.methods
      .getLastGarCotDist(ID_Tontine, address, true, true, false)
      .call((err, result) => {
        const DateGarantie = result['0'];
        const IterationGarantie = result['1'];
        const IterationCotisation = result['2'];
        const DateCotisation = result['3'];
        //  const DateGarantie =  result["4"]
        //  const DateGarantie =  result["5"]
        const cumule = parseInt(result['6']);
        resolve({
          DateGarantie,
          IterationGarantie,
          IterationCotisation,
          DateCotisation,
          cumule,
        });
      });
  });

/** *********************Requete ************************* */

exports.createTontine = async (req, res) => {
  const decryptedPK = cryptr.decrypt(req.body.privateKey);

  let ordre = 1;
  const mondataires_address = [];
  const ParticipantsList = [];
  const participantsList = JSON.parse(req.body.participantsList);
  const currentOrder = JSON.parse(req.body.currentOrder);
  // console.log("ttttttt");
  // console.log(participantsList);
  // console.log(currentOrder);
  for (let p = 0; p < participantsList.length; p++) {
    for (let t = 0; t < currentOrder.length; t++) {
      if (currentOrder[t] == p) {
        participantsList[p].ordre = t + 1;
      }
    }
    if (participantsList[p].createur) {
      ordre = participantsList[p].ordre;
    }
    ParticipantsList.push({
      addressParticipant: participantsList[p].address,
      ordreParticiant: participantsList[p].ordre,
      createur: participantsList[p].createur,
      mondataire: participantsList[p].mondataire,
    });
    if (participantsList[p].mondataire) {
      mondataires_address.push(participantsList[p].address);
    }
  }
  //   console.log(
  //     req.body.ID_Tontine,
  //     req.body.Nom_Tontine,
  //     parseInt(req.body.Montant, 10),
  //     participantsList.length,
  //     parseInt(req.body.Nbr_cycles, 10),
  //     req.body.Frequence,
  //     ordre
  //   );

  const acc = web3.eth.accounts.create();
  web3.eth.accounts.wallet.add(acc.privateKey);
  const account = acc.address;

  // userData.wallet = account;
  const encryptedPK = cryptr.encrypt(acc.privateKey);
  // userData.encrypt = encryptedPK;
  await signTransaction(account);
  // var ID_Tontine = Math.floor(Math.random() * (98989898 - 1214 + 1)) + 1214;
  const ID_Tontine = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  console.log(
    ID_Tontine,
    req.body.Nom_Tontine,
    parseInt(req.body.Montant, 10),
    participantsList.length,
    parseInt(req.body.Nbr_cycles, 10),
    req.body.Frequence,
    ordre,
    req.body.address,
    account
  );
  web3.eth.accounts.wallet.add(decryptedPK);
  tontine.methods
    .addTontine(
      ID_Tontine,
      req.body.Nom_Tontine,
      parseInt(req.body.Montant, 10),
      participantsList.length,
      parseInt(req.body.Nbr_cycles, 10),
      req.body.Frequence,
      ordre,
      req.body.address,
      account
    )
    .send({ from: req.body.address, gas: 30000000 }, async (error, result) => {
      if (!error) {
        res.send({ ID_Tontine });
        const Sex = await getSex(req.body.address);
        const Profession = await getProfession(req.body.address);
        const Age = await getAge(req.body.address);
        const Agence = await getAgence(req.body.address);
        // console.log(
        //   "******************************************************************************************************"
        // );
        // console.log(tontineData);
        const tontineData = {
          ID_Tontine,
          Time: getTime(),
          Type: getType(new MobileDetect(req.headers['user-agent'])),
          Amount: req.body.Montant,
          Sex,
          Age,
          Profession,
          Agence,
          Etat: 'En Cours',
        };
        const tontine = new tontineModel(tontineData);
        tontine.save((err, res) => {
          // console.log({ res, err });
        });
        for (let i = 0; i < participantsList.length; i++) {
          if (!participantsList[i].createur) {
            const date_Actuel = new Date();
            const Notif = new Notifications({
              IdTontine: ID_Tontine,
              NomTontine: req.body.Nom_Tontine,
              TypeNotification: 'Invitation',
              borrower: participantsList[i].address,
              DateNotif: date_Actuel.getTime() / 1000,
              DateTontine: 0,
              Ordre: participantsList[i].ordre,
              Cumule: 0,
              Iteration: 0,
              Montant: parseInt(req.body.Montant, 10),
            });

            Notif.save((err, NotifE) => {
              if (err) {
                console.log('error');
                console.log(err);
                //                    res.status(804).end();
                return console.error(err);
              }
              console.log('saved to db');
            });
          }

          User.findOne({ wallet: participantsList[i].address }, async (err, user) => {
            if (err) {
              res.json('error');
            } else {
              const { IdTontine } = user;
              const date_Actuel = new Date();
              IdTontine.push({
                Id_Tontine: ID_Tontine,
                Nom_Tontine: req.body.Nom_Tontine,
                inscrit: participantsList[i].createur,
                mondataire: participantsList[i].mondataire,
                mondataire1: mondataires_address[0],
                mondataire2: mondataires_address[1],
                ListParticipants: ParticipantsList,
                nbPar: participantsList.length,
                montant: req.body.Montant,
                ordre: participantsList[i].ordre,
                DateInvitation: date_Actuel.getTime() / 1000,
                wallet: account,
                encrypt: encryptedPK,
              });
              //    console.log("rerere");
              //      console.log(ParticipantsList);
              //     console.log("rrreza");
              //     console.log(IdTontine);
              User.update(
                { wallet: participantsList[i].address },
                { IdTontine },
                async (err, user) => {
                  if (err) {
                    res.json('error');
                  } else {
                    //     console.log(user);
                  }
                }
              );
            }
          });
        }
        console.log(error);
      }
    })
    .then((result) => {
      // console.log("done3");
      tontine.methods.getNumIterationCycle(ID_Tontine).call((err, IterParCycle) => {
        scheduleTasks(
          req,
          parseInt(req.body.Nbr_cycles, 10),
          IterParCycle['0'],
          participantsList.length,
          ordre,
          account,
          encryptedPK,
          mondataires_address,
          ID_Tontine,
          req.body.Nom_Tontine,
          parseInt(req.body.Montant, 10)
        );
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(900).send('creation Tontine invalid');
    });
};

exports.addParticipant = (req, res) => {
  const decryptedPK = cryptr.decrypt(req.body.privateKey);
  web3.eth.accounts.wallet.add(decryptedPK);

  User.findOne({ wallet: req.body.address }, (err, user) => {
    if (err) {
      res.json('error');
    } else {
      const { IdTontine } = user;
      const mondataires_address = [];
      let ordre = 0;
      let addresstontine = '';
      let nbrPart = 0;
      for (let j = 0; j < IdTontine.length; j++) {
        if (req.body.ID_Tontine == IdTontine[j].Id_Tontine) {
          IdTontine[j].inscrit = true;
          ordre = IdTontine[j].ordre;
          addresstontine = IdTontine[j].wallet;
          encryptedPK = IdTontine[j].encrypt;
          mondataires_address.push(IdTontine[j].mondataire1);
          mondataires_address.push(IdTontine[j].mondataire2);
          nbrPart = IdTontine[j].nbPar;
        }
      }
      //  console.log(mondataires_address);
      // console.log(req.body.ID_Tontine, ordre, req.body.decline);
      let decline = false;
      if (req.body.decline == 1) decline = true;
      // console.log(req.body.ID_Tontine, ordre, decline, addresstontine);
      tontine.methods
        .addParticipant(req.body.ID_Tontine, ordre, decline, addresstontine)
        .send({ from: req.body.address, gas: 30000000 }, (error, result) => {
          Notifications.updateOne(
            {
              $and: [
                { IdTontine: req.body.ID_Tontine },
                { TypeNotification: 'Invitation' },
                { borrower: req.body.address },
              ],
            },
            { elimine: true },
            (err, notification) => {
              if (err) {
                res.json('error');
              } else {
                // res.send(notification);
                // console.log(notification);
              }
            }
          );
          User.update({ wallet: req.body.address }, { IdTontine }, (err, user) => {
            if (err) {
              res.json('error');
            } else {
              //        console.log(user);
            }
          });
          tontine.methods
            .setTransactionHash(result, 0, req.body.ID_Tontine)
            .send({ from: req.body.address, gas: 30000000 }, (error, resultHash) => {
              if (!error) {
                console.log('errr22', error);
              }

              //   console.log(resultHash);
            })
            .catch((e) => {
              console.log('errr2', e);
              // res.status(902).send("enable to set hash for participant")
            });
        })

        .then((result) => {
          res.send(result);
          tontine.methods.getNumIterationCycle(req.body.ID_Tontine).call((err, IterParCycle) => {
            tontine.methods.getTontine(req.body.ID_Tontine).call((err, tontine) => {
              scheduleTasks(
                req,
                IterParCycle['1'],
                IterParCycle['0'],
                nbrPart,
                ordre,
                addresstontine,
                encryptedPK,
                mondataires_address,
                req.body.ID_Tontine,
                tontine['0'],
                parseInt(tontine['2'], 10)
              );
            });
          });
        })
        .catch((e) => {
          console.log(e);
          res.status(901).send('add participant invalid');
        });
    }
  });
};

exports.cotisation = (req, res) => {
  tontine.methods
    .getLastGarCotDist(req.body.ID_Tontine, req.body.address, false, true, false)
    .call((error, result) => {
      if (parseInt(req.body.iterationActuel) != parseInt(result['2'])) {
        const decryptedPK = cryptr.decrypt(req.body.privateKey);

        web3.eth.accounts.wallet.add(decryptedPK);

        User.findOne({ wallet: req.body.address }, (err, user) => {
          if (err) {
            res.json('error');
          } else {
            let frequence = 60;
            if (result['2'] == 'Par semaine') {
              frequence = 6;
            }
            tontine.methods.getDateLancement(req.body.ID_Tontine).call((err, result) => {
              const Nombre_Iteration = parseInt(result['1']);
              let Frequence = 0;
              let decalage = 3;

              if (result['2'] == 'Par mois') {
                Frequence = 60;
                decalage = 30;
              } else if (result['2'] == 'Par semaine') {
                Frequence = 6;
                decalage = 3;
              }
              const dateTimestamp = parseInt(result['0']);
              const Nombre_Cycle = parseInt(result['3']);
              const date_Actuel = new Date().getTime();
              let nbPar = 0;
              for (let k = 0; k < user.IdTontine.length; k++) {
                if (user.IdTontine[k].Id_Tontine === req.body.ID_Tontine) {
                  nbPar = user.IdTontine[k].nbPar;
                }
              }
              // console.log({
              //   Nombre_Cycle,
              //   n: nbPar,
              //   Nombre_Iteration,
              //   dateTimestamp,
              //   Frequence,
              // });
              const dateLancementTime =
                Frequence * (Nombre_Cycle * nbPar - (nbPar - Nombre_Iteration)) * 60000 +
                dateTimestamp * 1000;
              // console.log("dateLancementTime, date_Actuel");
              // console.log({
              //   dateLancementTime: Math.trunc(dateLancementTime / 100000),
              //   date_Actuel: Math.trunc(date_Actuel / 100000),
              //   a:
              //     Math.trunc(date_Actuel / 100000) <
              //     Math.trunc(dateLancementTime / 100000),
              // });
              if (Math.trunc(date_Actuel / 100000) < Math.trunc(dateLancementTime / 100000)) {
                const { IdTontine } = user;
                let addresstontine = '';
                for (let j = 0; j < IdTontine.length; j++) {
                  if (req.body.ID_Tontine == IdTontine[j].Id_Tontine) {
                    addresstontine = IdTontine[j].wallet;
                  }
                }
                tontine.methods
                  .cotisation(req.body.ID_Tontine, addresstontine)
                  .send({ from: req.body.address, gas: 30000000 }, (error, result) => {
                    tontine.methods
                      .setTransactionHash(result, 1, req.body.ID_Tontine)
                      .send({ from: req.body.address, gas: 30000000 }, (errorHash, resultHash) => {
                        res.send({ resultHash, errorHash, error: '' });
                        if (!error) {
                          Notifications.updateOne(
                            {
                              $and: [
                                { IdTontine: req.body.ID_Tontine },
                                { TypeNotification: 'Cotisation' },
                                { borrower: req.body.address },
                              ],
                            },
                            { elimine: true },
                            (err, notification) => {
                              if (err) {
                                res.json('error');
                              } else {
                                // res.send(notification);
                                // console.log(notification);
                              }
                            }
                          );
                        }
                      })

                      .catch((e) => {
                        console.log('err', e);
                        // res.status(904).send("Can t set hash of cotisation")
                      });
                  })
                  .catch((e) => res.status(903).send('Can t send cotisation'));
              } else {
                res.status(904).send({ error: 'temps depassé' });
              }
            });
          }
        });
      } else {
        res.send({ error: 'deja cotisé' });
      }
    });
};

exports.RechargeGarantie = (req, res) => {
  const decryptedPK = cryptr.decrypt(req.body.privateKey);

  web3.eth.accounts.wallet.add(decryptedPK);

  User.findOne({ wallet: req.body.Adherent_Address }, (err, user) => {
    if (err) {
      res.json('error');
    } else {
      const { IdTontine } = user;
      let addresstontine = '';
      for (let j = 0; j < IdTontine.length; j++) {
        if (req.body.ID_Tontine == IdTontine[j].Id_Tontine) {
          addresstontine = IdTontine[j].wallet;
        }
      }
      tontine.methods
        .RechargeGarantie(
          req.body.ID_Tontine,
          // req.body.Adherent_Address,
          addresstontine,
          true
        )
        .send({ from: req.body.Adherent_Address, gas: 30000000 }, (error, result) => {
          res.send({ result });
          if (!error) {
            Notifications.updateOne(
              {
                $and: [
                  { IdTontine: req.body.ID_Tontine },
                  { TypeNotification: 'Recharge garantie' },
                  { borrower: req.body.Adherent_Address },
                ],
              },
              { elimine: true },
              (err, notification) => {
                if (err) {
                  res.json('error');
                } else {
                  // res.send(notification);
                  // console.log(notification);
                }
              }
            );
          }
        })
        .catch((e) => res.status(906).send('invalid Recharge Garantie'));
    }
  });
};

exports.AvancementTontine = async (req, res) => {
  const listeData = req.query.ListParticipants;
  const listeData1 = JSON.parse(listeData);
  const addressUser = listeData1.List;
  const tontinesData = [];
  // console.log(addressUser)
  for (let i = 0; i < addressUser.length; i++) {
    // console.log(addressUser[i].addressParticipant)
    tontinesData.push({
      addressUser: addressUser[i].addressParticipant,
      data: await getTontineData(addressUser[i].addressParticipant, req.query.ID_Tontine),
    });
  }
  // console.log(tontinesData);
  res.send(tontinesData);
};

/** ***************GET Function ********************************** */

exports.getAllAdherent = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.json('error');
    } else {
      //  console.log(user);
      res.json({ user });
    }
  });
};

exports.getUserDyRib = (req, res) => {
  // console.log(req.query.rib);
  User.findOne({ rib: req.query.rib }, (err, user) => {
    if (err) {
      res.json('error');
    } else {
      //   console.log(user);
      if (user == null) {
        res.json({ address: '', rib: '', email: '' });
      } else {
        res.json({
          firstname: user.firstname,
          lastname: user.lastname,
          address: user.wallet,
          email: user.email,
          rib: user.rib,
        });
      }
    }
  });
};

exports.getTontineForNotification = async (req, res) => {
  User.findOne({ wallet: req.query.address }, async (err, user) => {
    // console.log(user);
    if (err) {
      res.json('error');
    } else {
      for (let i = 0; i < user.IdTontine.length; i++) {
        //  console.log(user.IdTontine[i].inscrit);
        if (req.query.ID_Tontine == user.IdTontine[i].Id_Tontine) {
          const tontines = {
            v1: await getTontineFunc(
              req.query.ID_Tontine,
              user.IdTontine[i].inscrit,
              user.IdTontine[i].DateInvitation,
              user.IdTontine[i].ListParticipants
            ),
            v2: await getperiodeLancement(req.query.ID_Tontine, user.IdTontine[i].nbPar),
          };
          res.send(tontines);
        }
      }
    }
  });
};

exports.getNotificationTontine2 = (req, res) => {
  Notifications.find(
    {
      borrower: req.query.address,
      TypeNotification: {
        $in: ['Invitation', 'Distribution', 'Cotisation', 'Recharge garantie'],
      },
    },

    async (err, notifications) => {
      if (err) {
        res.json('error');
      } else {
        const Invite = [];
        const cotisation = [];
        const garantie = [];
        const distribution = [];

        if (notifications != null) {
          for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].TypeNotification === 'Invitation') {
              Invite.push(notifications[i]);
            } else if (notifications[i].TypeNotification === 'Recharge garantie') {
              garantie.push(notifications[i]);
            } else if (notifications[i].TypeNotification === 'Cotisation') {
              cotisation.push(notifications[i]);
            } else {
              distribution.push(notifications[i]);
            }
          }
        }

        res.send({
          Invite,
          cotisation,
          garantie,
          distribution,
        });
      }
    }
  );
};

exports.getNotificationTontine = (req, res) => {
  let pass = false;
  User.findOne({ wallet: req.query.address }, async (err, user) => {
    if (err) {
      res.json('error');
    } else {
      const Invite = [];
      const cotisation = [];
      const garantie = [];
      const distribution = [];
      // console.log(user)
      if (user != null) {
        if (user.IdTontine.length != 0) {
          const Tontine = user.IdTontine;
          for (let i = 0; i < Tontine.length; i++) {
            var it = 0;
            var et = true;
            tontine.methods.getDateLancement(Tontine[i].Id_Tontine).call(async (err, res) => {
              it = res['1'];
              et = res['4'];
            });
            /** ********  partie de get invitation *********** */
            if (!Tontine[i].inscrit) {
              if (i == Tontine.length) {
                pass = true;
              }
              // console.log("inviteinviteinvite")

              Invite.push({
                ordre: Tontine[i].ordre,
                nbPar: Tontine[i].nbPar,
                montant: Tontine[i].montant,
                type: 'invite',
                DateNotif: Tontine[i].DateInvitation,
                Id_Tontine: Tontine[i].Id_Tontine,
                Nom_Tontine: user.IdTontine[i].Nom_Tontine,
              });
            } else {
              /* **** partie de get cotisation recharge distribution */
              await tontine.methods
                .getLastGarCotDist(
                  user.IdTontine[i].Id_Tontine,
                  req.query.address,
                  true,
                  true,
                  true
                )
                .call((error, result) => {
                  if (i == Tontine.length) {
                    pass = true;
                  }
                  //   console.log({ result });

                  if (result['6'] == 0 && et == true) {
                    const Iteration = result['1'];
                    const DateNotif = result['0'];

                    garantie.push({
                      Nom_Tontine: user.IdTontine[i].Nom_Tontine,
                      Id_Tontine: user.IdTontine[i].Id_Tontine,
                      DateNotif,
                      nbPar: Tontine[i].nbPar,
                      montant: Tontine[i].montant,
                      Iteration,
                      cumule: parseInt(result['6']),
                      type: 'garantie',
                    });
                  }
                  if (it == 1 || it == 1 + result['2']) {
                    const Iteration = result['2'];
                    const DateNotif = result['3'];

                    cotisation.push({
                      Nom_Tontine: user.IdTontine[i].Nom_Tontine,
                      Id_Tontine: user.IdTontine[i].Id_Tontine,
                      DateNotif,
                      Iteration,
                      nbPar: Tontine[i].nbPar,
                      montant: Tontine[i].montant,
                      type: 'cotisation',
                    });
                  }
                  if (result['5'] != 0) {
                    const Iteration = result['4'];
                    //                    const DateDistribution = new Date(result["5"] * 1000);
                    const DateNotif = result['5'];
                    distribution.push({
                      Nom_Tontine: user.IdTontine[i].Nom_Tontine,
                      Id_Tontine: user.IdTontine[i].Id_Tontine,
                      DateNotif,
                      Iteration,
                      nbPar: Tontine[i].nbPar,
                      montant: Tontine[i].montant,
                      type: 'distribution',
                    });
                  }
                })
                .catch((e) => console.log({ e }));
            }
          }
        }
      }
      //      console.log({ Invite, cotisation, garantie, distribution });
      res.send({
        Invite,
        cotisation,
        garantie,
        distribution,
      });
    }
  });
};

exports.getTontinesByParticipant2 = async (req, res) => {
  const tontines = [];
  User.findOne({ wallet: req.query.address }, async (err, user) => {
    if (err) {
      res.json('error');
    } else {
      for (let i = 0; i < user.IdTontine.length; i++) {
        tontines.push({
          v1: await getTontineFunc(
            user.IdTontine[i].Id_Tontine,
            user.IdTontine[i].inscrit,
            user.IdTontine[i].DateInvitation,
            user.IdTontine[i].ListParticipants
          ),
          v2: await getperiodeLancement(user.IdTontine[i].Id_Tontine, user.IdTontine[i].nbPar),
          v3: await getDetailTontine(user.IdTontine[i].Id_Tontine, req.query.address),
        });
      }

      res.send(tontines);
    }
  });
};

exports.DetailTontine = async (req, res) => {
  // console.log(req.query);

  await tontine.methods
    .getLastGarCotDist(req.query.ID_Tontine, req.query.address, true, true, false)
    .call((error, result) => {
      const DateGarantie = result['0'];
      const IterationGarantie = result['1'];
      const IterationCotisation = result['2'];
      const DateCotisation = result['3'];
      //  const DateGarantie =  result["4"]
      //  const DateGarantie =  result["5"]
      const cumule = parseInt(result['6']);
      res.send({
        DateGarantie,
        IterationGarantie,
        IterationCotisation,
        DateCotisation,
        cumule,
      });
    });
};

exports.getNotification = (req, res) => {
  User.findOne({ wallet: req.query.address }, async (err, user) => {
    if (err) {
      res.json('error');
    } else {
      const { IdTontine } = user;
      const NotifTontine = [];
      for (let j = 0; j < IdTontine.length; j++) {
        await Notifications.findOne({ IdTontine: IdTontine[j].Id_Tontine }, (error, result) => {
          if (!error) {
            if (result != null) {
              NotifTontine.push(result);
            }
          }
        });
      }
      res.send(NotifTontine);
    }
  });
};
/*
exports.aaaa = async (req, res) => {
//  console.log(req.query.id, req.query.address);
  //  tontine.methods.getLeng(req.query.id, req.query.address).call(console.log);
  tontine.methods
    .getsommeparmois(req.query.id)
    .call((err, resa) => res.send({ err, resa }));
};
*/
exports.aaa = async (req, res) => {
  //  console.log(req.query.id, req.query.address);
  //  tontine.methods.getLeng(req.query.id, req.query.address).call(console.log);
  tontine.methods.getTontine(req.query.id).call((err, resa) => res.send({ err, resa }));
};

exports.aa = async (req, res) => {
  //  console.log(req.query.id, req.query.address);
  //  tontine.methods.getLeng(req.query.id, req.query.address).call(console.log);
  tontine.methods
    .getLastCotisation(req.query.id, req.query.address)
    .call((err, result) => res.send({ err, result }));
};

/*
exports.aaaa = async (req, res) => {
tontine.methods.getTontine(req.query.ID_Tontine).call(console.log)
};

*/
