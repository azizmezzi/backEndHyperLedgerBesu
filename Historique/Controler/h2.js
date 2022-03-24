/* eslint-disable no-async-promise-executor */
/* eslint-disable implicit-arrow-linebreak */
const Web3 = require('web3');
const User = require('../models/Users');
const Agent = require('../models/Agents');
const Notifications = require('../models/Notifications');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const Contract = require('../contract');

const ContractC = require('../contractCashout');

const ContractE = require('../contractEcheance');

const Cashin = new web3.eth.Contract(Contract.AbiDepot, Contract.address);
const PretContract = new web3.eth.Contract(ContractE.Abi, ContractE.address);
const cashoutContract = new web3.eth.Contract(ContractC.Abi, ContractC.address);

/** ****************************** Historique Operation ****************************** */
const getOperation = async (receiver, i) =>
  new Promise(async (resolve) => {
    console.log('lengthItem ', i);

    await Cashin.methods
      .getOperationInfoByIndex(i, receiver)
      .call(async (err, operation) => {
        const id = operation['0'].substr(0, 1);
        let type = '';
        switch (id) {
          case 'I':
            type = 1;
            break;
          case 'A':
            type = 0;
            break;
          case 'T':
            type = 2;
            break;
          case 'O':
            type = 3;
            break;
          default:
            break;
        }
        resolve({
          idOp: operation['0'],
          montant: operation['3'],
          dateOp: operation['2'],
          nameReciver: operation['5'],
          HashOp: operation['4'],
          reciver: operation['1'],
          type,
        });
      })
      .catch((e) => console.log('e', e));
  });

const getOperationAway = async (sender, receiver, i) =>
  new Promise(async (resolve) => {
    console.log('lengthItem ', i);

    await Cashin.methods
      .getOperationInfoByIndexAway(i, sender.wallet, receiver)
      .call(async (err, operation) => {
        const id = operation['0'].substr(0, 1);
        let type = '';
        switch (id) {
          case 'I':
            type = 1;
            break;
          case 'A':
            type = 0;
            break;
          case 'T':
            type = 2;
            break;
          case 'O':
            type = 3;
            break;
          default:
            break;
        }
        resolve({
          idOp: operation['0'],
          montant: operation['2'],
          dateOp: operation['1'],
          nameReciver: operation['4'],
          HashOp: operation['3'],
          receiver,
          type,
          sender: sender.wallet,
          senderName: `${sender.firstname} ${sender.lastname}`,
        });
      })
      .catch((e) => console.log('e', e));
  });

const getOperationByIndex = async (receiver, len) =>
  new Promise(async (resolve) => {
    const cashins = [];
    for (let i = 0; i < parseInt(len, 10); i += 1) {
      console.log('lengthItem1 ', i);
      cashins.push(await getOperation(receiver, i));
    }

    resolve(cashins);
  });

const getAllOperation = async (sender) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    await Cashin.methods.getOperationLengthByBorrower(sender).call(async (err, len) => {
      resolve(await getOperationByIndex(sender, len));
    });
  });

const getAllOperationAway = async (receiver) =>
  new Promise(async (resolve) => {
    let cashin = [];
    await User.find({}, async (err, users) => {
      for (let i = 0; i < users.length; i += 1) {
        if (users[i].wallet != receiver) {
          const a = await getAllOperationAwayForFunc(users[i], receiver);
          if (a.length !== 0) {
            cashin = [...cashin, ...a];
          }
        }
      }
      resolve(cashin);
    });
  });

const getAllOperationAwayAgent = async (receiver) =>
  new Promise(async (resolve) => {
    let cashin = [];
    await Agent.find({}, async (err, agents) => {
      for (let i = 0; i < agents.length; i += 1) {
        if (agents[i].wallet != receiver) {
          const a = await getAllOperationAwayForFunc(agents[i], receiver);
          if (a.length !== 0) {
            cashin = [...cashin, ...a];
          }
        }
      }
      resolve(cashin);
    });
  });

