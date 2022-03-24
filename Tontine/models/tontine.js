var mongoose = require('mongoose');


var TontineSchema = new mongoose.Schema({
  ID_Tontine: {
        type: String,
        required: true
    },
    Time: {
        type: Date,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    User: {
        type: String,
        required: false
    },
    Amount: {
        type: Number,
        required: true
    },
    Etat: {
        type: String,
        required: true
    },
    Agence: {
        type: String,
        required: true 
    }
});
var Tontine = mongoose.model('Tontine', TontineSchema);
module.exports = Tontine;
