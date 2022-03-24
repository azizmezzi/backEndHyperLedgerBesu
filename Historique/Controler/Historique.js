/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line import/no-extraneous-dependencies
const Web3 = require('web3');

const User = require('../models/Users');

const Agent = require('../models/Agents');

const Notifications = require('../models/Notifications');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const Contract = require('../contract');

const ContractE = require('../contractEcheance');
const { parse } = require('querystring');

const Cashin = new web3.eth.Contract(Contract.AbiDepot, Contract.address);

<<<<<<< HEAD
/******************************** Historique Transfert ****************************** */

const getAllTransfert = async (Querysender) => {
  return new Promise(async (resolve) => {
    var ALLT = [];

    await User.findOne({ wallet: Querysender }, async function (err, sender) {
      if (err) {
        res.json("error");
      } else {
        await Cashin.methods
          .getUserTransferLength(Querysender)
          .call(async (err, len) => {
            if (len == 0) {
              //              res.json("aucun transfert effectué");
              resolve(ALLT);
            } else {
              for (i = 0; i < len; i++) {
                ALLT.push(await getTransferInfo(Querysender, i));
              }
              // console.log({ t: ALLT });
              resolve(ALLT);
            }
          });
      }
    });
  });
};
// type 1 : sender = qui demande la requete fait le transfert , type 2 : qui demande la requete resoit le transfert

const getTransferInfo = (sender, i) => {
  return new Promise(async (resolve) => {
    await Cashin.methods
      .getTransferIndex(sender, i)
      .call(async (err, index) => {
        await Cashin.methods.getTransferInfo(index).call((err, result) => {
          console.log("the result is here")
          console.log(result);
          User.findOne({ wallet: result._reciver }, function (err, reciver) {
            resolve({ result, sender, reciver, type: 1 });
          });
        });
      });
  });
};

const getTransferInfo2 = (sender, reciver, i) => {
  return new Promise(async (resolve) => {
    await Cashin.methods
      .getTransferIndex(sender.wallet, i)
      .call(async (err, index) => {
        await Cashin.methods.getTransferInfo(index).call((err, result) => {
          // console.log(result);
          if (result._reciver === reciver) {
            resolve({ result, sender, reciver, type: 2 });
          } else {
            resolve(null);
          }
        });
      });
  });
};

const getAllTransfert2 = async (Querysender) => {
  return new Promise(async (resolve) => {
    var ALLT = [];

    await User.find({}, async function (err, sender) {
      if (err) {
        res.json("error");
      } else {
        console.log(sender.length);
        for (let j = 0; j < sender.length; j += 1) {
          await Cashin.methods
            .getUserTransferLength(sender[j].wallet)
            .call(async (err, len) => {
              if (len == 0) {
                //              res.json("aucun transfert effectué");
                resolve(ALLT);
              } else {
                for (i = 0; i < len; i++) {
                  const a = await getTransferInfo2(sender[j], Querysender, i);
                  console.log({ a, s: sender[j].wallet, len, Querysender, })
                  if (a != null) {
                    ALLT.push(a);
                  }
                }
                // console.log({ t: ALLT });
                resolve(ALLT);
              }
            });
        }
      }
    });
  });
};

/******************************** Historique Cashin ****************************** */
// getAllCashin/getCashInIndex retourne tous les cashins issues d'un adhérent 
// et getAllCashinAgent/getCashInIndexAgent retourne tous les cashins issues d'un agent pour un adhérent 
const getAllCashin = async (reciver) => {
  return new Promise(async (resolve) => {
    await Cashin.methods.getUserCashInLength(reciver).call(async (err, len) => {
      // console.log({ Ci: await getCashInIndex(reciver, len) });
      resolve(await getCashInIndex(reciver, len));
    });
  });
};

const getCashInIndex = async (receiver, len) => {
  return new Promise(async (resolve) => {
    let cashin = [];
    for (i = 0; i < len; i++) {
      cashin.push(await getcashInInfo(receiver));
    }
    //  // console.log("cashin", cashin);

    resolve(cashin);
  });
};

