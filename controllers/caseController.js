const { everySeries } = require('async');
var Case = require('../models/case');

exports.index = function(req, res) {
  res.render('index', { title: 'PC Parts Inventory' });
}

//Display list of all cases.
exports.case_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Case list');
};

// Display detail page for a specific case.
exports.case_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: case detail: ' + req.params.id);
};

// Display case create form on GET.
exports.case_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: case create GET');
};

// Handle case create on POST.
exports.case_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: case create POST');
};

// Display case delete form on GET.
exports.case_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: case delete GET');
};

// Handle case delete on POST.
exports.case_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: case delete POST');
};

// Display case update form on GET.
exports.case_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: case update GET');
};

// Handle case update on POST.
exports.case_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: case update POST');
};