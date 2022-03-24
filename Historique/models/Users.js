const mongoose = require('mongoose');

<<<<<<< HEAD
const bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
=======
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
  id: {
    type: Number,

    required: true,
  },

  firstname: {
    type: String,

    required: true,
  },

  lastname: {
    type: String,

    required: true,
  },

  email: {
    type: String,

    unique: true,

    required: true,
  },

  NuIdNat: {
    type: Number,

    required: true,
  },

  rib: {
    type: Number,

    unique: true,

    required: true,
  },

  DateCreation: {
    type: Number,
    required: false,
  },
<<<<<<< HEAD
=======

>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09

  password: {
    type: String,

    required: true,
  },

  encrypt: {
    type: String,

    required: false,
  },

  role: {
    type: String,

    required: false,
  },

  SoldDigital: {
    type: Number,

    required: false,
  },

  username: {
    type: String,

    required: true,
  },

  state: {
    type: String,

    required: false,

<<<<<<< HEAD
    default: "Waiting",
=======
    default: 'Waiting',
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
  },

  secret: {
    type: String,

    required: true,
  },

  IdTontine: [
    {
      Id_Tontine: String,

      ordre: Number,

      mondataire: Boolean,

      mondataire1: String,

      mondataire2: String,

      ListParticipants: [
        {
          addressParticipant: String,

          ordreParticiant: Number,

          createur: Boolean,

          mondataire: Boolean,
        },
      ],

      montant: Number,

      nbPar: Number,

      inscrit: Boolean,

      DateInvitation: Number,

      Nom_Tontine: String,

      wallet: String,

      encrypt: String,

      required: false,
    },
  ],

  Cashout_limit: {
    type: Number,

    required: false,

    default: 100,
  },

  Address: {
    type: String,

    required: true,
  },

  wallet: {
    type: String,

    required: true,
  },

  salarie: {
    type: Boolean,

    required: false,

    default: true,
  },

  somme: {
    type: Number,

    required: false,
  },

  pretencoure: {
    type: Boolean,

    required: false,

    default: false,
  },

  VerificationDemande: {
    type: Boolean,

    required: false,
  },

  montantpret: {
    type: Number,

    required: false,
  },

  Sex: String,

  Profession: String,

  Agence: String,

  Age: String,
});

<<<<<<< HEAD
//hashing a password before saving it to the database

UserSchema.pre("save", function (next) {
  var user = this;

  bcrypt.hash(user.password, 10, function (err, hash) {
=======
// hashing a password before saving it to the database

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (err, hash) => {
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09
    if (err) {
      return next(err);
    }

    user.password = hash;

    next();
  });
});

<<<<<<< HEAD
var User = mongoose.model("User", UserSchema);
=======
const User = mongoose.model('User', UserSchema);
>>>>>>> 241b7f5317fecc7984fe1ac65f639771d0427f09

module.exports = User;
