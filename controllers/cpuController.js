var Cpu = require('../models/cpu');
const { body,validationResult } = require('express-validator');

//Display list of all cpus.
exports.cpu_list = function(req, res, next) {
  Cpu.find({}, 'name manufacturer coreCount coreClock price amount')
  .exec(function (err, list_cpus) {
    if (err) { return next(err); }
    //else (success)
    res.render('cpu_list', { title: 'CPUs', cpu_list: list_cpus });
  });
};

// Display detail page for a specific cpu.
exports.cpu_detail = function(req, res, next) {

    Cpu.findById(req.params.id, function(err, results) {
    if (err) { return next(err); }
    if (results==null) { // No results.
        var err = new Error('Cpu not found');
        err.status = 404;
        return next(err);
    }
    // Successful, so render
    res.render('cpu_detail', { title: results.manufacturer + ' ' + results.name, cpu: results } );
  });

};

// Display cpu create form on GET.
exports.cpu_create_get = function(req, res, next) {
  res.render('cpu_form', { title: 'Add CPU to inventory' });
}

// Handle cpu create on POST.
exports.cpu_create_post = [

  //Validate and sanitize fields
  body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('coreCount', 'Core Count is required').isInt().isLength({ min: 1 }).escape(),
  body('coreClock', 'Core Clock is required').isDecimal({ decimal_digits: '0,2' }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract errors
    const errors = validationResult(req);

    //Create a Cpu object with escaped and trimmed data
    var newCpu = new Cpu(
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        coreCount: req.body.coreCount,
        coreClock: req.body.coreClock,
        price: req.body.price,
        amount: req.body.amount
      });

    if (!errors.isEmpty()) {
      //Errors. Re-render form with sanitized values/errors
      res.render('cpu_form', {title: 'Add CPU to inventory', newCpu: newCpu, errors: errors.array() });
    }
    else {
      //Data from form is valid, save Cpu
      newCpu.save(function (err) {
        if (err) { return next(err); }
        //Success, render new cpu
        res.redirect('/catalog/cpu/'+newCpu._id);
      });
    }
  }
];

// Display cpu delete form on GET.
exports.cpu_delete_get = function(req, res, next) {

  Cpu.findById(req.params.id, function(err, results) {
    if (err) { return next(err); }
    if (results==null) { // No results.
        res.redirect('/catalog/cpus');
    }
      // Successful, so render.
      res.render('cpu_delete', { title: 'Delete CPU', cpu: results } );
  });

};

// Handle cpu delete on POST.
exports.cpu_delete_post = function(req, res, next) {

  //Delete object and redirect to the list of cpus.
  Cpu.findByIdAndRemove(req.body.cpuid, function deleteCpu(err) {
      if (err) { return next(err); }
      // Success - go to cpu list
      res.redirect('/catalog/cpus')
  })
};

// Display cpu update form on GET.
exports.cpu_update_get = function(req, res, next) {

  Cpu.findById(req.params.id, function(err, cpu) {
      if (err) { return next(err); }
      if (cpu==null) { // No results.
          var err = new Error('CPU not found');
          err.status = 404;
          return next(err);
      }
      // Success.
      res.render('cpu_form', { title: 'Update CPU', newCpu: cpu });
  });

};

// Handle cpu update on POST.
exports.cpu_update_post = [
 
  // Validate and sanitze the name field.
  body('name', 'Case name required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('coreCount', 'Core Count is required').isInt().isLength({ min: 1 }).escape(),
  body('coreClock', 'Core Clock is required').isDecimal({ decimal_digits: '0,2' }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),
  

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request .
      const errors = validationResult(req);

  // Create a cpu object with escaped and trimmed data (and the old id!)
      var newCpu = new Cpu(
        {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        coreCount: req.body.coreCount,
        coreClock: req.body.coreClock,
        price: req.body.price,
        amount: req.body.amount,
        _id: req.params.id
        }
      );


      if (!errors.isEmpty()) {
          // There are errors. Render the form again with sanitized values and error messages.
          res.render('cpu_form', { title: 'Update CPU', newCpu: newCpu, errors: errors.array()});
      return;
      }
      else {
          // Data from form is valid. Update the record.
          Cpu.findByIdAndUpdate(req.params.id, newCpu, {}, function (err,theNewCpu) {
              if (err) { return next(err); }
                 // Successful - redirect to cpu detail page.
                 res.redirect('/catalog/cpu/'+ theNewCpu._id);
              });
      }
  }
];