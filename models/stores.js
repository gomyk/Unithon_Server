var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
// create a schema
var db = mongoose.connection;
autoIncrement.initialize(db);
var storeSchema = new Schema({
  id : Number,
  store_name : String,
  owner_name : String,
  location : String,
  x: Number,
  y: Number,
  phone : String,
  open_time : String,
  close_time : String,
  extra : String,
  complexity : Number,//복잡도에 대한

  images : Array
});
storeSchema.plugin(autoIncrement.plugin,{
  model:'Store',
 field:'id',
  startAt:1,
 incrementBy:1
})
module.exports = mongoose.model('Store', storeSchema);