const getAllOperationAwayForFunc = async (sender, receiver) =>
  new Promise(async (resolve) => {
    await Cashin.methods.getOperationLength(sender.wallet, receiver).call(async (err, len) => {
      if (len != 0) {
        resolve(await getOperationByIndexAway(sender, receiver, len));
      } else resolve([]);
    });
  });

const getOperationByIndexAway = async (sender, receiver, len) =>
  new Promise(async (resolve) => {
    const cashins = [];
    for (i = 0; i < parseInt(len, 10); i += 1) {
      console.log('lengthItem1 ', i);
      cashins.push(await getOperationAway(sender, receiver, i));
    }

    resolve(cashins);
  });

/** ****************************** Historique Echeance ****************************** */

const getAllEcheances = async (borrower) =>
  new Promise(async (resolve) => {
    const echeances = [];

    await PretContract.methods
      .getPretLengthByBorrower(borrower)
      .call(async (error, result) => {
        for (let i = 0; i < result; i++) {
          const echeances1 = await getPretInfoByIndex(borrower, i, 1);
          for (let k = 0; k < echeances1.length; k++) {
            echeances.push(echeances1[k]);
          }
        }
        // console.log({ e: echeances });
        resolve(echeances);
        // res.send({ nombrePret: result, Pret });
      })
      .catch((e) => console.log(e));
  });

const getEcheanceInfoByIndexParte1 = async (idPret, j, borrower) =>
  new Promise(async (resolve) => {
    await PretContract.methods.getEcheanceInfoByIndex(idPret, j, borrower).call(async (error, result4) => {
      resolve({
        idPret,
        idOp: result4['0'],
        montant: result4['1'],
        dateLimite: result4['2'],
        intermediere: result4['3'],
        DateLancement: result4['4'],
        status: result4['5'],
      });
    });
  });

const getEcheanceInfoByIndexParte2 = async (idPret, j, borrower) =>
  new Promise(async (resolve) => {
    await PretContract.methods.getEcheanceInfoByIndexX(idPret, j, borrower).call(async (error, result4) => {
      resolve({
        idPret,
        idOp: result4['0'],
        dateOp: result4['1'],
        HashOp: result4['2'],
      });
    });
  });

const getEcheanceInfoByIndex = async (length, idPret, borrower) =>
  new Promise(async (resolve) => {
    const echeance = [];
    for (let j = 0; j < length; j++) {
      const E1 = await getEcheanceInfoByIndexParte1(idPret, j, borrower);
      const E2 = await getEcheanceInfoByIndexParte2(idPret, j, borrower);
      if (E2.dateOp != 0) {
        echeance.push({
          idPret,
          idOp: E1.idOp,
          montant: E1.montant,
          dateLimite: E1.dateLimite,
          intermediere: E1.intermediere,
          DateLancement: E1.DateLancement,
          status: E1.status,
          dateOp: E2.dateOp,
          HashOp: E2.HashOp,
        });
      }
      // echeance.push({
      //   E1: await getEcheanceInfoByIndexParte1(idPret, j, borrower),
      //   E2: await getEcheanceInfoByIndexParte2(idPret, j, borrower),
      // });
      // console.log("feeozjr");
      /// / console.log(result4)
      // console.log(echeance);
    }

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
        // // console.log({ idPret: result2["0"] })
        /// / console.log(result2)
        //  Pret.push(result2);
        // const a = await  getEcheanceLengthByPret(result2["0"], borrower)
        /// / console.log({a:a.echeance})
        const echeances = await getEcheanceLengthByPret(result2['0'], borrower, type);

        resolve(echeances);

        // echeances.push(a.echeance)
      })
      .catch((e) => console.log(e));
  });

