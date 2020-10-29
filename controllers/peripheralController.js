var Peripheral = require('../models/peripheral');

//Display list of all peripherals.
exports.peripheral_list = function(req, res, next) {
  Peripheral.find({}, 'name manufacturer type description price amount')
  .exec(function (err, list_peripherals) {
    if (err) { return next(err); }
    //else (success)
    res.render('peripheral_list', { title: 'Peripherals', peripheral_list: list_peripherals });
  });
};

// Display detail page for a specific peripheral.
exports.peripheral_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: peripheral detail: ' + req.params.id);
};

// Display peripheral create form on GET.
exports.peripheral_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: peripheral create GET');
};

// Handle peripheral create on POST.
exports.peripheral_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: peripheral create POST');
};

// Display peripheral delete form on GET.
exports.peripheral_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: peripheral delete GET');
};

// Handle peripheral delete on POST.
exports.peripheral_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: peripheral delete POST');
};

// Display peripheral update form on GET.
exports.peripheral_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: peripheral update GET');
};

// Handle peripheral update on POST.
exports.peripheral_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: peripheral update POST');
};