var Memory = require('../models/memory');
const { body,validationResult } = require('express-validator');
const type = ['DDR2', 'DDR3', 'DDR4'];
const color = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White'];
const size = ['1GB','2GB', '4GB', '8GB', '16GB', '32GB'];

//Display list of all memorys.
exports.memory_list = function(req, res, next) {
  Memory.find({}, 'name manufacturer type size color price amount')
  .exec(function (err, list_memorys) {
    if (err) { return next(err); }
    //else (success)
    res.render('memory_list', { title: 'Memory', memory_list: list_memorys });
  });
};

// Display detail page for a specific memory.
exports.memory_detail = function(req, res, next) {

  Memory.findById(req.params.id, function(err, results) {
  if (err) { return next(err); }
  if (results==null) { // No results.
      var err = new Error('memory not found');
      err.status = 404;
      return next(err);
  }
  // Successful, so render
  res.render('memory_detail', { title: results.manufacturer + ' ' + results.name, memory: results } );
});

};

// Display memory create form on GET.
exports.memory_create_get = function(req, res) {
  res.render('memory_form', { title: 'Add Memory to inventory', types: type, colors: color, sizes: size });
};

// Handle memory create on POST.
exports.memory_create_post = [

  //Validate and sanitize fields
  body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('type.*', 'Type is required').isLength({ min: 1 }).escape(),
  body('size', 'Size is required').isLength({ min: 1 }).escape(),
  body('color.*', 'Color is required').isLength({ min: 1 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract errors
    const errors = validationResult(req);

    //Create a Memory object with escaped and trimmed data
    var newMemory = new Memory(
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        amount: req.body.amount
      });

    if (!errors.isEmpty()) {
      //Errors. Re-render form with sanitized values/errors
      res.render('memory_form', {title: 'Add Memory to inventory', newMemory: newMemory, types: type, sizes: size, colors: color, errors: errors.array() });
    }
    else {
      //Data from form is valid, save Memory
      newMemory.save(function (err) {
        if (err) { return next(err); }
        //Success, render new memory
        res.redirect('/catalog/memory/' +newMemory._id);
      });
    }
  }
];

// Display memory delete form on GET.
exports.memory_delete_get = function(req, res, next) {

  Memory.findById(req.params.id, function(err, results) {
    if (err) { return next(err); }
    if (results==null) { // No results.
        res.redirect('/catalog/memorys');
    }
      // Successful, so render.
      res.render('memory_delete', { title: 'Delete Memory', memory: results } );
  });

};

// Handle memory delete on POST.
exports.memory_delete_post = function(req, res, next) {

  //Delete object and redirect to the list of memorys.
  Memory.findByIdAndRemove(req.body.memoryid, function deleteMemory(err) {
      if (err) { return next(err); }
      // Success - go to memory list
      res.redirect('/catalog/memorys')
  })
};

// Display memory update form on GET.
exports.memory_update_get = function(req, res, next) {

  Memory.findById(req.params.id, function(err, results) {
      if (err) { return next(err); }
      if (results==null) { // No results.
          var err = new Error('Memory not found');
          err.status = 404;
          return next(err);
      }
      // Success.
      res.render('memory_form', { title: 'Update Memory', newMemory: results, types: type, colors: color, sizes: size });
  });

};

// Handle memory update on POST.
exports.memory_update_post = [
 
  // Validate and sanitze the name field.
  body('name', 'Memory name required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('type.*', 'Type is required').isLength({ min: 1 }).escape(),
  body('size', 'Size is required').isLength({ min: 1 }).escape(),
  body('color.*', 'Color is required').isLength({ min: 1 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),
  

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request .
      const errors = validationResult(req);

  // Create a memory object with escaped and trimmed data (and the old id!)
      var newMemory = new Memory(
        {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        amount: req.body.amount,
        _id: req.params.id
        }
      );


      if (!errors.isEmpty()) {
          // There are errors. Render the form again with sanitized values and error messages.
          res.render('memory_form', { title: 'Update Memory', newMemory: newMemory, types: type, colors: color, sizes: size, errors: errors.array()});
      return;
      }
      else {
          // Data from form is valid. Update the record.
          Memory.findByIdAndUpdate(req.params.id, newMemory, {}, function (err,theNewMemory) {
              if (err) { return next(err); }
                 // Successful - redirect to memory detail page.
                 res.redirect('/catalog/memory/'+ theNewMemory._id);
              });
      }
  }
];