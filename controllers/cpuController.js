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
exports.cpu_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: cpu delete GET');
};

// Handle cpu delete on POST.
exports.cpu_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: cpu delete POST');
};

// Display cpu update form on GET.
exports.cpu_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: cpu update GET');
};

// Handle cpu update on POST.
exports.cpu_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: cpu update POST');
};