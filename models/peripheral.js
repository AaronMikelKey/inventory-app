var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PeripheralSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 75},
    manufacturer: {type: String, required: true, maxlength: 100},
    type: {type: String,
       required: true,
        enum: ['Monitor','Keyboard', 'Mouse', 'Headphones', 'Speakers'] },
    description: {type: String, maxlength: 200},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0}
  }
);

//Virtual for Peripheral URL
PeripheralSchema
.virtual('url')
.get(function () {
  return 'peripheral/' + this._id;
});

//Export model
module.exports = mongoose.model('Peripheral', PeripheralSchema);