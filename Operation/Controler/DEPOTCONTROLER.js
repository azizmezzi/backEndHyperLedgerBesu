/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable no-lonely-if */
// eslint-disable-next-line import/no-extraneous-dependencies
const Web3 = require('web3');
const Cryptr = require('cryptr');

const User = require('../models/Users');
const Agent = require('../models/Agents');
const Notifications = require('../models/Notifications');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const Contract = require('../contract');

const dep = new web3.eth.Contract(Contract.AbiDepot, Contract.address);

// const Cashin = require('../models/Cashin');
const cryptr = new Cryptr('myTotalySecretKey');

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// let MobileDetect = require('mobile-detect');
// const Transfer = require('../models/Transfer');

// function newTransfer
exports.TransfertOperation = async (req, res) => {
  // if (req.body.reciver == 0x0) {
  //   res.status(202).json("reciver address cannot be set to zero");
  // }

  if (req.body.amount < 10 || req.body.amount > 1000) {
    res.status(203).json('amountInvalid');
  } else {
    // const DPK = decrypt(req.body.privateKey, req.body.sender)
    // console.log(DPK);

    if (req.body.rib !== '') {
      if (parseInt(req.body.typeOperation, 10) !== 3) {
        User.findOne({ rib: parseInt(req.body.rib, 10) }, (err, user) => {
          if (err) {
            console.log(err);
            res.json('error');
          } else {
            if (user !== null) {
              const decryptedPK = cryptr.decrypt(req.body.privateKey);

              web3.eth.accounts.wallet.add(decryptedPK);
              // web3.eth.getBalance(req.body.sender).then(console.log);
              const dateA = new Date();
              const dateActuel = dateA.getTime();

              dep.methods
                .newOperation(
                  req.body.sender,
                  user.wallet,
                  dateActuel,
                  req.body.amount,
                  req.body.typeOperation,
                  req.body.name
                )
                .send({ from: req.body.sender, gas: 6500000 }, async (error, result) => {
                  //  if (!error) {
                  console.log(`Hash${result}`);
                  await timeout(2000);
                  web3.eth.accounts.wallet.add(decryptedPK);

                  dep.methods
                    .setOperationHash(result, req.body.sender, dateActuel)
                    .send({ from: req.body.sender, gas: 6500000 }, (error2, result2) => {
                      console.log('res2', result2);
                      if (!error2) {
                        console.log('e77', result2);
                        //                  res.send(result2);
                      }
                    })
                    .catch((e) => {
                      console.log('err', e);
                    });

                  switch (parseInt(req.body.typeOperation, 10)) {
                    case 0: {
                      const Notif = new Notifications({
                        senderT: req.body.sender,
                        borrower: user.wallet,
                        fnamesenderT: req.body.fnamesender,
                        TypeNotification: 'Transfert',
                        namesenderT: req.body.lnamesender,
                        DateNotif: dateActuel,
                        amountT: req.body.amount,
                        elimine: false,
                        vu: false,
                      });

                      Notif.save((errNotif, NotifT) => {
                        if (err) {
                          console.log('error');
                          console.log(errNotif, NotifT);
                          //                    res.status(804).end();
                          return console.error(err);
                        }
                        console.log('Transfert saved to db');
                      });

                      break;
                    }
                    case 1: {
                      User.updateOne(
                        { wallet: req.body.sender },
                        { SoldDigital: user.SoldDigital - req.body.amount },
                        (errUpdate, userUpdate) => {
                          if (errUpdate) {
                            res.json('error', errUpdate);
                          } else {
                            console.log(userUpdate);
                          }
                        }
                      );

                      break;
                    }
                    case 2: {
                      const Notif = new Notifications({
                        senderT: req.body.sender,
                        borrower: user.wallet,
                        fnamesenderT: req.body.fnamesender,
                        TypeNotification: 'Transfert',
                        namesenderT: req.body.lnamesender,
                        DateNotif: dateActuel,
                        amountT: req.body.amount,
                        elimine: false,
                        vu: false,
                      });

                      Notif.save((errNotif2, NotifT) => {
                        if (err) {
                          console.log('error');
                          console.log(errNotif2);
                          //                    res.status(804).end();
                          console.error(errNotif2);
                        } else {
                          console.log('Transfert saved to db', NotifT);
                        }
                      });

                      break;
                    }
                    default:
                      break;
                  }
                })

                .then(async (result) => {
                  res.send(result);
                })
                .catch((e) => console.log('e88', e));
            } else {
              if (parseInt(req.body.typeOperation, 10) === 2) {
                Agent.findOne({ rib: parseInt(req.body.rib, 10) }, (Err, agent) => {
                  if (Err) {
                    console.log();
                    res.json('error', Err);
                  } else {
                    if (agent !== null) {
                      const decryptedPK = cryptr.decrypt(req.body.privateKey);

                      web3.eth.accounts.wallet.add(decryptedPK);
                      // web3.eth.getBalance(req.body.sender).then(console.log);
                      const dateA = new Date();
                      const dateActuel = dateA.getTime();
                      console.log(dateActuel);
                      dep.methods
                        .newOperation(
                          req.body.sender,
                          agent.wallet,
                          dateActuel,
                          req.body.amount,
                          req.body.typeOperation,
                          req.body.name
                        )
                        .send({ from: req.body.sender, gas: 6500000 }, async (error, result) => {
                          //  if (!error) {
                          console.log(`Hash${result}`);
                          await timeout(2000);
                          web3.eth.accounts.wallet.add(decryptedPK);

                          dep.methods
                            .setOperationHash(result, req.body.sender, dateActuel)
                            .send({ from: req.body.sender, gas: 6500000 }, (error2, result2) => {
                              console.log('res2', result2);
                              if (!error2) {
                                console.log('e77', result2);
                                //                  res.send(result2);
                              }
                            })
                            .catch((e) => {
                              console.log('err', e);
                            });
                        })

                        .then(async (result) => {
                          res.send(result);
                        })
                        .catch((e) => console.log('e88', e));
                    } else {
                      res.status(210).json('user null');
                    }
                  }
                });
              } else res.status(210).json('user null');
            }
          }
        });
      } else {
        Agent.findOne({ rib: parseInt(req.body.rib, 10) }, (err, agent) => {
          if (err) {
            console.log(err);
            res.json('error');
          } else {
            if (agent !== null) {
              const decryptedPK = cryptr.decrypt(req.body.privateKey);

              web3.eth.accounts.wallet.add(decryptedPK);
              // web3.eth.getBalance(req.body.sender).then(console.log);
              const dateA = new Date();
              const dateActuel = dateA.getTime();
              console.log(dateActuel);
              dep.methods
                .newOperation(
                  req.body.sender,
                  agent.wallet,
                  dateActuel,
                  req.body.amount,
                  req.body.typeOperation,
                  req.body.name
                )
                .send({ from: req.body.sender, gas: 6500000 }, async (error, result) => {
                  //  if (!error) {
                  console.log(`Hash${result}`);
                  await timeout(2000);
                  web3.eth.accounts.wallet.add(decryptedPK);

                  dep.methods
                    .setOperationHash(result, req.body.sender, dateActuel)
                    .send({ from: req.body.sender, gas: 6500000 }, (erroropHash, result2) => {
                      console.log('res2', result2);
                      if (!erroropHash) {
                        console.log('e77', result2);
                        //                  res.send(result2);
                      } else console.log({ erroropHash });
                    })
                    .catch((e) => {
                      console.log('err', e);
                    });
                })

                .then(async (result) => {
                  res.send(result);
                })
                .catch((e) => console.log('e88', e));
            } else {
              res.status(210).json('user null');
            }
          }
        });
      }
    } else {
      res.status(212).json('data Invalid(rib)');
    }
  }
};

exports.getNotificationTransfert = (req, res) => {
  // console.log(req.query.rib);
  Notifications.find(
    {
      $and: [{ receiverT: req.query.wallet }, { TypeNotification: 'Transfert' }],
    },
    (err, notification) => {
      if (err) {
        res.json('error');
      } else {
        //  console.log(notification);
        res.json({ notification });
      }
    }
  );
};

exports.getSoldDigital = async (req, res) => {
  console.log(req.query.rib);
  User.findOne({ rib: parseInt(req.query.rib, 10) }, (err, user) => {
    res.send({ SoldDigital: user.SoldDigital });
  });
};

exports.updateSold = (req, res) => {
  User.updateOne({ rib: req.body.rib }, { SoldDigital: req.body.amount }, (err, user) => {
    if (err) {
      res.json('error');
    } else {
      console.log(user);
    }
  });
};
