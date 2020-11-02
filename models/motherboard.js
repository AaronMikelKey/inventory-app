var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MotherboardSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 75},
    manufacturer: {type: String, required: true, maxlength: 100},
    formFactor: {type: String,
       required: true,
        enum: ['ATX','Micro ATX', 'Mini ITX', 'HTPX'] },
    memory: {type: String, required: true, enum: ['DDR2', 'DDR3', 'DDR4']},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0}
  }
);

//Virtual for motherboard URL
MotherboardSchema
.virtual('url')
.get(function () {
  return 'motherboard/' + this._id;
});

//Export model
module.exports = mongoose.model('Motherboard', MotherboardSchema);