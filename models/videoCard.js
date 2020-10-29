var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoCardSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 75},
    manufacturer: {type: String, required: true, maxlength: 100},
    memory: {type: String,
       required: true,
        enum: ['1GB','2GB', '3GB', '4GB', '5GB', '6GB', '8GB', '10GB', '16GB'] },
    chipset: {type: String, required: true, maxlength: 50},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0}
  }
);

//Virtual for video card URL
VideoCardSchema
.virtual('url')
.get(function () {
  return 'catalog/videocard/' + this._id;
});

//Getter for price, which is stored in cents
VideoCardSchema
.path('price')
.get(function(num) {
  return (num / 10000).toFixed(2);
});

//Setter for price
VideoCardSchema
.path('price')
.set(function(num) {
  return num * 100;
});

//Export model
module.exports = mongoose.model('VideoCard', VideoCardSchema);