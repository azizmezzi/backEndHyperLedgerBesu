var User = require("../models/Users");
var Agent = require("../models/Agents");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Web3 = require("web3");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
var speakeasy = require("speakeasy");

const localProvider = "http://127.0.0.1:8545"; // quroum
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

const jwtKey = "K2lis Paylis";
const jwtExpirySeconds = 3600;

const signTransaction = (addressTo1) => {
  const Web3 = require("web3");
  const ethTx = require("ethereumjs-tx");

  // web3 initialization - must point to the HTTP JSON-RPC endpoint
  var provider = "http://localhost:8545";
  console.log("******************************************");
  console.log("Using provider : " + provider);
  console.log("******************************************");
  var web3 = new Web3(new Web3.providers.HttpProvider(provider));
  web3.transactionConfirmationBlocks = 1;
  // Sender address and private key
  // Second acccount in dev.json genesis file
  // Exclude 0x at the beginning of the private key
  const addressFrom = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
  // eslint-disable-next-line no-undef
  const privKey = Buffer.from(
    "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
    "hex"
  );

  // Receiver address and value to transfer
  // Third account in dev.json genesis file
  const addressTo = addressTo1;
  const valueInEther = 100;

  // Get the address transaction count in order to specify the correct nonce
  web3.eth
    .getTransactionCount(addressFrom, "pending")
    .then((txnCount) => {
      // Create the transaction object
      var txObject = {
        nonce: web3.utils.numberToHex(txnCount),
        gasPrice: web3.utils.numberToHex(1000),
        gasLimit: web3.utils.numberToHex(21000),
        to: addressTo,
        value: web3.utils.numberToHex(
          web3.utils.toWei(valueInEther.toString(), "ether")
        ),
      };

      // Sign the transaction with the private key
      var tx = new ethTx(txObject);
      tx.sign(privKey);

      //Convert to raw transaction string
      var serializedTx = tx.serialize();
      var rawTxHex = "0x" + serializedTx.toString("hex");

      // log raw transaction data to the console so you can send it manually
      console.log("Raw transaction data: " + rawTxHex);

      // but also ask you if you want to send this transaction directly using web3
      web3.eth
        .sendSignedTransaction(rawTxHex)
        .on("receipt", (receipt) => {
          console.log("Receipt: ", receipt);
        })
        .catch((error) => {
          console.log("Error: ", error.message);
        });
    })
    .catch((error) => {
      console.log("Error: ", error.message);
    });
};

