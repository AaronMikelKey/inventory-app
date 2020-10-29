const { everySeries } = require('async');
var Case = require('../models/case');
var _component_list = { cases:'Case', cpus: 'CPU', memorys: 'Memory', motherboards:'Motherboard', peripherals:'Peripheral', powersupplys: 'Power Supply', storages: 'Storage', videocards:'Video Card'};


exports.index = function(req, res) {
  res.render('index', { 
    title: 'PC Parts Inventory',
    component_list: 
      _component_list,
    });
}

//Display list of all cases.
exports.case_list = function(req, res, next) {
  Case.find({}, 'name manufacturer type color price amount')
  .exec(function (err, list_cases) {
    if (err) { return next(err); }
    //else (success)
    res.render('case_list', { title: 'Cases', case_list: list_cases });
  });
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