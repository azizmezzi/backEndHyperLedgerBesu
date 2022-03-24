var mongoose = require('mongoose');


var TransferSchema = new mongoose.Schema({
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
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Sex: {
        type: String,
        required: true
    },
    Age: {
        type: String,
        required: true 
    },
    Profession: {
        type: String,
        required: true 
    },
    Agence: {
        type: String,
        required: true 
    }
});
var Transfer = mongoose.model('Transfer', TransferSchema);
module.exports = Transfer;
