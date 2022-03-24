const router = require("express").Router();
let Echeance = require("../Models/echeance.model");
var moment = require("moment");
// Get the total number of all users
router.route("/getAllUsersCount").get((req, res) => {
  Echeance.countDocuments()
    .then((echeances) => res.json(echeances))
    .catch((err) => res.status(400).json("Error: " + err));
});
// Get the total number of all users using Mobile app
router.route("/getMobile").get((req, res) => {
  Echeance.find({
    Type: "Mobile",
  })
    .countDocuments()
    .then((echeances) => res.json(echeances))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get the total number of all users of role Adherant
router.route("/getAdherant").get((req, res) => {
  Echeance.find({ User: "Adherant" })
    .countDocuments()
    .then((echeances) => res.json(echeances))
    .catch((err) => res.status(400).json("Error: " + err));
});
// Get the total number of all users of rolel Agent
router.route("/getAgent").get((req, res) => {
  Echeance.find({ User: "Agent" })
    .countDocuments()
    .then((echeances) => res.json(echeances))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get the total capital
router.route("/getCapital").get((req, res) => {
  var total_amount = 0;
  async function sendData() {
    res.json(total_amount);
  }

  Echeance.find({
    Amount: {
      $gte: 0,
    },
  })
    .then((results) => {
      results.forEach(async function (result) {
        return (total_amount = total_amount + result.Amount);
      });
    })
    .then(async function (err, res) {
      await sendData();
    });
});

router.route("/getSex").get((req, res) => {
  Echeance.find({
    Sex: "Homme",
  })
    .countDocuments()
    .then((echeances) => res.json(echeances))
    .catch((err) => res.status(400).json("Error: " + err));
});
////////////////////

router.route("/getAge").get((req, res) => {
  Echeance.find({
    Age: "Jeune",
  })
    .countDocuments()
    .then((echeances) => res.json(echeances))
    .catch((err) => res.status(400).json("Error: " + err));
});

/////////////////////////

// Get the total getMontPourcentageByDay
router
  .route("/getMontPourcentageByDay/:i/:inf/:sup/:agence")
  .get((req, res) => {
    today = getCurrentDay(req.params.i);
    todaytosend = getTheDayToSend(req.params.i);
    if (req.params.agence == "Tous") {
      Echeance.find({
        Time: {
          $gte: today + "T00:00:00.000+00:00",
          $lte: today + "T23:00:00.000+00:00",
        },
        Amount: {
          $gte: req.params.inf.toString(),
          $lt: req.params.sup.toString(),
        },
      })
        .countDocuments()
        .then((first) => {
          Echeance.find({
            Time: {
              $gte: today + "T00:00:00.000+00:00",
              $lte: today + "T23:00:00.000+00:00",
            },
            Amount: {
              $lt: 500,
            },
          })
            .countDocuments()
            .then((total) => {
              res.json({
                montant:
                  req.params.inf.toString() + "-" + req.params.sup.toString(),
                pourcentage: getPercentage(first, total),
                agence: req.params.agence,
              });
            });
        });
    } else {
      Echeance.find({
        Time: {
          $gte: today + "T00:00:00.000+00:00",
          $lte: today + "T23:00:00.000+00:00",
        },
        Amount: {
          $gt: req.params.inf.toString(),
          $lte: req.params.sup.toString(),
        },
        Agence: req.params.agence,
      })
        .countDocuments()
        .then((first) => {
          Echeance.find({
            Time: {
              $gte: today + "T00:00:00.000+00:00",
              $lte: today + "T23:00:00.000+00:00",
            },
            Agence: req.params.agence,
            Amount: {
              $lt: 500,
            },
            Agence: req.params.agence,
          })
            .countDocuments()
            .then((total) => {
              res.json({
                montant:
                  req.params.inf.toString() + "-" + req.params.sup.toString(),
                pourcentage: getPercentage(first, total),
                agence: req.params.agence,
              });
            });
        });
    }

    function getCurrentDay(i) {
      return moment().subtract(i, "days").format("YYYY-MM-DD");
    }

    function getTheDayToSend(i) {
      return moment().subtract(i, "days").format("DD-MM");
    }
    function getPercentage(first, total) {
      if (first == 0 || total == 0) {
        return 0;
      } else return ((first * 100) / total).toFixed(2);
    }
  });

//**Number of uses */
// Get the total number of uses by Day
router.route("/getUsesByDay/:i/:agence").get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  } else {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  }

  function getCurrentDay(i) {
    return moment().subtract(i, "days").format("YYYY-MM-DD");
  }

  function getTheDayToSend(i) {
    return moment().subtract(i, "days").format("DD-MM");
  }
});
// Get the total number of uses by Month
router.route("/getUsesByMonth/:i/:agence").get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({
          month: month,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  } else {
    Echeance.find({
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({
          month: month,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  }

  function getCurrentMonth(i) {
    return moment().subtract(i, "months").format("YYYY-MM");
  }
});

// Get the total number of uses by Year
router.route("/getUsesByYear/:i/:agence").get((req, res) => {
  year = getCurrentYear(req.params.i);

  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({
          year: year,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  } else {
    Echeance.find({
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({
          year: year,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  }

  function getCurrentYear(i) {
    return moment().subtract(i, "years").format("YYYY");
  }
});
// Get the total number of uses by Week
router.route("/getUsesByWeek/:i/:agence").get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);

  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({
          week: firstDayOfTheWeek + "-" + LastDayOfTheWeek,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  } else {
    Echeance.find({
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({
          week: firstDayOfTheWeek + "-" + LastDayOfTheWeek,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, "days")
      .format("YYYY-MM-DD");
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, "days")
      .format("YYYY-MM-DD");
  }
});

//**Capital */
// Get the total capital by Day
router.route("/getCapitalByDay/:i/:agence").get((req, res) => {
  var total_amount = 0;

  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
    })
      .then((results) => {
        results.forEach(async function (result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function (err, res) {
        await sendData();
      });
  } else {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Agence: {
        $eq: req.params.agence,
      },
    })
      .then((results) => {
        results.forEach(async function (result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function (err, res) {
        await sendData();
      });
  }

  async function sendData() {
    res.json({
      day: todaytosend,
      amount: total_amount,
      agence: req.params.agence,
    });
  }

  function getCurrentDay(i) {
    return moment().subtract(i, "days").format("YYYY-MM-DD");
  }

  function getTheDayToSend(i) {
    return moment().subtract(i, "days").format("DD-MM");
  }
});
// Get the total capital by Week
router.route("/getCapitalByWeek/:i/:agence").get((req, res) => {
  var total_amount = 0;

  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
    })
      .then((results) => {
        results.forEach(async function (result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function (err, res) {
        await sendData();
      });
  } else {
    Echeance.find({
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .then((results) => {
        results.forEach(async function (result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function (err, res) {
        await sendData();
      });
  }

  async function sendData() {
    res.json({
      week: firstDayOfTheWeek + "-" + LastDayOfTheWeek,
      amount: total_amount,
      agence: req.params.agence,
    });
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, "days")
      .format("YYYY-MM-DD");
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, "days")
      .format("YYYY-MM-DD");
  }
});
// Get the total capital by Month
router.route("/getCapitalByMonth/:i/:agence").get((req, res) => {
  var total_amount = 0;
  var month = getCurrentMonth(req.params.i);

  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
    })
      .then((results) => {
        results.forEach(async function (result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function (err, res) {
        await sendData(req.params.i);
      });
  } else {
    Echeance.find({
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .then((results) => {
        results.forEach(async function (result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function (err, res) {
        await sendData(req.params.i);
      });
  }

  async function sendData(i) {
    res.json({
      month: moment().subtract(i, "months").format("YYYY-MM"),
      amount: total_amount,
      agence: req.params.agence,
    });
  }

  function getCurrentMonth(i) {
    return moment().subtract(i, "months").format("YYYY-MM");
  }
});
// Get the total capital by Year
router.route("/getCapitalByYear/:i/:agence").get((req, res) => {
  var total_amount = 0;
  var year = getCurrentYear(req.params.i);

  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
    })
      .then((results) => {
        results.forEach(async function (result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function (err, res) {
        await sendData(req.params.i);
      });
  } else {
    Echeance.find({
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .then((results) => {
        results.forEach(async function (result) {
          return (total_amount = total_amount + result.Amount);
        });
      })
      .then(async function (err, res) {
        await sendData(req.params.i);
      });
  }

  async function sendData(i) {
    res.json({
      year: moment().subtract(i, "year").format("YYYY"),
      amount: total_amount,
      agence: req.params.agence,
    });
  }

  function getCurrentYear(i) {
    return moment().subtract(i, "years").format("YYYY");
  }
});

//**Mobile */
// Get the total number of all users using Mobile app
router.route("/getMobile/:i/:agence").get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Type: "Mobile",
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      });
  } else {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Type: "Mobile",
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  }

  function getCurrentDay(i) {
    return moment().subtract(i, "days").format("YYYY-MM-DD");
  }

  function getTheDayToSend(i) {
    return moment().subtract(i, "days").format("DD-MM");
  }
});
// Get the total number of all users using  the mobile app by Week
router.route("/getMobileByWeek/:i/:agence").get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Type: "Mobile",
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Type: "Mobile",
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, "days")
      .format("YYYY-MM-DD");
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, "days")
      .format("YYYY-MM-DD");
  }
});
// Get the total number of all users using  the mobile app by month
router.route("/getMobileByMonth/:i/:agence").get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Type: "Mobile",
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Type: "Mobile",
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  function getCurrentMonth(i) {
    return moment().subtract(i, "months").format("YYYY-MM");
  }
});
// Get the total number of all users using  the mobile app by year
router.route("/getMobileByYear/:i/:agence").get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Type: "Mobile",
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Type: "Mobile",
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
  function getCurrentYear(i) {
    return moment().subtract(i, "years").format("YYYY");
  }
});
/**Sexe */
router.route("/getSex/:i/:agence").get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Sex: "Homme",
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      });
  } else {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Type: "Homme",
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  }

  function getCurrentDay(i) {
    return moment().subtract(i, "days").format("YYYY-MM-DD");
  }

  function getTheDayToSend(i) {
    return moment().subtract(i, "days").format("DD-MM");
  }
});
// Get the total number of all users using  the mobile app by Week
router.route("/getSexByWeek/:i/:agence").get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Sex: "Homme",
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Sex: "Homme",
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, "days")
      .format("YYYY-MM-DD");
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, "days")
      .format("YYYY-MM-DD");
  }
});
// Get the total number of all users using  the mobile app by month
router.route("/getSexByMonth/:i/:agence").get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Sex: "Homme",
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Type: "Homme",
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  function getCurrentMonth(i) {
    return moment().subtract(i, "months").format("YYYY-MM");
  }
});
router.route("/getSexByYear/:i/:agence").get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Sex: "Homme",
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Sex: "Homme",
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
  function getCurrentYear(i) {
    return moment().subtract(i, "years").format("YYYY");
  }
});