const getCashinAgent = async (agent, receiver) => {
  return new Promise(async (resolve) => {
    await Cashin.methods.getUserCashInLength(agent.wallet).call(async (err, len) => {
      const allcash = await getCashInIndexAgent(agent.wallet, len, receiver)
      // console.log({ Ci: await getCashInIndex(reciver, len) });
      if (len != 0 && allcash.length !== 0) {
        console.log("allcash ", i)
        console.log(allcash)
        for (let i = 0; i < allcash.length; i += 1) {
          allcash[i].agent = agent


        } resolve(allcash);
      } else { resolve(null) }

    });
  })
}
const getAllCashinAgent = async (receiver) => {
  return new Promise(async (resolve) => {
    await Agent.find({}, async function (err, agents) {
      if (err) {
        res.json("error");
      } else {
        const allCashinsAgent = []
        for (let i = 0; i < agents.length; i++) {
          const CashinAgent = await getCashinAgent(agents[i], receiver)
          if (CashinAgent !== null) { allCashinsAgent.push(await getCashinAgent(agents[i], receiver)) }
          //const allCashinsAgent = agents.map(async(item, index) => {
          // await Cashin.methods.getUserCashInLength(agents[i].wallet).call(async (err, len) => {
          //   const allcash = await getCashInIndexAgent(agents[i].wallet, len, receiver)
          //   // console.log({ Ci: await getCashInIndex(reciver, len) });
          //   if (len != 0 && allcash.length !== 0) {
          //     console.log("allcash ", i)
          //     console.log(allcash)
          //     allCashinsAgent.push({ allCashinsAgent: allcash, agent: agents[i] });
          //   }

          // });
        }
        //})
        console.log("allCashinsAgent")
        console.log(allCashinsAgent)
        resolve(allCashinsAgent)
      }
    })
  });
};

const getCashInIndexAgent = async (addressAgent, len, receiver) => {
  return new Promise(async (resolve) => {
    let cashin = [];
    for (i = 0; i < len; i++) {
      const cash = await getcashInInfo(addressAgent)
      if (cash._reciver == receiver)
        cashin.push(cash);
    }
    //  // console.log("cashin", cashin);
    console.log("cashin")
    console.log(cashin)
    resolve(cashin);
  });
};


const getcashInInfo = async (receiver) => {
  return new Promise(async (resolve) => {
    let cashin = [];
    await Cashin.methods
      .getCashInIndex(receiver, i)
      .call(async (err, index) => {
        await Cashin.methods.getcashInInfo(index).call((err, result) => {
          // console.log("cashin2", result);
          resolve(result);
        });
      });
=======
const PretContract = new web3.eth.Contract(ContractE.Abi, ContractE.address);

/** ****************************** Historique Operation ****************************** */
const getOperation = async (receiver, i) =>
  new Promise(async resolve => {
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
          type
        });
      })
      .catch(e => console.log('e', e));
  });

const getOperationAway = async (sender, receiver, i) =>
  new Promise(async resolve => {
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
          senderName: `${sender.firstname} ${sender.lastname}`
        });
      })
      .catch(e => console.log('e', e));
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
  });

const getOperationByIndexAway = async (sender, receiver, len) =>
  new Promise(async resolve => {
    const cashins = [];
    for (let i = 0; i < parseInt(len, 10); i += 1) {
      cashins.push(getOperationAway(sender, receiver, i));
    }
    const results = await Promise.all(cashins);
    resolve(results);
  });

const getOperationByIndex = async (receiver, len) =>
  new Promise(async resolve => {
    const cashins = [];
    for (let i = 0; i < parseInt(len, 10); i += 1) {
      cashins.push(getOperation(receiver, i));
    }
    const result = await Promise.all(cashins);
    resolve(result);
  });

const getAllOperation = async sender =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async resolve => {
    await Cashin.methods.getOperationLengthByBorrower(sender).call(async (err, len) => {
      resolve(await getOperationByIndex(sender, len));
    });
  });

const getAllOperationAwayForFunc = async (sender, receiver) =>
  new Promise(async resolve => {
    await Cashin.methods.getOperationLength(sender.wallet, receiver).call(async (err, len) => {
      if (parseInt(len, 10) !== 0) {
        resolve(await getOperationByIndexAway(sender, receiver, len));
      } else resolve([]);
    });
  });

const getAllOperationAway = async receiver =>
  new Promise(async resolve => {
    await User.find({}, async (err, users) => {
      const result = [];
      for (let i = 0; i < users.length; i += 1) {
        if (users[i].wallet !== receiver) {
          result.push(getAllOperationAwayForFunc(users[i], receiver));
        }
<<<<<<< HEAD
        // console.log({ e: echeances });
        resolve(echeances);
        // res.send({ nombrePret: result, Pret });
      })
      .catch((e) => console.log(e));

=======
      }
      const results = await Promise.all(result);
      const cashin = [];
      for (let j = 0; j < results.length; j += 1) {
        for (let k = 0; k < results[j].length; k += 1) {
          cashin.push(results[j][k]);
        }
      }
      resolve(cashin);
    });
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
  });

