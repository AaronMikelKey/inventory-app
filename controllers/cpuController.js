var Cpu = require('../models/cpu');

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