//**Age **/
router.route("/getAge/:i/:agence").get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Age: "Jeune",
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      });
  } else {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Age: "Jeune",
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  }

  function getCurrentDay(i) {
    return moment().subtract(i, "days").format("YYYY-MM-DD");
  }

  function getTheDayToSend(i) {
    return moment().subtract(i, "days").format("DD-MM");
  }
});
// Get the total number of all users using  the mobile app by Week
router.route("/getAgeByWeek/:i/:agence").get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Age: "Jeune",
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Age: "Jeune",
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, "days")
      .format("YYYY-MM-DD");
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, "days")
      .format("YYYY-MM-DD");
  }
});
// Get the total number of all users using  the mobile app by month
router.route("/getAgeByMonth/:i/:agence").get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Age: "Jeune",
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Age: "Jeune",
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  function getCurrentMonth(i) {
    return moment().subtract(i, "months").format("YYYY-MM");
  }
});
router.route("/getAgeByYear/:i/:agence").get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Age: "Jeune",
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Age: "Jeune",
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
  function getCurrentYear(i) {
    return moment().subtract(i, "years").format("YYYY");
  }
});

/**Profession */
router.route("/getProfession/:i/:profession/:agence").get((req, res) => {
  today = getCurrentDay(req.params.i);
  todaytosend = getTheDayToSend(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Profession: req.params.profession,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      });
  } else {
    Echeance.find({
      Time: {
        $gte: today + "T00:00:00.000+00:00",
        $lte: today + "T23:00:00.000+00:00",
      },
      Profession: req.params.profession,
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({
          day: todaytosend,
          utilisation: result,
          agence: req.params.agence,
        });
      });
  }

  function getCurrentDay(i) {
    return moment().subtract(i, "days").format("YYYY-MM-DD");
  }

  function getTheDayToSend(i) {
    return moment().subtract(i, "days").format("DD-MM");
  }
});
// Get the total number of all users using  the mobile app by Week
router.route("/getProfessionByWeek/:i/:profession/:agence").get((req, res) => {
  firstDayOfTheWeek = getFirstDay(req.params.i);
  LastDayOfTheWeek = getLastDay(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Profession: req.params.profession,
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Profession: req.params.profession,
      Time: {
        $gte: firstDayOfTheWeek + "T00:00:00.000+00:00",
        $lte: LastDayOfTheWeek + "T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  function getFirstDay(i) {
    return moment()
      .subtract(i * 7 + 7, "days")
      .format("YYYY-MM-DD");
  }
  function getLastDay(i) {
    return moment()
      .subtract(i * 7 + 1, "days")
      .format("YYYY-MM-DD");
  }
});
// Get the total number of all users using  the mobile app by month
router.route("/getProfessionByMonth/:i/:profession/:agence").get((req, res) => {
  month = getCurrentMonth(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Profession: req.params.profession,
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Profession: req.params.profession,
      Time: {
        $gte: month + "-01T00:00:00.000+00:00",
        $lte: month + "-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  function getCurrentMonth(i) {
    return moment().subtract(i, "months").format("YYYY-MM");
  }
});
router.route("/getProfessionByYear/:i/:profession/:agence").get((req, res) => {
  year = getCurrentYear(req.params.i);
  if (req.params.agence == "Tous") {
    Echeance.find({
      Profession: req.params.profession,
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Echeance.find({
      Profession: req.params.profession,
      Time: {
        $gte: year + "-01-01T00:00:00.000+00:00",
        $lte: year + "-12-31T23:00:00.000+00:00",
      },
      Agence: req.params.agence,
    })
      .countDocuments()
      .then((result) => {
        res.json({ utilisation: result, agence: req.params.agence });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
  function getCurrentYear(i) {
    return moment().subtract(i, "years").format("YYYY");
  }
});

module.exports = router;
