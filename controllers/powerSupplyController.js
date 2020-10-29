var PowerSupply = require('../models/powerSupply');

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
  res.send('NOT IMPLEMENTED: powerSupply create GET');
};

// Handle powerSupply create on POST.
exports.powerSupply_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: powerSupply create POST');
};

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