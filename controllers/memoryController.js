var Memory = require('../models/memory');

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
exports.memory_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: memory detail: ' + req.params.id);
};

// Display memory create form on GET.
exports.memory_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: memory create GET');
};

// Handle memory create on POST.
exports.memory_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: memory create POST');
};

// Display memory delete form on GET.
exports.memory_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: memory delete GET');
};

// Handle memory delete on POST.
exports.memory_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: memory delete POST');
};

// Display memory update form on GET.
exports.memory_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: memory update GET');
};

// Handle memory update on POST.
exports.memory_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: memory update POST');
};