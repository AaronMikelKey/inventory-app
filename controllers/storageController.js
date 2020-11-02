var Storage = require('../models/storage');
const { body,validationResult } = require('express-validator');
const type = ['SSD','Hybrid', '5400RPM', '5900RPM', '7200RPM'];
const capacity = ['128GB', '256GB', '512GB', '1TB', '2TB', '4TB', '8TB', '16TB'];

//Display list of all storages.
exports.storage_list = function(req, res, next) {
  Storage.find({}, 'name manufacturer capacity type price amount')
  .exec(function (err, list_storages) {
    if (err) { return next(err); }
    //else (success)
    res.render('storage_list', { title: 'Storage', storage_list: list_storages });
  });
};

// Display detail page for a specific storage.
exports.storage_detail = function(req, res, next) {

  Storage.findById(req.params.id, function(err, results) {
  if (err) { return next(err); }
  if (results==null) { // No results.
      var err = new Error('storage not found');
      err.status = 404;
      return next(err);
  }
  // Successful, so render
  res.render('storage_detail', { title: results.manufacturer + ' ' + results.name, storage: results } );
});

};

// Display storage create form on GET.
exports.storage_create_get = function(req, res) {
  res.render('storage_form', { title: 'Add storage', types: type, capacitys: capacity });
};

// Handle storage create on POST.
exports.storage_create_post = [

  //Validate and sanitize fields
  body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('type.*', 'Type is required').isLength({ min: 1 }).escape(),
  body('capacity.*', 'Capacity is required').isLength({ min: 1 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract errors
    const errors = validationResult(req);

    //Create a Storage object with escaped and trimmed data
    var newStorage = new Storage(
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        capacity: req.body.capacity,
        price: req.body.price,
        amount: req.body.amount
      });

    if (!errors.isEmpty()) {
      //Errors. Re-render form with sanitized values/errors
      res.render('storage_form', {title: 'Add new Storage', newStorage: newStorage, capacitys: capacity, types: type, errors: errors.array() });
    }
    else {
      //Data from form is valid, save Storage
      newStorage.save(function (err) {
        if (err) { return next(err); }
        //Success, render new storage
        res.redirect('/catalog/storage/' +newStorage._id);
      });
    }
  }
];

// Display storage delete form on GET.
exports.storage_delete_get = function(req, res, next) {

  Storage.findById(req.params.id, function(err, results) {
    if (err) { return next(err); }
    if (results==null) { // No results.
        res.redirect('/catalog/storages');
    }
      // Successful, so render.
      res.render('storage_delete', { title: 'Delete Storage', storage: results } );
  });

};

// Handle storage delete on POST.
exports.storage_delete_post = function(req, res, next) {

  //Delete object and redirect to the list of storages.
  Storage.findByIdAndRemove(req.body.storageid, function deleteStorage(err) {
      if (err) { return next(err); }
      // Success - go to storage list
      res.redirect('/catalog/storages')
  })
};

// Display storage update form on GET.
exports.storage_update_get = function(req, res, next) {

  Storage.findById(req.params.id, function(err, results) {
      if (err) { return next(err); }
      if (results==null) { // No results.
          var err = new Error('Storage not found');
          err.status = 404;
          return next(err);
      }
      // Success.
      res.render('storage_form', { title: 'Update Storage', newStorage: results, types: type, capacitys: capacity });
  });

};

// Handle storage update on POST.
exports.storage_update_post = [
 
  // Validate and sanitze the name field.
  body('name', 'Storage name required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('type.*', 'Type is required').isLength({ min: 1 }).escape(),
  body('capacity.*', 'Capacity is required').isLength({ min: 1 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),
  

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request .
      const errors = validationResult(req);

  // Create a storage object with escaped and trimmed data (and the old id!)
      var newStorage = new Storage(
        {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        capacity: req.body.capacity,
        price: req.body.price,
        amount: req.body.amount,
        _id: req.params.id
        }
      );


      if (!errors.isEmpty()) {
          // There are errors. Render the form again with sanitized values and error messages.
          res.render('storage_form', { title: 'Update Storage', newStorage: newStorage, types: type, capacitys: capacity, errors: errors.array()});
      return;
      }
      else {
          // Data from form is valid. Update the record.
          Storage.findByIdAndUpdate(req.params.id, newStorage, {}, function (err,theNewStorage) {
              if (err) { return next(err); }
                 // Successful - redirect to storage detail page.
                 res.redirect('/catalog/storage/'+ theNewStorage._id);
              });
      }
  }
];