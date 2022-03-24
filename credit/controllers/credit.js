/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
const Web3 = require('web3');
const Cryptr = require('cryptr');

const User = require('../models/Users');
const Notifications = require('../models/Notifications');
const Contract = require('../contractCredit');

const localProvider = 'http://127.0.0.1:8545'; // quroum
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

const cryptr = new Cryptr('myTotalySecretKey');
const dep = new web3.eth.Contract(Contract.ABIcredit, Contract.addressCREDIT);

const getCreditDetails = (id, wallet) =>
  new Promise((resolve, reject) => {
    dep.methods.getcredit(id, wallet).call((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

const getLastCreditDetails = (wallet) =>
  new Promise((resolve, reject) => {
    dep.methods.NBRCredit(wallet).call(async (error, result) => {
      if (error) reject(error);
      else {
        const credit = await getCreditDetails(result - 1, wallet);
        resolve(credit);
      }
    });
  });

const controller = {
  // update state of adherents

  getSalairebyadherent(req, res) {
    User.findOne({ rib: req.query.rib }, (err, user) => {
      if (err) {
        res.json('error');
      } else {
        res.json({
          pourcentage: (user.somme * 25) / 100,
          salarie: user.somme,
        });
      }
    });
  },
  updateSalaireUser(req, res) {
    console.log('rrr');
    User.find({ rib: req.body.rib }, (err, user) => {
      console.log(user);
    });
    console.log('ttt');
    User.updateOne({ rib: req.body.rib }, { somme: req.body.salaire }, (err, user) => {
      res.send({ user, err });
    });
  },

  // fonction Confirmation du salarie
  Confirmationsalarie(req, res) {
    User.find({ email: req.body.email }, (err0, user0) => {
      console.log('user.salarie');

      if (user0.salarie === false) {
        res.status(202).json("l'adherent est n'pas salarié");
      } else {
        User.updateOne(
          { email: req.body.email },
          {
            somme: req.body.somme,
            frequence: req.body.frequence,
            NumberMoisEpargne: req.body.NumberMoisEpargne,
            NumberFoisOBTPrêt: req.body.NumberFoisOBTPrêt,
            statusPrêtAvantInc: req.body.statusPrêtAvantInc,
          },
          // eslint-disable-next-line no-unused-vars
          (err1, user1) => {
            if (err1) {
              console.error(err1);
            } else {
              User.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                  console.err(err);
                } else {
                  console.log(user);
                  res.json({
                    // id: user.id,
                    wallet: user.wallet,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    salarie: user.salarie,
                    username: User.username,
                    somme: user.somme,
                    frequence: user.frequence,
                    NumberMoisEpargne: user.NumberMoisEpargne,
                    NumberFoisOBTPrêt: user.NumberFoisOBTPrêt,
                    statusPrêtAvantInc: user.statusPrêtAvantInc,
                  });
                }
              });
            }
          }
        );
      }
    });
  },
  // fonction de demande de Credit

  DemandeCredit(req, res) {
    User.findOne({ rib: req.body.rib }, (err, user) => {
      if (user.somme * 0.25 >= req.body.pret && user.pretencoure === false) {
        const decryptedPK = cryptr.decrypt(user.encrypt);

        web3.eth.accounts.wallet.add(decryptedPK);

        dep.methods.ObtentionDePret(true, req.body.pret, user.wallet).send(
          {
            gas: '3000000',
            from: user.wallet,
          },
          (error, result) => {
            console.log({ error, result });
            if (error == null) {
              console.log(error);
              res.send(result);
              console.log(result);
              User.updateOne(
                { rib: req.body.rib },
                { pretencoure: true, montantpret: req.body.pret },
                (err2, result2) => {
                  if (err) {
                    console.error(err2);
                  } else {
                    console.log(result2);
                  }
                }
              );
            }
          }
        );
      } else {
        res.json('vous avez une avnce sur salaire non paye');
      }
    });
  },

  // fonction versemenet de salaire de l'adherenet
  VersementSalaireAdhh(req, res) {
    User.findOne({ rib: req.body.rib }, async (err, user) => {
      console.log(user);
      web3.eth.accounts.wallet.add(
        '0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63'
      );
      const credit = await getLastCreditDetails(user.wallet);
      if (parseInt(credit['2'], 10) === 0) {
        dep.methods.VersementSalaireAdh(user.wallet).send(
          {
            gas: '3000000',
            from: '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73',
          },
          (error, result) => {
            console.log(result);
            const salaireFinal = user.somme - (user.montantpret + user.montantpret * 0.05);
            const dateActuel = new Date().getTime();
            const Notif = new Notifications({
              idCredit: credit['0'],
              borrower: user.wallet,
              TypeNotification: 'VersementSalaire',
              DateNotif: dateActuel,
              amountT: user.montantpret,
              elimine: false,
              vu: false,
            });

            Notif.save((errT, NotifT) => {
              if (errT) {
                console.log('error');

                //                    res.status(804).end();
                console.error(errT);
              }
              console.log('Transfert saved to db', NotifT);
            });

            User.updateOne(
              { rib: req.body.rib },
              { pretencoure: false, montantpret: 0, SoldDigital: salaireFinal },
              (err2, result2) => {
                if (err) {
                  console.error(err2);
                } else {
                  console.log(result2);
                  res.send(result2);
                }
              }
            );
          }
        );
      } else {
        res.send('credit non existant');
      }
    });
  },

  getNBRCredit(req, res) {
    User.findOne({ rib: req.query.rib }, (err, user) => {
      if (err || user == null) {
        // better to ALWAYS! handle errors
        res.json({
          error: 'User with specified email cannot be found',
        });
      } else {
        //      console.log(user);
        //        console.log(user.wallet);

        dep.methods.NBRCredit(user.wallet).call(async (error, result) => {
          const results = [];
          for (let i = 0; i < result; i += 1) {
            results.push(getCreditDetails(i, user.wallet));
          }

          const credits = await Promise.all(results);

          console.log({ credits, nbrCredit: result });
          res.send({ credits, nbrCredit: result });
        });
      }
    });
  },
  // fonction  get nbre de credit en coure
  // getcreditencours: function (req, res) {
  //   User.findOne({ email: req.query.email }, function (err, user) {
  //     console.log({ user, err });
  //     if (err || user == null || user.pretencoure == false) {
  //       res.status(405).json("AUCUN CRÉDIT ACTIF");
  //     } else {
  //       dep.methods.getNBRCredit(user.wallet).call(function (error, masta1) {
  //         //res.send(result)
  //         console.log(masta1);

  //         dep.methods
  //           .getcredit(parseInt(masta1) - 1, user.wallet)
  //           .call(function (error, result) {
  //             res.send({ result, nbrCredit: masta1 });
  //             console.log({ result, nbrCredit: masta1 });
  //           });
  //       });
  //     }
  //   });
  // },

  //     //fonction getcredit
  // getcreditt: function (req, res) {
  //   User.findOne({ email: req.query.email }, function (err, user) {
  //     if (err || user == null) {
  //       // better to ALWAYS! handle errors
  //       res.status(404).json({
  //         error: "User with specified email cannot be found",
  //       });
  //     } else {
  //       console.log(user);
  //       console.log(user.wallet);

  //       dep.methods
  //         .getcredit(req.query.idCredit, user.wallet)
  //         .call(function (error, result) {
  //           res.send(result);
  //         });
  //       dep.methods.getNBRCredit(user.wallet).call(function (error, result) {
  //         res.send(result);
  //       });
  //     }
  //   });
  // },

  // getcredit: function (req, res) {
  //   User.findOne({ email: req.body.email }, function (err, user) {
  //     dep.methods
  //       .getcredit(req.body.idCredit, user.wallet)
  //       .call(function (error, result) {
  //         res.send(result);
  //       });
  //   });
  // },
};
module.exports = controller;
