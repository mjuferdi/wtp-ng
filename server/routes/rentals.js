const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

// Routing rentals without id as parameter
router.get('', function(req, res) {
  Rental.find({}, function(err, foundRentals) {
    res.json(foundRentals);
  });
});

// Routing rentals with id as parameter to get specific data
router.get('/:id', function(req, res) {
  const rentalId = req.params.id;
  Rental.findById(rentalId, function(err, foundRental) {
    if (err) {
      res.status(422).send({
        errors: [{
          title: 'Rental Error!',
          detail: 'Could not find Rental!'
        }]
      });
    }
    res.json(foundRental);
  });
});
module.exports = router;
