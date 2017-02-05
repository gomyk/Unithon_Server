var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  email : String,
  nickname : String,
  enc_id : String,
  profile_image : String,
  age : String,
  gender : String,
  id : String,
  birthday : String
});

module.exports = mongoose.model('User', userSchema);
