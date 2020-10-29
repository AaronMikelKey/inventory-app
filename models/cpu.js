var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CpuSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 75},
    manufacturer: {type: String, required: true, maxlength: 100},
    coreCount: {type: Number, required: true, min: 1},
    coreClock: {type: Number, required: true},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0}
  }
);

//Virtual for cpu URL
CpuSchema
.virtual('url')
.get(function () {
  return 'catalog/cpu/' + this._id;
});

//Getter for price, which is stored in cents
CpuSchema
.path('price')
.get(function(num) {
  return (num / 10000).toFixed(2);
});

//Setter for price
CpuSchema
.path('price')
.set(function(num) {
  return num * 100;
});

//Getter for coreClock, which is stored in as interger
CpuSchema
.path('coreClock')
.get(function(num) {
  return ((num / 100).toFixed(1) + ' GHz');
});

//Setter for coreClock
CpuSchema
.path('coreClock')
.set(function(num) {
  return num * 10;
});

//Export model
module.exports = mongoose.model('Cpu', CpuSchema);