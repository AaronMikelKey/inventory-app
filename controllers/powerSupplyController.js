var PowerSupply = require('../models/powerSupply');
const { body,validationResult } = require('express-validator');
const modular = ['Full','Semi', 'No'];
const color = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White'];

//Display list of all powerSupplys.
exports.powerSupply_list = function(req, res, next) {
  PowerSupply.find({}, 'name manufacturer modular color wattage price amount')
  .exec(function (err, list_powerSupplys) {
    if (err) { return next(err); }
    //else (success)
    res.render('powerSupply_list', { title: 'Power Supplys', powerSupply_list: list_powerSupplys });
  });
};

// Display detail page for a specific powerSupply.
exports.powerSupply_detail = function(req, res, next) {

  PowerSupply.findById(req.params.id, function(err, results) {
  if (err) { return next(err); }
  if (results==null) { // No results.
      var err = new Error('powerSupply not found');
      err.status = 404;
      return next(err);
  }
  // Successful, so render
  res.render('powerSupply_detail', { title: results.manufacturer + ' ' + results.name, powerSupply: results } );
});

};

// Display powerSupply create form on GET.
exports.powerSupply_create_get = function(req, res) {
  res.render('powerSupply_form', { title: 'Add new Power Supply', modulars: modular, colors: color });
};

// Handle powerSupply create on POST.
exports.powerSupply_create_post = [

  //Validate and sanitize fields
  body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('modular.*', 'Modular is required').isLength({ min: 1 }).escape(),
  body('color.*', 'Color is required').isLength({ min: 1 }).escape(),
  body('wattage', 'Wattage is required').isInt({ min: 10 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract errors
    const errors = validationResult(req);

    //Create a PowerSupply object with escaped and trimmed data
    var newPowerSupply = new PowerSupply(
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        modular: req.body.modular,
        color: req.body.color,
        wattage: req.body.wattage,
        price: req.body.price,
        amount: req.body.amount
      });

    if (!errors.isEmpty()) {
      //Errors. Re-render form with sanitized values/errors
      res.render('powerSupply_form', {title: 'Add new Power Supply', newMemory: newMemory, modulars: modular, colors: color, errors: errors.array() });
    }
    else {
      //Data from form is valid, save PowerSupply
      newPowerSupply.save(function (err) {
        if (err) { return next(err); }
        //Success, render new powerSupply
        res.redirect('/catalog/powerSupply/' +newPowerSupply._id);
      });
    }
  }
];

// Display powerSupply delete form on GET.
exports.powerSupply_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: powerSupply delete GET');
};

// Handle powerSupply delete on POST.
exports.powerSupply_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: powerSupply delete POST');
};

// Display powerSupply update form on GET.
exports.powerSupply_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: powerSupply update GET');
};

// Handle powerSupply update on POST.
exports.powerSupply_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: powerSupply update POST');
};