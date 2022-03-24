var User = require("../models/Users");
var Agent = require("../models/Agents");
var Intermediate = require("../models/intermediate");
var Notifications = require("../models/Notifications");

var Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const Contract = require("../contract");
var dep = new web3.eth.Contract(Contract.AbiDepot, Contract.address);
var mySC_IMFT = new web3.eth.Contract(Contract.AbiImft, Contract.addressIMFT);

const Cryptr = require("cryptr");
const Cashin = require("../models/Cashin");
const cryptr = new Cryptr("myTotalySecretKey");

var MobileDetect = require("mobile-detect");
const Transfer = require("../models/Transfer");

//function newTransfer
exports.TransfertOperation = async (req, res) => {
  // if (req.body.reciver == 0x0) {
  //   res.status(202).json("reciver address cannot be set to zero");
  // }

  if (req.body.amount < 10 || req.body.amount > 1000) {
    res.status(203).json("amountInvalid");
  } else {
    //const DPK = decrypt(req.body.privateKey, req.body.sender)
    //console.log(DPK);

    if (req.body.rib !== "") {
      if (req.body.typeOperation != 3) {
        User.findOne({ rib: parseInt(req.body.rib, 10) }, function (err, user) {
          if (err) {
            console.log(err);
            res.json("error");
          } else {
            if (user !== null) {
              const decryptedPK = cryptr.decrypt(req.body.privateKey);

              web3.eth.accounts.wallet.add(decryptedPK);
              //web3.eth.getBalance(req.body.sender).then(console.log);
              const date_A = new Date();
              const date_Actuel = date_A.getTime();

              dep.methods
                .newOperation(
                  req.body.sender,
                  user.wallet,
                  date_Actuel,
                  req.body.amount,
                  req.body.typeOperation,
                  req.body.name
                )
                .send({ from: req.body.sender, gas: 6500000 }, async function (
                  error,
                  result
                ) {
                  //  if (!error) {
                  console.log("Hash" + result);
                  await timeout(2000);
                  web3.eth.accounts.wallet.add(decryptedPK);

                  dep.methods
                    .setOperationHash(result, req.body.sender, date_Actuel)
                    .send({ from: req.body.sender, gas: 6500000 }, function (
                      error,
                      result2
                    ) {
                      console.log("res2", result2);
                      if (!error) {
                        console.log("e77", result2);
                        //                  res.send(result2);
                      }
                    })
                    .catch((e) => {
                      console.log("err", e);
                    });

                  switch (parseInt(req.body.typeOperation, 10)) {
                    case 0: {
                      var Notif = new Notifications({
                        senderT: req.body.sender,
                        borrower: user.wallet,
                        fnamesenderT: req.body.fnamesender,
                        TypeNotification: "Transfert",
                        namesenderT: req.body.lnamesender,
                        DateNotif: date_Actuel,
                        amountT: req.body.amount,
                        elimine: false,
                        vu: false,
                      });

                      Notif.save(function (err, NotifT) {
                        if (err) {
                          console.log("error");
                          console.log(err);
                          //                    res.status(804).end();
                          return console.error(err);
                        }
                        console.log("Transfert saved to db");
                      });

                      break;
                    }
                    case 1: {
                      User.update(
                        { wallet: req.body.sender },
                        { SoldDigital: user.SoldDigital - req.body.amount },
                        function (err, user) {
                          if (err) {
                            res.json("error");
                          } else {
                            //     console.log(user);
                          }
                        }
                      );

                      break;
                    }
                    case 2: {
                      var Notif = new Notifications({
                        senderT: req.body.sender,
                        borrower: user.wallet,
                        fnamesenderT: req.body.fnamesender,
                        TypeNotification: "Transfert",
                        namesenderT: req.body.lnamesender,
                        DateNotif: date_Actuel,
                        amountT: req.body.amount,
                        elimine: false,
                        vu: false,
                      });
			console.log("notif is here")
			console.log(Notif)
                      Notif.save(function (err, NotifT) {
                        if (err) {
                          console.log("error");
                          console.log(err);
                          //                    res.status(804).end();
                          return console.error(err);
                        }
                        console.log("Transfert saved to db");
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
                .catch((e) => console.log("e88", e));
            } else {
              if (req.body.typeOperation == 2) {
                Agent.findOne({ rib: parseInt(req.body.rib, 10) }, function (
                  err,
                  agent
                ) {
                  if (err) {
                    console.log(err);
                    res.json("error");
                  } else {
                    if (agent !== null) {
                      const decryptedPK = cryptr.decrypt(req.body.privateKey);

                      web3.eth.accounts.wallet.add(decryptedPK);
                      //web3.eth.getBalance(req.body.sender).then(console.log);
                      const date_A = new Date();
                      const date_Actuel = date_A.getTime();
                      console.log(date_Actuel);
                      dep.methods
                        .newOperation(
                          req.body.sender,
                          agent.wallet,
                          date_Actuel,
                          req.body.amount,
                          req.body.typeOperation,
                          req.body.name
                        )
                        .send(
                          { from: req.body.sender, gas: 6500000 },
                          async function (error, result) {
                            //  if (!error) {
                            console.log("Hash" + result);
                            await timeout(2000);
                            web3.eth.accounts.wallet.add(decryptedPK);

                            dep.methods
                              .setOperationHash(
                                result,
                                req.body.sender,
                                date_Actuel
                              )
                              .send(
                                { from: req.body.sender, gas: 6500000 },
                                function (error, result2) {
                                  console.log("res2", result2);
                                  if (!error) {
                                    console.log("e77", result2);
                                    //                  res.send(result2);
                                  }
                                }
                              )
                              .catch((e) => {
                                console.log("err", e);
                              });
                          }
                        )

                        .then(async (result) => {
                          res.send(result);
                        })
                        .catch((e) => console.log("e88", e));
                    } else {
                      res.status(210).json("user null");
                    }
                  }
                });
              } else res.status(210).json("user null");
            }
          }
        });
      } else {
        Agent.findOne({ rib: parseInt(req.body.rib, 10) }, function (
          err,
          agent
        ) {
          if (err) {
            console.log(err);
            res.json("error");
          } else {
            if (agent !== null) {
              const decryptedPK = cryptr.decrypt(req.body.privateKey);

              web3.eth.accounts.wallet.add(decryptedPK);
              //web3.eth.getBalance(req.body.sender).then(console.log);
              const date_A = new Date();
              const date_Actuel = date_A.getTime();
              console.log(date_Actuel);
              dep.methods
                .newOperation(
                  req.body.sender,
                  agent.wallet,
                  date_Actuel,
                  req.body.amount,
                  req.body.typeOperation,
                  req.body.name
                )
                .send({ from: req.body.sender, gas: 6500000 }, async function (
                  error,
                  result
                ) {
                  //  if (!error) {
                  console.log("Hash" + result);
                  await timeout(2000);
                  web3.eth.accounts.wallet.add(decryptedPK);

                  dep.methods
                    .setOperationHash(result, req.body.sender, date_Actuel)
                    .send({ from: req.body.sender, gas: 6500000 }, function (
                      error,
                      result2
                    ) {
                      console.log("res2", result2);
                      if (!error) {
                        console.log("e77", result2);
                        //                  res.send(result2);
                      }
                    })
                    .catch((e) => {
                      console.log("err", e);
                    });
                })

                .then(async (result) => {
                  res.send(result);
                })
                .catch((e) => console.log("e88", e));
            } else {
              res.status(210).json("user null");
            }
          }
        });
      }
    } else {
      res.status(212).json("data Invalid(rib)");
    }
  }
};

//function newTransfer
exports.newTransfer = async (req, res) => {
  // if (req.body.reciver == 0x0) {
  //   res.status(202).json("reciver address cannot be set to zero");
  // }

  if (req.body.amount < 10 || req.body.amount > 1000) {
    res.status(203).json("amountInvalid");
  } else {
    //const DPK = decrypt(req.body.privateKey, req.body.sender)
    //console.log(DPK);

    if (req.body.id_reciver !== "") {
      User.findOne({ rib: parseInt(req.body.id_reciver, 10) }, function (
        err,
        user
      ) {
        if (err) {
          console.log(err);
          res.json("error");
        } else {
          if (user !== null) {
            console.log("done");
            console.log({
              id: user.id,
              wallet: user.wallet,
              firstname: user.firstname,
              lastname: user.lastname,
            });

            const decryptedPK = cryptr.decrypt(req.body.privateKey);

            web3.eth.accounts.wallet.add(decryptedPK);
            //web3.eth.getBalance(req.body.sender).then(console.log);
            const date_A = new Date();
            const date_Actuel = date_A.getTime();
            console.log(date_Actuel);
            dep.methods
              .newTransfer(
                date_Actuel,
                //          "0x494d4654",

                user.wallet,
                req.body.amount,
                req.body.lnamesender,
                req.body.fnamesender,
                req.body.idsender,
                user.firstname,
                user.id
              )
              .send({ from: req.body.sender, gas: 6500000 }, async function (
                error,
                result
              ) {
                //  if (!error) {
                console.log("Hash" + result);
                await timeout(2000);
                web3.eth.accounts.wallet.add(decryptedPK);

                dep.methods
                  .setTransfertHash(result, date_Actuel)
                  .send({ from: req.body.sender, gas: 6500000 }, function (
                    error,
                    result2
                  ) {
                    console.log("res2", result2);
                    if (!error) {
                      console.log("e77", result2);
                      //                  res.send(result2);
                    }
                  })
                  .catch((e) => {
                    console.log("err", e);
                  });
                // }
                /* await Notifications.findOne({ receiverT: user.wallet }, function (
                     err,
                     Notification
                   ) {
                     console.log({ Notification });
           
                     if (Notification === null) {*/
                var Notif = new Notifications({
                  senderT: req.body.sender,
                  borrower: user.wallet,
                  fnamesenderT: req.body.fnamesender,
                  TypeNotification: "Transfert",
                  namesenderT: req.body.lnamesender,
                  DateNotif: date_Actuel,
                  amountT: req.body.amount,
                  elimine: false,
                  vu: false,
                });

                Notif.save(function (err, NotifT) {
                  if (err) {
                    console.log("error");
                    console.log(err);
                    //                    res.status(804).end();
                    return console.error(err);
                  }
                  console.log("Transfert saved to db");
                });
                //   }
                //});
              })

              .then(async (result) => {
                res.send(result);
                //Send Data
                //       const rib  = parseInt(req.body.id_reciver, 10);
                // var Sex = await getSex(rib)
                // var Profession = await getProfession(rib)
                // var Age = await getAge(rib)
                // var Agence = await getAgence(rib)
                // var transferData =  {
                //   Time: getTime(),
                //   Type: getType(new MobileDetect(req.headers["user-agent"])),
                //   Amount: getAmount(req.body.amount),
                //   Sex: Sex,
                //   Age: Age,
                //   Profession: Profession,
                //   Agence: Agence,
                // };
                // var transfer = new Transfer(transferData);
                // transfer.save((err, res) => {
                //   console.log({res,err})
                // });
              })
              .catch((e) => console.log("e88", e)); //res.status(207).send("error transfer invalid"));

            /*    dep.methods
          .newTransfer(
            "0x494d4654",
            user.wallet,
            req.body.amount,
            req.body.lnamesender,
            req.body.fnamesender,
            req.body.idsender,
            user.firstname,
            user.id
          )
          .send({ from: req.body.sender, gas: 6500000  }, function(
            error,
            result
          ) {
	if(!error){
            console.log("Hash" + result);
           
              dep.methods
                .setTransfertHash(result)
                .send({ from: req.body.sender, gas: 6500000 }, function(
                  error,
                  result2
                ) {
	if(!error){           
       console.log("e77",result2);
//                  res.send(result2); 
}
                });
            }
          })

          .then(result => {
           res.send(result)
          })
          .catch(e =>console.log("e88",e)) //res.status(207).send("error transfer invalid"));
*/
          } else {
            // res.send('user null');
            res.status(210).json("user null");
          }
        }
      });
    } else {
      const decryptedPK = cryptr.decrypt(req.body.privateKey);

      web3.eth.accounts.wallet.add(decryptedPK);
      //web3.eth.getBalance(req.body.sender).then(console.log);
      const date_A = new Date();
      const date_Actuel = date_A.getTime();
      console.log(
        req.body.sender,
        req.body.amount,
        req.body.lnamesender,
        req.body.fnamesender,
        req.body.idsender,
        req.body.NomPrenom,
        parseInt(req.body.CIN)
      );
      dep.methods
        .newTransfer(
          date_Actuel,
          //          "0x494d4654",

          "0xdc52d58431AAC13a1C2f28483e1798C3082d4682",
          req.body.amount,
          req.body.lnamesender,
          req.body.fnamesender,
          req.body.idsender,
          req.body.NomPrenom,
          parseInt(req.body.CIN)
        )
        .send({ from: req.body.sender, gas: 6500000 }, async function (
          error,
          result
        ) {
          //  if (!error) {
          console.log("Hash" + result);
          await timeout(2000);
          web3.eth.accounts.wallet.add(decryptedPK);

          dep.methods
            .setTransfertHash(result, date_Actuel)
            .send({ from: req.body.sender, gas: 6500000 }, function (
              error,
              result2
            ) {
              console.log("res2", result2);
              if (!error) {
                console.log("e77", result2);
                //                  res.send(result2);
              }
            })
            .catch((e) => {
              console.log("err", e);
            });
          // }
        })

        .then((result) => {
          res.send(result);
        })
        .catch((e) => console.log("e88", e)); //res.status(207).send("error transfer invalid"));
    }
  }
};

//function newCashin
exports.newCashin = async (req, res) => {
  if (req.body.reciver == 0x0) {
    res.status(202).json("reciver address cannot be set to zero");
  }

  if (req.body.amount < 10 || req.body.amount > 1000) {
    res.status(203).json("amountInvalid");
  } else {
    console.log("******************");

    //console.log(decrypt(String(req.body.privateKey),req.body.sender));
    //const pk = ""+req.body.privateKey;
    //const send = ""+req.body.sender;
    //console.log(req.body.privateKey)
    //console.log(decrypt("2bd5489478421aaaf093a94cf6eb132a02ba7c19d9eeff96800b991783df67e9e43673831264e415fced3a4b617a5678bf8573407fd7d5f51a209d788",send));

    console.log(req.body.privateKey);
    const decryptedPK = cryptr.decrypt(req.body.privateKey);

    web3.eth.accounts.wallet.add(decryptedPK);
    const date_Actuel = new Date().getTime();

    dep.methods
      .newCashin(
        //     "0x494d4654",
        req.body.reciver,
        req.body.nom_reciver,
        req.body.prenom_reciver,
        req.body.id_reciver,
        req.body.sender,
        req.body.lnamesender,
        req.body.fnamesender,
        req.body.unqIdsender,
        req.body.amountFiat,
        date_Actuel
      )
      .send({ from: req.body.sender, gas: 6500000 }, function (error, result) {
        console.log("Hash" + result);
        if (!error) {
          var Notif = new Notifications({
            senderT: req.body.sender,
            borrower: req.body.reciver,
            fnamesenderT: req.body.fnamesender,
            TypeNotification: "Cashin",
            namesenderT: req.body.lnamesender,
            DateNotif: date_Actuel,
            amountT: req.body.amountFiat,
            elimine: false,
            vu: false,
          });

          Notif.save(function (err, NotifT) {
            if (err) {
              console.log("error");
              console.log(err);
              //                    res.status(804).end();
              return console.error(err);
            }
            console.log("Cashin saved to db");
          });
          dep.methods
            .setCashinHash(result, date_Actuel)
            .send({ from: req.body.sender, gas: 6500000 }, async function (
              error,
              result2
            ) {
              console.log("e123", result2);
              res.send(result2);
              //Send Data

              // var Sex = await getSexAgent(req.body.rib)
              // var Profession = await getProfessionAgent(req.body.rib)
              // var Age = await getAgeAgent(req.body.rib)
              // var Agence = await getAgenceAgent(req.body.rib)
              // var cashinData =  {
              //   Time: getTime(),
              //   Type: getType(new MobileDetect(req.headers["user-agent"])),
              //   Amount: getAmount(req.body.amountFiat),
              //   Sex: Sex,
              //   Age: Age,
              //   Profession: Profession,
              //   Agence: Agence,
              // };
              // var cashin = new Cashin(cashinData);
              // cashin.save((err, res) => {
              //   console.log(res)
              // });
            });
        } else {
          console.log("e12", error);
        }
      })

      .catch((e) => {
        console.log("azae", e);
        res.status(207).send("error transfer invalid");
      });
  }
};

exports.newCashinAdherent = async (req, res) => {
  //   console.log(req.body);

  if (req.body.reciver == 0x0) {
    res.status(202).json("reciver address cannot be set to zero");
  }

  if (req.body.amount < 10 || req.body.amount > 1000) {
    res.status(203).json("amountInvalid");
  } else {
    console.log("******************");
    User.findOne({ rib: parseInt(req.body.rib, 10) }, function (err, user) {
      //   console.log(user);
      if (err) {
        console.log(err);
        res.json("error");
      } else {
        if (user !== null) {
          console.log(req.body.privateKey);
          const decryptedPK = cryptr.decrypt(user.encrypt);

          web3.eth.accounts.wallet.add(decryptedPK);
          const date_Actuel = new Date().getTime();

          dep.methods
            .newCashinAdherent(
              //     "0x494d4654",

              req.body.sender,
              req.body.lnamesender,
              req.body.fnamesender,
              req.body.unqIdsender,
              req.body.amount,
              date_Actuel
            )
            .send({ from: req.body.sender, gas: 6500000 }, async function (
              error,
              result
            ) {
              console.log("Hash" + result);
              // if (!error) {
              console.log("the result is here");
              console.log(result);
              if (result != undefined) {
                User.update(
                  { wallet: req.body.sender },
                  { SoldDigital: user.SoldDigital - req.body.amount },
                  function (err, user) {
                    if (err) {
                      res.json("error");
                    } else {
                      //     console.log(user);
                    }
                  }
                );
                console.log(result);
                await timeout(2000);
                dep.methods
                  .setCashinHash(result, date_Actuel)
                  .send({ from: req.body.sender, gas: 6500000 }, function (
                    error,
                    result2
                  ) {
                    console.log("e123", result2);
                    //  res.send(result2);
                  });
              } else {
                console.log("e12", error);
              }
            })

            .then((result) => {
              mySC_IMFT.methods
                .balanceOf(req.body.sender)
                .call(async function (error, resultB) {
                  console.log("reciver", resultB);

                  //Send Data

                  //               var Sex = await getSex(req.body.rib)
                  //               var Profession = await getProfession(req.body.rib)
                  //               var Age = await getAge(req.body.rib)
                  //               var Agence = await getAgence(req.body.rib)
                  //               var cashinData =  {
                  //                 Time: getTime(),
                  //                 Type: getType(new MobileDetect(req.headers["user-agent"])),
                  //                 Amount: getAmount(req.body.amount),
                  //                 Sex: Sex,
                  //                 Age: Age,
                  //                 Profession: Profession,
                  //                 Agence: Agence,
                  //               };
                  // console.log({cashinData})
                  //               var cashin = new Cashin(cashinData);
                  //               cashin.save((err, res) => {
                  //                 console.log(res,err)
                  //               });
                });
              res.send(result);
            })
            .catch((e) => {
              console.log("rere", e);
              res.status(207).send("error transfer invalid");
            });
        } else {
          // res.send('user null');
          res.status(210).json("user null");
        }
      }
    });
  }
};

// function getTime() {
//   return Date.now();
// };
// function getType(md) {
//   if (md.mobile() == null) {
//     return "Web";
//   } else return "Mobile";
// };
// function getAmount(amount) {
//   return amount;
// };
// const getSex = async (id) => {
//   return new Promise(async (resolve) => {
//     var data = "";

//     await User.find({
//       rib: id,
//     }).then((res) => {
// console.log(res)
//       data = res[0].Sex;

//     });

//     resolve( data );
//   });
// };
// const getProfession = async (id) =>  {
//   return new Promise(async (resolve) => {
//     var data = "";

//     await User.find({
//       rib: id,
//     }).then((res) => {

//       data = res[0].Profession;

//     });

//     resolve( data );
//   });
// };
// const getAge = async (id) => {
//   return new Promise(async (resolve) => {
//     var data = "";

//     await User.find({
//       rib: id,
//     }).then((res) => {

//       data = res[0].Age;

//     });

//     resolve( data );
//   });
// };
// const getAgence = async (id) => {
//   return new Promise(async (resolve) => {
//     var data = "";

//     await User.find({
//       rib: id,
//     }).then((res) => {

//       data = res[0].Agence;

//     });

//     resolve( data );
//   });
// };
// const getSexAgent = async (id) => {
//   return new Promise(async (resolve) => {
//     var data = "";

//     await Agent.find({
//       rib: id,
//     }).then((res) => {

//       data = res[0].Sex;

//     });

//     resolve( data );
//   });
// };
// const getProfessionAgent = async (id) =>  {
//   return new Promise(async (resolve) => {
//     var data = "";

//     await Agent.find({
//       rib: id,
//     }).then((res) => {

//       data = res[0].Profession;

//     });

//     resolve( data );
//   });
// };
// const getAgeAgent = async (id) => {
//   return new Promise(async (resolve) => {
//     var data = "";

//     await Agent.find({
//       rib: id,
//     }).then((res) => {

//       data = res[0].Age;

//     });

//     resolve( data );
//   });
// };
// const getAgenceAgent = async (id) => {
//   return new Promise(async (resolve) => {
//     var data = "";

//     await Agent.find({
//       rib: id,
//     }).then((res) => {

//       data = res[0].Agence;

//     });

//     resolve( data );
//   });
// };
//return number of transfers
exports.getTransferLength = (req, res) => {
  dep.methods.getTransferLength().call(function (err, result) {
    res.send(result);
  });
};

//return number of token symbol
exports.tokenSymbole = (req, res) => {
  dep.methods.tokenSymbole().call(function (err, result) {
    res.send(result);
  });
};

//return number of CashIn
exports.getCashinLength = (req, res) => {
  dep.methods.getCashinLength().call(function (err, result) {
    res.send(result);
  });
};

//function getTransferInfo
exports.getTransferInfo = (req, res) => {
  dep.methods.getTransferInfo(req.body.id).call(function (error, result) {
    if (!result) {
      res.send("erreur");
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

//function getCashinInfo
exports.getcashInInfo = (req, res) => {
  dep.methods.getcashInInfo(req.body.id).call(function (error, result) {
    res.send(result);
  });
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//function addNewToken
exports.addNewToken = async (req, res) => {
  //const DPK = decrypt(req.body.privateKey, req.body.sender)
  //console.log(DPK);
  const decryptedPK = cryptr.decrypt(req.body.privateKey);

  web3.eth.accounts.wallet.add(decryptedPK);
  dep.methods
    .addNewToken(req.body.symbol, req.body.address)
    .send({ from: accounts[0], gas: 30000000 }, function (error, result) {})

    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
      res.status(208).send("error address token invalid");
    });
};

/*
Return transfers made by a specific user(sender)
@param1: address of sender [sender]
*/

exports.getTotal = (req, res) => {
  dep.methods.getTotal(req.body.reciver).call((err, result) => {
    res.send(result);
  });
};

//var cashin = [];
exports.getTransferInfoSender = (req, res) => {
  var ALLT = [];

  User.findOne({ wallet: req.query.sender }, async function (err, sender) {
    if (err) {
      res.json("error");
    } else {
      await dep.methods
        .getUserTransferLength(req.query.sender)
        .call(async (err, len) => {
          if (len == 0) {
            res.json("aucun transfert effectué");
          } else {
            for (i = 0; i < len; i++) {
              ALLT.push(await getTransferInfo(req.query.sender, i));
            }
            res.send(ALLT);
          }
        });
    }
  });
};

const getTransferInfo = (sender, i) => {
  return new Promise(async (resolve) => {
    await dep.methods.getTransferIndex(sender, i).call(async (err, index) => {
      await dep.methods.getTransferInfo(index).call((err, result) => {
        console.log("here the transfert");
        console.log(result);
        User.findOne({ wallet: result._reciver }, function (err, reciver) {
          resolve({ result, sender, reciver });
        });
      });
    });
  });
};
/*var ALLT = [];
exports.getTransferInfoSender = (req, res) => {
  User.findOne({ wallet: req.query.sender }, function (err, sender) {
    if (err) {
      res.json("error");
    } else {
      dep.methods.getUserTransferLength(req.query.sender).call((err, len) => {
        if (len == 0) {
          res.json("aucun transfert effectué");
        } else {
          for (i = 0; i < len; i++) {
            (function (i) {
              dep.methods
                .getTransferIndex(req.query.sender, i)
                .call((err, index) => {
                  dep.methods.getTransferInfo(index).call((err, result) => {
                    console.log(result);
                    User.findOne({ wallet: result._reciver }, function (
                      err,
                      reciver
                    ) {
                      ALLT.push({ result, sender, reciver });

                      if (len - 1 === i) {
                        console.log(ALLT);
                        res.send(ALLT);
                        ALLT = [];
                      }
                    });
                  });
                });
            })(i);
          }
        }
      });
    }
  });
};
*/
var ALLTD = [];
exports.getTransferInfoSenderDate = (req, res) => {
  dep.methods.getUserTransferLength(req.body.sender).call((err, len) => {
    for (i = 0; i < len; i++) {
      (function (i) {
        dep.methods.getTransferIndex(req.body.sender, i).call((err, index) => {
          dep.methods.getTransferInfo(index).call((err, result) => {
            var date = new Date(result[7] * 1000);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            console.log("->" + date);

            if (
              year == req.body.year &&
              month == req.body.month &&
              day == req.body.day
            ) {
              ALLTD.push(result);
              console.log(day + "/" + month + "/" + year);
            }

            if (len - 1 === i) {
              res.send(ALLTD);
              ALLTD = [];
            }
          });
        });
      })(i);
    }
  });
};

/*
@param1: address of user [reciver]
*/
// /getCashinInfo/sender

const getcashInInfo = async (receiver) => {
  return new Promise(async (resolve) => {
    let cashin = [];
    await dep.methods.getCashInIndex(receiver, i).call(async (err, index) => {
      await dep.methods.getcashInInfo(index).call((err, result) => {
        console.log("cashin2", result);
        resolve(result);
      });
    });
  });
};

const getCashInIndex = async (receiver, len) => {
  return new Promise(async (resolve) => {
    let cashin = [];
    for (i = 0; i < len; i++) {
      //   await       dep.methods.getCashInIndex(receiver, i).call(async(err, index) => {

      // console.log('cashin', await  getcashInInfo(index))
      cashin.push(await getcashInInfo(receiver));

      //         });
    }
    console.log("cashin", cashin);

    resolve(cashin);
  });
};

exports.getCashinInfo_reciver = async (req, res) => {
  await dep.methods
    .getUserCashInLength(req.query.reciver)
    .call(async (err, len) => {
      res.send(await getCashInIndex(req.query.reciver, len));
    });
};

/*
var cashin = [];
exports.getCashinInfo_reciver = (req, res) => {
  dep.methods.getUserCashInLength(req.query.reciver).call((err, len) => {
    for (i = 0; i < len; i++) {
//      (function (i) {
       dep.methods.getCashInIndex(req.query.reciver, i).call((err, index) => {
          //console.log("CASHIN  INDEX:" + index);
         dep.methods.getcashInInfo(index).call((err, result) => {
            cashin.push(result);
console.log(i)
            console.log(cashin);
        //    if (i === len - 1) {
          //    res.send(cashin);
          //   cashin = [];
           // }
          });
        });
  //    })(i);
    }
console.log('tiiitt')
res.send(cashin);

  });
};
*/
/*
Return Cashins  by user AND date
 
@param1: address of user [Reciver]
@param2: Date [date]
*/

var cashind = [];
exports.getCashinInfo_reciver_date = (req, res) => {
  dep.methods.getUserCashInLength(req.body.reciver).call((err, len) => {
    for (i = 0; i < len; i++) {
      (function (i) {
        dep.methods.getCashInIndex(req.body.reciver, i).call((err, index) => {
          console.log(index);
          dep.methods.getcashInInfo(index).call((err, result) => {
            var date = new Date(result[3] * 1000);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            console.log(date);
            console.log(result);
            if (
              year == req.body.year &&
              month == req.body.month &&
              day == req.body.day
            ) {
              cashind.push(result);
            }

            if (i === len - 1) {
              res.send(cashind);
              cashind = [];
            }
          });
        });
      })(i);
    }
  });
};

exports.aaaa = function (req, res) {
  web3.eth.getBlock(1098030).then(console.log);
  res.send("aa");
};

exports.updateSold = function (req, res) {
  User.update(
    { email: req.body.email },
    { SoldDigital: req.body.amount },
    function (err, user) {
      if (err) {
        res.json("error");
      } else {
        console.log(user);
      }
    }
  );
};
exports.getNotificationTransfert = (req, res) => {
  // console.log(req.query.rib);
  Notifications.find(
    {
      $and: [
        { receiverT: req.query.wallet },
        { TypeNotification: "Transfert" },
      ],
    },
    function (err, notification) {
      if (err) {
        res.json("error");
      } else {
        //  console.log(notification);
        res.json({ notification });
      }
    }
  );
};

exports.getSoldDigital = async (req, res) => {
  console.log(req.query.rib);
  User.findOne({ rib: parseInt(req.query.rib, 10) }, function (err, user) {
    res.send({ SoldDigital: user.SoldDigital });
  });
};

