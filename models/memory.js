var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemorySchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 75},
    manufacturer: {type: String, required: true, maxlength: 100},
    type: {type: String,
       required: true,
        enum: ['DDR2', 'DDR3', 'DDR4'] },
    size: {type: String,
      required: true,
        enum: ['1GB','2GB', '4GB', '8GB', '16GB', '32GB'] },
    color: {type: String, enum: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White', 'RGB']},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0}
  }
);

//Virtual for memory URL
MemorySchema
.virtual('url')
.get(function () {
  return 'memory/' + this._id;
});

//Export model
module.exports = mongoose.model('Memory', MemorySchema);