const router = require('express').Router();
let Tontine = require('../Models/tontine.model');
var moment = require('moment');
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider('http://10.173.6.118:8545'));

const Contract = require('../contract');
var tontine = new web3.eth.Contract(Contract.Abi, Contract.address);

// Get the total number of all users
router.route('/getAllUsersCount').get((req, res) => {
  Tontine.countDocuments()
    .then(tontines => res.json(tontines))
    .catch(err => res.status(400).json('Error: ' + err));
});
// Get the total number of all users using Mobile app
router.route('/getMobile').get((req, res) => {
  Tontine.find({
    Type: 'Mobile'
  })
    .countDocuments()
    .then(tontines => res.json(tontines))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get the total number of all users of role Adherant
router.route('/getAdherant').get((req, res) => {
  Tontine.find({ User: 'Adherant' })
    .countDocuments()
    .then(tontines => res.json(tontines))
    .catch(err => res.status(400).json('Error: ' + err));
});
// Get the total number of all users of rolel Agent
router.route('/getAgent').get((req, res) => {
  Tontine.find({ User: 'Agent' })
    .countDocuments()
    .then(tontines => res.json(tontines))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get the total capital
router.route('/getCapital').get((req, res) => {
  var total_amount = 0;
  async function sendData() {
    res.json(total_amount);
  }

  Tontine.find({
    Amount: {
      $gte: 0
    }
  })
    .then(results => {
      results.forEach(async function(result) {
        return (total_amount = total_amount + result.Amount);
      });
    })
    .then(async function(err, res) {
      await sendData();
    });
});

router.route('/getSex').get((req, res) => {
  Tontine.find({
    Sex: 'Homme'
  })
    .countDocuments()
    .then(tontines => res.json(tontines))
    .catch(err => res.status(400).json('Error: ' + err));
});
////////////////////

router.route('/getAge').get((req, res) => {
  Tontine.find({
    Age: 'Jeune'
  })
    .countDocuments()
    .then(tontines => res.json(tontines))
    .catch(err => res.status(400).json('Error: ' + err));
});

/////////////////////////

// Get the total getMontPourcentageByDay
router.route('/getMontPourcentageByDay/:i/:inf/:sup/:agence').get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Amount: {
        $gte: req.params.inf.toString(),
        $lt: req.params.sup.toString()
      }
    })
      .countDocuments()
      .then(first => {
        Tontine.find({
          Time: {
            $gte: today + 'T00:00:00.000+00:00',
            $lte: today + 'T23:00:00.000+00:00'
          },
          Amount: {
            $lt: 500
          }
        })
          .countDocuments()
          .then(total => {
            res.json({
              montant: req.params.inf.toString() + '-' + req.params.sup.toString(),
              pourcentage: getPercentage(first, total),
              agence: req.params.agence
            });
          });
      });
  } else {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Amount: {
        $gt: req.params.inf.toString(),
        $lte: req.params.sup.toString()
      }
    })
      .countDocuments()
      .then(first => {
        Tontine.find({
          Time: {
            $gte: today + 'T00:00:00.000+00:00',
            $lte: today + 'T23:00:00.000+00:00'
          },
          Agence: req.params.agence
        })
          .countDocuments()
          .then(total => {
            res.json({
              montant: req.params.inf.toString() + '-' + req.params.sup.toString(),
              pourcentage: getPercentage(first, total),
              agence: req.params.agence
            });
          });
      });
  }

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
  function getPercentage(first, total) {
    if (first == 0 || total == 0) {
      return 0;
    } else return ((first * 100) / total).toFixed(2);
  }
});

//**Number of uses */
// Get the total number of uses by Day
router.route('/getUsesByDay/:i/:agence').get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence
        });
      });
  } else {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence
        });
      });
  }

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
});
// Get the total number of uses by Month
router.route('/getUsesByMonth/:i/:agence').get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({
          month: month,
          utilisation: result,
          agence: req.params.agence
        });
      });
  } else {
    Tontine.find({
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({
          month: month,
          utilisation: result,
          agence: req.params.agence
        });
      });
  }

  function getCurrentMonth(i) {
    return moment()
      .subtract(i, 'months')
      .format('YYYY-MM');
  }
});

