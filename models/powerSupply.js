var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PowerSupplySchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 75},
    manufacturer: {type: String, required: true, maxlength: 100},
    modular: {type: String,
       required: true,
        enum: ['Full','Semi', 'No'] },
    color: {type: String, required: true, enum: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White']},
    wattage: {type: Number, required: true, min: 0},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0}
  }
);

//Virtual for power supply URL
PowerSupplySchema
.virtual('url')
.get(function () {
  return 'catalog/powersupply/' + this._id;
});

//Getter for price, which is stored in cents
PowerSupplySchema
.path('price')
.get(function(num) {
  return (num / 10000).toFixed(2);
});

//Setter for price
PowerSupplySchema
.path('price')
.set(function(num) {
  return num * 100;
});

//Export model
module.exports = mongoose.model('PowerSupply', PowerSupplySchema);