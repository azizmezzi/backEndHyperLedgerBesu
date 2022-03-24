const mongoose = require('mongoose');

const CashinSchema = new mongoose.Schema({
  Time: {
    type: Date,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  User: {
    type: String,
    required: false,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Sex: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  },
  Profession: {
    type: String,
    required: true,
  },
  Agence: {
    type: String,
    required: true,
  },
  rib: {
    type: Number,
  },
});
const Cashin = mongoose.model('Cashin', CashinSchema);
module.exports = Cashin;
