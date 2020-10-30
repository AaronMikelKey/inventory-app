const { async } = require('async');
var Case = require('../models/case');
var _component_list = { cases:'Case', cpus: 'CPU', memorys: 'Memory', motherboards:'Motherboard', peripherals:'Peripheral', powersupplys: 'Power Supply', storages: 'Storage', videocards:'Video Card'};
const { body,validationResult } = require('express-validator');

exports.index = function(req, res) {
  res.render('index', { 
    title: 'PC Parts Inventory',
    component_list: 
      _component_list,
    });
}

//Display list of all cases.
exports.case_list = function(req, res, next) {
  Case.find({}, 'name manufacturer type color price amount')
  .exec(function (err, list_cases) {
    if (err) { return next(err); }
    //else (success)
    res.render('case_list', { title: 'Cases', case_list: list_cases });
  });
};

// Display detail page for a specific case.
exports.case_detail = function(req, res, next) {

      Case.findById(req.params.id, function(err, results) {
      if (err) { return next(err); }
      if (results==null) { // No results.
          var err = new Error('Case not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render
      res.render('case_detail', { title: results.manufacturer + ' ' + results.name, caseName: results } );
  });

};

// Display case create form on GET.
exports.case_create_get = function(req, res, next) {
  let type = ['ATX Full Tower','ATX Mid Tower', 'ATX Mini Tower', 'HTPC', 'Mini ATX Desktop'];
  let color = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White'];
  res.render('case_form', { title: 'Add Case to inventory', types: type, colors: color });
};

// Handle case create on POST.
exports.case_create_post = [

  //Validate and sanitize fields
  body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('type.*', 'Type is required').isLength({ min: 1 }).escape(),
  body('color.*', 'Color is required').isLength({ min: 1 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract errors
    const errors = validationResult(req);

    //Create a Case object with escaped and trimmed data
    var newCase = new Case(
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        color: req.body.color,
        price: req.body.price,
        amount: req.body.amount
      });

    if (!errors.isEmpty()) {
      //Errors. Re-render form with sanitized values/errors
      res.render('case_form', {title: 'Add Case to inventory', newCase: newCase, types: Case.type, colors: Case.color, errors: errors.array() });
    }
    else {
      //Data from form is valid, save Case
      newCase.save(function (err) {
        if (err) { return next(err); }
        //Success, render new case
        res.redirect(newCase.url);
      });
    }
  }
];

// Display case delete form on GET.
exports.case_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: case delete GET');
};

// Handle case delete on POST.
exports.case_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: case delete POST');
};

// Display case update form on GET.
exports.case_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: case update GET');
};

// Handle case update on POST.
exports.case_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: case update POST');
};