const getEcheanceInfoByIndex2DB = async (idPret, j, borrower) =>
  new Promise(async (resolve) => {
    await PretContract.methods.getEcheanceInfoByIndex(idPret, j, borrower).call(async (error, result4) => {
      await Notifications.findOne({ idEcheance: result4['0'] }, (err, Notification) => {
        // console.log({ Notification, borrower });

        if (Notification === null) {
          const Notif = new Notifications({
            idPret,
            idEcheance: result4['0'],
            montant: result4['1'],
            borrower,
            TypeNotification: 'Echeance',
            dateLimite: result4['2'],
            intermediate: result4['3'],
            DateLancement: result4['4'],
            status: result4['5'],
            elimine: false,
            vu: false,
          });

          Notif.save((err, NotifE) => {
            if (err) {
              // console.log("error");
              // console.log(err);
              //                    res.status(804).end();
              return console.error(err);
            }
            // console.log("saved to db");

            //                  // console.log(NotifE);

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
    /// / console.log({length})
    for (let j = 0; j < length; j++) {
      NotificationsEcheances.push(await getEcheanceInfoByIndex2DB(idPret, j, borrower));
    }

    //    // console.log({length, NotificationsEcheances,borrower})
    resolve(NotificationsEcheances);
    // console.log("coucou");
    // console.log(NotificationsEcheances);
  });
/** ****************************** Historique CashOut ****************************** */

const getAllCashout = (wallet) =>
  new Promise(async (resolve) => {
    const cashouts = [];

    cashoutContract.methods.getCashoutLengthByTs(wallet).call(async (error, result) => {
      const nb = parseInt(result, 10);

      for (let i = 0; i < nb; i += 1) {
        cashouts.push(await getCashoutIndexByTs(wallet, i));
      }
      // console.log({ Co: cashouts });
      resolve(cashouts);
    });
  });

const getCashoutIndexByTs = (wallet, index) =>
  new Promise(async (resolve) => {
    cashoutContract.methods.getCashoutIndexByTs(wallet, index).call(async (error, result) => {
      const indexCashout = parseInt(result, 10);
      // console.log("cc", result);
      resolve(await getCashoutProofById(indexCashout));
    });
  });

const getCashoutProofById = (indexCashout) =>
  new Promise(async (resolve) => {
    // console.log("indexCashout", indexCashout);
    cashoutContract.methods.getCashoutProofById(indexCashout).call(async (error, result) => {
      await Agent.findOne({ wallet: result.wallet_Tokenreceiver }, async (err, Agent) => {
        if (err) {
          res.json('error');
        } else {
          resolve({ result, Agent });
        }
      });
    });
  });
/** *******************************Notifications**************************************** */

exports.getAllNotifications = async (req, res) => {
  const tab = {};
  Notifications.find(
    {
      $and: [{ receiverT: req.query.wallet }, { TypeNotification: 'Transfert' }],
    },
    (err, transferts) => {
      if (err) {
        res.json('error');
      } else {
        //  console.log(notification);
        // res.json({ notification });
        tab.transferts = transferts;
      }
    }
  );
  // console.log("here the tab");
  // console.log(tab);
  await Notifications.find(
    {
      $and: [{ borrower: req.query.wallet }, { TypeNotification: 'Echeance' }],
    },
    (err, echeances) => {
      if (err) {
        res.json('error');
      } else {
        //  console.log(notification);
        //  res.json({ notification });
        tab.echeances = echeances;
      }
    }
  );
  // console.log("here the tab2");
  // console.log(tab);

  res.send(tab);
};

/** ****************************** Tous les  Historiques  ****************************** */

exports.getHistoriqueAdherent = async (req, res) => {
  // const T1 = await getAllTransfert(req.query.wallet);
  // const T2 = await getAllTransfert2(req.query.wallet);
  // const C1 = await getAllCashin(req.query.wallet);
  // // console.log(C1);
  // const C2 = await getAllCashinAgent(req.query.wallet);
  // // var cashinsAgent = []
  // for (let i = 0; i < C2.length; i += 1) {
  //   C1.push(...C2[i]);
  // }
  const AllOperation = await getAllOperation(req.query.wallet);
  const AllOperationAway = await getAllOperationAway(req.query.wallet);
  const AllOperationAwayAgent = await getAllOperationAwayAgent(req.query.wallet);
  const echeances = await getAllEcheances(req.query.wallet);
  res.send({
    //    cashouts: await getAllCashout(req.query.wallet),
    operations: [...AllOperation, ...AllOperationAway, ...AllOperationAwayAgent, ...echeances],
  });
};
