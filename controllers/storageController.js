var Storage = require('../models/storage');

//Display list of all storages.
exports.storage_list = function(req, res, next) {
  Storage.find({}, 'name manufacturer type price amount')
  .exec(function (err, list_storages) {
    if (err) { return next(err); }
    //else (success)
    res.render('storage_list', { title: 'Storage', storage_list: list_storages });
  });
};

// Display detail page for a specific storage.
exports.storage_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: storage detail: ' + req.params.id);
};

// Display storage create form on GET.
exports.storage_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: storage create GET');
};

// Handle storage create on POST.
exports.storage_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: storage create POST');
};

// Display storage delete form on GET.
exports.storage_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: storage delete GET');
};

// Handle storage delete on POST.
exports.storage_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: storage delete POST');
};

// Display storage update form on GET.
exports.storage_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: storage update GET');
};

// Handle storage update on POST.
exports.storage_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: storage update POST');
};