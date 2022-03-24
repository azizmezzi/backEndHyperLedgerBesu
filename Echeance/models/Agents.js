var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var AgentSchema = new mongoose.Schema({
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
    id_agence: {
        type: String,
        required: true,
        },
    username: {
        type: String,
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
    role: {
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
 },
   wallet :{
    type : String,
    required:true,
   },
   Sex : String ,
   Profession : String,
   Agence : String,
   Age : String
  });
  //hashing a password before saving it to the database
AgentSchema.pre('save', function (next) {
    var agent = this;
    bcrypt.hash(agent.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      agent.password = hash;
      next();
    })
  });
 
  var Agent = mongoose.model('Agent', AgentSchema);
  module.exports = Agent; 
  