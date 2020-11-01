var Motherboard = require('../models/motherboard');
const { body,validationResult } = require('express-validator');
const formFactor = ['ATX','Micro ATX', 'Mini ITX', 'HTPX'];
const memory = ['DDR2', 'DDR3', 'DDR4'];

//Display list of all motherboards.
exports.motherboard_list = function(req, res, next) {
  Motherboard.find({}, 'name manufacturer formFactor memory color price amount')
  .exec(function (err, list_motherboards) {
    if (err) { return next(err); }
    //else (success)
    res.render('motherboard_list', { title: 'Motherboards', motherboard_list: list_motherboards });
  });
};

// Display detail page for a specific motherboard.
exports.motherboard_detail = function(req, res, next) {

  Motherboard.findById(req.params.id, function(err, results) {
  if (err) { return next(err); }
  if (results==null) { // No results.
      var err = new Error('motherboard not found');
      err.status = 404;
      return next(err);
  }
  // Successful, so render
  res.render('motherboard_detail', { title: results.manufacturer + ' ' + results.name, motherboard: results } );
});

};

// Display motherboard create form on GET.
exports.motherboard_create_get = function(req, res) {
  res.render('motherboard_form', { title: 'Add new Motherboard', formFactors: formFactor, memorys: memory });
};

// Handle motherboard create on POST.
exports.motherboard_create_post = [

  //Validate and sanitize fields
  body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('formFactor.*', 'Form factor is required').isLength({ min: 1 }).escape(),
  body('memory.*', 'Memory type is required').isLength({ min: 1 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract errors
    const errors = validationResult(req);

    //Create a Motherboard object with escaped and trimmed data
    var newMotherboard = new Motherboard(
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        formFactor: req.body.formFactor,
        memory: req.body.memory,
        price: req.body.price,
        amount: req.body.amount
      });

    if (!errors.isEmpty()) {
      //Errors. Re-render form with sanitized values/errors
      res.render('motherboard_form', {title: 'Add new Motherboard', newMemory: newMemory, formFactors: formFactor, memorys: memory, errors: errors.array() });
    }
    else {
      //Data from form is valid, save Motherboard
      newMotherboard.save(function (err) {
        if (err) { return next(err); }
        //Success, render new motherboard
        res.redirect('/catalog/motherboard/' +newMotherboard._id);
      });
    }
  }
];

// Display motherboard delete form on GET.
exports.motherboard_delete_get = function(req, res, next) {

  Motherboard.findById(req.params.id, function(err, results) {
    if (err) { return next(err); }
    if (results==null) { // No results.
        res.redirect('/catalog/motherboards');
    }
      // Successful, so render.
      res.render('motherboard_delete', { title: 'Delete Motherboard', motherboard: results } );
  });

};

// Handle motherboard delete on POST.
exports.motherboard_delete_post = function(req, res, next) {

  //Delete object and redirect to the list of motherboards.
  Motherboard.findByIdAndRemove(req.body.motherboardid, function deleteMotherboard(err) {
      if (err) { return next(err); }
      // Success - go to motherboard list
      res.redirect('/catalog/motherboards')
  })
};

// Display motherboard update form on GET.
exports.motherboard_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: motherboard update GET');
};

// Handle motherboard update on POST.
exports.motherboard_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: motherboard update POST');
};