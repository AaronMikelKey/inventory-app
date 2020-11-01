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
  return 'cpu/' + this._id;
});

//Export model
module.exports = mongoose.model('Cpu', CpuSchema);