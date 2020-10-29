var Motherboard = require('../models/motherboard');

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
  res.send('NOT IMPLEMENTED: motherboard create GET');
};

// Handle motherboard create on POST.
exports.motherboard_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: motherboard create POST');
};

// Display motherboard delete form on GET.
exports.motherboard_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: motherboard delete GET');
};

// Handle motherboard delete on POST.
exports.motherboard_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: motherboard delete POST');
};

// Display motherboard update form on GET.
exports.motherboard_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: motherboard update GET');
};

// Handle motherboard update on POST.
exports.motherboard_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: motherboard update POST');
};