// Get the total number of uses by Year
router.route('/getUsesByYear/:i/:agence').get((req, res) => {
  year = getCurrentYear(req.params.i);

  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({
          year: year,
          utilisation: result,
          agence: req.params.agence
        });
      });
  } else {
    Tontine.find({
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({
          year: year,
          utilisation: result,
          agence: req.params.agence
        });
      });
  }

  function getCurrentYear(i) {
    return moment()
      .subtract(i, 'years')
      .format('YYYY');
  }
});
// Get the total number of uses by Week
router.route('/getUsesByWeek/:i/:agence').get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);

  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({
          week: firstDayOfTheWeek + '-' + LastDayOfTheWeek,
          utilisation: result,
          agence: req.params.agence
        });
      });
  } else {
    Tontine.find({
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({
          week: firstDayOfTheWeek + '-' + LastDayOfTheWeek,
          utilisation: result,
          agence: req.params.agence
        });
      });
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, 'days')
      .format('YYYY-MM-DD');
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, 'days')
      .format('YYYY-MM-DD');
  }
});

//**Capital */
// Get the total capital by Day
router.route('/getCapitalByDay/:i/:agence').get((req, res) => {
  var total_amount = 0;

  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      }
    })
      .then(results => {
        results.forEach(async function(result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function(err, res) {
        await sendData();
      });
  } else {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Agence: {
        $eq: req.params.agence
      }
    })
      .then(results => {
        results.forEach(async function(result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function(err, res) {
        await sendData();
      });
  }

  async function sendData() {
    res.json({
      day: todaytosend,
      amount: total_amount,
      agence: req.params.agence
    });
  }

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
});
// Get the total capital by Week
router.route('/getCapitalByWeek/:i/:agence').get((req, res) => {
  var total_amount = 0;

  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      }
    })
      .then(results => {
        results.forEach(async function(result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function(err, res) {
        await sendData();
      });
  } else {
    Tontine.find({
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .then(results => {
        results.forEach(async function(result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function(err, res) {
        await sendData();
      });
  }

  async function sendData() {
    res.json({
      week: firstDayOfTheWeek + '-' + LastDayOfTheWeek,
      amount: total_amount,
      agence: req.params.agence
    });
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, 'days')
      .format('YYYY-MM-DD');
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, 'days')
      .format('YYYY-MM-DD');
  }
});
// Get the total capital by Month
router.route('/getCapitalByMonth/:i/:agence').get((req, res) => {
  var total_amount = 0;
  var month = getCurrentMonth(req.params.i);

  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      }
    })
      .then(results => {
        results.forEach(async function(result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function(err, res) {
        await sendData(req.params.i);
      });
  } else {
    Tontine.find({
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .then(results => {
        results.forEach(async function(result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function(err, res) {
        await sendData(req.params.i);
      });
  }

  async function sendData(i) {
    res.json({
      month: moment()
        .subtract(i, 'months')
        .format('YYYY-MM'),
      amount: total_amount,
      agence: req.params.agence
    });
  }

  function getCurrentMonth(i) {
    return moment()
      .subtract(i, 'months')
      .format('YYYY-MM');
  }
});
// Get the total capital by Year
router.route('/getCapitalByYear/:i/:agence').get((req, res) => {
  var total_amount = 0;
  var year = getCurrentYear(req.params.i);

  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      }
    })
      .then(results => {
        results.forEach(async function(result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function(err, res) {
        await sendData(req.params.i);
      });
  } else {
    Tontine.find({
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .then(results => {
        results.forEach(async function(result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function(err, res) {
        await sendData(req.params.i);
      });
  }

  async function sendData(i) {
    res.json({
      year: moment()
        .subtract(i, 'year')
        .format('YYYY'),
      amount: total_amount,
      agence: req.params.agence
    });
  }

  function getCurrentYear(i) {
    return moment()
      .subtract(i, 'years')
      .format('YYYY');
  }
});

//**Mobile */
// Get the total number of all users using Mobile app
router.route('/getMobile/:i/:agence').get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Type: 'Mobile'
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      });
  } else {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Type: 'Mobile',
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence
        });
      });
  }

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
});
// Get the total number of all users using  the mobile app by Week
router.route('/getMobileByWeek/:i/:agence').get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Type: 'Mobile',
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Type: 'Mobile',
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, 'days')
      .format('YYYY-MM-DD');
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, 'days')
      .format('YYYY-MM-DD');
  }
});
// Get the total number of all users using  the mobile app by month
router.route('/getMobileByMonth/:i/:agence').get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Type: 'Mobile',
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Type: 'Mobile',
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }

  function getCurrentMonth(i) {
    return moment()
      .subtract(i, 'months')
      .format('YYYY-MM');
  }
});
// Get the total number of all users using  the mobile app by year
router.route('/getMobileByYear/:i/:agence').get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Type: 'Mobile',
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Type: 'Mobile',
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  function getCurrentYear(i) {
    return moment()
      .subtract(i, 'years')
      .format('YYYY');
  }
});
/**Sexe */
router.route('/getSex/:i/:agence').get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Sex: 'Homme'
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      });
  } else {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Type: 'Homme',
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence
        });
      });
  }

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
});
// Get the total number of all users using  the mobile app by Week
router.route('/getSexByWeek/:i/:agence').get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Sex: 'Homme',
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Sex: 'Homme',
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, 'days')
      .format('YYYY-MM-DD');
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, 'days')
      .format('YYYY-MM-DD');
  }
});
// Get the total number of all users using  the mobile app by month
router.route('/getSexByMonth/:i/:agence').get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Sex: 'Homme',
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Type: 'Homme',
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }

  function getCurrentMonth(i) {
    return moment()
      .subtract(i, 'months')
      .format('YYYY-MM');
  }
});
router.route('/getSexByYear/:i/:agence').get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Sex: 'Homme',
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Sex: 'Homme',
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  function getCurrentYear(i) {
    return moment()
      .subtract(i, 'years')
      .format('YYYY');
  }
});

