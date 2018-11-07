'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * route to fetch all parcels delivery orders
 * @method GET
 */
router.get('/', function (request, response, next) {
  response.status(200).json({
    message: 'get request to /parcels'
  });

  next();
});

/**
 * route to create a parcel delivery order
 * @method POST
 */
router.post('/', function (request, response, next) {
  response.status(200).json({
    message: 'post request to /parcels'
  });

  next();
});

/**
 * route to fetch a specific delivery order by its ID
 * @method GET
 */
router.get('/:parcelId', function (request, response, next) {
  var parcelId = request.params.parcelId;

  response.status(200).json({
    message: 'get request to /parcels for an individual parcel order',
    parcelId: parcelId
  });

  next();
});

module.exports = router;