const getAllOperationAwayAgent = async receiver =>
  new Promise(async resolve => {
    const result = [];
    await Agent.find({}, async (err, agents) => {
      for (let i = 0; i < agents.length; i += 1) {
        if (agents[i].wallet !== receiver) {
          result.push(getAllOperationAwayForFunc(agents[i], receiver));
        }
      }
      const results = await Promise.all(result);
      const cashin = [];
      for (let j = 0; j < results.length; j += 1) {
        for (let k = 0; k < results[j].length; k += 1) {
          cashin.push(results[j][k]);
        }
      }
      resolve(cashin);
    });
  });

/** ****************************** Historique Echeance ****************************** */
const getEcheanceInfoByIndexParte1 = async (idPret, j, borrower) =>
  new Promise(async resolve => {
    // eslint-disable-next-line max-len
    await PretContract.methods
      .getEcheanceInfoByIndex(idPret, j, borrower)
      .call(async (error, result4) => {
        resolve({
          idPret,
<<<<<<< HEAD
          idEcheance: result4["0"],
          montant: result4["1"],
          dateLimite: result4["2"],
          intermediere: result4["3"],
          DateLancement: result4["4"],
          status: result4["5"],
=======
          idOp: result4['0'],
          montant: result4['1'],
          dateLimite: result4['2'],
          intermediere: result4['3'],
          DateLancement: result4['4'],
          status: result4['5']
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
        });
      });
  });

const getEcheanceInfoByIndexParte2 = async (idPret, j, borrower) =>
  new Promise(async resolve => {
    // eslint-disable-next-line max-len
    await PretContract.methods
      .getEcheanceInfoByIndexX(idPret, j, borrower)
      .call(async (error, result4) => {
        resolve({
          idPret,
<<<<<<< HEAD
          idEcheance: result4["0"],
          DatePaiement: result4["1"],
          transaction_hash: result4["2"],
=======
          idOp: result4['0'],
          dateOp: result4['1'],
          HashOp: result4['2']
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
        });
      });
  });