//**Age **/
router.route('/getAge/:i/:agence').get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Age: 'Jeune'
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      });
  } else {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Age: 'Jeune',
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence
        });
      });
  }

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
});
// Get the total number of all users using  the mobile app by Week
router.route('/getAgeByWeek/:i/:agence').get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Age: 'Jeune',
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Age: 'Jeune',
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, 'days')
      .format('YYYY-MM-DD');
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, 'days')
      .format('YYYY-MM-DD');
  }
});
// Get the total number of all users using  the mobile app by month
router.route('/getAgeByMonth/:i/:agence').get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Age: 'Jeune',
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Age: 'Jeune',
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }

  function getCurrentMonth(i) {
    return moment()
      .subtract(i, 'months')
      .format('YYYY-MM');
  }
});
router.route('/getAgeByYear/:i/:agence').get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Age: 'Jeune',
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Age: 'Jeune',
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  function getCurrentYear(i) {
    return moment()
      .subtract(i, 'years')
      .format('YYYY');
  }
});

/**Profession */
router.route('/getProfession/:i/:profession/:agence').get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Profession: req.params.profession
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      });
  } else {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Profession: req.params.profession,
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence
        });
      });
  }

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
});
// Get the total number of all users using  the mobile app by Week
router.route('/getProfessionByWeek/:i/:profession/:agence').get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Profession: req.params.profession,
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Profession: req.params.profession,
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, 'days')
      .format('YYYY-MM-DD');
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, 'days')
      .format('YYYY-MM-DD');
  }
});
// Get the total number of all users using  the mobile app by month
router.route('/getProfessionByMonth/:i/:profession/:agence').get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Profession: req.params.profession,
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Profession: req.params.profession,
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }

  function getCurrentMonth(i) {
    return moment()
      .subtract(i, 'months')
      .format('YYYY-MM');
  }
});
router.route('/getProfessionByYear/:i/:profession/:agence').get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Profession: req.params.profession,
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      }
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Tontine.find({
      Profession: req.params.profession,
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Agence: req.params.agence
    })
      .countDocuments()
      .then(result => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  function getCurrentYear(i) {
    return moment()
      .subtract(i, 'years')
      .format('YYYY');
  }
});

