const async = require('async');
var Case = require('../models/case');
var Cpu = require('../models/cpu');
var Memory = require('../models/memory');
var Motherboard = require('../models/motherboard');
var Peripheral = require('../models/peripheral');
var PowerSupply = require('../models/powerSupply');
var Storage = require('../models/storage');
var VideoCard = require('../models/videoCard');
var _component_list = { cases:'Case', cpus: 'CPU', memorys: 'Memory', motherboards:'Motherboard', peripherals:'Peripheral', powersupplys: 'Power Supply', storages: 'Storage', videocards:'Video Card'};
const { body,validationResult } = require('express-validator');
const { count } = require('../models/case');
const type = ['ATX Full Tower','ATX Mid Tower', 'ATX Mini Tower', 'HTPC', 'Mini ATX Desktop'];
const color = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White'];

exports.index = function(req, res, next) {

  async.parallel({
    case_count: function(callback) {
      Case.find({}, 'amount')
      .exec(callback)
    },
    cpu_count: function(callback) {
      Cpu.find({}, 'amount')
      .exec(callback)
    },
    memory_count: function(callback) {
      Memory.find({}, 'amount')
      .exec(callback)
    },
    motherboard_count: function(callback) {
      Motherboard.find({}, 'amount')
      .exec(callback)
    },
    peripheral_count: function(callback) {
      Peripheral.find({}, 'type amount')
      .exec(callback)
    },
    powerSupply_count: function(callback) {
      PowerSupply.find({}, 'amount')
      .exec(callback)
    },
    storage_count: function(callback) {
      Storage.find({}, 'amount')
      .exec(callback)
    },
    videoCard_count: function(callback) {
      VideoCard.find({}, 'amount')
      .exec(callback)
    }
  }, function(err, results) {
    res.render('index', { 
      title: 'PC Parts Inventory',
      component_list: 
        _component_list,
      error: err,
      counts: results
      });
  })

  
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
      res.render('case_form', {title: 'Add Case to inventory', newCase: newCase, types: type, colors: color, errors: errors.array() });
    }
    else {
      //Data from form is valid, save Case
      newCase.save(function (err) {
        if (err) { return next(err); }
        //Success, render new case
        res.redirect('/catalog/case/' +newCase._id);
      });
    }
  }
];

// Display case delete form on GET.
exports.case_delete_get = function(req, res, next) {

  Case.findById(req.params.id, function(err, results) {
    if (err) { return next(err); }
    if (results==null) { // No results.
        res.redirect('/catalog/cases');
    }
      // Successful, so render.
      res.render('case_delete', { title: 'Delete Case', caseName: results } );
  });

};

// Handle case delete on POST.
exports.case_delete_post = function(req, res, next) {

          //Delete object and redirect to the list of cases.
          Case.findByIdAndRemove(req.body.caseid, function deleteCase(err) {
              if (err) { return next(err); }
              // Success - go to case list
              res.redirect('/catalog/cases')
          })
};

// Display case update form on GET.
exports.case_update_get = function(req, res, next) {

  Case.findById(req.params.id, function(err, caseName) {
      if (err) { return next(err); }
      if (caseName==null) { // No results.
          var err = new Error('Case not found');
          err.status = 404;
          return next(err);
      }
      // Success.
      res.render('case_form', { title: 'Update Case', newCase: caseName, types: type, colors: color });
  });

};

// Handle Case update on POST.
exports.case_update_post = [
 
  // Validate and sanitze the name field.
  body('name', 'Case name required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('type.*', 'Type is required').isLength({ min: 1 }).escape(),
  body('color.*', 'Color is required').isLength({ min: 1 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),
  

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request .
      const errors = validationResult(req);

  // Create a case object with escaped and trimmed data (and the old id!)
      var caseName = new Case(
        {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        color: req.body.color,
        price: req.body.price,
        amount: req.body.amount,
        _id: req.params.id
        }
      );


      if (!errors.isEmpty()) {
          // There are errors. Render the form again with sanitized values and error messages.
          res.render('case_form', { title: 'Update Case', newCase: caseName, types: type, colors: color, errors: errors.array()});
      return;
      }
      else {
          // Data from form is valid. Update the record.
          Case.findByIdAndUpdate(req.params.id, caseName, {}, function (err,thecaseName) {
              if (err) { return next(err); }
                 // Successful - redirect to case detail page.
                 res.redirect('/catalog/case/'+ thecaseName._id);
              });
      }
  }
];