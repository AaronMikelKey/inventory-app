var VideoCard = require('../models/videoCard');
const { body,validationResult } = require('express-validator');
const memory = ['1GB','2GB', '3GB', '4GB', '5GB', '6GB', '8GB', '10GB', '16GB'];

//Display list of all videoCards.
exports.videoCard_list = function(req, res, next) {
  VideoCard.find({}, 'name  manufacturer memory chipset price amount')
  .exec(function (err, list_videoCards) {
    if (err) { return next(err); }
    //else (success)
    res.render('videoCard_list', { title: 'Video Cards', videoCard_list: list_videoCards });
  });
};

// Display detail page for a specific videoCard.
exports.videoCard_detail = function(req, res, next) {

  VideoCard.findById(req.params.id, function(err, results) {
  if (err) { return next(err); }
  if (results==null) { // No results.
      var err = new Error('videoCard not found');
      err.status = 404;
      return next(err);
  }
  // Successful, so render
  res.render('videoCard_detail', { title: results.manufacturer + ' ' + results.name, videoCard: results } );
});

};

// Display videoCard create form on GET.
exports.videoCard_create_get = function(req, res) {
  res.render('videoCard_form', { title: 'Add new Video Card', memorys: memory });
};

// Handle videoCard create on POST.
exports.videoCard_create_post = [

  //Validate and sanitize fields
  body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('memory.*', 'Memory is required').isLength({ min: 1 }).escape(),
  body('chipset', 'Chipset is required').trim().isLength({ min: 1 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract errors
    const errors = validationResult(req);

    //Create a VideoCard object with escaped and trimmed data
    var newVideoCard = new VideoCard(
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        memory: req.body.memory,
        chipset: req.body.chipset,
        price: req.body.price,
        amount: req.body.amount
      });

    if (!errors.isEmpty()) {
      //Errors. Re-render form with sanitized values/errors
      res.render('videoCard_form', {title: 'Add new Video Card', newVideoCard: newVideoCard, memorys: memory, errors: errors.array() });
    }
    else {
      //Data from form is valid, save Video Card
      newVideoCard.save(function (err) {
        if (err) { return next(err); }
        //Success, render new videoCard
        res.redirect('/catalog/videoCard/' +newVideoCard._id);
      });
    }
  }
];

// Display videoCard delete form on GET.
exports.videoCard_delete_get = function(req, res, next) {

  VideoCard.findById(req.params.id, function(err, results) {
    if (err) { return next(err); }
    if (results==null) { // No results.
        res.redirect('/catalog/videoCards');
    }
      // Successful, so render.
      res.render('videoCard_delete', { title: 'Delete Video Card', videoCard: results } );
  });

};

// Handle videoCard delete on POST.
exports.videoCard_delete_post = function(req, res, next) {

  //Delete object and redirect to the list of videoCards.
  VideoCard.findByIdAndRemove(req.body.videoCardid, function deleteVideoCard(err) {
      if (err) { return next(err); }
      // Success - go to videoCard list
      res.redirect('/catalog/videoCards')
  })
};

// Display videoCard update form on GET.
exports.videoCard_update_get = function(req, res, next) {

  VideoCard.findById(req.params.id, function(err, results) {
      if (err) { return next(err); }
      if (results==null) { // No results.
          var err = new Error('Video Card not found');
          err.status = 404;
          return next(err);
      }
      // Success.
      res.render('videoCard_form', { title: 'Update Video Card', newVideoCard: results, memorys: memory });
  });

};

// Handle videoCard update on POST.
exports.videoCard_update_post = [
 
  // Validate and sanitze the name field.
  body('name', 'Memory name required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('memory.*', 'Memory is required').isLength({ min: 1 }).escape(),
  body('chipset', 'Chipset is required').trim().isLength({ min: 1 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),
  

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request .
      const errors = validationResult(req);

  // Create a videoCard object with escaped and trimmed data (and the old id!)
    var newVideoCard = new VideoCard(
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        memory: req.body.memory,
        chipset: req.body.chipset,
        price: req.body.price,
        amount: req.body.amount,
        _id: req.params.id
        }
      );


      if (!errors.isEmpty()) {
          // There are errors. Render the form again with sanitized values and error messages.
          res.render('videoCard_form', { title: 'Update Video Card', newVideoCard: newVideoCard, memorys: memory, errors: errors.array()});
      return;
      }
      else {
          // Data from form is valid. Update the record.
          VideoCard.findByIdAndUpdate(req.params.id, newVideoCard, {}, function (err,theNewVideoCard) {
              if (err) { return next(err); }
                 // Successful - redirect to video card detail page.
                 res.redirect('/catalog/videocard/'+ theNewVideoCard._id);
              });
      }
  }
];