////////////////////
// Get the total number of Tontine En cours
router.route('/getEnCours/:i/:agence').get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Etat: 'En Cours'
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          amount: result,
          agence: req.params.agence
        });
      });
  } else {
    Tontine.find({
      Agence: req.params.agence,
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Etat: 'En Cours'
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          amount: result,
          agence: req.params.agence
        });
      });
  }

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
});
// Get the total number of Tontine Terminée
router.route('/getTermine/:i/:agence').get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Etat: 'Terminée'
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          amount: result,
          agence: req.params.agence
        });
      });
  } else {
    Tontine.find({
      Agence: req.params.agence,
      Time: {
        $gte: today + 'T00:00:00.000+00:00',
        $lte: today + 'T23:00:00.000+00:00'
      },
      Etat: 'Terminée'
    })
      .countDocuments()
      .then(result => {
        res.json({
          day: todaytosend,
          amount: result,
          agence: req.params.agence
        });
      });
  }

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
});
// Get the total encours by Month
router.route('/getEnCoursByMonth/:i/:agence').get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Etat: 'En Cours'
    })
      .countDocuments()
      .then(result => {
        res.json({ month: month, amount: result, agence: req.params.agence });
      });
  } else {
    Tontine.find({
      Agence: req.params.agence,
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Etat: 'En Cours'
    })
      .countDocuments()
      .then(result => {
        res.json({ month: month, amount: result, agence: req.params.agence });
      });
  }

  function getCurrentMonth(i) {
    return moment()
      .subtract(i, 'months')
      .format('YYYY-MM');
  }
});
// Get the total encours by Month
router.route('/getTermineByMonth/:i/:agence').get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Etat: 'Terminée'
    })
      .countDocuments()
      .then(result => {
        res.json({ month: month, amount: result, agence: req.params.agence });
      });
  } else {
    Tontine.find({
      Agence: req.params.agence,
      Time: {
        $gte: month + '-01T00:00:00.000+00:00',
        $lte: month + '-31T23:00:00.000+00:00'
      },
      Etat: 'Terminée'
    })
      .countDocuments()
      .then(result => {
        res.json({ month: month, amount: result, agence: req.params.agence });
      });
  }

  function getCurrentMonth(i) {
    return moment()
      .subtract(i, 'months')
      .format('YYYY-MM');
  }
});
// Get the total number of uses by Year
router.route('/getEnCoursByYear/:i/:agence').get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Etat: 'En Cours'
    })
      .countDocuments()
      .then(result => {
        res.json({ year: year, amount: result, agence: req.params.agence });
      });
  } else {
    Tontine.find({
      Agence: req.params.agence,
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Etat: 'En Cours'
    })
      .countDocuments()
      .then(result => {
        res.json({ year: year, amount: result, agence: req.params.agence });
      });
  }

  function getCurrentYear(i) {
    return moment()
      .subtract(i, 'years')
      .format('YYYY');
  }
});

// Get the total number of uses by Year
router.route('/getTermineByYear/:i/:agence').get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Etat: 'Terminée'
    })
      .countDocuments()
      .then(result => {
        res.json({ year: year, amount: result, agence: req.params.agence });
      });
  } else {
    Tontine.find({
      Agence: req.params.agence,
      Time: {
        $gte: year + '-01-01T00:00:00.000+00:00',
        $lte: year + '-12-31T23:00:00.000+00:00'
      },
      Etat: 'Terminée'
    })
      .countDocuments()
      .then(result => {
        res.json({ year: year, amount: result, agence: req.params.agence });
      });
  }

  function getCurrentYear(i) {
    return moment()
      .subtract(i, 'years')
      .format('YYYY');
  }
});

// Get the total number of uses by Week
router.route('/getEnCoursByWeek/:i/:agence').get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Etat: 'En Cours'
    })
      .countDocuments()
      .then(result => {
        res.json({
          week: firstDayOfTheWeek + '-' + LastDayOfTheWeek,
          amount: result,
          agence: req.params.agence
        });
      });
  } else {
    Tontine.find({
      Agence: req.params.agence,
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Etat: 'En Cours'
    })
      .countDocuments()
      .then(result => {
        res.json({
          week: firstDayOfTheWeek + '-' + LastDayOfTheWeek,
          amount: result,
          agence: req.params.agence
        });
      });
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, 'days')
      .format('YYYY-MM-DD');
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, 'days')
      .format('YYYY-MM-DD');
  }
});
// Get the total number of uses by Week
// Get the total number of uses by Week
router.route('/getTermineByWeek/:i/:agence').get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == 'Tous') {
    Tontine.find({
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Etat: 'Terminée'
    })
      .countDocuments()
      .then(result => {
        res.json({
          week: firstDayOfTheWeek + '-' + LastDayOfTheWeek,
          amount: result,
          agence: req.params.agence
        });
      });
  } else {
    Tontine.find({
      Agence: req.params.agence,
      Time: {
        $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
        $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
      },
      Etat: 'Terminée'
    })
      .countDocuments()
      .then(result => {
        res.json({
          week: firstDayOfTheWeek + '-' + LastDayOfTheWeek,
          amount: result,
          agence: req.params.agence
        });
      });
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, 'days')
      .format('YYYY-MM-DD');
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, 'days')
      .format('YYYY-MM-DD');
  }
});
////////////////////