<<<<<<< HEAD
const getEcheanceInfoByIndex = async (length, idPret, borrower) => {
  return new Promise(async (resolve) => {
    let echeance = [];
    for (let j = 0; j < length; j++) {
      const E1 = await getEcheanceInfoByIndexParte1(idPret, j, borrower);
      const E2 = await getEcheanceInfoByIndexParte2(idPret, j, borrower);
      echeance.push({
        idPret,
        idEcheance: E1.idEcheance,
        montant: E1.montant,
        dateLimite: E1.dateLimite,
        intermediere: E1.intermediere,
        DateLancement: E1.DateLancement,
        status: E1.status,
        DatePaiement: E2.DatePaiement,
        transaction_hash: E2.transaction_hash,
      });
=======
const getEcheanceInfoByIndex = async (length, idPret, borrower) =>
  new Promise(async resolve => {
    const E1 = [];
    const E2 = [];
    for (let j = 0; j < length; j += 1) {
      E1.push(getEcheanceInfoByIndexParte1(idPret, j, borrower));
      E2.push(getEcheanceInfoByIndexParte2(idPret, j, borrower));
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
      // echeance.push({
      //   E1: await getEcheanceInfoByIndexParte1(idPret, j, borrower),
      //   E2: await getEcheanceInfoByIndexParte2(idPret, j, borrower),
      // });
      // console.log("feeozjr");
      // console.log(result4)
      // console.log(echeance);
    }
    const result1 = await Promise.all(E1);
    const result2 = await Promise.all(E2);
    const echeance=[]
    for (let k = 0; k < result1.length; k += 1) {
      if (parseInt(result2[k].dateOp, 10) !== 0) {
        echeance.push({
          idPret,
          idOp: result1[k].idOp,
          montant: result1[k].montant,
          dateLimite: result1[k].dateLimite,
          intermediere: result1[k].intermediere,
          DateLancement: result1[k].DateLancement,
          status: result1[k].status,
          dateOp: result2[k].dateOp,
          HashOp: result2[k].HashOp
        })
      }
    }
    // const echeance = result1.map((item, index) => {
    //   //   console.log({ item, index });
    //   //   console.log({ result2 });
    //   //   console.log(result2[index]);
    //   if (parseInt(result2[index].dateOp, 10) !== 0) {
    //     //  console.log({item,index})
    //     // console.log({
    //     //     idPret,
    //     //     idOp: item.idOp,
    //     //     montant: item.montant,
    //     //     dateLimite: item.dateLimite,
    //     //     intermediere: item.intermediere,
    //     //     DateLancement: item.DateLancement,
    //     //     status: item.status,
    //     //     dateOp: result2[index].dateOp,
    //     //     HashOp: result2[index].HashOp
    //     //   })
    //     // console.log(result2[index].dateOp)
    //     // console.log(result2[index].HashOp)
    //     return {
    //       idPret,
    //       idOp: item.idOp,
    //       montant: item.montant,
    //       dateLimite: item.dateLimite,
    //       intermediere: item.intermediere,
    //       DateLancement: item.DateLancement,
    //       status: item.status,
    //       dateOp: result2[index].dateOp,
    //       HashOp: result2[index].HashOp
    //     };
    //   }
    // });
    // console.log({echeance})
    resolve(echeance);
  });

/* const getEcheanceInfoByIndex2DB = async (idPret, j, borrower) =>
  new Promise(async resolve => {
    // eslint-disable-next-line max-len
    await PretContract.methods
      .getEcheanceInfoByIndex(idPret, j, borrower)
      .call(async (error, result4) => {
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
              vu: false
            });

            Notif.save((errN, NotifE) => {
              if (errN) {
                // console.log("error");
                // console.log(err);
                //                    res.status(804).end();
                return console.error(errN);
              }
              // console.log("saved to db");

              console.log(NotifE);

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
                vu: false
              });
            });
          } else {
            const notif = Notification;
            notif.status = result4['5'];
            resolve(notif); // deja creé:m
          }
        });
      });
  }); */

/* const getEcheanceInfoByIndex2 = async (length, idPret, borrower) =>
  new Promise(async resolve => {
    const NotificationsEcheances = [];
    // console.log({length})
    for (let j = 0; j < length; j += 1) {
      NotificationsEcheances.push(getEcheanceInfoByIndex2DB(idPret, j, borrower));
    }

    //    // console.log({length, NotificationsEcheances,borrower})
    resolve(await Promise.all(NotificationsEcheances));
    // console.log("coucou");
    // console.log(NotificationsEcheances);
  }); */

const getEcheanceLengthByPret = async (idPret, borrower, type) =>
  new Promise(resolve => {
    console.log(type);
    PretContract.methods.getEcheanceLengthByPret(borrower, idPret).call(async (error, result3) => {
      // if (type === 1) {
      resolve(await getEcheanceInfoByIndex(result3, idPret, borrower));
      // } else resolve(await getEcheanceInfoByIndex2(result3, idPret, borrower));
      // res.send(echeance)

      //  res.send({ nombreEcheance: result, echeance });
    });
  });

const getPretInfoByIndex = (borrower, i, type) =>
  new Promise(async resolve => {
    await PretContract.methods
      .getPretInfoByIndex(i, borrower)
      .call(async (error, result2) => {
        // // console.log({ idPret: result2["0"] })
        //  console.log(result2)
        //  Pret.push(result2);
        // const a = await  getEcheanceLengthByPret(result2["0"], borrower)
        //  console.log({a:a.echeance})
        const echeances = await getEcheanceLengthByPret(result2['0'], borrower, type);

        resolve(echeances);

        // echeances.push(a.echeance)
      })
      .catch(e => console.log(e));
  });

const getAllEcheances = async borrower =>
  new Promise(async resolve => {
    const echeances = [];

    await PretContract.methods
      .getPretLengthByBorrower(borrower)
      .call(async (error, result) => {
        const echeancePromise = [];
        for (let i = 0; i < result; i += 1) {
          echeancePromise.push(getPretInfoByIndex(borrower, i, 1));
        }
        const ech = await Promise.all(echeancePromise);
        for (let j = 0; j < ech.length; j += 1) {
          for (let k = 0; k < ech[j].length; k += 1) {
            echeances.push(ech[j][k]);
          }
        }
        // console.log({ e: echeances });
        resolve(echeances);
        // res.send({ nombrePret: result, Pret });
      })
      .catch(e => console.log(e));
  });

/* *********************************Historique echeance ******************* */
const getEcheanceInfoByIndexAgent = async (length, idPret, borrower, agent) => {
  return new Promise(async resolve => {
    const E1 = [];
    const E2 = [];

    for (let j = 0; j < length; j += 1) {
      E1.push(getEcheanceInfoByIndexParte1(idPret, j, borrower));
      E2.push(getEcheanceInfoByIndexParte2(idPret, j, borrower));
    }
    const result1 = await Promise.all(E1);
    const result2 = await Promise.all(E2);
    // console.log({ result1 });
    // const E1 = await getEcheanceInfoByIndexParte1(idPret, j, borrower);
    // const E2 = await getEcheanceInfoByIndexParte2(idPret, j, borrower);
    const echeance = result1.filter((item, index) => {
      // console.log({agent})
      // console.log(item.intermediere)
      // console.log(agent === item.intermediere)
      // console.log(E2.dateOp)
      // console.log(parseInt(E2.dateOp, 10) !== 0)
      if (parseInt(result2[index].dateOp, 10) !== 0 && agent === item.intermediere) {
        // console.log({item,index})
        // console.log({ idPret,
        //     idOp: item.idOp,
        //     montant: item.montant,
        //     dateLimite: item.dateLimite,
        //     intermediere: item.intermediere,
        //     DateLancement: item.DateLancement,
        //     status: item.status,
        //     dateOp: result2[index].dateOp,
        //     HashOp: result2[index].HashOp})

        return {
          idPret,
          idOp: item.idOp,
          montant: item.montant,
          dateLimite: item.dateLimite,
          intermediere: item.intermediere,
          DateLancement: item.DateLancement,
          status: item.status,
          dateOp: result2[index].dateOp,
          HashOp: result2[index].HashOp
        };
        // echeance.push({idPret,
        //       idOp: item.idOp,
        //       montant: item.montant,
        //       dateLimite: item.dateLimite,
        //       intermediere: item.intermediere,
        //       DateLancement: item.DateLancement,
        //       status: item.status,
        //       dateOp: result2[index].dateOp,
        //       HashOp: result2[index].HashOp})
      }
      // return echeance
    });
    // echeance.push({
    //   E1: await getEcheanceInfoByIndexParte1(idPret, j, borrower),
    //   E2: await getEcheanceInfoByIndexParte2(idPret, j, borrower),
    // });
    // console.log("feeozjr");
    // console.log(result4)
    // console.log(echeance);
    // console.log('here from e1, e2');
    // console.log({ echeance });
    resolve(echeance);
  });
};

const getEcheanceLengthByPretAgent = async (idPret, borrower, type, agent) => {
  return new Promise(resolve => {
    PretContract.methods.getEcheanceLengthByPret(borrower, idPret).call(async (error, result3) => {
      // if (type === 1) {
      resolve(await getEcheanceInfoByIndexAgent(result3, idPret, borrower, agent));
      // }
      // else resolve(await getEcheanceInfoByIndex2(result3, idPret, borrower));
      // res.send(echeance)

      //  res.send({ nombreEcheance: result, echeance });
    });
  });
};

const getPretInfoByIndexAgent = (borrower, i, type, agent) => {
  return new Promise(async resolve => {
    await PretContract.methods
      .getPretInfoByIndex(i, borrower)
      .call(async (error, result2) => {
        //  console.log({ idPret: result2["0"] })
        // console.log(result2)
        //  Pret.push(result2);
        // const a = await  getEcheanceLengthByPret(result2["0"], borrower)
        // console.log({a:a.echeance})
        const echeances = await getEcheanceLengthByPretAgent(result2['0'], borrower, type, agent);
        // console.log(echeances);
        resolve(echeances);

        // echeances.push(a.echeance)
      })
      .catch(e => console.log(e));
  });
};

const getPretByAgent = async (user, agent) => {
  return new Promise(async resolve => {
    const echeances = [];
    await PretContract.methods
      .getPretLengthByBorrower(user)
      .call(async (error, result) => {
        const echeancePromise = [];
        for (let i = 0; i < result; i += 1) {
          echeancePromise.push(getPretInfoByIndexAgent(user, i, 1, agent));
          //   const echeances1 = await getPretInfoByIndexAgent(user, i, 1, agent);
          //   for (let k = 0; k < echeances1.length; k += 1) {
          //     echeances.push(echeances1[k]);
          //   }
        }
        const ech = await Promise.all(echeancePromise);
        for (let j = 0; j < ech.length; j += 1) {
          for (let k = 0; k < ech[j].length; k += 1) {
            echeances.push(ech[j][k]);
          }
        }
        // console.log({ echeances });
        resolve(echeances);
        // res.send({ nombrePret: result, Pret });
      })
      .catch(e => console.log(e));
  });
};

const getAllEcheancesByAgent = async agent => {
  return new Promise(async resolve => {
    // let echeances = [];
    await User.find({}, async (err, users) => {
      const echeancePromise = [];
      for (let i = 0; i < users.length; i += 1) {
        // if (users[i].wallet != receiver) {
        echeancePromise.push(getPretByAgent(users[i].wallet, agent));
        // const a = await getPretByAgent(users[i].wallet, agent);

        //   if (a.length !== 0) {
        //     echeances = [...echeances, ...a];
        //  }
      }
      const echeancePromises = await Promise.all(echeancePromise);
      const echeances = [];
      for (let j = 0; j < echeancePromises.length; j += 1) {
        for (let k = 0; k < echeancePromises[j].length; k += 1) {
          echeances.push(echeancePromises[j][k]);
        }
      }
      // }

      // console.log('AllEcheances');
      // console.log(echeances);
      // res.send(echeances);
      resolve(echeances);
    });
  });
};

/** *******************************Notifications**************************************** */


exports.getAllNotifications = async (req, res) => {
<<<<<<< HEAD

  var tab = {};
  Notifications.find({ $and: [{ receiverT: req.query.wallet }, { TypeNotification: "Transfert" }] }, function (err, transferts) {
    if (err) {
      res.json("error");
    } else {
      //  console.log(notification);
      // res.json({ notification });
      tab.transferts = transferts;
    }

  });
  console.log("here the tab")
  console.log(tab)
  await Notifications.find({ $and: [{ borrower: req.query.wallet }, { TypeNotification: "Echeance" }] }, function (err, echeances) {
    if (err) {
      res.json("error");
    } else {
      //  console.log(notification);
      //  res.json({ notification });
      tab.echeances = echeances;
=======
  const tab = {};
  Notifications.find(
    {
      $and: [{ receiverT: req.query.wallet }, { TypeNotification: 'Transfert' }]
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
      $and: [{ borrower: req.query.wallet }, { TypeNotification: 'Echeance' }]
    },
    (err, echeances) => {
      if (err) {
        res.json('error');
      } else {
        //  console.log(notification);
        //  res.json({ notification });
        tab.echeances = echeances;
      }
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
    }

  });
  console.log("here the tab2")
  console.log(tab)

  res.send(tab);
};

/** ****************************** Tous les  Historiques  ****************************** */

exports.getHistoriqueAdherent = async (req, res) => {
<<<<<<< HEAD
  const T1 = await getAllTransfert(req.query.wallet)
  const T2 = await getAllTransfert2(req.query.wallet)
  const C1 = await getAllCashin(req.query.wallet)
  const C2 = await getAllCashinAgent(req.query.wallet)
  // var cashinsAgent = []
  for (let i = 0; i < C2.length; i += 1) {
    C1.push(...C2[i])
  }
  res.send({
    cashouts: await getAllCashout(req.query.wallet),
    cashins: C1,
    //cashinsAgent,
    transfers: T1.concat(T2),
    echeances: await getAllEcheances(req.query.wallet),
  });
=======
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

  if (parseInt(req.query.type, 10) === 1) {
    // console.log({AllOperation})
    // console.log({ AllOperationAway})
    // console.log({AllOperationAwayAgent})
    // console.log({echeances})
    res.send({
      operations: [...AllOperation, ...AllOperationAway, ...AllOperationAwayAgent, ...echeances]
    });
  } else {
    const AllEcheanceAgent = await getAllEcheancesByAgent(req.query.wallet);
    // console.log({AllOperation})
    // console.log({ AllOperationAway})
    // console.log({AllOperationAwayAgent})
    // console.log({echeances})
    console.log({ AllEcheanceAgent });
    console.log('req', req.query);
    res.send({
      operations: [
        ...AllOperation,
        ...AllOperationAway,
        ...AllOperationAwayAgent,
        ...echeances,
        ...AllEcheanceAgent
      ]
    });
  }

  //   res.send({
  //     //    cashouts: await getAllCashout(req.query.wallet),
  //     operations: [...AllOperation, ...AllOperationAway, ...AllOperationAwayAgent, ...echeances],
  //   });
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
};


