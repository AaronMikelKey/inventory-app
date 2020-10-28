var Cpu = require('../models/cpu');

//Display list of all cpus.
exports.cpu_list = function(req, res) {
  res.send('NOT IMPLEMENTED: cpu list');
};

// Display detail page for a specific cpu.
exports.cpu_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: cpu detail: ' + req.params.id);
};

// Display cpu create form on GET.
exports.cpu_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: cpu create GET');
};

// Handle cpu create on POST.
exports.cpu_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: cpu create POST');
};

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