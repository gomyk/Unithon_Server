var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var bookSchema = new Schema({
  email : String,
  store_name : String,
  phone : String,
  x: Number,
  y: Number,
  location : String,
  id : String,
  images : String
});

module.exports = mongoose.model('Book', bookSchema);