const controller = {
  //agent signup

  agentsignup: function (req, res) {
    const date_Actuel = new Date();

    Agent.count({}, function (err, count) {
      var secret = speakeasy.generateSecret({ length: 10 });
      console.log(secret);
      var agentData = {
        id: count,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        role: req.body.role,
        NuIdNat: req.body.NuIdNat,
        rib: req.body.rib,
        // Address: req.body.Address,
        username: req.body.username,
        id_agence: req.body.agence,
        DateCreation: date_Actuel.getTime() / 1000,
        secret: secret.base32,
      };
      /* 	 const wallet = tx.generate();
      console.log("wallet" ,wallet)
          var text =wallet.getPrivateKeyString()
           console.log(wallet.getPublicKey())
            bcrypt.hash(text,10, (err, hash)=>{
            
            console.log(hash)
             ;
            })
       
            agentData.encrypt = encrypt(wallet.getPrivateKeyString(),req.body.password);
            agentData.wallet = wallet.getAddressString();*/
      var acc = web3.eth.accounts.create();
      web3.eth.accounts.wallet.add(acc.privateKey);
      console.log(acc);
      const account = acc.address;
      agentData.wallet = account;
      const encryptedPK = cryptr.encrypt(acc.privateKey);
      agentData.encrypt = encryptedPK;
      signTransaction(account);
      var user = new Agent(agentData);
      user.save(function (err, user) {
        if (err) {
          res.status(804).end();
          return console.error(err);
        }
        console.log(" to db");
        console.log(user);
        var clt = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          state: user.state,
          NuIdNat: user.NuIdNat,
          rib: user.rib,
          privateKey: user.encrypt,
          Cashout_limit: user.Cashout_limit,
          Address: user.Address,
          username: user.username,
          wallet: user.wallet,
          id_agence: user.id_agence,
          secret: secret.base32,
        };
        let response = { user: clt };

        res.json(response);
      });
    });
  },
  //adherent signup

  VerifFAct2Adh: function (req, res) {
    const num = req.query.num;
    const base32secret = req.query.secret;
    var verified = speakeasy.totp.verify({
      secret: base32secret,
      encoding: "base32",
      token: parseInt(num),
    });
    console.log(verified, parseInt(num), base32secret);
    res.send({ verified });
  },

  adherentsignup: function (req, res) {
    User.count({}, function (err, count) {
      const date_Actuel = new Date();
      var secret = speakeasy.generateSecret({ length: 10 });
      console.log(secret);
      var userData = {
        id: count,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        role: req.body.role,
        Address: req.body.Address,
        NuIdNat: req.body.NuIdNat,
        rib: req.body.rib,
        username: req.body.username,
        DateCreation: date_Actuel.getTime() / 1000,
        secret: secret.base32,
      };

      var acc = web3.eth.accounts.create();
      web3.eth.accounts.wallet.add(acc.privateKey);
      console.log(acc);
      const account = acc.address;
      userData.wallet = account;
      const encryptedPK = cryptr.encrypt(acc.privateKey);
      userData.encrypt = encryptedPK;
      signTransaction(account);

      var user = new User(userData);

      user.save(function (err, user) {
        console.log("user");
        console.log(user);
        if (err) {
          console.log("error");
          console.log(err);
          res.status(804).end();
          return console.error(err);
        }
        console.log("saved to db");

        console.log(user);
        var clt = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          state: user.state,
          NuIdNat: user.NuIdNat,
          rib: user.rib,
          privateKey: user.encrypt,
          Cashout_limit: user.Cashout_limit,
          Address: user.Address,
          username: user.username,
          wallet: user.wallet,
          secret: secret.base32,
        };

        let response = { user: clt, secret: secret.base32 };

        res.json(response);
      });
    });
  },

  adherentlogin: function (req, res) {
    var c = 0;
    User.count({}, function (err, count) {
      c = count;
      // console.log( "Number of users:", count );
    });

    console.log("**************************", c);
    console.log(req.body);
    User.findOne({ rib: req.body.rib }, function (err, user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (
          err,
          result
        ) {
          if (result) {
            const token = jwt.sign(
              {
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                rib: user.rib,
              },
              jwtKey,
              {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
              }
            );
            console.log("token:", token);

            var clt = {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              role: user.role,
              SoldDigital: user.SoldDigital,
              state: user.state,
              Address: user.Address,
              rib: user.rib,
              NuIdNat: user.NuIdNat,
              Cashout_limit: user.Cashout_limit,
              username: user.username,
              wallet: user.wallet,
              privateKey: user.encrypt,
              DateCreation: user.DateCreation,
              secret: user.secret,
              somme: user.somme,
              pretencours: user.pretencoure,
            };
            console.log("testest");
            console.log(clt);
            let response = { user: clt, token: token };
            // set the cookie as the token string, with a similar max age as the token
            // here, the max age is in milliseconds, so we multiply by 1000
            // res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 ,httpOnly: true })
            //res.status(801).json(response);
            res.json(response);

            //  res.send(response)

            console.log("token has been sent !");
          } else {
            res.status(802).end();
          }
        });
      } else {
        Agent.findOne({ rib: req.body.rib }, function (err, agent) {
          if (agent) {
            bcrypt.compare(req.body.password, agent.password, function (
              err,
              result
            ) {
              if (result) {
                const token = jwt.sign(
                  {
                    firstname: agent.firstname,
                    lastname: agent.lastname,
                    rib: agent.rib,
                    role: agent.role,
                  },
                  jwtKey,
                  {
                    algorithm: "HS256",
                    expiresIn: jwtExpirySeconds,
                  }
                );
                console.log("token:", token);

                var clt = {
                  id: agent.id,
                  firstname: agent.firstname,
                  lastname: agent.lastname,
                  email: agent.email,
                  role: agent.role,
                  Address: agent.Address,
                  rib: agent.rib,
                  NuIdNat: agent.NuIdNat,
                  Cashout_limit: agent.Cashout_limit,
                  username: agent.username,
                  wallet: agent.wallet,
                  privateKey: agent.encrypt,
                  id_agence: agent.id_agence,
                  secret: agent.secret,
                };

                let response = { user: clt, token: token };
                // set the cookie as the token string, with a similar max age as the token
                // here, the max age is in milliseconds, so we multiply by 1000
                // res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 ,httpOnly: true })
                //res.status(801).json(response);
                res.json(response);

                //  res.send(response)

                console.log("token has been sent !");
              } else {
                res.status(802).end();
              }
            });
          } else {
            res.status(803).end();
          }
        });
      }
    });
  },

  stateUpdate: function (req, res) {
    User.updateOne({ rib: req.body.rib }, { state: "Accepted" }, function (
      err,
      user
    ) {
      if (err) {
        res.json("error");
      } else {
        console.log(user);
        if (user == null) {
          res.json({ address: "", rib: "", email: "" });
        } else {
          res.json({ user });
        }
      }
    });
  },

  getAdherentbyadrr: function (req, res) {
    User.findOne({ wallet: req.query.wallet }, function (err, user) {
      if (err) {
        res.json("error");
      } else {
        console.log(user);
        res.json({ user });
      }
    });
  },

  getAdherentbyrib: function (req, res) {
    User.findOne({ rib: req.query.rib }, function (err, user) {
      if (err) {
        res.json("error");
      } else {
        console.log(user);
        res.json({ user });
      }
    });
  },

  getAdherentbyID: function (req, res) {
    User.findOne({ id: parseInt(req.query.idAD, 10) }, function (err, user) {
      if (err) {
        res.json("error");
      } else {
        if (user !== null) {
          res.json({
            id: user.id,
            wallet: user.wallet,
            firstname: user.firstname,
            lastname: user.lastname,
            rib: user.rib,
            NuIdNat: user.NuIdNat,
          });
        } else {
          res.status(210).json("user null");
        }
      }
    });
  },

  getAgent: function (req, res) {
    Agent.findOne({ rib: req.query.id }, function (err, user) {
      if (err) {
        res.json("error");
      } else {
        if (user !== null) {
          res.json({
            firstname: user.firstname,
            lastname: user.lastname,
            adressAgence: user.wallet,
            id: user._id,
            id_agence: user.id_agence,
          });
        } else {
          res.status(210).json("user null");
        }
      }
    });
  },
};
module.exports = controller;