/// Get the total number of all users using  the mobile app by month
router.route('/getEtatByMonth/:i/:etat').get((req, res) => {
  month = getCurrentMonth(req.params.i);
  Tontine.find({
    Etat: req.params.etat,
    Time: {
      $gte: month + '-01T00:00:00.000+00:00',
      $lte: month + '-31T23:00:00.000+00:00'
    }
  })
    .countDocuments()
    .then(tontines => res.json(tontines))
    .catch(err => res.status(400).json('Error: ' + err));
  function getCurrentMonth(i) {
    return moment()
      .subtract(i, 'months')
      .format('YYYY-MM');
  }
});
// Get the total number of all users using  the mobile app by year
router.route('/getEtatByYear/:i/:etat').get((req, res) => {
  year = getCurrentYear(req.params.i);
  Tontine.find({
    Etat: req.params.etat,
    Time: {
      $gte: year + '-01-01T00:00:00.000+00:00',
      $lte: year + '-12-31T23:00:00.000+00:00'
    }
  })
    .countDocuments()
    .then(tontines => res.json(tontines))
    .catch(err => res.status(400).json('Error: ' + err));
  function getCurrentYear(i) {
    return moment()
      .subtract(i, 'years')
      .format('YYYY');
  }
});
// Get the total number of all users using  the mobile app by Week
router.route('/getEtatByWeek/:i/:etat').get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  Tontine.find({
    Etat: req.params.etat,
    Time: {
      $gte: firstDayOfTheWeek + 'T00:00:00.000+00:00',
      $lte: LastDayOfTheWeek + 'T23:00:00.000+00:00'
    }
  })
    .countDocuments()
    .then(tontines => res.json(tontines))
    .catch(err => res.status(400).json('Error: ' + err));

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, 'days')
      .format('YYYY-MM-DD');
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, 'days')
      .format('YYYY-MM-DD');
  }
});

// Get the total number of uses by Day
router.route('/getEtatByDay/:i/:etat').get((req, res) => {
  today = getCurrentDay(req.params.i);

  todaytosend = getTheDayToSend(req.params.i);
  Tontine.find({
    Time: {
      $gte: today + 'T00:00:00.000+00:00',
      $lte: today + 'T23:00:00.000+00:00'
    },
    Etat: req.params.etat
  })
    .countDocuments()
    .then(tontines => res.json(tontines));

  function getCurrentDay(i) {
    return moment()
      .subtract(i, 'days')
      .format('YYYY-MM-DD');
  }

  function getTheDayToSend(i) {
    return moment()
      .subtract(i, 'days')
      .format('DD-MM');
  }
});
router.route('/updateTontine').get(async (req, res) => {
  Tontine.find({}).then(async data => {
	const a = []    //	console.log(data)
    for (let i = 0; i < data.length; i++) {
      //	console.log(data[i])
     a.push(await isTermine(data[i]))
    }
res.send(a)
  });
  async function isTermine(tontineDB) {
    const T = {
      v1: await getTontineFunc(tontineDB.ID_Tontine),
      v2: await getperiodeLancement(tontineDB.ID_Tontine)
    };
console.log(T)
    if (
      (!T.v1.etat && T.v2.dateLancementTimeStamp != 0) ||
      (T.v1.etat &&
        T.v2.dateLancementTimeStamp != 0 &&
        parseInt(T.v1.nbr_cycle) < parseInt(T.v2.Nombre_Cycle))
    ) {
console.log('aaaaa')
 if (tontineDB.Etat === 'En Cours') {
          await Tontine.update({ _id: tontineDB._id }, { Etat: 'Terminée' }, resultUpdate => {
            console.log(resultUpdate);
          });
        }
      return true;
    }
console.log('azea')
 if (tontineDB.Etat === 'En Cours') {
          await Tontine.update({ _id: tontineDB._id }, { Etat: 'Terminée' }, resultUpdate => {
            console.log(resultUpdate);
          });
        }
    return false;
  }

  const getTontineFunc = async ID_Tontine => {
    return new Promise(resolve => {
      tontine.methods.getTontine(ID_Tontine).call(function(err, results) {
        //  console.log("etat", results["6"]);
        //   console.log("idto", ID_Tontine);

        resolve({
          ID_Tontine,
          Nom_Tontine: results['0'],
          montant: results['2'],
          nbr_part: results['1'],
          etat: results['6'],
          nbr_cycle: results['3'],
          frequence: results['4']
        });
      });
    });
  };

  const getperiodeLancement = async ID_Tontine => {
    return new Promise(resolve => {
      tontine.methods.getDateLancement(ID_Tontine).call(function(err, result) {
        const dateLancement = new Date(result['0'] * 1000);
        var Nombre_Iteration = parseInt(result['1']);
        var Frequence = 0;
        var decalage = 3;

        if (result['2'] == 'Par mois') {
          Frequence = 60;
          decalage = 30;
        } else if (result['2'] == 'Par semaine') {
          Frequence = 6;
          decalage = 3;
        }
        const dateTimestamp = parseInt(result['0']);
        const Nombre_Cycle = parseInt(result['3']);
        //const date_Actuel = new Date();
        const date_Actuel = new Date().getTime();
        const dateLancementTime = dateTimestamp;

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
            recharge: true
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
            recharge: false
          });
        }
      });
    });
  };
});

module.exports = router;

