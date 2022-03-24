var mongoose = require('mongoose');


var CashinSchema = new mongoose.Schema({
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
var Cashin = mongoose.model('Cashin', CashinSchema);
module.exports = Cashin;
