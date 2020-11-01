var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaseSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 75},
    manufacturer: {type: String, required: true, maxlength: 100},
    type: {type: String,
       required: true,
        enum: ['ATX Full Tower','ATX Mid Tower', 'ATX Mini Tower', 'HTPC', 'Mini ATX Desktop'] },
    color: {type: String, required: true, enum: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White']},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0}
  }
);

//Virtual for case URL
CaseSchema
.virtual('url')
.get(function () {
  return 'case/' + this._id;
});

//Export model
module.exports = mongoose.model('Case', CaseSchema);