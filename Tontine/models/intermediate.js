var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var intermediateSchema = new mongoose.Schema({
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
    password: {
      type: String,
      required: true,
    },
    encrypt: {
       type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
       },
    role: {
      type: String,
       required: false,
 
   },
   wallet: {
    type: String,
    required: false,
   },
   Cashout_limit :{
  type : Number,
  required:false,
  default :100
} , 
   Address :{
  type : String,
  required:true,
 }
  });
  //hashing a password before saving it to the database
  intermediateSchema.pre('save', function (next) {
    var intermediate = this;
    bcrypt.hash(intermediate.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      intermediate.password = hash;
      next();
    })
  });
 
  var Intermediate = mongoose.model('Intermediate', intermediateSchema);
  module.exports = Intermediate; 
  